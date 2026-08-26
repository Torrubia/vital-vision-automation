/**
 * print-vqb-fix-pack.js
 * Vital Vision — VQB Terminal Fix Pack Printer
 *
 * Prints all approved copy and the safe JS/CSS to the terminal.
 * Run this with the VQB dashboard open to copy-paste each value directly.
 * Makes zero API calls. Does not open a browser. Does not edit VQB or Shopify.
 *
 * Usage: npm run vqb:print-fix-pack
 */

'use strict';

require('dotenv').config();

const fs   = require('fs');
const path = require('path');

const BASE = path.resolve(__dirname, '../../');

// ─── Safety Gates ─────────────────────────────────────────────────────────────

if (process.env.AUTO_PUBLISH === 'true')            { console.error('BLOCKED: AUTO_PUBLISH=true');           process.exit(1); }
if (process.env.REQUIRE_HUMAN_APPROVAL === 'false') { console.error('BLOCKED: REQUIRE_HUMAN_APPROVAL=false'); process.exit(1); }
if (process.env.VQB_API_MODE !== 'read_only')       { console.error('BLOCKED: VQB_API_MODE must be read_only'); process.exit(1); }

// ─── Helpers ──────────────────────────────────────────────────────────────────

const W = 72;

function divider(char)   { console.log((char || '─').repeat(W)); }
function blank()         { console.log(''); }
function title(text)     { blank(); divider('═'); console.log('  ' + text); divider('═'); blank(); }
function section(text)   { blank(); divider('─'); console.log('  ▸ ' + text); divider('─'); blank(); }
function field(label, value) {
  console.log('  ' + label.padEnd(26) + ': ' + value);
}
function block(label, text) {
  console.log('  ── ' + label + ' ──');
  // Word-wrap at ~65 chars for terminal readability
  const words = text.split(' ');
  let line = '  ';
  words.forEach(w => {
    if ((line + w).length > 68) { console.log(line); line = '  ' + w + ' '; }
    else { line += w + ' '; }
  });
  if (line.trim()) console.log(line);
  blank();
}

// ─── Load Source ──────────────────────────────────────────────────────────────

const payloadPath = path.join(BASE, 'automations', 'drafts', 'vqb-api-update-draft.json');
const cssJsPath   = path.join(BASE, 'config', 'vqb-result-safe-css-js.md');

if (!fs.existsSync(payloadPath)) {
  console.error('MISSING: automations/drafts/vqb-api-update-draft.json');
  console.error('Run npm run vqb:build-update-payload first.');
  process.exit(1);
}
if (!fs.existsSync(cssJsPath)) {
  console.error('MISSING: config/vqb-result-safe-css-js.md');
  process.exit(1);
}

const payload  = JSON.parse(fs.readFileSync(payloadPath, 'utf8'));
const cssJsSrc = fs.readFileSync(cssJsPath, 'utf8');

const { emailCapture, discountScreen, resultCards, globalDisclaimer } = payload;
const { innerBloom, innerCalm, innerGrow, innerBalance } = resultCards;

// Extract JS block from the markdown file (between ```javascript and ```)
const jsMatch = cssJsSrc.match(/```javascript\n([\s\S]*?)\n```/);
const jsBlock = jsMatch ? jsMatch[1] : '(JS block not found in config/vqb-result-safe-css-js.md)';

// ─── Print ─────────────────────────────────────────────────────────────────────

title('VQB TERMINAL FIX PACK v1.0 — Vital Vision Shop');

console.log('  Quiz: VV Home Quick Match Quiz — 1Q (ID: 16047)');
console.log('  Mode: READ-ONLY | No API calls | No browser | No auto-publish');
console.log('  Ref:  reports/vqb/manual-implementation-checklist.md');
blank();
console.log('  HOW TO USE:');
console.log('  1. Keep this terminal visible alongside the VQB dashboard.');
console.log('  2. Navigate to each screen in VQB.');
console.log('  3. Copy each value from the section below and paste into VQB.');
console.log('  4. Click Save (NOT Save & Publish) after each screen.');
console.log('  5. Apply the JS block last (Step 7 in checklist).');
console.log('  6. Run mobile QA before publishing.');

// ── GLOBAL LABELS ──────────────────────────────────────────────────────────────
section('GLOBAL LABELS — apply to all result cards');
field('Match label',          'Your Wellness Match ✨');
field('Section subheading',   'Selected from your quiz answers to support your daily routine.');
field('Product section hdg',  'Your Daily Match');
field('Product section sub',  'Recommended for your routine.');
field('Primary CTA',          'View Product');
field('Secondary CTA',        'Why This Match?');
field('Short disclaimer',     'Educational only. Not medical advice.');
blank();
console.log('  FULL DISCLAIMER (paste on every result card):');
console.log('  ┌' + '─'.repeat(W - 2) + '┐');
globalDisclaimer.split('. ').forEach(s => {
  if (s.trim()) console.log('  │ ' + s.trim() + (s.trim().endsWith('.') ? '' : '.'));
});
console.log('  └' + '─'.repeat(W - 2) + '┘');

// ── SCREEN 1 ──────────────────────────────────────────────────────────────────
section('SCREEN 1 — Email Capture  |  Quiz Settings → Email Gate');
field('Headline',         emailCapture.headline);
field('Subhead',          emailCapture.subhead);
field('Email placeholder',emailCapture.placeholder);
field('CTA button',       emailCapture.ctaButton);
field('Micro-copy',       emailCapture.microCopy);
console.log('  ⚠️  Do NOT change: email provider, redirect URL, toggle on/off.');

