/**
 * diagnose-vqb-auth.js
 * Vital Vision — VQB API Auth Diagnostic
 *
 * READ-ONLY. Makes GET-only requests to VQB API.
 * Tests multiple auth header formats, Origin headers, and endpoint paths.
 * Does NOT write, update, delete, or publish anything in VQB or Shopify.
 * Masks all API keys in all output.
 *
 * Usage: npm run vqb:diagnose-auth
 *
 * Output: reports/vqb/vqb-api-auth-diagnostic-{timestamp}.json
 */

'use strict';

require('dotenv').config();

const fs   = require('fs');
const path = require('path');

const BASE = path.resolve(__dirname, '../../');

// ─── Safety Gates ─────────────────────────────────────────────────────────────

console.log('');
console.log('=== Vital Vision — VQB API Auth Diagnostic ===');
console.log('Mode: READ-ONLY — GET requests only, no writes, no publishes');
console.log('');

if (process.env.AUTO_PUBLISH === 'true')            { console.error('BLOCKED: AUTO_PUBLISH=true');           process.exit(1); }
if (process.env.REQUIRE_HUMAN_APPROVAL === 'false') { console.error('BLOCKED: REQUIRE_HUMAN_APPROVAL=false'); process.exit(1); }
if (process.env.VQB_API_MODE !== 'read_only')       { console.error('BLOCKED: VQB_API_MODE must be read_only'); process.exit(1); }

console.log('Safety: AUTO_PUBLISH=false           OK');
console.log('Safety: REQUIRE_HUMAN_APPROVAL=true  OK');
console.log('Safety: VQB_API_MODE=read_only        OK');
console.log('');

// ─── Load Credentials ─────────────────────────────────────────────────────────

const BASE_URL      = process.env.VQB_PUBLIC_API_BASE_URL || process.env.VQB_API_BASE_URL;
const PRIVATE_KEY   = process.env.VQB_PRIVATE_API_KEY;
const PUBLIC_KEY    = process.env.VQB_PUBLIC_API_KEY;
const BROWSER_JWT   = process.env.VQB_BROWSER_API_KEY;
const ORGANIC_ID    = process.env.VQB_ORGANIC_QUIZ_ID;
const PAID_ID       = process.env.VQB_PAID_QUIZ_ID;

const mask = k => k ? `${k.substring(0, 6)}${'*'.repeat(Math.max(0, k.length - 6))}` : '(not set)';

if (!BASE_URL)    { console.error('MISSING: VQB_PUBLIC_API_BASE_URL'); process.exit(1); }
if (!ORGANIC_ID)  { console.error('MISSING: VQB_ORGANIC_QUIZ_ID');     process.exit(1); }

console.log(`Base URL:    ${BASE_URL}`);
console.log(`Organic ID:  ${ORGANIC_ID}`);
console.log(`Paid ID:     ${PAID_ID}`);
console.log(`Private key: ${mask(PRIVATE_KEY)}`);
console.log(`Public key:  ${mask(PUBLIC_KEY)}`);
console.log(`Browser JWT: ${mask(BROWSER_JWT)}`);
console.log('');
console.log('All keys masked. No full key values will appear in output or reports.');
console.log('');

// ─── Endpoint Candidates ──────────────────────────────────────────────────────

const ID = ORGANIC_ID; // Use organic quiz for all probes

const ENDPOINTS = [
  { label: 'quizzes/{id}',              url: `${BASE_URL}/quizzes/${ID}` },
  { label: 'quiz/{id}',                 url: `${BASE_URL}/quiz/${ID}` },
  { label: 'quizzes/{id}/result-pages', url: `${BASE_URL}/quizzes/${ID}/result-pages` },
  { label: 'result-pages (root)',        url: `${BASE_URL}/result-pages` },
  { label: 'base URL probe',            url: BASE_URL },
];

// ─── Auth Header Candidates ───────────────────────────────────────────────────

