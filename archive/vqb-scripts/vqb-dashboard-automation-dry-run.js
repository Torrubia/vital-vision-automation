/**
 * vqb-dashboard-automation-dry-run.js
 * Vital Vision — VQB Dashboard Automation Dry-Run
 *
 * READ-ONLY. No browser. No API calls. No VQB or Shopify edits.
 * Reads approved copy from vqb-api-update-draft.json and outputs a complete
 * field-by-field change plan for the VQB dashboard. Validates all source files
 * exist, counts fields, checks Playwright readiness.
 *
 * Saves reports to:
 *   reports/vqb/dashboard-automation-readiness-report.md
 *   reports/vqb/{timestamp}-dashboard-dry-run.json
 *
 * Usage: npm run vqb:dashboard-dry-run
 */

'use strict';

require('dotenv').config();

const fs   = require('fs');
const path = require('path');

const BASE = path.resolve(__dirname, '../../');

// ─── Safety Gates ─────────────────────────────────────────────────────────────

console.log('');
console.log('=== Vital Vision — VQB Dashboard Automation Dry-Run ===');
console.log('Mode: READ-ONLY — no browser opened, no API calls, no writes');
console.log('');

if (process.env.AUTO_PUBLISH === 'true')            { console.error('BLOCKED: AUTO_PUBLISH=true');           process.exit(1); }
if (process.env.REQUIRE_HUMAN_APPROVAL === 'false') { console.error('BLOCKED: REQUIRE_HUMAN_APPROVAL=false'); process.exit(1); }
if (process.env.VQB_API_MODE !== 'read_only')       { console.error('BLOCKED: VQB_API_MODE must be read_only'); process.exit(1); }

console.log('Safety: AUTO_PUBLISH=false           OK');
console.log('Safety: REQUIRE_HUMAN_APPROVAL=true  OK');
console.log('Safety: VQB_API_MODE=read_only        OK');
console.log('');

// ─── Source Files ─────────────────────────────────────────────────────────────

const SOURCES = {
  payload:   path.join(BASE, 'automations', 'drafts', 'vqb-api-update-draft.json'),
  approval:  path.join(BASE, 'automations', 'approved', '2026-05-05-vqb-update-approval.md'),
  copyPaste: path.join(BASE, 'config', 'vqb-result-copy-to-paste.md'),
};

const missing = Object.entries(SOURCES).filter(([, p]) => !fs.existsSync(p)).map(([k]) => k);
if (missing.length > 0) {
  console.error(`MISSING required files: ${missing.join(', ')}`);
  process.exit(1);
}

const payload = JSON.parse(fs.readFileSync(SOURCES.payload, 'utf8'));
const { emailCapture, discountScreen, resultCards, globalDisclaimer } = payload;
const { innerBloom, innerCalm, innerGrow, innerBalance } = resultCards;

// ─── Playwright & Credential Check ────────────────────────────────────────────

let playwrightAvailable = false;
try { require.resolve('playwright'); playwrightAvailable = true; } catch (_) {}

const dashEmail = process.env.VQB_DASHBOARD_EMAIL    || null;
const dashPass  = process.env.VQB_DASHBOARD_PASSWORD || null;
const dashUrl   = process.env.VQB_DASHBOARD_URL      || 'https://app.visualquizbuilder.com';

const credsConfigured = !!(dashEmail && dashPass);

console.log(`Playwright:    ${playwrightAvailable ? 'INSTALLED ✅' : 'NOT INSTALLED ⚠️'}`);
console.log(`Dashboard URL: ${dashUrl}`);
console.log(`Credentials:   ${credsConfigured ? 'CONFIGURED ✅' : 'NOT SET ⚠️  (VQB_DASHBOARD_EMAIL / VQB_DASHBOARD_PASSWORD)'}`);
console.log('');

// ─── Build Screen Plan ────────────────────────────────────────────────────────

const ts = new Date().toISOString();

