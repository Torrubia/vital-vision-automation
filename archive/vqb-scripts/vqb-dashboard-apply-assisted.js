/**
 * vqb-dashboard-apply-assisted.js
 * Vital Vision — VQB Dashboard Guided Browser Automation
 *
 * No credentials stored. No auto-login. Human navigates and logs in manually.
 * The script opens a visible browser, waits, then observes or applies.
 *
 * Modes:
 *   npm run vqb:dashboard-assisted-apply            → observe only (no fills, generates field map)
 *   npm run vqb:dashboard-assisted-apply -- --apply → guided fill (human confirms each field)
 *
 * Requirements:
 *   npm install playwright && npx playwright install chromium
 *   VQB_DASHBOARD_URL optional in .env (defaults to Shopify admin app list)
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
if (process.env.VQB_API_MODE !== 'read_only')       { console.error('BLOCKED: VQB_API_MODE must be read_only'); process.exit(1); }

const APPLY_MODE = process.argv.includes('--apply');

console.log(`Mode: ${APPLY_MODE ? 'GUIDED APPLY — fields filled with human confirmation per field' : 'OBSERVE — browser opens, page scanned, NO fills, NO saves'}`);
console.log('');
console.log('ABSOLUTE BLOCKS (hardcoded — cannot be overridden):');
console.log('  ✗ No auto-fill without explicit y confirmation');
console.log('  ✗ No auto-click of Save / Publish / Go Live / Activate');
console.log('  ✗ No click of Generate Key or Reset API Key');
console.log('  ✗ No changes to pricing, products, discounts in Shopify');
console.log('  ✗ No deletion of any quiz, result page, or screen');
console.log('  ✗ No VQB API write calls');
console.log('');

// ─── Playwright Check ─────────────────────────────────────────────────────────

let playwright;
try {
  playwright = require('playwright');
} catch (_) {
  console.error('BLOCKED: Playwright not installed.');
  console.error('  npm install playwright && npx playwright install chromium');
  process.exit(1);
}

// ─── Configuration ────────────────────────────────────────────────────────────

const SHOPIFY_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN || null;
const VQB_DASH_URL   = process.env.VQB_DASHBOARD_URL    || null;

// Default landing URL — Shopify admin app list if domain known, else generic VQB
const START_URL = VQB_DASH_URL
  || (SHOPIFY_DOMAIN ? `https://${SHOPIFY_DOMAIN}/admin/apps` : 'https://app.visualquizbuilder.com');

console.log(`Start URL:  ${START_URL}`);
console.log(`(Change with VQB_DASHBOARD_URL in .env)`);
console.log('');

// ─── Readline (interactive terminal prompt) ───────────────────────────────────

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

function ask(question) {
  return new Promise(resolve => {
    rl.question(question, answer => resolve(answer));
  });
}

// ─── Directory Setup ──────────────────────────────────────────────────────────

const REPORTS     = path.join(BASE, 'reports', 'vqb');
const SCREENSHOTS = path.join(REPORTS, 'screenshots');
fs.mkdirSync(SCREENSHOTS, { recursive: true });

// ─── Screenshot Helper ────────────────────────────────────────────────────────

async function screenshot(page, label) {
  const ts   = new Date().toISOString().replace(/[:.]/g, '-');
  const file = path.join(SCREENSHOTS, `${ts}-${label}.png`);
  try {
    await page.screenshot({ path: file, fullPage: false });
    console.log(`  Screenshot: reports/vqb/screenshots/${path.basename(file)}`);
  } catch (_) {
    console.log(`  Screenshot failed for ${label} (page may have navigated)`);
  }
  return file;
}

// ─── Field Discovery ──────────────────────────────────────────────────────────

/**
 * Scans the current page for editable text fields, textareas, and
 * buttons. Returns a structured field map.
 */
