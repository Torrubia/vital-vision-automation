/**
 * vqb-dashboard-apply-assisted.js
 * Vital Vision — VQB Dashboard Guided Browser Automation
 *
 * GUIDED MODE by default (--apply flag required for actual field fills).
 * Opens VQB dashboard in a VISIBLE browser. Navigates to each quiz result page.
 * Pauses for human confirmation before filling any field.
 * NEVER auto-clicks Save, Publish, or Generate Key.
 * Does not edit Shopify. Does not change products, pricing, or discount codes.
 *
 * Modes:
 *   npm run vqb:dashboard-assisted-apply            → observe mode (no fills)
 *   npm run vqb:dashboard-assisted-apply -- --apply → guided fill mode
 *
 * Requirements:
 *   npm install playwright
 *   npx playwright install chromium
 *   VQB_DASHBOARD_EMAIL, VQB_DASHBOARD_PASSWORD, VQB_DASHBOARD_URL in .env
 */

'use strict';

require('dotenv').config();

const fs       = require('fs');
const path     = require('path');
const readline = require('readline');

const BASE = path.resolve(__dirname, '../../');

// ─── Safety Gates ─────────────────────────────────────────────────────────────

console.log('');
console.log('=== Vital Vision — VQB Dashboard Guided Browser Automation ===');
console.log('');

if (process.env.AUTO_PUBLISH === 'true')            { console.error('BLOCKED: AUTO_PUBLISH=true');           process.exit(1); }
if (process.env.REQUIRE_HUMAN_APPROVAL === 'false') { console.error('BLOCKED: REQUIRE_HUMAN_APPROVAL=false'); process.exit(1); }
if (process.env.VQB_API_MODE !== 'read_only')       { console.error('BLOCKED: VQB_API_MODE must be read_only for guided apply'); process.exit(1); }

const APPLY_MODE = process.argv.includes('--apply');
const mode = APPLY_MODE ? 'GUIDED APPLY (fields will be filled with human confirmation)' : 'OBSERVE (browser opens, no fills, no saves)';
console.log(`Mode: ${mode}`);
console.log('');
console.log('ABSOLUTE BLOCKS (enforced in this script):');
console.log('  ✗ Auto-click Save (never)');
console.log('  ✗ Auto-click Publish / Go Live (never)');
console.log('  ✗ Click Generate Key (never)');
console.log('  ✗ Edit pricing, products, or Shopify (never)');
console.log('  ✗ Delete any quiz, result page, or screen (never)');
console.log('');

// ─── Credential Check ─────────────────────────────────────────────────────────

const DASH_EMAIL = process.env.VQB_DASHBOARD_EMAIL;
const DASH_PASS  = process.env.VQB_DASHBOARD_PASSWORD;
const DASH_URL   = process.env.VQB_DASHBOARD_URL || 'https://app.visualquizbuilder.com';

if (!DASH_EMAIL || !DASH_PASS) {
  console.error('BLOCKED: VQB_DASHBOARD_EMAIL and VQB_DASHBOARD_PASSWORD must be set in .env');
  console.error('');
  console.error('Add to .env:');
  console.error('  VQB_DASHBOARD_EMAIL=your@email.com');
  console.error('  VQB_DASHBOARD_PASSWORD=yourpassword');
  console.error('  VQB_DASHBOARD_URL=https://app.visualquizbuilder.com');
  process.exit(1);
}

// ─── Playwright Check ─────────────────────────────────────────────────────────

let playwright;
try {
  playwright = require('playwright');
} catch (_) {
  console.error('BLOCKED: Playwright is not installed.');
  console.error('');
  console.error('Install it:');
  console.error('  npm install playwright');
  console.error('  npx playwright install chromium');
  process.exit(1);
}

// ─── Load Approved Copy ───────────────────────────────────────────────────────

const payloadPath = path.join(BASE, 'automations', 'drafts', 'vqb-api-update-draft.json');
if (!fs.existsSync(payloadPath)) {
  console.error('MISSING: automations/drafts/vqb-api-update-draft.json');
  process.exit(1);
}
const payload = JSON.parse(fs.readFileSync(payloadPath, 'utf8'));
const { emailCapture, discountScreen, resultCards } = payload;
const { innerBloom, innerCalm, innerGrow, innerBalance } = resultCards;

// ─── Human Prompt Helper ──────────────────────────────────────────────────────

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