const SCREENS = [
  {
    id:       'email-capture',
    label:    'Screen 1 — Email Capture',
    location: 'Quiz Settings → Email Gate / Lead Capture Screen',
    fields: [
      { field: 'Headline',          key: 'headline',    value: emailCapture.headline },
      { field: 'Subhead',           key: 'subhead',     value: emailCapture.subhead },
      { field: 'Email placeholder', key: 'placeholder', value: emailCapture.placeholder },
      { field: 'CTA button',        key: 'ctaButton',   value: emailCapture.ctaButton },
      { field: 'Micro-copy',        key: 'microCopy',   value: emailCapture.microCopy },
    ],
    cautions: [
      'Do not change the email collection toggle (on/off)',
      'Do not change the connected email platform (Klaviyo etc)',
      'Do not modify redirect URL after email capture',
    ],
  },
  {
    id:       'discount-screen',
    label:    'Screen 2 — Discount Code',
    location: 'Quiz Settings → Discount Screen / Coupon Screen',
    fields: [
      { field: 'Headline',     key: 'headline',     value: discountScreen.headline },
      { field: 'Subhead',      key: 'subhead',      value: discountScreen.subhead },
      { field: 'Code',         key: 'code',         value: discountScreen.code },
      { field: 'Instructions', key: 'instructions', value: discountScreen.instructions },
      { field: 'CTA button',   key: 'ctaButton',    value: discountScreen.ctaButton },
      { field: 'Micro-copy',   key: 'microCopy',    value: discountScreen.microCopy },
    ],
    cautions: [
      'Do not change the discount code itself in Shopify (WELCOME10 must already exist)',
      'Do not change the discount percentage',
      'Do not toggle discount on/off',
      'Do not change the CTA link destination',
    ],
  },
  {
    id:       'inner-bloom',
    label:    'Screen 3a — Inner Bloom Result Card + Why This Match',
    location: 'Result Pages → Inner Bloom (quiz answer: Digestion & Gut Wellness)',
    fields: [
      { field: 'Global label',           key: 'globalLabel',  value: resultCards.globalLabel },
      { field: 'Result headline',        key: 'headline',     value: innerBloom.headline },
      { field: 'Product name',           key: 'productName',  value: innerBloom.productName },
      { field: 'Short description',      key: 'description',  value: innerBloom.description },
      { field: 'Quantity label',         key: 'qtyLabel',     value: innerBloom.qtyLabel },
      { field: 'Primary CTA',            key: 'primaryCta',   value: innerBloom.primaryCta },
      { field: 'Secondary CTA',          key: 'secondaryCta', value: innerBloom.secondaryCta },
      { field: 'Disclaimer',             key: 'disclaimer',   value: innerBloom.disclaimer },
      { field: 'Why This Match headline',key: 'wtmHeadline',  value: innerBloom.whyThisMatch.headline },
      { field: 'Why This Match body',    key: 'wtmBody',      value: innerBloom.whyThisMatch.body },
      { field: 'Why This Match tag',     key: 'wtmTag',       value: innerBloom.whyThisMatch.tag },
    ],
    cautions: [
      'Do not change the product link or Shopify product ID',
      'Do not change which quiz answer triggers this result',
      'Do not change the product price or image',
    ],
  },
  {
    id:       'inner-calm',
    label:    'Screen 3b — Inner Calm Result Card + Why This Match',
    location: 'Result Pages → Inner Calm (quiz answer: Stress & Calm)',
    fields: [
      { field: 'Global label',           key: 'globalLabel',  value: resultCards.globalLabel },
      { field: 'Result headline',        key: 'headline',     value: innerCalm.headline },
      { field: 'Product name',           key: 'productName',  value: innerCalm.productName },
      { field: 'Short description',      key: 'description',  value: innerCalm.description },
      { field: 'Quantity label',         key: 'qtyLabel',     value: innerCalm.qtyLabel },
      { field: 'Primary CTA',            key: 'primaryCta',   value: innerCalm.primaryCta },
      { field: 'Secondary CTA',          key: 'secondaryCta', value: innerCalm.secondaryCta },
      { field: 'Disclaimer',             key: 'disclaimer',   value: innerCalm.disclaimer },
      { field: 'Why This Match headline',key: 'wtmHeadline',  value: innerCalm.whyThisMatch.headline },
      { field: 'Why This Match body',    key: 'wtmBody',      value: innerCalm.whyThisMatch.body },
      { field: 'Why This Match tag',     key: 'wtmTag',       value: innerCalm.whyThisMatch.tag },
    ],
    cautions: [
      'Do not change the product link or Shopify product ID',
      'Do not change which quiz answer triggers this result',
      'Do not change the product price or image',
    ],
  },
  {
    id:       'inner-grow',
    label:    'Screen 3c — Inner Grow Result Card + Why This Match',
    location: 'Result Pages → Inner Grow (quiz answer: Hair, Skin & Nails)',
    fields: [
      { field: 'Global label',           key: 'globalLabel',  value: resultCards.globalLabel },
      { field: 'Result headline',        key: 'headline',     value: innerGrow.headline },
      { field: 'Product name',           key: 'productName',  value: innerGrow.productName },
      { field: 'Short description',      key: 'description',  value: innerGrow.description },
      { field: 'Quantity label',         key: 'qtyLabel',     value: innerGrow.qtyLabel },
      { field: 'Primary CTA',            key: 'primaryCta',   value: innerGrow.primaryCta },
      { field: 'Secondary CTA',          key: 'secondaryCta', value: innerGrow.secondaryCta },
      { field: 'Disclaimer',             key: 'disclaimer',   value: innerGrow.disclaimer },
      { field: 'Why This Match headline',key: 'wtmHeadline',  value: innerGrow.whyThisMatch.headline },
      { field: 'Why This Match body',    key: 'wtmBody',      value: innerGrow.whyThisMatch.body },
      { field: 'Why This Match tag',     key: 'wtmTag',       value: innerGrow.whyThisMatch.tag },
    ],
    cautions: [
      'Do not change the product link or Shopify product ID',
      'Do not change which quiz answer triggers this result',
      'Do not change the product price or image',
    ],
  },
  {
    id:       'inner-balance',
    label:    'Screen 3d — Inner Balance Result Card + Why This Match',
    location: 'Result Pages → Inner Balance (quiz answer: Overall Daily Wellness)',
    fields: [
      { field: 'Global label',           key: 'globalLabel',  value: resultCards.globalLabel },
      { field: 'Result headline',        key: 'headline',     value: innerBalance.headline },
      { field: 'Product name',           key: 'productName',  value: innerBalance.productName },
      { field: 'Short description',      key: 'description',  value: innerBalance.description },
      { field: 'Quantity label',         key: 'qtyLabel',     value: innerBalance.qtyLabel },
      { field: 'Primary CTA',            key: 'primaryCta',   value: innerBalance.primaryCta },
      { field: 'Secondary CTA',          key: 'secondaryCta', value: innerBalance.secondaryCta },
      { field: 'Disclaimer',             key: 'disclaimer',   value: innerBalance.disclaimer },
      { field: 'Why This Match headline',key: 'wtmHeadline',  value: innerBalance.whyThisMatch.headline },
      { field: 'Why This Match body',    key: 'wtmBody',      value: innerBalance.whyThisMatch.body },
      { field: 'Why This Match tag',     key: 'wtmTag',       value: innerBalance.whyThisMatch.tag },
    ],
    cautions: [
      'Do not change the product link or Shopify product ID',
      'Do not change which quiz answer triggers this result',
      'Do not change the product price or image',
    ],
  },
];