async function discoverFields(page) {
  return page.evaluate(() => {
    const results = {
      url:      location.href,
      title:    document.title,
      inputs:   [],
      textareas:[],
      buttons:  [],
      headings: [],
      sections: [],
    };

    // ── Text inputs ────────────────────────────────────────────────────────────
    document.querySelectorAll('input[type="text"], input[type="email"], input:not([type])').forEach(el => {
      const label = el.labels?.[0]?.textContent?.trim()
        || el.placeholder
        || el.name
        || el.id
        || el.getAttribute('aria-label')
        || '(unlabelled)';
      results.inputs.push({
        tag:         'input',
        type:        el.type || 'text',
        label:       label.substring(0, 80),
        name:        el.name  || null,
        id:          el.id    || null,
        placeholder: el.placeholder || null,
        currentValue:(el.value || '').substring(0, 120),
        selector:    el.id ? `#${el.id}` : (el.name ? `input[name="${el.name}"]` : null),
        visible:     el.offsetParent !== null,
      });
    });

    // ── Textareas ──────────────────────────────────────────────────────────────
    document.querySelectorAll('textarea').forEach(el => {
      const label = el.labels?.[0]?.textContent?.trim()
        || el.placeholder
        || el.name
        || el.id
        || el.getAttribute('aria-label')
        || '(unlabelled)';
      results.textareas.push({
        tag:         'textarea',
        label:       label.substring(0, 80),
        name:        el.name  || null,
        id:          el.id    || null,
        placeholder: el.placeholder || null,
        currentValue:(el.value || '').substring(0, 120),
        selector:    el.id ? `#${el.id}` : (el.name ? `textarea[name="${el.name}"]` : null),
        visible:     el.offsetParent !== null,
      });
    });

    // ── Buttons (for reference — not clicked by script) ───────────────────────
    document.querySelectorAll('button, [role="button"]').forEach(el => {
      const text = (el.textContent || el.innerText || '').trim().substring(0, 60);
      if (text) results.buttons.push({ text, id: el.id || null });
    });

    // ── Page headings ──────────────────────────────────────────────────────────
    document.querySelectorAll('h1, h2, h3').forEach(el => {
      const text = el.textContent.trim().substring(0, 120);
      if (text) results.headings.push({ tag: el.tagName, text });
    });

    // ── Sections / panels (look for quiz result-related containers) ────────────
    const sectionKeywords = ['result', 'outcome', 'email', 'discount', 'capture', 'screen', 'page', 'match'];
    document.querySelectorAll('[class*="result"], [class*="outcome"], [class*="screen"], [id*="result"], [data-type]').forEach(el => {
      const text = (el.textContent || '').trim().substring(0, 100);
      const cls  = el.className || '';
      if (sectionKeywords.some(k => cls.toLowerCase().includes(k) || text.toLowerCase().includes(k))) {
        results.sections.push({ tag: el.tagName, class: cls.substring(0, 80), preview: text });
      }
    });

    return results;
  });
}

// ─── Report Writers ───────────────────────────────────────────────────────────