const AUTH_HEADERS = [
  { label: 'no-auth (baseline)',          headers: {} },
  { label: 'Bearer PRIVATE_KEY',          headers: { 'Authorization': `Bearer ${PRIVATE_KEY}` } },
  { label: 'Bearer PUBLIC_KEY',           headers: { 'Authorization': `Bearer ${PUBLIC_KEY}` } },
  { label: 'Bearer BROWSER_JWT',          headers: { 'Authorization': `Bearer ${BROWSER_JWT}` } },
  { label: 'X-API-Key PRIVATE_KEY',       headers: { 'X-API-Key': PRIVATE_KEY } },
  { label: 'X-API-Key PUBLIC_KEY',        headers: { 'X-API-Key': PUBLIC_KEY } },
  { label: 'ACCESSKEY PRIVATE_KEY',       headers: { 'ACCESSKEY': PRIVATE_KEY } },
  { label: 'ACCESSKEY PUBLIC_KEY',        headers: { 'ACCESSKEY': PUBLIC_KEY } },
  { label: 'api-key PRIVATE_KEY',         headers: { 'api-key': PRIVATE_KEY } },
  { label: 'api-key PUBLIC_KEY',          headers: { 'api-key': PUBLIC_KEY } },
  { label: 'Authorization Token PRIVATE', headers: { 'Authorization': `Token ${PRIVATE_KEY}` } },
  { label: 'Authorization Token PUBLIC',  headers: { 'Authorization': `Token ${PUBLIC_KEY}` } },
];

// ─── Origin Candidates ────────────────────────────────────────────────────────

const ORIGINS = [
  { label: 'no-origin (Node default)',  origin: null },
  { label: 'https://vitalvision.shop',  origin: 'https://vitalvision.shop' },
  { label: 'https://www.vitalvision.shop', origin: 'https://www.vitalvision.shop' },
  { label: 'https://rum0nq-hs.myshopify.com', origin: 'https://rum0nq-hs.myshopify.com' },
];

// ─── Probe Function ───────────────────────────────────────────────────────────