const totalFields = SCREENS.reduce((s, sc) => s + sc.fields.length, 0);
const totalChars  = SCREENS.reduce((s, sc) =>
  s + sc.fields.reduce((ss, f) => ss + f.value.length, 0), 0);

// ─── Console Output ───────────────────────────────────────────────────────────

console.log('─────────────────────────────────────────────────────────────────────');
console.log(`DRY-RUN FIELD MAP — ${SCREENS.length} screens, ${totalFields} fields, ~${totalChars} chars`);
console.log('─────────────────────────────────────────────────────────────────────');
console.log('');

SCREENS.forEach((sc, i) => {
  console.log(`${sc.label}`);
  console.log(`  Location: ${sc.location}`);
  sc.fields.forEach(f => {
    const preview = f.value.length > 60 ? f.value.substring(0, 57) + '...' : f.value;
    console.log(`  [PENDING] ${f.field.padEnd(22)}: ${preview}`);
  });
  console.log(`  Cautions (${sc.cautions.length}):`);
  sc.cautions.forEach(c => console.log(`    ⚠️  ${c}`));
  if (i < SCREENS.length - 1) console.log('');
});

console.log('');
console.log('─────────────────────────────────────────────────────────────────────');
console.log(`Total: ${SCREENS.length} screens | ${totalFields} fields | 0 writes executed`);
console.log('─────────────────────────────────────────────────────────────────────');
console.log('');

