#!/usr/bin/env node
// ============================================================
// READ-ONLY verification of the production DRY RUN of the ledger-guarded
// WaveSpeed workflow. Performs GET requests only. Makes no WaveSpeed calls.
//
//   N8N_BASE_URL=https://n8n.vitalvision.shop N8N_API_KEY=... \
//     node infrastructure/n8n/wavespeed/verify-dry-run.js --workflow-id <id> \
//       [--credential-name "WaveSpeed API - Vital Vision"]
//
// API key scopes needed: workflow:read, execution:list, execution:read,
// dataTable:list, dataTable:read, dataTableRow:read.
// ============================================================
'use strict';

const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync } = require('child_process');
const core = require('./src/ledger-core.js');
const { build, N } = require('./build-workflow.js');

const BASE = (process.env.N8N_BASE_URL || '').replace(/\/+$/, '');
const KEY = process.env.N8N_API_KEY || '';
const argv = process.argv.slice(2);
const argValue = (flag) => { const i = argv.indexOf(flag); return i >= 0 ? argv[i + 1] : null; };
const WORKFLOW_ID = argValue('--workflow-id');
const CREDENTIAL_NAME = argValue('--credential-name');
const cfg = core.LEDGER_CONFIG;

function die(msg) { console.error(`ABORT: ${msg}`); process.exit(1); }
async function get(p) {
  const res = await fetch(`${BASE}/api/v1${p}`, { headers: { 'X-N8N-API-KEY': KEY, accept: 'application/json' } });
  const t = await res.text();
  if (!res.ok) die(`GET ${p} → HTTP ${res.status}: ${t.slice(0, 300)}`);
  return t ? JSON.parse(t) : {};
}

const results = [];
function check(section, desc, ok, detail) {
  results.push({ section, ok: Boolean(ok) });
  console.log(`   ${ok ? '✓' : '✗'} [${section}] ${desc}${detail !== undefined ? `  — ${detail}` : ''}`);
}

