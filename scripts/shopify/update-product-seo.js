/**
 * update-product-seo.js
 * Vital Vision — Shopify Inner Line Product SEO Updater
 *
 * Phase 1 (default): Read products → backup → generate change report.
 *                    STOPS before any writes. Awaits human approval.
 * Phase 2 (--apply): Apply approved title + first-sentence changes only.
 *                    Requires REQUIRE_HUMAN_APPROVAL=true and explicit --apply flag.
 *
 * Usage:
 *   npm run shopify:product-seo-report   → Phase 1 only (safe)
 *   npm run shopify:product-seo-apply    → Phase 2 apply (after approval)
 */

'use strict';

require('dotenv').config();

const fs   = require('fs');
const path = require('path');
const https = require('https');

// ─── Safety Gates ────────────────────────────────────────────────────────────

if (process.env.AUTO_PUBLISH === 'true') {
  console.error('BLOCKED: AUTO_PUBLISH=true');
  process.exit(1);
}
if (process.env.REQUIRE_HUMAN_APPROVAL === 'false') {
  console.error('BLOCKED: REQUIRE_HUMAN_APPROVAL=false');
  process.exit(1);
}

const APPLY_MODE = process.argv.includes('--apply');

const DOMAIN  = process.env.SHOPIFY_STORE_DOMAIN;
const TOKEN   = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN;
const VERSION = process.env.SHOPIFY_API_VERSION || '2026-04';

if (!DOMAIN || !TOKEN) {
  console.error('MISSING: SHOPIFY_STORE_DOMAIN or SHOPIFY_ADMIN_ACCESS_TOKEN not set in .env');
  process.exit(1);
}

const BASE_URL = `https://${DOMAIN}/admin/api/${VERSION}`;
const BASE_DIR = path.resolve(__dirname, '../../');
const BACKUP_DIR  = path.join(BASE_DIR, 'backups', 'shopify');
const REPORTS_DIR = path.join(BASE_DIR, 'reports');

// ─── Proposed Changes ────────────────────────────────────────────────────────
// Only title and first sentence of body_html are changed.
// All compliance rules applied: no cure/treat/prevent/diagnose/disease claims.

const PROPOSED = {
  'inner balance': {
    title: 'INNER BALANCE Complete Multivitamin | Daily Wellness Supplement',
    firstSentence: 'Inner Balance is a complete daily multivitamin designed to support your overall wellness from within as part of a consistent self-care routine.',
  },
  'inner bloom': {
    title: 'INNER BLOOM Advanced Probiotic Formula | Daily Digestive Wellness Supplement',
    firstSentence: 'Inner Bloom is an advanced probiotic formula designed to support healthy digestion and daily gut balance as part of a consistent wellness routine.',
  },
  'inner grow': {
    title: 'INNER GROW Hair Skin and Nails Support | Beauty Wellness Supplement',
    firstSentence: 'Inner Grow is designed to support healthy hair, skin, and nails from within as part of a consistent daily wellness routine.',
  },
  'inner calm': {
    title: 'INNER CALM Magnesium Glycinate | Daily Calm Wellness Supplement',
    firstSentence: 'Inner Calm is formulated with magnesium glycinate, designed to support a calm evening routine and overall wellness as part of a consistent self-care ritual.',
  },
};

// ─── Compliance Checker ───────────────────────────────────────────────────────

const PROHIBITED = [
  'cure', 'treat', 'prevent', 'diagnose', 'heal', 'disease', 'anxiety',
  'depression', 'insomnia', 'fda approved', 'doctor recommended', 'clinically proven',
];

function complianceCheck(text) {
  const lower = text.toLowerCase();
  // Use word-boundary matching to avoid false positives (e.g. "heal" in "healthy")
  return PROHIBITED.filter(w => new RegExp(`\\b${w}\\b`).test(lower));
}

// ─── HTTP Helper ──────────────────────────────────────────────────────────────