function ask(question) {
  return new Promise(resolve => rl.question(question, resolve));
}

async function confirm(prompt) {
  const answer = await ask(`  ${prompt} [y/N]: `);
  return answer.trim().toLowerCase() === 'y';
}

// ─── Screenshot Helper ────────────────────────────────────────────────────────

const SCREENSHOTS = path.join(BASE, 'reports', 'vqb', 'screenshots');
fs.mkdirSync(SCREENSHOTS, { recursive: true });

async function screenshot(page, name) {
  const ts    = new Date().toISOString().replace(/[:.]/g, '-');
  const file  = path.join(SCREENSHOTS, `${ts}-${name}.png`);
  await page.screenshot({ path: file, fullPage: true });
  console.log(`  Screenshot: reports/vqb/screenshots/${path.basename(file)}`);
  return file;
}

// ─── Safe Fill Helper ─────────────────────────────────────────────────────────

/**
 * Safely fill a field. Tries multiple selector strategies.
 * Pauses for human confirmation before filling in APPLY_MODE.
 * In observe mode, only reports whether the field was found.
 */
async function safeFill(page, { fieldName, value, selectors }) {
  console.log('');
  console.log(`  ┌─ Field: ${fieldName}`);
  console.log(`  │  Value: ${value.substring(0, 80)}${value.length > 80 ? '...' : ''}`);

  let foundEl   = null;
  let foundSel  = null;

  for (const sel of selectors) {
    try {
      const el = await page.$(sel);
      if (el) {
        foundEl  = el;
        foundSel = sel;
        break;
      }
    } catch (_) {}
  }

  if (!foundEl) {
    console.log(`  │  Status: NOT FOUND — tried ${selectors.length} selectors`);
    console.log(`  │  Action: Manual paste required`);
    console.log(`  └─ ⚠️  Skipping (field not auto-located)`);
    return { found: false, filled: false, fieldName, selector: null };
  }

  console.log(`  │  Found:  ${foundSel}`);

  if (!APPLY_MODE) {
    console.log(`  └─ OBSERVE mode — field located but not filled`);
    return { found: true, filled: false, fieldName, selector: foundSel };
  }

  const ok = await confirm(`Fill "${fieldName}" with the value above?`);
  if (!ok) {
    console.log(`  └─ Skipped by user`);
    return { found: true, filled: false, fieldName, selector: foundSel };
  }

  await foundEl.click({ clickCount: 3 });
  await foundEl.fill(value);
  console.log(`  └─ FILLED ✅`);
  return { found: true, filled: true, fieldName, selector: foundSel };
}

// ─── Screen Runners ───────────────────────────────────────────────────────────

async function runEmailCapture(page) {
  console.log('');
  console.log('── SCREEN 1: Email Capture ───────────────────────────────────────────');
  console.log('   Expected location: Quiz Settings → Email Gate / Lead Capture');
  console.log('');
  await screenshot(page, 'before-email-capture');

  if (APPLY_MODE) {
    console.log('  Navigate to the Email Capture screen in the VQB editor, then press Enter.');
    await ask('  Press Enter when you are on the Email Capture screen...');
    await screenshot(page, 'on-email-capture');
  }

  const results = [];
  results.push(await safeFill(page, {
    fieldName: 'Headline',
    value: emailCapture.headline,
    selectors: [
      'input[placeholder*="headline" i]',
      'input[name*="headline" i]',
      'textarea[name*="headline" i]',
      '[data-field="headline"] input',
      '[data-field="headline"] textarea',
      '.email-capture-headline input',
      '.headline-field input',
    ],
  }));

  results.push(await safeFill(page, {
    fieldName: 'Subhead',
    value: emailCapture.subhead,
    selectors: [
      'input[placeholder*="subhead" i]',
      'input[name*="subhead" i]',
      'textarea[name*="subhead" i]',
      '[data-field="subhead"] input',
      '[data-field="description"] input',
    ],
  }));

  results.push(await safeFill(page, {
    fieldName: 'Email placeholder',
    value: emailCapture.placeholder,
    selectors: [
      'input[placeholder*="placeholder" i]',
      'input[name*="placeholder" i]',
      '[data-field="placeholder"] input',
    ],
  }));

  results.push(await safeFill(page, {
    fieldName: 'CTA button',
    value: emailCapture.ctaButton,
    selectors: [
      'input[placeholder*="button" i]',
      'input[name*="button" i]',
      'input[name*="cta" i]',
      '[data-field="button"] input',
      '[data-field="cta"] input',
    ],
  }));

  results.push(await safeFill(page, {
    fieldName: 'Micro-copy',
    value: emailCapture.microCopy,
    selectors: [
      'input[placeholder*="micro" i]',
      'input[name*="micro" i]',
      'input[placeholder*="disclaimer" i]',
      '[data-field="disclaimer"] input',
    ],
  }));

  if (APPLY_MODE) {
    const filled = results.filter(r => r.filled).length;
    console.log('');
    console.log(`  Screen 1 summary: ${filled}/${results.length} fields filled`);
    const anySaved = await confirm('Review all changes above, then click Save in VQB if satisfied. Confirm save was clicked?');
    console.log(anySaved ? '  User confirmed save ✅' : '  Save skipped — user did not confirm');
    await screenshot(page, 'after-email-capture');
  }

  return results;
}