// ─── Build Readiness Report ────────────────────────────────────────────────────

const readinessGates = [
  { gate: 'Approved copy payload exists',      status: 'READY ✅', ref: 'automations/drafts/vqb-api-update-draft.json' },
  { gate: 'Human approval file exists',        status: 'READY ✅', ref: 'automations/approved/2026-05-05-vqb-update-approval.md' },
  { gate: 'Copy-paste reference exists',       status: 'READY ✅', ref: 'config/vqb-result-copy-to-paste.md' },
  { gate: 'Playwright installed',              status: playwrightAvailable ? 'READY ✅' : 'NOT MET ⚠️  — run: npm install playwright && npx playwright install chromium', ref: 'package.json' },
  { gate: 'VQB_DASHBOARD_EMAIL set',           status: dashEmail  ? 'READY ✅' : 'NOT MET ⚠️  — add to .env', ref: '.env' },
  { gate: 'VQB_DASHBOARD_PASSWORD set',        status: dashPass   ? 'READY ✅' : 'NOT MET ⚠️  — add to .env', ref: '.env' },
  { gate: 'VQB_DASHBOARD_URL set',             status: process.env.VQB_DASHBOARD_URL ? 'READY ✅' : 'DEFAULT (https://app.visualquizbuilder.com)', ref: '.env' },
  { gate: 'VQB_API_MODE=read_only',            status: 'CONFIRMED ✅', ref: '.env' },
  { gate: 'AUTO_PUBLISH=false',                status: 'CONFIRMED ✅', ref: '.env' },
  { gate: 'REQUIRE_HUMAN_APPROVAL=true',       status: 'CONFIRMED ✅', ref: '.env' },
];

const readyCount = readinessGates.filter(g => g.status.includes('✅')).length;

const screenRows = SCREENS.map(sc =>
  `| ${sc.label} | ${sc.fields.length} | ${sc.location} |`
).join('\n');

const fieldRows = SCREENS.map(sc =>
  sc.fields.map(f =>
    `| ${sc.label} | ${f.field} | ${f.value.substring(0, 60).replace(/\|/g, '\\|')}${f.value.length > 60 ? '...' : ''} |`
  ).join('\n')
).join('\n');

const gateRows = readinessGates.map(g =>
  `| ${g.gate} | ${g.status} |`
).join('\n');

