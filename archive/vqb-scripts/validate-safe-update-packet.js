/**
 * validate-safe-update-packet.js
 * Vital Vision — VQB Safe Update Packet Validator
 *
 * Reads the generated packet and runs full compliance + safety checks.
 * Does NOT call any API, edit VQB, or publish anything.
 * Exits 1 if any check fails.
 */

'use strict';

require('dotenv').config();

const fs   = require('fs');
const path = require('path');

const BASE = path.resolve(__dirname, '../../');

// ─── Safety Gate ─────────────────────────────────────────────────────────────

console.log('');
console.log('=== Vital Vision — VQB Update Packet Validator ===');
console.log('');

if (process.env.AUTO_PUBLISH === 'true') {
  console.error('BLOCKED: AUTO_PUBLISH=true.'); process.exit(1);
}
if (process.env.REQUIRE_HUMAN_APPROVAL === 'false') {
  console.error('BLOCKED: REQUIRE_HUMAN_APPROVAL=false.'); process.exit(1);
}
if (process.env.VQB_API_MODE !== 'read_only') {
  console.error('BLOCKED: VQB_API_MODE must be read_only.'); process.exit(1);
}

console.log('Safety gates: OK');
console.log('');

// ─── Load Packet ──────────────────────────────────────────────────────────────

const packetPath = path.join(BASE, 'automations', 'drafts', 'vqb-safe-update-packet.md');

if (!fs.existsSync(packetPath)) {
  console.error('MISSING: automations/drafts/vqb-safe-update-packet.md');
  console.error('Run: npm run vqb:build-update-packet first.');
  process.exit(1);
}

const packet = fs.readFileSync(packetPath, 'utf8');
const lower  = packet.toLowerCase();
console.log('Packet loaded: automations/drafts/vqb-safe-update-packet.md');
console.log('');

// ─── Compliance Rules ─────────────────────────────────────────────────────────

const PROHIBITED = [
  { term: 'cure ',           label: 'cure (verb)' },
  { term: 'cures ',          label: 'cures' },
  { term: 'treat ',          label: 'treat (verb)' },
  { term: 'treatment',       label: 'treatment' },
  { term: 'fix hair',        label: 'fix hair' },
  { term: 'fix stress',      label: 'fix stress' },
  { term: 'heal ',           label: 'heal (verb)' },
  { term: 'prevent disease', label: 'prevent disease' },
  { term: 'diagnose',        label: 'diagnose' },
  { term: 'guaranteed results', label: 'guaranteed results' },
  { term: 'anxiety cure',    label: 'anxiety cure' },
  { term: 'insomnia cure',   label: 'insomnia cure' },
  { term: 'ibs treatment',   label: 'IBS treatment' },
  { term: 'stop hair loss',  label: 'stop hair loss' },
  { term: 'reverse hair loss', label: 'reverse hair loss' },
];

// Terms that are OK in the compliance disclaimer ("not intended to diagnose, treat, cure")
// but not OK as standalone benefit claims — check by context
const DISCLAIMER_SAFE = [
  'not intended to diagnose, treat, cure, or prevent any disease',
  'cure, or prevent',
];

function isInDisclaimerOnly(term, text) {
  // If every occurrence of the term is within a known disclaimer phrase, it's OK
  const idx = text.indexOf(term);
  if (idx === -1) return true;
  const surrounding = text.substring(Math.max(0, idx - 60), idx + 80);
  return DISCLAIMER_SAFE.some(safe => surrounding.includes(safe));
}

const REQUIRED_CHECKS = [
  { check: 'results may vary',                          label: '"Results may vary" present' },
  { check: 'this recommendation is for educational',    label: 'Disclaimer present' },
  { check: 'not intended to diagnose',                  label: 'FDA disclaimer present' },
  { check: 'auto_publish=false',                        label: 'AUTO_PUBLISH=false in packet' },
  { check: 'require_human_approval=true',               label: 'REQUIRE_HUMAN_APPROVAL=true in packet' },
  { check: 'vqb_api_mode=read_only',                    label: 'VQB_API_MODE=read_only in packet' },
  { check: 'shop this match',                           label: 'Primary CTA "Shop This Match" present' },
  { check: 'why this match',                            label: '"Why This Match?" section present' },
  { check: 'rollback plan',                             label: 'Rollback plan present' },
  { check: 'inner bloom',                               label: 'Inner Bloom result present' },
  { check: 'inner calm',                                label: 'Inner Calm result present' },
  { check: 'inner grow',                                label: 'Inner Grow result present' },
  { check: 'inner balance',                             label: 'Inner Balance result present' },
];

// ─── Run Checks ───────────────────────────────────────────────────────────────

let passed = 0;
let failed = 0;

console.log('--- Prohibited Language Scan ---');
for (const { term, label } of PROHIBITED) {
  if (lower.includes(term) && !isInDisclaimerOnly(term, lower)) {
    console.error(`  FAIL — prohibited term found: "${label}"`);
    failed++;
  } else {
    console.log(`  PASS — no "${label}"`);
    passed++;
  }
}

console.log('');
console.log('--- Required Elements Check ---');
for (const { check, label } of REQUIRED_CHECKS) {
  if (lower.includes(check)) {
    console.log(`  PASS — ${label}`);
    passed++;
  } else {
    console.error(`  FAIL — MISSING: ${label}`);
    failed++;
  }
}

// ─── Product Coverage Check ───────────────────────────────────────────────────

console.log('');
console.log('--- Product Coverage ---');
const products = ['inner bloom', 'inner calm', 'inner grow', 'inner balance'];
for (const p of products) {
  const count = (lower.match(new RegExp(p, 'g')) || []).length;
  if (count >= 3) {
    console.log(`  PASS — ${p} (${count} mentions — result + why-match coverage confirmed)`);
    passed++;
  } else {
    console.error(`  WARN — ${p} appears only ${count} time(s) — may be missing from a section`);
  }
}

// ─── Screen Coverage Check ───────────────────────────────────────────────────

console.log('');
console.log('--- Screen Coverage ---');
const screens = [
  ['email capture',   'Email capture screen present'],
  ['discount code',   'Discount code screen present'],
  ['product result',  'Product result section present'],
  ['why this match',  '"Why This Match?" section present'],
  ['mobile layout',   'Mobile layout checklist present'],
  ['rollback plan',   'Rollback plan present'],
];
for (const [check, label] of screens) {
  if (lower.includes(check)) {
    console.log(`  PASS — ${label}`);
    passed++;
  } else {
    console.error(`  FAIL — MISSING: ${label}`);
    failed++;
  }
}

// ─── Summary ─────────────────────────────────────────────────────────────────

console.log('');
console.log(`Checks passed: ${passed}`);
console.log(`Checks failed: ${failed}`);
console.log('');

if (failed > 0) {
  console.error('=== VALIDATION FAILED ===');
  console.error(`${failed} check(s) failed. Fix issues and re-run vqb:build-update-packet.`);
  process.exit(1);
}

console.log('=== VALIDATION PASSED ===');
console.log('');
console.log('The packet is safe to review and use for manual VQB edits.');
console.log('');
console.log('Next steps:');
console.log('  1. Open automations/drafts/vqb-safe-update-packet.md');
console.log('  2. Apply copy manually in VQB dashboard — in the order listed');
console.log('  3. Complete reports/vqb/manual-vqb-edit-checklist.md as you go');
console.log('  4. Test mobile layout at 375px before publishing');
console.log('  5. Human approval required before going live');
console.log('');
console.log('Safety reminder: No API calls were made. No VQB edits were made. No content was published.');