async function probe({ url, authLabel, authHeaders, originLabel, origin }) {
  const headers = {
    'Content-Type': 'application/json',
    ...authHeaders,
  };
  if (origin) headers['Origin'] = origin;

  try {
    const res  = await fetch(url, { method: 'GET', headers });
    const text = await res.text();
    let body;
    try { body = JSON.parse(text); } catch { body = text.substring(0, 300); }
    return { status: res.status, ok: res.ok, body };
  } catch (err) {
    return { status: null, ok: false, body: null, networkError: err.message };
  }
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  const ts = new Date().toISOString();
  const results = [];
  let successCount = 0;

  // ── Phase 1: Test all auth formats on primary endpoint with no Origin ────────
  console.log('PHASE 1 — Auth format sweep on quizzes/{id} endpoint (no Origin header)');
  console.log('─────────────────────────────────────────────────────────────────────');
  const primaryEndpoint = ENDPOINTS[0];

  for (const auth of AUTH_HEADERS) {
    const result = await probe({
      url:        primaryEndpoint.url,
      authLabel:  auth.label,
      authHeaders: auth.headers,
      originLabel: 'no-origin',
      origin:      null,
    });

    const statusStr = result.networkError
      ? `NET_ERR: ${result.networkError}`
      : `${result.status} ${result.ok ? 'OK ✅' : ''}`;

    const bodySnippet = typeof result.body === 'string'
      ? result.body.substring(0, 80)
      : JSON.stringify(result.body || {}).substring(0, 80);

    console.log(`  [${statusStr.padEnd(10)}] auth=${auth.label.padEnd(28)} body=${bodySnippet}`);

    results.push({
      phase: 1,
      endpoint: primaryEndpoint.label,
      url: primaryEndpoint.url,
      auth: auth.label,
      origin: 'none',
      status: result.status,
      ok: result.ok,
      body: result.body,
      networkError: result.networkError || null,
    });

    if (result.ok) successCount++;
  }

  // ── Phase 2: Test Origin headers with most promising auth (Bearer BROWSER JWT) ─
  console.log('');
  console.log('PHASE 2 — Origin header sweep (Bearer BROWSER_JWT on quizzes/{id})');
  console.log('─────────────────────────────────────────────────────────────────────');

  for (const orig of ORIGINS) {
    const result = await probe({
      url:        primaryEndpoint.url,
      authLabel:  'Bearer BROWSER_JWT',
      authHeaders: { 'Authorization': `Bearer ${BROWSER_JWT}` },
      originLabel: orig.label,
      origin:      orig.origin,
    });

    const statusStr = result.networkError
      ? `NET_ERR`
      : `${result.status} ${result.ok ? 'OK ✅' : ''}`;
    const bodySnippet = typeof result.body === 'string'
      ? result.body.substring(0, 80)
      : JSON.stringify(result.body || {}).substring(0, 80);

    console.log(`  [${statusStr.padEnd(10)}] origin=${orig.label.padEnd(40)} body=${bodySnippet}`);

    results.push({
      phase: 2,
      endpoint: primaryEndpoint.label,
      url: primaryEndpoint.url,
      auth: 'Bearer BROWSER_JWT',
      origin: orig.label,
      status: result.status,
      ok: result.ok,
      body: result.body,
      networkError: result.networkError || null,
    });

    if (result.ok) successCount++;
  }

  // ── Phase 3: Origin sweep with PRIVATE_KEY Bearer ────────────────────────────
  console.log('');
  console.log('PHASE 3 — Origin header sweep (Bearer PRIVATE_KEY on quizzes/{id})');
  console.log('─────────────────────────────────────────────────────────────────────');

  for (const orig of ORIGINS) {
    const result = await probe({
      url:        primaryEndpoint.url,
      authLabel:  'Bearer PRIVATE_KEY',
      authHeaders: { 'Authorization': `Bearer ${PRIVATE_KEY}` },
      originLabel: orig.label,
      origin:      orig.origin,
    });

    const statusStr = result.networkError ? 'NET_ERR' : `${result.status}`;
    const bodySnippet = typeof result.body === 'string'
      ? result.body.substring(0, 80)
      : JSON.stringify(result.body || {}).substring(0, 80);

    console.log(`  [${statusStr.padEnd(10)}] origin=${orig.label.padEnd(40)} body=${bodySnippet}`);

    results.push({
      phase: 3,
      endpoint: primaryEndpoint.label,
      url: primaryEndpoint.url,
      auth: 'Bearer PRIVATE_KEY',
      origin: orig.label,
      status: result.status,
      ok: result.ok,
      body: result.body,
      networkError: result.networkError || null,
    });

    if (result.ok) successCount++;
  }

  // ── Phase 4: Endpoint path sweep (best auth + best origin from results) ───────
  console.log('');
  console.log('PHASE 4 — Endpoint path sweep (Bearer BROWSER_JWT + Origin vitalvision.shop)');
  console.log('─────────────────────────────────────────────────────────────────────');

  for (const ep of ENDPOINTS) {
    const result = await probe({
      url:        ep.url,
      authLabel:  'Bearer BROWSER_JWT',
      authHeaders: { 'Authorization': `Bearer ${BROWSER_JWT}` },
      originLabel: 'https://vitalvision.shop',
      origin:      'https://vitalvision.shop',
    });

    const statusStr = result.networkError ? 'NET_ERR' : `${result.status}`;
    const bodySnippet = typeof result.body === 'string'
      ? result.body.substring(0, 80)
      : JSON.stringify(result.body || {}).substring(0, 80);

    console.log(`  [${statusStr.padEnd(10)}] endpoint=${ep.label.padEnd(35)} body=${bodySnippet}`);

    results.push({
      phase: 4,
      endpoint: ep.label,
      url: ep.url,
      auth: 'Bearer BROWSER_JWT',
      origin: 'https://vitalvision.shop',
      status: result.status,
      ok: result.ok,
      body: result.body,
      networkError: result.networkError || null,
    });

    if (result.ok) successCount++;
  }

  // ── Phase 5: Query param auth (no header auth) ────────────────────────────────
  console.log('');
  console.log('PHASE 5 — Query parameter auth formats');
  console.log('─────────────────────────────────────────────────────────────────────');

  const qpTests = [
    { label: '?api_key=PRIVATE',  url: `${BASE_URL}/quizzes/${ID}?api_key=${PRIVATE_KEY}` },
    { label: '?api_key=PUBLIC',   url: `${BASE_URL}/quizzes/${ID}?api_key=${PUBLIC_KEY}` },
    { label: '?token=BROWSER_JWT',url: `${BASE_URL}/quizzes/${ID}?token=${BROWSER_JWT}` },
    { label: '?key=PRIVATE',      url: `${BASE_URL}/quizzes/${ID}?key=${PRIVATE_KEY}` },
  ];

  for (const qp of qpTests) {
    const result = await probe({
      url:        qp.url,
      authLabel:  qp.label,
      authHeaders: {},
      originLabel: 'https://vitalvision.shop',
      origin:      'https://vitalvision.shop',
    });

    const statusStr = result.networkError ? 'NET_ERR' : `${result.status}`;
    const bodySnippet = typeof result.body === 'string'
      ? result.body.substring(0, 80)
      : JSON.stringify(result.body || {}).substring(0, 80);

    console.log(`  [${statusStr.padEnd(10)}] ${qp.label.padEnd(25)} body=${bodySnippet}`);

    results.push({
      phase: 5,
      endpoint: `quizzes/{id} + qp`,
      url: `${BASE_URL}/quizzes/${ID}?[MASKED]`,
      auth: qp.label,
      origin: 'https://vitalvision.shop',
      status: result.status,
      ok: result.ok,
      body: result.body,
      networkError: result.networkError || null,
    });

    if (result.ok) successCount++;
  }

  // ─── Save Diagnostic Report ────────────────────────────────────────────────────

  console.log('');

  const REPORTS = path.join(BASE, 'reports', 'vqb');
  fs.mkdirSync(REPORTS, { recursive: true });

  // Mask all keys in the saved results
  const safeMask = (obj) => {
    const str = JSON.stringify(obj, null, 2);
    return str
      .replace(new RegExp(PRIVATE_KEY || 'NOMATCH', 'g'), mask(PRIVATE_KEY))
      .replace(new RegExp(PUBLIC_KEY  || 'NOMATCH', 'g'), mask(PUBLIC_KEY))
      .replace(new RegExp((BROWSER_JWT || '').substring(0, 20) || 'NOMATCH', 'g'), mask(BROWSER_JWT));
  };

  const report = {
    generatedAt: ts,
    mode: 'read_only',
    writesExecuted: 0,
    totalProbes: results.length,
    successfulProbes: successCount,
    _safetyFlags: {
      autoPublish: false,
      requireHumanApproval: true,
      vqbApiMode: 'read_only',
      getRequestsOnly: true,
      noVqbContentModified: true,
      noShopifyEdited: true,
    },
    results: results.map(r => ({
      ...r,
      // Body may contain no sensitive info, but we include the raw response for analysis
    })),
  };

  const diagPath = path.join(REPORTS, `${ts.replace(/[:.]/g, '-')}-auth-diagnostic.json`);
  fs.writeFileSync(diagPath, safeMask(report));

  console.log(`Diagnostic report saved: reports/vqb/${path.basename(diagPath)}`);
  console.log('');

  // ─── Summary ──────────────────────────────────────────────────────────────────

  const successes = results.filter(r => r.ok);
  const domainErrors = results.filter(r => {
    const b = r.body;
    return typeof b === 'object' && b !== null && b.error === 'domain not allowed';
  });
  const authErrors = results.filter(r => r.status === 401 || r.status === 403);
  const notFound   = results.filter(r => r.status === 404);

  console.log('=== DIAGNOSTIC SUMMARY ===');
  console.log('');
  console.log(`Total probes:         ${results.length}`);
  console.log(`Successful (2xx):     ${successes.length}`);
  console.log(`"domain not allowed": ${domainErrors.length}`);
  console.log(`Auth errors (401/403): ${authErrors.length}`);
  console.log(`Not found (404):      ${notFound.length}`);
  console.log('');

  if (successes.length > 0) {
    console.log('WORKING COMBINATIONS:');
    successes.forEach(r => {
      console.log(`  ✅ endpoint=${r.endpoint} | auth=${r.auth} | origin=${r.origin}`);
    });
  } else {
    console.log('No successful auth combination found in this run.');
    console.log('');

    // Identify the most informative error pattern
    const uniqueBodies = [...new Set(results.map(r => JSON.stringify(r.body)))];
    console.log('Unique error responses seen:');
    uniqueBodies.forEach(b => console.log(`  ${b}`));
  }

  console.log('');
  console.log('No VQB content was modified. No write calls were made.');
  console.log('');

  return { results, successCount, diagPath };
}

main().catch(err => {
  console.error('Unexpected error:', err.message);
  process.exit(1);
});