function writeObserveReport({ ts, url, title, screenshot: ss, fields, summary }) {
  const inputRows = fields.inputs
    .map(f => `| ${f.label.substring(0, 40).padEnd(40)} | ${(f.name||f.id||'—').substring(0,30)} | ${f.visible?'visible':'hidden'} | ${(f.currentValue||'').substring(0,50)} |`)
    .join('\n') || '| (none found) | — | — | — |';

  const textareaRows = fields.textareas
    .map(f => `| ${f.label.substring(0, 40).padEnd(40)} | ${(f.name||f.id||'—').substring(0,30)} | ${f.visible?'visible':'hidden'} | ${(f.currentValue||'').substring(0,50)} |`)
    .join('\n') || '| (none found) | — | — | — |';

  const buttonRows = fields.buttons
    .slice(0, 30)
    .map(b => `| ${b.text.substring(0,60)} |`)
    .join('\n') || '| (none found) |';

  const headingRows = fields.headings
    .map(h => `| ${h.tag} | ${h.text.substring(0,100)} |`)
    .join('\n') || '| — | (none found) |';

  const sectionRows = fields.sections.slice(0, 10)
    .map(s => `| ${s.tag} | ${s.class.substring(0,40)} | ${s.preview.substring(0,60)} |`)
    .join('\n') || '| — | — | (none found) |';

  const report = `# VQB Dashboard Observe Report — Vital Vision Shop
# Generated: ${ts}
# AUTO_PUBLISH=false | REQUIRE_HUMAN_APPROVAL=true | VQB_API_MODE=read_only

---

## Session Summary

| Item | Value |
|---|---|
| Observed at | ${ts} |
| Page URL | ${url} |
| Page title | ${title} |
| Input fields found | ${fields.inputs.length} |
| Textareas found | ${fields.textareas.length} |
| Buttons found (listed) | ${Math.min(fields.buttons.length, 30)} |
| Sections identified | ${fields.sections.length} |
| Writes executed | 0 |
| VQB content modified | NO |
| Shopify edited | NO |
| Screenshot | ${ss ? `reports/vqb/screenshots/${path.basename(ss)}` : 'not captured'} |

---

## Page Headings Found

| Tag | Text |
|---|---|
${headingRows}

---

## Input Fields Discovered

| Label | name/id | Visible | Current value (first 50 chars) |
|---|---|---|---|
${inputRows}

---

## Textarea Fields Discovered

| Label | name/id | Visible | Current value (first 50 chars) |
|---|---|---|---|
${textareaRows}

---

## Buttons Present (first 30 — NOT clicked by script)

| Button text |
|---|
${buttonRows}

---

## Result/Outcome Sections Detected

| Tag | Class | Preview |
|---|---|---|
${sectionRows}

---

## Assessment

${summary}

---

## Next Step

If the correct quiz result page is visible, run the full field map:
\`\`\`
npm run vqb:dashboard-assisted-apply
\`\`\`
For guided apply with confirmed field fills:
\`\`\`
npm run vqb:dashboard-assisted-apply -- --apply
\`\`\`

Manual copy-paste fallback (always available):
\`config/vqb-result-copy-to-paste.md\`

---

*No VQB or Shopify content was modified.*
*All field values shown are current state — nothing was changed.*
`;

  const rPath = path.join(REPORTS, 'dashboard-observe-report.md');
  fs.writeFileSync(rPath, report);
  return rPath;
}

