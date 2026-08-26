/**
 * validate-vqb-env.js
 * Vital Vision — Visual Quiz Builder API Readiness Check
 *
 * READ-ONLY MODE ONLY.
 * - Will not call any VQB API endpoint.
 * - Will not edit Visual Quiz Builder or Shopify.
 * - Will not publish anything.
 * - Will not print any API key in full.
 * - Exits with code 1 if VQB_API_MODE is not 'read_only'.
 */

'use strict';

require('dotenv').config();

console.log('');
console.log('=== Vital Vision — VQB API Readiness Check ===');
console.log('');

// ─── Safety Gate: Read-Only Mode ─────────────────────────────────────────────

const API_MODE = process.env.VQB_API_MODE;

if (!API_MODE || API_MODE !== 'read_only') {
  console.error('BLOCKED: VQB_API_MODE must be set to "read_only".');
  console.error(`Current value: ${API_MODE ?? '(not set)'}`);
  console.error('Set VQB_API_MODE=read_only in .env and try again.');
  console.error('This script will never run in any other mode.');
  process.exit(1);
}

console.log('Mode:     READ-ONLY (safe — no API calls will be made)');
console.log('');

// ─── Required Variables ───────────────────────────────────────────────────────

const REQUIRED = [
  'VQB_PUBLIC_API_BASE_URL',
  'VQB_PRIVATE_API_KEY',
  'VQB_PUBLIC_API_KEY',
  'VQB_BROWSER_API_KEY',
  'VQB_ORGANIC_QUIZ_ID',
  'VQB_PAID_QUIZ_ID',
  'VQB_API_MODE',
];

// Keys whose values should be masked in output
const KEY_VARS = new Set([
  'VQB_PRIVATE_API_KEY',
  'VQB_PUBLIC_API_KEY',
  'VQB_BROWSER_API_KEY',
]);

function mask(value) {
  if (!value || value.trim() === '') return '(empty)';
  const visible = Math.min(6, value.length);
  return `${value.substring(0, visible)}${'*'.repeat(Math.max(0, value.length - visible))}`;
}

console.log('Checking required VQB environment variables...');
console.log('');

let allPresent = true;

for (const varName of REQUIRED) {
  const value = process.env[varName];

  if (!value || value.trim() === '') {
    console.error(`  MISSING: ${varName} is not set`);
    allPresent = false;
  } else {
    const display = KEY_VARS.has(varName) ? mask(value) : value;
    console.log(`  OK: ${varName} = ${display}`);
  }
}

console.log('');

if (!allPresent) {
  console.error('CHECK FAILED — one or more required variables are missing.');
  console.error('Add the missing values to .env and re-run: npm run vqb:check');
  console.error('');
  console.error('Never commit .env to git. Use .env.example as the template.');
  process.exit(1);
}

// ─── Base URL Format Check ────────────────────────────────────────────────────

const BASE_URL = process.env.VQB_PUBLIC_API_BASE_URL;
const EXPECTED_BASE = 'https://api-production.visualquizbuilder.com/api/public';

if (BASE_URL !== EXPECTED_BASE) {
  console.warn(`  WARN: VQB_PUBLIC_API_BASE_URL does not match expected value.`);
  console.warn(`    Expected: ${EXPECTED_BASE}`);
  console.warn(`    Got:      ${BASE_URL}`);
  console.warn('  Confirm the correct base URL before making any API calls.');
  console.warn('');
} else {
  console.log(`Base URL: confirmed (matches expected production endpoint)`);
  console.log('');
}

// ─── Summary ─────────────────────────────────────────────────────────────────

console.log('=== CHECK PASSED — VQB environment is ready. ===');
console.log('');
console.log('SAFETY REMINDERS:');
console.log('  - No API call was made.');
console.log('  - No quiz was edited.');
console.log('  - No Shopify content was changed.');
console.log('  - No content was published.');
console.log('  - VQB_API_MODE=read_only enforced.');
console.log('');
console.log('Next step: review config/vqb-sync-checklist.md before any API work.');