async function runDiscountScreen(page) {
  console.log('');
  console.log('── SCREEN 2: Discount Code ───────────────────────────────────────────');
  console.log('   Expected location: Quiz Settings → Discount Screen / Coupon Screen');
  console.log('');
  await screenshot(page, 'before-discount-screen');

  if (APPLY_MODE) {
    console.log('  Navigate to the Discount Code screen in the VQB editor, then press Enter.');
    await ask('  Press Enter when you are on the Discount Code screen...');
    await screenshot(page, 'on-discount-screen');
  }

  const results = [];
  results.push(await safeFill(page, {
    fieldName: 'Headline',
    value: discountScreen.headline,
    selectors: ['input[name*="headline" i]', '[data-field="headline"] input'],
  }));
  results.push(await safeFill(page, {
    fieldName: 'Subhead',
    value: discountScreen.subhead,
    selectors: ['input[name*="subhead" i]', '[data-field="subhead"] input'],
  }));
  results.push(await safeFill(page, {
    fieldName: 'CTA button',
    value: discountScreen.ctaButton,
    selectors: ['input[name*="button" i]', 'input[name*="cta" i]', '[data-field="cta"] input'],
  }));
  results.push(await safeFill(page, {
    fieldName: 'Instructions',
    value: discountScreen.instructions,
    selectors: ['input[name*="instruction" i]', 'textarea[name*="instruction" i]'],
  }));
  // NOTE: Do NOT auto-fill the code field — it connects to Shopify discount
  console.log('');
  console.log(`  ⚠️  SKIPPING auto-fill for Discount Code field.`);
  console.log(`     Current code should be WELCOME10 — do not change unless intentional.`);
  console.log(`     Verify manually in VQB dashboard.`);

  if (APPLY_MODE) {
    const filled = results.filter(r => r.filled).length;
    console.log('');
    console.log(`  Screen 2 summary: ${filled}/${results.length} fields filled`);
    const saved = await confirm('Review changes, then click Save in VQB if satisfied. Confirm save was clicked?');
    console.log(saved ? '  User confirmed save ✅' : '  Save skipped');
    await screenshot(page, 'after-discount-screen');
  }

  return results;
}

