/**
 * generate-dashboard-plan.js
 * Vital Vision — VQB Dashboard Automation Plan Generator
 *
 * READ-ONLY. Reads approved copy from automations/drafts/vqb-api-update-draft.json
 * and writes the dashboard automation plan to scripts/vqb/dashboard-automation-plan.md.
 * Makes zero API calls. Does not open a browser. Does not edit VQB or Shopify.
 *
 * Usage: npm run vqb:dashboard-plan
 */

'use strict';

require('dotenv').config();

const fs   = require('fs');
const path = require('path');

const BASE = path.resolve(__dirname, '../../');

// ─── Safety Gates ─────────────────────────────────────────────────────────────

console.log('');
console.log('=== Vital Vision — VQB Dashboard Automation Plan ===');
console.log('Mode: READ-ONLY — no browser, no API calls, no writes');
console.log('');

if (process.env.AUTO_PUBLISH === 'true')            { console.error('BLOCKED: AUTO_PUBLISH=true');           process.exit(1); }
if (process.env.REQUIRE_HUMAN_APPROVAL === 'false') { console.error('BLOCKED: REQUIRE_HUMAN_APPROVAL=false'); process.exit(1); }
if (process.env.VQB_API_MODE !== 'read_only')       { console.error('BLOCKED: VQB_API_MODE must be read_only'); process.exit(1); }

console.log('Safety: AUTO_PUBLISH=false           OK');
console.log('Safety: REQUIRE_HUMAN_APPROVAL=true  OK');
console.log('Safety: VQB_API_MODE=read_only        OK');
console.log('');

// ─── Load Source Files ────────────────────────────────────────────────────────

const SOURCES = {
  payload:      path.join(BASE, 'automations', 'drafts', 'vqb-api-update-draft.json'),
  updatePacket: path.join(BASE, 'automations', 'drafts', 'vqb-safe-update-packet.md'),
  copyPaste:    path.join(BASE, 'config', 'vqb-result-copy-to-paste.md'),
  liveImpl:     path.join(BASE, 'config', 'vqb-live-implementation-copy.md'),
  checklist:    path.join(BASE, 'reports', 'vqb', 'manual-vqb-edit-checklist.md'),
  approval:     path.join(BASE, 'automations', 'approved', '2026-05-05-vqb-update-approval.md'),
};

const missing = Object.entries(SOURCES).filter(([, p]) => !fs.existsSync(p)).map(([k]) => k);
if (missing.length > 0) {
  console.error(`MISSING source files: ${missing.join(', ')}`);
  process.exit(1);
}

console.log('Source files:');
Object.entries(SOURCES).forEach(([k, p]) => console.log(`  ${k.padEnd(14)}: ${path.relative(BASE, p)}`));
console.log('');

const payload = JSON.parse(fs.readFileSync(SOURCES.payload, 'utf8'));
const { emailCapture, discountScreen, resultCards } = payload;
const { innerBloom, innerCalm, innerGrow, innerBalance } = resultCards;

// ─── Count Fields ─────────────────────────────────────────────────────────────

const countFields = obj => Object.values(obj).filter(v => typeof v === 'string').length;
const countChars  = obj => Object.values(obj).filter(v => typeof v === 'string').reduce((s, v) => s + v.length, 0);

const screens = [
  { name: 'Email Capture',              fields: emailCapture },
  { name: 'Discount Code',              fields: discountScreen },
  { name: 'Inner Bloom Result Card',    fields: { ...innerBloom, whyBody: innerBloom.whyThisMatch.body, whyTag: innerBloom.whyThisMatch.tag } },
  { name: 'Inner Calm Result Card',     fields: { ...innerCalm,  whyBody: innerCalm.whyThisMatch.body,  whyTag: innerCalm.whyThisMatch.tag } },
  { name: 'Inner Grow Result Card',     fields: { ...innerGrow,  whyBody: innerGrow.whyThisMatch.body,  whyTag: innerGrow.whyThisMatch.tag } },
  { name: 'Inner Balance Result Card',  fields: { ...innerBalance, whyBody: innerBalance.whyThisMatch.body, whyTag: innerBalance.whyThisMatch.tag } },
];