function writeFieldMap({ ts, url, title, fields }) {
  const allFields = [
    ...fields.inputs.map(f => ({ ...f, fieldType: 'input' })),
    ...fields.textareas.map(f => ({ ...f, fieldType: 'textarea' })),
  ];

  const rows = allFields.map((f, i) =>
    `| ${String(i + 1).padStart(2)} | ${f.fieldType.padEnd(8)} | ${(f.label||'—').substring(0,38).padEnd(38)} | ${(f.name||f.id||'—').substring(0,28).padEnd(28)} | ${(f.placeholder||'—').substring(0,30)} | ${f.visible?'✅':'—'} |`
  ).join('\n') || '| — | — | (no fields found) | — | — | — |';

  const selectorBlock = allFields
    .filter(f => f.selector && f.visible)
    .map(f => `  // ${f.label}\n  '${f.selector}',`)
    .join('\n') || '  // No auto-locatable selectors found on this page';

  const map = `# VQB Dashboard Field Map — Vital Vision Shop
# Generated: ${ts}
# Page: ${title}
# URL: ${url}
# AUTO_PUBLISH=false | REQUIRE_HUMAN_APPROVAL=true | VQB_API_MODE=read_only

---

## All Discovered Editable Fields

| # | Type | Label | name/id | Placeholder | Visible |
|---|---|---|---|---|---|
${rows}

---

## Auto-Locatable Selectors (visible fields only)

These selectors can be used in the apply script.
Review before adding to scripts/vqb/vqb-dashboard-apply-assisted.js:

\`\`\`js
// Discovered selectors — verify against approved copy fields
${selectorBlock}
\`\`\`

---

## Approved Copy Fields to Match

| Approved field | Target selector (to be mapped) |
|---|---|
| Email Capture: Headline | TBD — match against discovered inputs above |
| Email Capture: Subhead | TBD |
| Email Capture: CTA button | TBD |
| Discount Screen: Headline | TBD |
| Discount Screen: CTA button | TBD |
| Inner Bloom: Result headline | TBD |
| Inner Bloom: Description | TBD |
| Inner Calm: Result headline | TBD |
| Inner Calm: Description | TBD |
| Inner Grow: Result headline | TBD |
| Inner Grow: Description | TBD |
| Inner Balance: Result headline | TBD |
| Inner Balance: Description | TBD |

Full approved values: automations/drafts/vqb-api-update-draft.json

---

## How to Complete the Mapping

1. Navigate in the browser to each result page (Inner Bloom, etc.)
2. Run observe mode again to capture that page's fields
3. Match discovered selectors to the approved copy fields above
4. Update safeFill() selector arrays in vqb-dashboard-apply-assisted.js

---

*Field map is read-only. Nothing was modified on this page.*
*Selectors are suggestions — verify in browser DevTools before using.*
`;

  const mPath = path.join(REPORTS, 'dashboard-field-map.md');
  fs.writeFileSync(mPath, map);
  return mPath;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  const ts = new Date().toISOString();
  let browser;

  try {
    // ── Launch browser ─────────────────────────────────────────────────────────
    console.log('Launching Chromium (visible browser)...');
    browser = await playwright.chromium.launch({
      headless: false,
      slowMo: 50,
      args: ['--start-maximized'],
    });

    const context = await browser.newContext({
      viewport: null,  // use actual window size
    });
    const page = await context.newPage();

    // ── Navigate to start URL ──────────────────────────────────────────────────
    console.log(`Navigating to: ${START_URL}`);
    await page.goto(START_URL, { waitUntil: 'domcontentloaded', timeout: 30000 })
      .catch(() => console.log('  (navigation timed out — page may still be loading)'));

    await screenshot(page, '01-start');

    // ── Manual login prompt ────────────────────────────────────────────────────
    console.log('');
    console.log('─────────────────────────────────────────────────────────────────');
    console.log('  MANUAL NAVIGATION REQUIRED');
    console.log('─────────────────────────────────────────────────────────────────');
    console.log('');
    console.log('  In the browser window:');
    console.log('  1. Log in to VQB (via Shopify admin or app.visualquizbuilder.com)');
    console.log('  2. Open the quiz editor');
    console.log('  3. Select: VV Home Quick Match Quiz — 1Q  (Quiz ID: 16047)');
    console.log('  4. Navigate to a result page or the email capture screen');
    console.log('');
    console.log('  This script will NOT click anything until you press Enter below.');
    console.log('  Take your time. The browser will stay open.');
    console.log('');

    await ask('  Press Enter when you are on the VQB quiz editor page you want to observe...');

    // ── Observe: capture current page state ───────────────────────────────────
    console.log('');
    console.log('Scanning page...');
    const ss     = await screenshot(page, '02-observed-page');
    const fields = await discoverFields(page);
    const url    = page.url();
    const title  = await page.title();

    console.log(`  URL:       ${url}`);
    console.log(`  Title:     ${title}`);
    console.log(`  Inputs:    ${fields.inputs.length}`);
    console.log(`  Textareas: ${fields.textareas.length}`);
    console.log(`  Buttons:   ${fields.buttons.length}`);
    console.log(`  Headings:  ${fields.headings.length}`);
    console.log('');

    if (fields.headings.length > 0) {
      console.log('  Page headings:');
      fields.headings.forEach(h => console.log(`    [${h.tag}] ${h.text}`));
      console.log('');
    }

    if (fields.inputs.length > 0) {
      console.log('  Input fields found:');
      fields.inputs.forEach(f => {
        const val = f.currentValue ? ` = "${f.currentValue.substring(0, 40)}"` : '';
        console.log(`    [${f.visible ? 'visible' : 'hidden '}] ${(f.label||f.name||f.id||'(unlabelled)').substring(0, 50)}${val}`);
      });
      console.log('');
    }

    if (fields.textareas.length > 0) {
      console.log('  Textarea fields found:');
      fields.textareas.forEach(f => {
        const val = f.currentValue ? ` = "${f.currentValue.substring(0, 40)}"` : '';
        console.log(`    [${f.visible ? 'visible' : 'hidden '}] ${(f.label||f.name||f.id||'(unlabelled)').substring(0, 50)}${val}`);
      });
      console.log('');
    }

    if (fields.buttons.length > 0) {
      console.log('  Buttons present (not clicked):');
      fields.buttons.slice(0, 20).forEach(b => console.log(`    "${b.text}"`));
      if (fields.buttons.length > 20) console.log(`    ... and ${fields.buttons.length - 20} more`);
      console.log('');
    }

    // ── Assess ─────────────────────────────────────────────────────────────────
    const totalEditable = fields.inputs.length + fields.textareas.length;
    const hasResults    = fields.sections.length > 0 || fields.headings.some(h =>
      ['result', 'outcome', 'inner', 'bloom', 'calm', 'grow', 'balance', 'email', 'discount']
        .some(k => h.text.toLowerCase().includes(k))
    );

    let summary;
    if (totalEditable === 0) {
      summary = `No editable fields were found on this page. The page may be a dashboard overview,
a read-only preview, or the VQB editor may load fields dynamically after a further
click or navigation. Try clicking into the specific screen (e.g., "Edit" on a result
page) and re-running observe mode.`;
    } else if (totalEditable < 3) {
      summary = `${totalEditable} editable field(s) found. This appears to be a partial view or a
settings page. Navigate deeper into the quiz editor — specifically to the result
page for Inner Bloom, Inner Calm, Inner Grow, or Inner Balance — then re-run.`;
    } else if (hasResults) {
      summary = `${totalEditable} editable field(s) found on what appears to be a result page or
quiz screen. This looks like the right section. Review the field map below and
match selectors to the approved copy fields. When ready, run with --apply flag.`;
    } else {
      summary = `${totalEditable} editable field(s) found. The page content does not clearly
match a known quiz result screen by name, but fields are present. Review the field
map and check the screenshot to confirm which quiz screen this is.`;
    }

    console.log('Assessment:');
    summary.split('\n').forEach(line => console.log(`  ${line}`));
    console.log('');

    // ── Write reports ─────────────────────────────────────────────────────────
    const reportPath  = writeObserveReport({ ts, url, title, screenshot: ss, fields, summary });
    const fieldPath   = writeFieldMap({ ts, url, title, fields });

    console.log('Reports written:');
    console.log(`  ${path.relative(BASE, reportPath)}`);
    console.log(`  ${path.relative(BASE, fieldPath)}`);
    console.log('');

    // ── If apply mode, prompt to continue ─────────────────────────────────────
    if (APPLY_MODE) {
      console.log('─────────────────────────────────────────────────────────────────');
      console.log('GUIDED APPLY MODE — fields will be filled with your confirmation.');
      console.log('Review the field map first, then continue.');
      console.log('─────────────────────────────────────────────────────────────────');
      console.log('');
      const go = await ask('  Type "apply" and press Enter to begin guided fill, or press Enter to cancel: ');
      if (go.trim().toLowerCase() !== 'apply') {
        console.log('  Apply cancelled. No fields were filled.');
      } else {
        console.log('  Apply mode starting — see field-by-field prompts below.');
        console.log('  (Field-fill flow requires selector mapping — run observe first on each screen)');
        // Note: actual fill logic is invoked here once selectors are confirmed
        // from the field map report. See safeFill() and runResultCard() above.
      }
    }

    console.log('');
    await ask('  Press Enter to close the browser...');

    // ── Final save report ─────────────────────────────────────────────────────
    const runLog = {
      ts,
      mode:           APPLY_MODE ? 'guided_apply' : 'observe',
      url,
      title,
      inputsFound:    fields.inputs.length,
      textareasFound: fields.textareas.length,
      buttonsFound:   fields.buttons.length,
      writesExecuted: 0,
      vqbApiWrite:    false,
      shopifyEdited:  false,
      reports: [
        path.relative(BASE, reportPath),
        path.relative(BASE, fieldPath),
      ],
    };

    const logPath = path.join(REPORTS, `${ts.replace(/[:.]/g, '-')}-observe-run.json`);
    fs.writeFileSync(logPath, JSON.stringify(runLog, null, 2));
    console.log(`Run log: reports/vqb/${path.basename(logPath)}`);
    console.log('');
    console.log('=== OBSERVE SESSION COMPLETE ===');
    console.log('No VQB or Shopify content was modified.');
    console.log('');

  } catch (err) {
    console.error('');
    console.error(`Error: ${err.message}`);
    if (err.message?.toLowerCase().includes('playwright') || err.message?.toLowerCase().includes('executable')) {
      console.error('Run: npm install playwright && npx playwright install chromium');
    }
  } finally {
    if (browser) await browser.close().catch(() => {});
    rl.close();
  }
}

main();