const readinessReport = `# VQB Dashboard Automation Readiness Report — Vital Vision Shop
# Generated: ${ts}
# AUTO_PUBLISH=false | REQUIRE_HUMAN_APPROVAL=true | VQB_API_MODE=read_only

---

## Summary

| Item | Value |
|---|---|
| Generated | ${ts} |
| Mode | DRY-RUN (no browser, no API calls) |
| Screens covered | ${SCREENS.length} |
| Fields to update | ${totalFields} |
| Characters to update | ~${totalChars} |
| Writes executed | 0 |
| VQB content modified | NO |
| Shopify edited | NO |
| Readiness gates passed | ${readyCount} / ${readinessGates.length} |

---

## Readiness Gates

| Gate | Status |
|---|---|
${gateRows}

---

## Screen Map

| Screen | Fields | VQB Location |
|---|---|---|
${screenRows}

---

## Complete Field Map (Proposed Values)

| Screen | Field | Proposed Value |
|---|---|---|
${fieldRows}

---

## Global Disclaimer (all result cards)

${globalDisclaimer}

---

## Automation Mode Available

| Mode | Command | Requires |
|---|---|---|
| Dry-run (no browser) | npm run vqb:dashboard-dry-run | Nothing — works now |
| Guided browser apply | npm run vqb:dashboard-assisted-apply | Playwright + dashboard credentials |
| Manual copy-paste | config/vqb-result-copy-to-paste.md | VQB dashboard login only |

---

## Setup Checklist (for guided browser apply)

\`\`\`bash
npm install playwright
npx playwright install chromium
\`\`\`

Add to .env (not committed):
\`\`\`
VQB_DASHBOARD_EMAIL=your@email.com
VQB_DASHBOARD_PASSWORD=yourpassword
VQB_DASHBOARD_URL=https://app.visualquizbuilder.com
\`\`\`

Then run:
\`\`\`bash
npm run vqb:dashboard-assisted-apply
\`\`\`

---

*No VQB or Shopify content was modified by this script.*
*Human approval required before any save or publish action.*
`;

// ─── Save Reports ─────────────────────────────────────────────────────────────

const REPORTS = path.join(BASE, 'reports', 'vqb');
fs.mkdirSync(REPORTS, { recursive: true });

const readinessPath = path.join(REPORTS, 'dashboard-automation-readiness-report.md');
const jsonPath      = path.join(REPORTS, `${ts.replace(/[:.]/g, '-')}-dashboard-dry-run.json`);

fs.writeFileSync(readinessPath, readinessReport);
fs.writeFileSync(jsonPath, JSON.stringify({
  generatedAt: ts,
  mode: 'dry_run',
  writesExecuted: 0,
  screensCount: SCREENS.length,
  totalFields,
  totalChars,
  playwrightAvailable,
  credsConfigured,
  screens: SCREENS.map(sc => ({
    id: sc.id,
    label: sc.label,
    location: sc.location,
    fieldCount: sc.fields.length,
    fields: sc.fields.map(f => ({ field: f.field, key: f.key, charCount: f.value.length })),
    cautions: sc.cautions,
  })),
  _safety: {
    autoPublish: false,
    requireHumanApproval: true,
    vqbApiMode: 'read_only',
    noVqbContentModified: true,
    noShopifyEdited: true,
  },
}, null, 2));

console.log('Reports saved:');
console.log(`  reports/vqb/dashboard-automation-readiness-report.md`);
console.log(`  reports/vqb/${path.basename(jsonPath)}`);
console.log('');
console.log('=== DRY-RUN COMPLETE ===');
console.log('');
console.log(`Readiness: ${readyCount}/${readinessGates.length} gates passed`);
console.log('');

if (!playwrightAvailable || !credsConfigured) {
  console.log('Before running vqb:dashboard-assisted-apply, complete setup:');
  if (!playwrightAvailable) {
    console.log('  npm install playwright');
    console.log('  npx playwright install chromium');
  }
  if (!credsConfigured) {
    console.log('  Add VQB_DASHBOARD_EMAIL and VQB_DASHBOARD_PASSWORD to .env');
  }
  console.log('');
  console.log('Fallback available NOW: config/vqb-result-copy-to-paste.md');
} else {
  console.log('All setup complete. When ready to apply:');
  console.log('  npm run vqb:dashboard-assisted-apply');
  console.log('  (runs in dry-run/observe mode by default — add --apply for guided write)');
}
console.log('');
console.log('No VQB or Shopify content was modified.');