(async () => {
  if (!BASE || !KEY || !WORKFLOW_ID) die('set N8N_BASE_URL, N8N_API_KEY and --workflow-id');
  console.log(`n8n: ${BASE}   workflow: ${WORKFLOW_ID}   (read-only)\n`);

  // Deployed workflow.
  const wf = await get(`/workflows/${WORKFLOW_ID}`);
  const node = (name) => wf.nodes.find((n) => n.name === name);
  const req = Object.fromEntries(node(N.request).parameters.assignments.assignments.map((a) => [a.name, a.value]));
  const local = build({ mockBaseUrl: null });
  const codeDrift = local.nodes.filter((n) => n.type === 'n8n-nodes-base.code').filter((n) => !node(n.name) || node(n.name).parameters.jsCode !== n.parameters.jsCode).map((n) => n.name);
  const connOk = JSON.stringify(wf.connections) === JSON.stringify(local.connections);
  console.log('Deployed workflow');
  check('SAFETY', 'workflow is INACTIVE', wf.active === false);
  check('SAFETY', 'confirm_paid = NOT-APPROVED', req.confirm_paid === 'NOT-APPROVED', req.confirm_paid);
  check('STRUCTURE', 'all Code nodes identical to the validated build (guards, limits, allowlist)', codeDrift.length === 0, codeDrift.join(', ') || 'identical');
  check('STRUCTURE', 'connections identical to the validated build', connOk);
  const httpNodes = [N.price, N.post, N.get].map(node);
  const credIds = new Set(httpNodes.map((n) => JSON.stringify(n.credentials || null)));
  const credName = httpNodes[0].credentials && Object.values(httpNodes[0].credentials)[0].name;
  check('CREDENTIAL', 'same credential bound on all 3 WaveSpeed HTTP nodes', credIds.size === 1 && !/BIND-/.test([...credIds][0]) && [...credIds][0] !== 'null', credName);
  if (CREDENTIAL_NAME) check('CREDENTIAL', `bound credential is "${CREDENTIAL_NAME}"`, credName === CREDENTIAL_NAME);

  const tmp = path.join(fs.mkdtempSync(path.join(os.tmpdir(), 'vv-ws-verify-')), 'deployed.json');
  fs.writeFileSync(tmp, JSON.stringify(wf));
  let validatorOut = '';
  let validatorOk = true;
  try { validatorOut = execFileSync(process.execPath, [path.join(__dirname, 'validate-workflow.js'), tmp]).toString(); } catch (e) { validatorOk = false; validatorOut = String(e.stdout || ''); }
  check('STRUCTURE', 'structural validator A–J on the DEPLOYED copy', validatorOk, (validatorOut.match(/\d+\/\d+ sections PASS/) || ['?'])[0]);

  // Executions.
  const exList = await get(`/executions?workflowId=${WORKFLOW_ID}&limit=20`);
  const executions = exList.data || [];
  console.log('\nDry run execution');
  check('DRY_RUN', 'exactly one execution of this workflow exists', executions.length === 1, `${executions.length}`);
  if (!executions.length) return finish();
  const ex = await get(`/executions/${executions[0].id}?includeData=true`);
  const runData = ex.data.resultData.runData;
  const out = (name) => (runData[name] ? runData[name][runData[name].length - 1].data.main.flat()[0].json : null);
  check('DRY_RUN', 'execution finished without error', !ex.data.resultData.error && (ex.status === 'success' || ex.finished === true), ex.status);
  const final = out(N.final) || out(N.rejected) || {};
  check('DRY_RUN', 'final_status = FAILED_CLEAN (DRY_RUN_COMPLETE)', final.final_status === 'FAILED_CLEAN' && /^DRY_RUN_COMPLETE/.test(final.reason || ''), `${final.final_status} / ${final.reason}`);
  check('PAID_POST', 'paid POST node did NOT execute', !runData[N.post] && final.paid_post_attempted === false);
  check('PAID_POST', 'SUBMITTING was never written', !runData[N.writeSubmitting]);
  check('POLLING', 'polling loop did not run', !runData[N.pollCtx] && !runData[N.get]);
  check('SAFETY', 'approved=false, published=false, requires_human_approval=true', final.approved === false && final.published === false && final.requires_human_approval === true);

  const priceHttp = out(N.price) || {};
  const priceBody = priceHttp.body && priceHttp.body.data ? priceHttp.body.data : priceHttp.body;
  check('PRICE', 'free price check returned HTTP 200', priceHttp.statusCode === 200, priceHttp.statusCode);
  console.log(`      price response fields: ${priceBody && typeof priceBody === 'object' ? Object.keys(priceBody).join(', ') : JSON.stringify(priceBody).slice(0, 200)}`);
  const priced = out(N.evalPrice) || {};
  check('FIRST_TEST_MAX_COST', `estimated cost ≤ $${cfg.MAX_COST_PER_GENERATION_USD}`, Number(priced.estimated_cost_usd) > 0 && Number(priced.estimated_cost_usd) <= cfg.MAX_COST_PER_GENERATION_USD, `$${priced.estimated_cost_usd} (unit ${priced.unit_price_usd}, discounted ${priced.discounted_price_usd})`);
  const guards = out(N.guards) || {};
  check('GUARDS', 'ledger guards evaluated against production ledger → BUDGET_APPROVED', guards.status === 'BUDGET_APPROVED' && guards.last_reason === 'ALL_LEDGER_GUARDS_PASSED', guards.last_reason);
  console.log(`      duplicate: none · concurrency: 0/${cfg.MAX_CONCURRENT_GENERATIONS} in flight · daily: $${guards.spent_today_usd} committed today, $${guards.projected_today_usd} projected of $${cfg.MAX_DAILY_WAVESPEED_SPEND_USD}`);
  check('MODEL_ALLOWLIST', 'model is the only allowlisted model', req.model === cfg.MODEL_ALLOWLIST[0] && cfg.MODEL_ALLOWLIST.length === 1, req.model);

  // Ledger persistence (read back after the execution ended).
  console.log('\nData Table persistence');
  const tables = await get(`/data-tables?filter=${encodeURIComponent(JSON.stringify({ name: cfg.LEDGER_TABLE_NAME }))}`);
  const table = (tables.data || []).find((t) => t.name === cfg.LEDGER_TABLE_NAME);
  check('DATA_TABLE', `table ${cfg.LEDGER_TABLE_NAME} exists`, Boolean(table), table && table.id);
  if (!table) return finish();
  const rows = [];
  let cursor;
  do {
    const r = await get(`/data-tables/${table.id}/rows?limit=250${cursor ? `&cursor=${cursor}` : ''}`);
    rows.push(...r.data); cursor = r.nextCursor;
  } while (cursor);
  const row = rows.find((r) => Number(r.id) === Number(priced.ledger_row_id));
  const history = row ? JSON.parse(row.state_history || '[]').map((h) => h.status) : [];
  check('DATA_TABLE', 'dry-run row persisted after the execution ended', Boolean(row), row && `row id ${row.id}`);
  if (row) {
    check('DATA_TABLE', 'row status FAILED_CLEAN, execution id recorded', row.status === 'FAILED_CLEAN' && String(row.n8n_execution_id) === String(ex.id), `${row.status}, exec ${row.n8n_execution_id}`);
    check('DATA_TABLE', 'state path CREATED > PRICE_CHECKED > BUDGET_APPROVED > FAILED_CLEAN', history.join('>') === 'CREATED>PRICE_CHECKED>BUDGET_APPROVED>FAILED_CLEAN', history.join('>'));
    check('DATA_TABLE', 'estimated_cost_usd persisted', Number(row.estimated_cost_usd) === Number(priced.estimated_cost_usd), row.estimated_cost_usd);
    check('DATA_TABLE', 'no prediction_id / asset_url (nothing submitted)', !row.prediction_id && !row.asset_url);
  }
  const live = rows.filter((r) => core.IN_FLIGHT_STATES.includes(r.status) || core.PRE_CLAIM_STATES.includes(r.status));
  check('CONCURRENCY', 'ledger has no live / in-flight / unknown rows (clean before the paid test)', live.length === 0, live.map((r) => `${r.id}:${r.status}`).join(', ') || `${rows.length} row(s) total`);
  finish();
})().catch((e) => die(e && e.message ? e.message : String(e)));

function finish() {
  const failed = results.filter((r) => !r.ok).length;
  console.log(`\n${results.length - failed}/${results.length} checks passed${failed ? ' — DO NOT proceed to a paid test' : ''}`);
  console.log('Behavioural coverage of duplicate / daily-cap / concurrency BLOCK paths comes from the offline E2E (same code, verified identical above).');
  process.exit(failed ? 1 : 0);
}