const totalFields = screens.reduce((s, sc) => s + countFields(sc.fields), 0);
const totalChars  = screens.reduce((s, sc) => s + countChars(sc.fields), 0);

console.log(`Screens: ${screens.length}`);
console.log(`Fields:  ${totalFields}`);
console.log(`Chars:   ${totalChars}`);
console.log('');

// ─── Check Playwright Availability ───────────────────────────────────────────

let playwrightAvailable = false;
try {
  require.resolve('playwright');
  playwrightAvailable = true;
} catch (_) {
  playwrightAvailable = false;
}

const dashEmail = process.env.VQB_DASHBOARD_EMAIL    || '(not set)';
const dashPass  = process.env.VQB_DASHBOARD_PASSWORD || '(not set)';
const dashUrl   = process.env.VQB_DASHBOARD_URL      || 'https://app.visualquizbuilder.com';

const credStatus = (dashEmail !== '(not set)' && dashPass !== '(not set)')
  ? 'CONFIGURED ✅'
  : 'NOT SET — add VQB_DASHBOARD_EMAIL and VQB_DASHBOARD_PASSWORD to .env';

const pwStatus = playwrightAvailable ? 'INSTALLED ✅' : 'NOT INSTALLED — run: npm install playwright && npx playwright install chromium';

// ─── Write Plan ───────────────────────────────────────────────────────────────

const ts = new Date().toISOString();