// ── SCREEN 2 ──────────────────────────────────────────────────────────────────
section('SCREEN 2 — Discount Code  |  Quiz Settings → Discount Screen');
field('Headline',         discountScreen.headline);
field('Subhead',          discountScreen.subhead);
field('Discount code',    discountScreen.code + '  ← verify active in Shopify — do not change here');
field('Instructions',     discountScreen.instructions);
field('CTA button',       discountScreen.ctaButton);
field('Micro-copy',       discountScreen.microCopy);
console.log('  ⚠️  Do NOT change: discount code value, percentage, CTA link destination.');

// ── SCREEN 3a — Inner Bloom ───────────────────────────────────────────────────
section('SCREEN 3a — Inner Bloom  |  Result Pages → Inner Bloom');
field('Match label',       'Your Wellness Match ✨');
field('Result headline',   innerBloom.headline);
field('Product name',      innerBloom.productName);
field('Qty label',         innerBloom.qtyLabel);
field('Primary CTA',       'View Product');
field('Secondary CTA',     innerBloom.secondaryCta);
field('Short disclaimer',  'Educational only. Not medical advice.');
blank();
block('Description', innerBloom.description);
block('Why This Match — headline', innerBloom.whyThisMatch.headline);
block('Why This Match — body',     innerBloom.whyThisMatch.body);
block('Why This Match — tag',      innerBloom.whyThisMatch.tag);
console.log('  ⚠️  Do NOT change: product link, product ID, quiz answer mapping, price, image.');

// ── SCREEN 3b — Inner Calm ────────────────────────────────────────────────────
section('SCREEN 3b — Inner Calm  |  Result Pages → Inner Calm');
field('Match label',      'Your Wellness Match ✨');
field('Result headline',  innerCalm.headline);
field('Product name',     innerCalm.productName);
field('Qty label',        innerCalm.qtyLabel);
field('Primary CTA',      'View Product');
field('Secondary CTA',    innerCalm.secondaryCta);
field('Short disclaimer', 'Educational only. Not medical advice.');
blank();
block('Description', innerCalm.description);
block('Why This Match — headline', innerCalm.whyThisMatch.headline);
block('Why This Match — body',     innerCalm.whyThisMatch.body);
block('Why This Match — tag',      innerCalm.whyThisMatch.tag);
console.log('  ⚠️  Do NOT change: product link, product ID, quiz answer mapping, price, image.');

// ── SCREEN 3c — Inner Grow ────────────────────────────────────────────────────
section('SCREEN 3c — Inner Grow  |  Result Pages → Inner Grow');
field('Match label',      'Your Wellness Match ✨');
field('Result headline',  innerGrow.headline);
field('Product name',     innerGrow.productName);
field('Qty label',        innerGrow.qtyLabel);
field('Primary CTA',      'View Product');
field('Secondary CTA',    innerGrow.secondaryCta);
field('Short disclaimer', 'Educational only. Not medical advice.');
blank();
block('Description', innerGrow.description);
block('Why This Match — headline', innerGrow.whyThisMatch.headline);
block('Why This Match — body',     innerGrow.whyThisMatch.body);
block('Why This Match — tag',      innerGrow.whyThisMatch.tag);
console.log('  ⚠️  Do NOT change: product link, product ID, quiz answer mapping, price, image.');

// ── SCREEN 3d — Inner Balance ─────────────────────────────────────────────────
section('SCREEN 3d — Inner Balance  |  Result Pages → Inner Balance');
field('Match label',      'Your Wellness Match ✨');
field('Result headline',  innerBalance.headline);
field('Product name',     innerBalance.productName);
field('Qty label',        innerBalance.qtyLabel);
field('Primary CTA',      'View Product');
field('Secondary CTA',    innerBalance.secondaryCta);
field('Short disclaimer', 'Educational only. Not medical advice.');
blank();
block('Description', innerBalance.description);
block('Why This Match — headline', innerBalance.whyThisMatch.headline);
block('Why This Match — body',     innerBalance.whyThisMatch.body);
block('Why This Match — tag',      innerBalance.whyThisMatch.tag);
console.log('  ⚠️  Do NOT change: product link, product ID, quiz answer mapping, price, image.');

// ── STEP 7 — JS Block ─────────────────────────────────────────────────────────
section('STEP 7 — Custom JS  |  VQB Settings → Custom JavaScript');
console.log('  Paste the entire block below into VQB\'s JS console.');
console.log('  Click Save (NOT Save & Publish). Preview to verify styles.');
console.log('  Rollback: delete this script from VQB JS console, click Save.');
blank();
console.log('  ┌── COPY FROM HERE ─' + '─'.repeat(W - 22) + '┐');
jsBlock.split('\n').forEach(l => console.log('  │ ' + l));
console.log('  └── END OF JS BLOCK ' + '─'.repeat(W - 23) + '┘');

// ── FOOTER ────────────────────────────────────────────────────────────────────
title('NEXT STEPS');
console.log('  1. Apply copy fields per screen (Steps 1–6) — Save each screen.');
console.log('  2. Apply JS block (Step 7) — Save.');
console.log('  3. Mobile QA at 375px — all checks in checklist must pass.');
console.log('  4. Human sign-off in reports/vqb/manual-implementation-checklist.md');
console.log('  5. Publish manually in VQB only after sign-off.');
blank();
console.log('  Checklist: reports/vqb/manual-implementation-checklist.md');
console.log('  Summary:   reports/vqb/vqb-terminal-fix-summary.md');
blank();
divider('═');
console.log('  No VQB or Shopify content was modified by this script.');
console.log('  AUTO_PUBLISH=false | REQUIRE_HUMAN_APPROVAL=true | VQB_API_MODE=read_only');
divider('═');
blank();
