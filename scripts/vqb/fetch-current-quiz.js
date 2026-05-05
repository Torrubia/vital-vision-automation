/**
 * fetch-current-quiz.js
 * Vital Vision — VQB Current Quiz Fetcher
 *
 * READ-ONLY. Fetches current quiz data from VQB API and saves to reports/vqb/.
 * Makes zero write calls. Does not edit VQB, Shopify, or any live content.
 * Exits 1 if safety gates fail.
 */

'use strict';

require('dotenv').config();

const fs   = require('fs');
const path = require('path');

const BASE = path.resolve(__dirname, '../../');

// ─── Safety Gates ─────────────────────────────────────────────────────────────

console.log('');
console.log('=== Vital Vision — VQB Fetch Current Quiz ===');
console.log('');

const AUTO_PUBLISH     = process.env.AUTO_PUBLISH;
const REQUIRE_APPROVAL = process.env.REQUIRE_HUMAN_APPROVAL;
const VQB_API_MODE     = process.env.VQB_API_MODE;

if (AUTO_PUBLISH === 'true')       { console.error('BLOCKED: AUTO_PUBLISH=true');           process.exit(1); }
if (REQUIRE_APPROVAL === 'false')  { console.error('BLOCKED: REQUIRE_HUMAN_APPROVAL=false'); process.exit(1); }
if (VQB_API_MODE !== 'read_only')  { console.error(`BLOCKED: VQB_API_MODE must be read_only. Got: ${VQB_API_MODE}`); process.exit(1); }

console.log('Safety: AUTO_PUBLISH=false          OK');
console.log('Safety: REQUIRE_HUMAN_APPROVAL=true OK');
console.log('Safety: VQB_API_MODE=read_only       OK');
console.log('');

// ─── Configuration ────────────────────────────────────────────────────────────

const BASE_URL       = process.env.VQB_PUBLIC_API_BASE_URL;
const PRIVATE_KEY    = process.env.VQB_PRIVATE_API_KEY;
const PUBLIC_KEY     = process.env.VQB_PUBLIC_API_KEY;
const ORGANIC_ID     = process.env.VQB_ORGANIC_QUIZ_ID;
const PAID_ID        = process.env.VQB_PAID_QUIZ_ID;

if (!BASE_URL || !ORGANIC_ID || !PAID_ID) {
  console.error('MISSING: VQB_PUBLIC_API_BASE_URL, VQB_ORGANIC_QUIZ_ID, or VQB_PAID_QUIZ_ID not set.');
  console.error('Run npm run vqb:check first.');
  process.exit(1);
}

const keyPreview = k => k ? `${k.substring(0, 6)}${'*'.repeat(Math.max(0, k.length - 6))}` : '(not set)';
console.log(`Base URL:    ${BASE_URL}`);
console.log(`Private key: ${keyPreview(PRIVATE_KEY)} (masked)`);
console.log(`Public key:  ${keyPreview(PUBLIC_KEY)} (masked)`);
console.log(`Organic ID:  ${ORGANIC_ID}`);
console.log(`Paid ID:     ${PAID_ID}`);
console.log('');
console.log('Mode: READ-ONLY — no write calls will be made.');
console.log('');

// ─── Fetch Helper ─────────────────────────────────────────────────────────────

async function fetchQuiz(quizId, label) {
  const endpoint = `${BASE_URL}/quizzes/${quizId}`;
  console.log(`Fetching ${label} quiz (ID: ${quizId})...`);
  console.log(`  Endpoint: ${endpoint}`);

  const authHeaders = [
    { 'Authorization': `Bearer ${PRIVATE_KEY}`, 'Content-Type': 'application/json' },
    { 'X-API-Key': PRIVATE_KEY, 'Content-Type': 'application/json' },
    { 'Authorization': `Bearer ${PUBLIC_KEY}`, 'Content-Type': 'application/json' },
  ];

  let lastError = null;
  for (const headers of authHeaders) {
    try {
      const res = await fetch(endpoint, { method: 'GET', headers });
      const text = await res.text();
      let data;
      try { data = JSON.parse(text); } catch { data = { raw: text }; }

      if (res.ok) {
        console.log(`  Status: ${res.status} OK`);
        return { success: true, status: res.status, data, quizId, label };
      } else {
        lastError = { status: res.status, body: text.substring(0, 200) };
        console.log(`  Status: ${res.status} — trying next auth format...`);
      }
    } catch (err) {
      lastError = { error: err.message };
      console.log(`  Network error: ${err.message}`);
    }
  }

  console.log(`  All auth formats failed for ${label} quiz.`);
  return { success: false, quizId, label, lastError };
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  const ts      = new Date().toISOString().replace(/[:.]/g, '-');
  const REPORTS = path.join(BASE, 'reports', 'vqb');
  fs.mkdirSync(REPORTS, { recursive: true });

  const [organic, paid] = await Promise.all([
    fetchQuiz(ORGANIC_ID, 'Organic'),
    fetchQuiz(PAID_ID, 'Paid'),
  ]);

  const result = { timestamp: ts, organic, paid, meta: {
    baseUrl: BASE_URL, organicId: ORGANIC_ID, paidId: PAID_ID,
    mode: 'read_only', writesMade: 0, shopifyEdited: false,
  }};

  const outPath = path.join(REPORTS, `${ts}-fetch-result.json`);
  fs.writeFileSync(outPath, JSON.stringify(result, null, 2));
  console.log('');
  console.log(`Fetch result saved: reports/vqb/${path.basename(outPath)}`);

  const anySuccess = organic.success || paid.success;
  if (anySuccess) {
    console.log('');
    console.log('=== FETCH COMPLETE ===');
    console.log('At least one quiz fetched. Run npm run vqb:backup-current next.');
  } else {
    console.log('');
    console.log('=== FETCH ATTEMPTED — API returned errors ===');
    console.log('Result saved with error details.');
    console.log('Check VQB API docs for correct endpoint/auth format.');
    console.log('The backup and dry-run scripts can still run using fetch result.');
  }

  console.log('');
  console.log('No write calls were made. No VQB content was modified.');
  return result;
}

main().catch(err => {
  console.error('Unexpected error:', err.message);
  process.exit(1);
});