const plan = `# VQB Dashboard Automation Plan — Vital Vision Shop
# Generated: ${ts}
# AUTO_PUBLISH=false | REQUIRE_HUMAN_APPROVAL=true | VQB_API_MODE=read_only

---

## Overview

This plan describes the browser-assisted VQB dashboard automation workflow.
No direct VQB API writes are used. All changes go through the VQB admin UI.
Human approval is required before any save/publish action.

---

## Strategy: Browser-Assisted UI Automation

| Approach | Status |
|---|---|
| Direct VQB API write | BLOCKED — "domain not allowed" / Integration setting issue |
| Browser-assisted dashboard automation | ADOPTED — Playwright guided flow |
| Manual copy-paste (fallback) | ALWAYS AVAILABLE — config/vqb-result-copy-to-paste.md |

---

## Readiness Status

| Item | Status |
|---|---|
| Approved copy (payload JSON) | READY ✅ |
| Human approval file | READY ✅ |
| Playwright installed | ${pwStatus} |
| Dashboard credentials | ${credStatus} |
| Dashboard URL | ${dashUrl} |

---

## Scope — ${screens.length} Screens, ${totalFields} Fields

| # | Screen | Fields | VQB Location |
|---|---|---|---|
| 1 | Email Capture | ${countFields(emailCapture)} | Quiz Settings → Email Gate |
| 2 | Discount Code | ${countFields(discountScreen)} | Quiz Settings → Discount Screen |
| 3 | Inner Bloom Result Card + Why | ${countFields({ ...innerBloom, whyBody: innerBloom.whyThisMatch.body })} | Result Pages → Inner Bloom |
| 4 | Inner Calm Result Card + Why | ${countFields({ ...innerCalm, whyBody: innerCalm.whyThisMatch.body })} | Result Pages → Inner Calm |
| 5 | Inner Grow Result Card + Why | ${countFields({ ...innerGrow, whyBody: innerGrow.whyThisMatch.body })} | Result Pages → Inner Grow |
| 6 | Inner Balance Result Card + Why | ${countFields({ ...innerBalance, whyBody: innerBalance.whyThisMatch.body })} | Result Pages → Inner Balance |

Total characters to update: ~${totalChars}

---

## Automation Mode: GUIDED (human-in-the-loop)

The apply script (vqb:dashboard-assisted-apply) operates in two modes:

### Mode A — Dry-Run (default, safe)
- Opens VQB dashboard in a visible browser
- Navigates to each screen
- Takes a screenshot of current state
- Logs all fields it can/cannot locate
- Does NOT fill any field
- Does NOT click Save, Publish, or Generate Key

### Mode B — Guided Apply (explicit flag: --apply)
- Opens VQB dashboard in a visible browser
- For each field, prints proposed value and asks: "Apply this field? [y/N]"
- Only fills fields with explicit y confirmation
- Pauses before any Save button click
- Requires explicit y to proceed with save
- Never auto-publishes

---

## Absolute Blocks (enforced in code)

- No auto-click of Save without human confirmation
- No click of Publish / Go Live / Activate
- No click of Generate Key / Reset API Key
- No edit of pricing, products, or discount codes in Shopify
- No changes to quiz routing logic or branching
- No deletion of any quiz, result page, or screen
- No printing of API keys or passwords

---

## Screen-by-Screen Plan

### Screen 1 — Email Capture

VQB location: Quiz Settings → Email Gate / Lead Capture Screen

| Field | Proposed Value |
|---|---|
| Headline | ${emailCapture.headline} |
| Subhead | ${emailCapture.subhead} |
| Email placeholder | ${emailCapture.placeholder} |
| CTA button | ${emailCapture.ctaButton} |
| Micro-copy | ${emailCapture.microCopy} |

---

### Screen 2 — Discount Code

VQB location: Quiz Settings → Discount Screen

| Field | Proposed Value |
|---|---|
| Headline | ${discountScreen.headline} |
| Subhead | ${discountScreen.subhead} |
| Code | ${discountScreen.code} |
| Instructions | ${discountScreen.instructions} |
| CTA button | ${discountScreen.ctaButton} |
| Micro-copy | ${discountScreen.microCopy} |

---

### Screen 3 — Inner Bloom Result Card

VQB location: Result Pages → Inner Bloom

| Field | Proposed Value |
|---|---|
| Global label | ${resultCards.globalLabel} |
| Result headline | ${innerBloom.headline} |
| Product name | ${innerBloom.productName} |
| Description | ${innerBloom.description} |
| Qty label | ${innerBloom.qtyLabel} |
| Primary CTA | ${innerBloom.primaryCta} |
| Secondary CTA | ${innerBloom.secondaryCta} |
| Disclaimer | ${innerBloom.disclaimer} |
| Why This Match headline | ${innerBloom.whyThisMatch.headline} |
| Why This Match body | ${innerBloom.whyThisMatch.body.substring(0, 80)}... |
| Compliance tag | ${innerBloom.whyThisMatch.tag} |

---

### Screen 4 — Inner Calm Result Card

VQB location: Result Pages → Inner Calm

| Field | Proposed Value |
|---|---|
| Global label | ${resultCards.globalLabel} |
| Result headline | ${innerCalm.headline} |
| Product name | ${innerCalm.productName} |
| Description | ${innerCalm.description} |
| Qty label | ${innerCalm.qtyLabel} |
| Primary CTA | ${innerCalm.primaryCta} |
| Secondary CTA | ${innerCalm.secondaryCta} |
| Disclaimer | ${innerCalm.disclaimer} |
| Why This Match headline | ${innerCalm.whyThisMatch.headline} |
| Why This Match body | ${innerCalm.whyThisMatch.body.substring(0, 80)}... |
| Compliance tag | ${innerCalm.whyThisMatch.tag} |

---

### Screen 5 — Inner Grow Result Card

VQB location: Result Pages → Inner Grow

| Field | Proposed Value |
|---|---|
| Global label | ${resultCards.globalLabel} |
| Result headline | ${innerGrow.headline} |
| Product name | ${innerGrow.productName} |
| Description | ${innerGrow.description} |
| Qty label | ${innerGrow.qtyLabel} |
| Primary CTA | ${innerGrow.primaryCta} |
| Secondary CTA | ${innerGrow.secondaryCta} |
| Disclaimer | ${innerGrow.disclaimer} |
| Why This Match headline | ${innerGrow.whyThisMatch.headline} |
| Why This Match body | ${innerGrow.whyThisMatch.body.substring(0, 80)}... |
| Compliance tag | ${innerGrow.whyThisMatch.tag} |

---

### Screen 6 — Inner Balance Result Card

VQB location: Result Pages → Inner Balance

| Field | Proposed Value |
|---|---|
| Global label | ${resultCards.globalLabel} |
| Result headline | ${innerBalance.headline} |
| Product name | ${innerBalance.productName} |
| Description | ${innerBalance.description} |
| Qty label | ${innerBalance.qtyLabel} |
| Primary CTA | ${innerBalance.primaryCta} |
| Secondary CTA | ${innerBalance.secondaryCta} |
| Disclaimer | ${innerBalance.disclaimer} |
| Why This Match headline | ${innerBalance.whyThisMatch.headline} |
| Why This Match body | ${innerBalance.whyThisMatch.body.substring(0, 80)}... |
| Compliance tag | ${innerBalance.whyThisMatch.tag} |

---

## Setup Required Before Apply

\`\`\`bash
# 1. Install Playwright (if not already installed)
npm install playwright
npx playwright install chromium

# 2. Add to .env (do not commit):
# VQB_DASHBOARD_EMAIL=your-vqb-login-email
# VQB_DASHBOARD_PASSWORD=your-vqb-login-password
# VQB_DASHBOARD_URL=https://app.visualquizbuilder.com

# 3. Run dry-run first
npm run vqb:dashboard-dry-run

# 4. Review readiness report
# reports/vqb/dashboard-automation-readiness-report.md

# 5. Run guided apply (only when ready)
npm run vqb:dashboard-assisted-apply -- --apply
\`\`\`

---

## Command Reference

| Command | Script | Safe to run now? |
|---|---|---|
| npm run vqb:dashboard-plan | generate-dashboard-plan.js | YES — no browser, no API |
| npm run vqb:dashboard-dry-run | vqb-dashboard-automation-dry-run.js | YES — no browser, no API |
| npm run vqb:dashboard-assisted-apply | vqb-dashboard-apply-assisted.js | YES in dry-run mode / requires setup for --apply |

---

## Fallback: Manual Copy-Paste

If browser automation is not possible or reliable, use the guided manual approach:
- config/vqb-result-copy-to-paste.md — one field per line, ready to paste
- config/vqb-live-implementation-copy.md — step-by-step dashboard instructions
- reports/vqb/manual-vqb-edit-checklist.md — completion checklist

This fallback requires no extra setup and is always available.

---

*READ-ONLY PLAN. No VQB or Shopify content has been modified.*
*Human approval required before any dashboard save or publish.*
`;

const planPath = path.join(BASE, 'scripts', 'vqb', 'dashboard-automation-plan.md');
fs.writeFileSync(planPath, plan);

console.log(`Plan written: scripts/vqb/dashboard-automation-plan.md`);
console.log('');
console.log('=== PLAN COMPLETE ===');
console.log('');
console.log(`Playwright: ${playwrightAvailable ? 'installed' : 'NOT installed'}`);
console.log(`Dashboard credentials: ${dashEmail !== '(not set)' ? 'configured' : 'NOT set'}`);
console.log('');
if (!playwrightAvailable) {
  console.log('To install Playwright:');
  console.log('  npm install playwright');
  console.log('  npx playwright install chromium');
  console.log('');
}
if (dashEmail === '(not set)') {
  console.log('To configure dashboard credentials, add to .env:');
  console.log('  VQB_DASHBOARD_EMAIL=your@email.com');
  console.log('  VQB_DASHBOARD_PASSWORD=yourpassword');
  console.log('  VQB_DASHBOARD_URL=https://app.visualquizbuilder.com');
  console.log('');
}
console.log('Next step: npm run vqb:dashboard-dry-run');
console.log('');
console.log('No VQB or Shopify content was modified.');