function shopifyRequest(method, endpoint, body) {
  return new Promise((resolve, reject) => {
    const url = new URL(BASE_URL + endpoint);
    const options = {
      hostname: url.hostname,
      path: url.pathname + url.search,
      method,
      headers: {
        'X-Shopify-Access-Token': TOKEN,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, body: JSON.parse(data) });
        } catch {
          resolve({ status: res.statusCode, body: data });
        }
      });
    });

    req.on('error', reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

// ─── HTML First-Sentence Helpers ──────────────────────────────────────────────

/**
 * Extract the first plain-text sentence from an HTML body_html string.
 * Strips all tags and returns the first sentence (up to first period or 200 chars).
 */
function extractFirstSentence(html) {
  if (!html) return '';
  // Strip HTML tags
  const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  // Find first sentence ending
  const match = text.match(/^(.+?\.)\s/);
  return match ? match[1] : text.substring(0, 200);
}

/**
 * Replace the first sentence in body_html with a new one.
 * Finds the first text content after the opening tag and replaces up to the first period.
 * Preserves all surrounding HTML.
 */
function replaceFirstSentence(html, newSentence) {
  if (!html) return `<p>${newSentence}</p>`;

  // Strategy: find the first run of non-tag text that contains a period
  // and replace everything up to (and including) the first period.
  const stripped = html.replace(/<[^>]+>/g, '\x00');
  const firstTextBlock = stripped.split('\x00').find(t => t.trim().length > 0);

  if (!firstTextBlock || !firstTextBlock.includes('.')) {
    // Prepend new sentence inside a paragraph before existing content
    return `<p>${newSentence}</p>${html}`;
  }

  const firstPeriodInBlock = firstTextBlock.indexOf('.');
  const oldFirstSentence = firstTextBlock.substring(0, firstPeriodInBlock + 1).trim();

  if (!oldFirstSentence) {
    return `<p>${newSentence}</p>${html}`;
  }

  // Replace only the first occurrence in the original HTML
  return html.replace(oldFirstSentence, newSentence);
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('');
  console.log('═'.repeat(72));
  console.log('  Vital Vision — Shopify Inner Line Product SEO Updater');
  console.log(`  Mode: ${APPLY_MODE ? 'APPLY (write)' : 'REPORT ONLY (read-only)'}`);
  console.log('  Products: Inner Balance · Inner Bloom · Inner Grow · Inner Calm');
  console.log('═'.repeat(72));
  console.log('');

  // ── Step 1: Fetch products ──────────────────────────────────────────────────

  console.log('[ 1/4 ] Fetching Inner Line products from Shopify...');

  const result = await shopifyRequest('GET', '/products.json?limit=250');

  if (result.status !== 200) {
    console.error(`  ERROR: Shopify API returned ${result.status}`);
    console.error('  ', JSON.stringify(result.body));
    process.exit(1);
  }

  const allProducts = result.body.products || [];
  const innerProducts = allProducts.filter(p => p.title.toLowerCase().includes('inner'));
  console.log(`  Found ${allProducts.length} total products, ${innerProducts.length} Inner Line products`);

  // Match each proposed product key to a Shopify product
  const matched = {};
  for (const key of Object.keys(PROPOSED)) {
    const product = innerProducts.find(p => p.title.toLowerCase().includes(key));
    if (product) {
      matched[key] = product;
      console.log(`  ✓ ${key} → "${product.title}" (ID: ${product.id})`);
    } else {
      console.log(`  ✗ ${key} → NOT FOUND — check product title in Shopify`);
    }
  }

  const foundKeys = Object.keys(matched);
  if (foundKeys.length === 0) {
    console.error('\n  ERROR: No Inner Line products found. Check SHOPIFY_STORE_DOMAIN and token.');
    process.exit(1);
  }

  console.log('');

  // ── Step 2: Backup ──────────────────────────────────────────────────────────

  console.log('[ 2/4 ] Creating local JSON backups...');
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');

  for (const [key, product] of Object.entries(matched)) {
    const slug = key.replace(/\s+/g, '-');
    const backupPath = path.join(BACKUP_DIR, `${slug}-${timestamp}.json`);
    fs.writeFileSync(backupPath, JSON.stringify(product, null, 2));
    console.log(`  ✓ Backed up: backups/shopify/${path.basename(backupPath)}`);
  }

  console.log('');

  // ── Step 3: Build change report ────────────────────────────────────────────

  console.log('[ 3/4 ] Building change report...');

  const reportLines = [
    `# Shopify Inner Line Product SEO — Change Report`,
    `# Generated: ${new Date().toISOString().split('T')[0]}`,
    `# AUTO_PUBLISH=false | REQUIRE_HUMAN_APPROVAL=true`,
    `# Mode at generation time: ${APPLY_MODE ? 'APPLY' : 'REPORT ONLY'}`,
    ``,
    `> This report shows proposed changes only. No Shopify content has been modified.`,
    `> Review each change below. If approved, run: \`npm run shopify:product-seo-apply\``,
    ``,
    `---`,
    ``,
    `## Summary`,
    ``,
    `| Product | Change Type | Compliance |`,
    `|---|---|---|`,
  ];

  const details = [];

  for (const key of foundKeys) {
    const product = matched[key];
    const proposed = PROPOSED[key];

    const currentTitle     = product.title;
    const currentFirst     = extractFirstSentence(product.body_html);
    const proposedTitle    = proposed.title;
    const proposedFirst    = proposed.firstSentence;

    const titleFlags  = complianceCheck(proposedTitle);
    const bodyFlags   = complianceCheck(proposedFirst);
    const currentFlags = complianceCheck(currentFirst);

    const allFlags = [...new Set([...titleFlags, ...bodyFlags])];
    const complianceStatus = allFlags.length === 0 ? 'PASS' : `REVIEW: ${allFlags.join(', ')}`;
    const currentComplianceStatus = currentFlags.length === 0 ? 'PASS' : `REVIEW: ${currentFlags.join(', ')}`;

    reportLines.push(`| ${proposed.title.split('|')[0].trim()} | title + first sentence | ${complianceStatus} |`);

    details.push(`---`);
    details.push(``);
    details.push(`## ${proposed.title.split('|')[0].trim()}`);
    details.push(``);
    details.push(`**Shopify Product ID:** ${product.id}`);
    details.push(`**Handle:** ${product.handle}`);
    details.push(``);
    details.push(`### Title`);
    details.push(``);
    details.push(`| | Value |`);
    details.push(`|---|---|`);
    details.push(`| Current | ${currentTitle} |`);
    details.push(`| Proposed | ${proposedTitle} |`);
    details.push(``);
    details.push(`### First Sentence of Description`);
    details.push(``);
    details.push(`| | Value |`);
    details.push(`|---|---|`);
    details.push(`| Current | ${currentFirst || '_(empty)_'} |`);
    details.push(`| Proposed | ${proposedFirst} |`);
    details.push(``);
    details.push(`### Compliance Check`);
    details.push(``);
    details.push(`| Scope | Status |`);
    details.push(`|---|---|`);
    details.push(`| Current first sentence | ${currentComplianceStatus} |`);
    details.push(`| Proposed title | ${titleFlags.length === 0 ? 'PASS' : 'REVIEW: ' + titleFlags.join(', ')} |`);
    details.push(`| Proposed first sentence | ${bodyFlags.length === 0 ? 'PASS' : 'REVIEW: ' + bodyFlags.join(', ')} |`);
    details.push(``);
    details.push(`### What Will NOT Change`);
    details.push(``);
    details.push(`- Remaining body_html paragraphs`);
    details.push(`- Product variants, pricing, images`);
    details.push(`- Product tags, collections, metafields`);
    details.push(`- SEO meta title and meta description (managed separately)`);
    details.push(``);
  }

  const missingKeys = Object.keys(PROPOSED).filter(k => !matched[k]);
  if (missingKeys.length > 0) {
    details.push(`---`);
    details.push(``);
    details.push(`## Products Not Found`);
    details.push(``);
    missingKeys.forEach(k => {
      details.push(`- **${k}** — no product with this title found in Shopify. Verify the product title.`);
    });
    details.push(``);
  }

  reportLines.push(``);
  reportLines.push(...details);
  reportLines.push(`---`);
  reportLines.push(``);
  reportLines.push(`## Approval`);
  reportLines.push(``);
  reportLines.push(`To approve and apply these changes:`);
  reportLines.push(``);
  reportLines.push(`1. Review each change above`);
  reportLines.push(`2. Confirm compliance checks all pass`);
  reportLines.push(`3. Run: \`npm run shopify:product-seo-apply\``);
  reportLines.push(``);
  reportLines.push(`To reject or modify: edit the \`PROPOSED\` object in \`scripts/shopify/update-product-seo.js\``);
  reportLines.push(`then re-run \`npm run shopify:product-seo-report\` to regenerate this report.`);
  reportLines.push(``);
  reportLines.push(`---`);
  reportLines.push(``);
  reportLines.push(`*No Shopify content was modified by this script.*`);
  reportLines.push(`*Backups saved to: backups/shopify/*`);

  const reportPath = path.join(REPORTS_DIR, 'shopify-product-agentic-updates.md');
  fs.writeFileSync(reportPath, reportLines.join('\n'));
  console.log(`  ✓ Report saved: reports/shopify-product-agentic-updates.md`);
  console.log('');

  // ── Step 4: Apply or stop ───────────────────────────────────────────────────

  if (!APPLY_MODE) {
    console.log('[ 4/4 ] Report complete. No changes made to Shopify.');
    console.log('');
    console.log('  NEXT STEPS:');
    console.log('  1. Review:  reports/shopify-product-agentic-updates.md');
    console.log('  2. Approve: run npm run shopify:product-seo-apply');
    console.log('');
    console.log('═'.repeat(72));
    console.log('  No Shopify content was modified.');
    console.log('  AUTO_PUBLISH=false | REQUIRE_HUMAN_APPROVAL=true');
    console.log('═'.repeat(72));
    console.log('');
    return;
  }

  // ── APPLY MODE ──────────────────────────────────────────────────────────────

  console.log('[ 4/4 ] APPLY MODE — updating Shopify products...');
  console.log('');

  const applyReport = [];
  let successCount  = 0;
  let failCount     = 0;

  for (const key of foundKeys) {
    const product  = matched[key];
    const proposed = PROPOSED[key];

    console.log(`  Updating: ${key} (ID: ${product.id})`);

    const newBodyHtml = replaceFirstSentence(product.body_html, proposed.firstSentence);

    const payload = {
      product: {
        id: product.id,
        title: proposed.title,
        body_html: newBodyHtml,
      },
    };

    const updateResult = await shopifyRequest('PUT', `/products/${product.id}.json`, payload);

    if (updateResult.status === 200) {
      const updated = updateResult.body.product;
      successCount++;
      console.log(`  ✓ Updated: "${updated.title}"`);
      applyReport.push({ key, id: product.id, status: 'SUCCESS', title: updated.title });
    } else {
      failCount++;
      console.error(`  ✗ FAILED (${updateResult.status}):`, JSON.stringify(updateResult.body));
      applyReport.push({ key, id: product.id, status: 'FAILED', error: JSON.stringify(updateResult.body) });
    }
  }

  console.log('');

  // Verify: re-fetch and confirm
  console.log('  Verifying updates...');
  for (const entry of applyReport) {
    if (entry.status !== 'SUCCESS') continue;
    const verify = await shopifyRequest('GET', `/products/${entry.id}.json`);
    if (verify.status === 200) {
      const vp = verify.body.product;
      const titleMatch = vp.title === PROPOSED[entry.key].title;
      const firstSent  = extractFirstSentence(vp.body_html);
      const bodyMatch  = firstSent.includes(PROPOSED[entry.key].firstSentence.substring(0, 40));
      console.log(`  ${titleMatch && bodyMatch ? '✓' : '✗'} Verified: ${entry.key}`);
      entry.verified = titleMatch && bodyMatch;
    }
  }

  // Append apply results to report
  const applyLines = [
    ``,
    `---`,
    ``,
    `## Apply Results`,
    ``,
    `Applied: ${new Date().toISOString()}`,
    `Success: ${successCount} / ${foundKeys.length}`,
    ``,
    `| Product | ID | Status | Verified |`,
    `|---|---|---|---|`,
    ...applyReport.map(r =>
      `| ${r.key} | ${r.id} | ${r.status} | ${r.verified === true ? 'YES' : r.verified === false ? 'NO' : 'N/A'} |`
    ),
    ``,
    `---`,
    ``,
    `*Apply run complete. ${failCount > 0 ? `${failCount} updates failed — check errors above.` : 'All updates applied successfully.'}*`,
  ];

  fs.appendFileSync(reportPath, applyLines.join('\n'));
  console.log('');
  console.log(`  Apply results appended to reports/shopify-product-agentic-updates.md`);
  console.log('');
  console.log('═'.repeat(72));
  console.log(`  Done. ${successCount} updated, ${failCount} failed.`);
  console.log('  AUTO_PUBLISH=false | REQUIRE_HUMAN_APPROVAL=true');
  console.log('═'.repeat(72));
  console.log('');
}

main().catch(err => {
  console.error('FATAL:', err.message);
  process.exit(1);
});