async function runResultCard(page, { id, label, card, globalLabel }) {
  console.log('');
  console.log(`── ${label} ───────────────────────────────────`);
  console.log('');
  await screenshot(page, `before-${id}`);

  if (APPLY_MODE) {
    console.log(`  Navigate to the ${label} in the VQB editor, then press Enter.`);
    await ask(`  Press Enter when you are on the ${label}...`);
    await screenshot(page, `on-${id}`);
  }

  const results = [];
  results.push(await safeFill(page, {
    fieldName: 'Global label',
    value: globalLabel,
    selectors: ['input[name*="global" i]', '[data-field="globalLabel"] input', 'input[placeholder*="global" i]'],
  }));
  results.push(await safeFill(page, {
    fieldName: 'Result headline',
    value: card.headline,
    selectors: ['input[name*="headline" i]', '[data-field="headline"] input', 'input[placeholder*="headline" i]'],
  }));
  results.push(await safeFill(page, {
    fieldName: 'Short description',
    value: card.description,
    selectors: ['textarea[name*="description" i]', '[data-field="description"] textarea', 'textarea[placeholder*="description" i]'],
  }));
  results.push(await safeFill(page, {
    fieldName: 'Quantity label',
    value: card.qtyLabel,
    selectors: ['input[name*="qty" i]', 'input[name*="quantity" i]', '[data-field="qtyLabel"] input'],
  }));
  results.push(await safeFill(page, {
    fieldName: 'Primary CTA',
    value: card.primaryCta,
    selectors: ['input[name*="primary" i]', 'input[name*="cta" i]', '[data-field="primaryCta"] input'],
  }));
  results.push(await safeFill(page, {
    fieldName: 'Secondary CTA',
    value: card.secondaryCta,
    selectors: ['input[name*="secondary" i]', '[data-field="secondaryCta"] input'],
  }));
  results.push(await safeFill(page, {
    fieldName: 'Disclaimer',
    value: card.disclaimer,
    selectors: ['textarea[name*="disclaimer" i]', '[data-field="disclaimer"] textarea', 'input[name*="disclaimer" i]'],
  }));
  // Why This Match
  results.push(await safeFill(page, {
    fieldName: 'Why This Match headline',
    value: card.whyThisMatch.headline,
    selectors: ['input[name*="why" i]', '[data-field="whyHeadline"] input'],
  }));
  results.push(await safeFill(page, {
    fieldName: 'Why This Match body',
    value: card.whyThisMatch.body,
    selectors: ['textarea[name*="why" i]', '[data-field="whyBody"] textarea', 'textarea[name*="explanation" i]'],
  }));

  if (APPLY_MODE) {
    const filled = results.filter(r => r.filled).length;
    console.log('');
    console.log(`  ${label} summary: ${filled}/${results.length} fields filled`);
    const saved = await confirm('Review changes, then click Save in VQB if satisfied. Confirm save was clicked?');
    console.log(saved ? '  User confirmed save ✅' : '  Save skipped');
    await screenshot(page, `after-${id}`);
  }

  return results;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  const ts = new Date().toISOString();
  const allResults = {};
  let browser;

  try {
    console.log(`Launching Chromium (visible browser)...`);
    console.log(`Dashboard URL: ${DASH_URL}`);
    console.log('');

    browser = await playwright.chromium.launch({
      headless: false,
      slowMo: 80,
    });

    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
    });
    const page = await context.newPage();

    // ── Navigate to VQB Dashboard ──────────────────────────────────────────────
    console.log('Navigating to VQB dashboard...');
    await page.goto(DASH_URL, { waitUntil: 'networkidle', timeout: 30000 });
    await screenshot(page, '01-dashboard-landing');

    // ── Login ──────────────────────────────────────────────────────────────────
    console.log('Attempting login...');
    const emailField = await page.$('input[type="email"], input[name="email"], input[placeholder*="email" i]');
    const passField  = await page.$('input[type="password"]');

    if (emailField && passField) {
      await emailField.fill(DASH_EMAIL);
      await passField.fill(DASH_PASS);
      const loginBtn = await page.$('button[type="submit"], button:has-text("Log in"), button:has-text("Sign in"), button:has-text("Login")');
      if (loginBtn) {
        console.log('  Login form found — filling credentials (masked) and submitting...');
        await loginBtn.click();
        await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
        await screenshot(page, '02-after-login');
        console.log('  Login submitted. Verify browser shows dashboard.');
      } else {
        console.log('  ⚠️  Login form found but submit button not located — log in manually in the browser.');
      }
    } else {
      console.log('  ⚠️  Login form not auto-located — log in manually in the browser window.');
    }

    if (APPLY_MODE) {
      console.log('');
      console.log('  After logging in, navigate to the quiz editor for:');
      console.log('    Quiz: VV Home Quick Match Quiz — 1Q (ID: 16047)');
      await ask('  Press Enter when you are in the quiz editor and ready to begin...');
    } else {
      console.log('');
      console.log('OBSERVE MODE — browser is open. Review the dashboard, then close it or press Ctrl+C.');
      console.log('');
      console.log('Field map:');
      const screens = [
        { name: 'Email Capture',        fields: Object.entries(emailCapture) },
        { name: 'Discount Screen',      fields: Object.entries(discountScreen) },
        { name: 'Inner Bloom',          fields: Object.entries({ ...innerBloom, wtmBody: innerBloom.whyThisMatch.body }) },
        { name: 'Inner Calm',           fields: Object.entries({ ...innerCalm,  wtmBody: innerCalm.whyThisMatch.body }) },
        { name: 'Inner Grow',           fields: Object.entries({ ...innerGrow,  wtmBody: innerGrow.whyThisMatch.body }) },
        { name: 'Inner Balance',        fields: Object.entries({ ...innerBalance, wtmBody: innerBalance.whyThisMatch.body }) },
      ];
      screens.forEach(sc => {
        console.log(`\n  ${sc.name}:`);
        sc.fields.forEach(([k, v]) => {
          if (typeof v === 'string') {
            const preview = v.length > 55 ? v.substring(0, 52) + '...' : v;
            console.log(`    ${k.padEnd(18)}: ${preview}`);
          }
        });
      });
      console.log('');
      console.log('To apply changes, run:');
      console.log('  npm run vqb:dashboard-assisted-apply -- --apply');
      console.log('');
      await ask('Press Enter to close the browser...');
    }

    if (APPLY_MODE) {
      // ── Run All Screens ──────────────────────────────────────────────────────
      allResults.emailCapture   = await runEmailCapture(page);
      allResults.discountScreen = await runDiscountScreen(page);

      allResults.innerBloom = await runResultCard(page, {
        id: 'inner-bloom', label: 'Inner Bloom Result Card + Why This Match',
        card: innerBloom, globalLabel: resultCards.globalLabel,
      });
      allResults.innerCalm = await runResultCard(page, {
        id: 'inner-calm', label: 'Inner Calm Result Card + Why This Match',
        card: innerCalm, globalLabel: resultCards.globalLabel,
      });
      allResults.innerGrow = await runResultCard(page, {
        id: 'inner-grow', label: 'Inner Grow Result Card + Why This Match',
        card: innerGrow, globalLabel: resultCards.globalLabel,
      });
      allResults.innerBalance = await runResultCard(page, {
        id: 'inner-balance', label: 'Inner Balance Result Card + Why This Match',
        card: innerBalance, globalLabel: resultCards.globalLabel,
      });

      // ── Summary ──────────────────────────────────────────────────────────────
      const allFields  = Object.values(allResults).flat();
      const found      = allFields.filter(f => f.found).length;
      const filled     = allFields.filter(f => f.filled).length;
      const notFound   = allFields.filter(f => !f.found);

      console.log('');
      console.log('═════════════════════════════════════════════════════════════════');
      console.log('  GUIDED APPLY COMPLETE');
      console.log('═════════════════════════════════════════════════════════════════');
      console.log(`  Total fields: ${allFields.length}`);
      console.log(`  Found by automation: ${found}`);
      console.log(`  Filled with approval: ${filled}`);
      console.log(`  Require manual paste: ${notFound.length}`);
      if (notFound.length > 0) {
        console.log('');
        console.log('  Fields to paste manually:');
        notFound.forEach(f => console.log(`    ⚠️  ${f.fieldName}`));
        console.log('  Use config/vqb-result-copy-to-paste.md for manual fields.');
      }
      console.log('');
      console.log('  Next steps:');
      console.log('  1. Review all changes in the VQB preview');
      console.log('  2. Test on mobile (375px) before publishing');
      console.log('  3. Human sign-off on reports/vqb/manual-vqb-edit-checklist.md');
      console.log('  4. Publish manually in VQB dashboard when satisfied');
      console.log('');

      await screenshot(page, 'final-state');
    }

    // ── Save Run Report ────────────────────────────────────────────────────────
    const REPORTS = path.join(BASE, 'reports', 'vqb');
    const runReport = {
      generatedAt: ts,
      mode: APPLY_MODE ? 'guided_apply' : 'observe',
      writesExecuted: 0,  // hardcoded — this script never makes API writes
      shopifyEdited: false,
      vqbApiWriteMade: false,
      results: allResults,
      _safety: { autoPublish: false, requireHumanApproval: true, vqbApiMode: 'read_only' },
    };
    const runPath = path.join(REPORTS, `${ts.replace(/[:.]/g, '-')}-dashboard-apply-run.json`);
    fs.writeFileSync(runPath, JSON.stringify(runReport, null, 2));
    console.log(`Run report saved: reports/vqb/${path.basename(runPath)}`);

  } catch (err) {
    console.error('');
    console.error(`Error: ${err.message}`);
    if (err.message.includes('playwright')) {
      console.error('Make sure Playwright is installed: npm install playwright && npx playwright install chromium');
    }
  } finally {
    if (browser) await browser.close();
    rl.close();
  }
}

main();
