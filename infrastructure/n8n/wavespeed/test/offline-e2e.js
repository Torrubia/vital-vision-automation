#!/usr/bin/env node
// ============================================================
// OFFLINE end-to-end test of the ledger-guarded workflow against a
// SCRATCH n8n instance and the local mock WaveSpeed server.
// NEVER point this at production n8n. NEVER contacts WaveSpeed.
//
// Requires:
//   N8N_BASE_URL          scratch instance URL (same n8n version as production: 2.23.2)
//   N8N_API_KEY           scratch instance API key
//   N8N_SANDBOX_EMAIL / N8N_SANDBOX_PASSWORD   scratch owner login (to start manual runs)
//   MOCK_BASE_URL     default http://127.0.0.1:18765 (test/mock-wavespeed-server.js)
//
// Each scenario is a separate workflow + execution, so no in-memory or
// static-data state is shared: only the Data Table carries state across runs.
// ============================================================
'use strict';

const { build, N } = require('../build-workflow.js');

const MOCK = process.env.MOCK_BASE_URL || 'http://127.0.0.1:18765';
const BASE = process.env.N8N_BASE_URL;
const KEY = process.env.N8N_API_KEY;
if (!BASE || !KEY || !process.env.N8N_SANDBOX_EMAIL || !process.env.N8N_SANDBOX_PASSWORD) throw new Error('set N8N_BASE_URL, N8N_API_KEY, N8N_SANDBOX_EMAIL, N8N_SANDBOX_PASSWORD (scratch instance only)');
if (/:5678\b/.test(BASE)) throw new Error('refusing: 5678 is the production n8n port');

const TABLE = 'vv_wavespeed_generation_ledger';

async function api(method, p, body) {
  const res = await fetch(`${BASE}/api/v1${p}`, {
    method, headers: { 'X-N8N-API-KEY': KEY, 'content-type': 'application/json' }, body: body ? JSON.stringify(body) : undefined,
  });
  const t = await res.text();
  if (!res.ok) throw new Error(`${method} ${p} → ${res.status} ${t.slice(0, 300)}`);
  return t ? JSON.parse(t) : {};
}
async function mock(p, body) {
  const res = await fetch(`${MOCK}${p}`, { method: body ? 'POST' : 'GET', headers: { 'content-type': 'application/json' }, body: body ? JSON.stringify(body) : undefined });
  return res.json();
}
async function tableId() {
  const t = await api('GET', `/data-tables?filter=${encodeURIComponent(JSON.stringify({ name: TABLE }))}`);
  const hit = (t.data || []).find((x) => x.name === TABLE);
  if (!hit) throw new Error('ledger table missing — run import-to-n8n.js --apply against the scratch instance first');
  return hit.id;
}
async function ledgerRows(id) {
  const out = []; let cursor;
  do {
    const r = await api('GET', `/data-tables/${id}/rows?limit=250${cursor ? `&cursor=${cursor}` : ''}`);
    out.push(...r.data); cursor = r.nextCursor;
  } while (cursor);
  return out;
}

let wfCounter = 0;
let cookie = '';
async function login() {
  const res = await fetch(`${BASE}/rest/login`, {
    method: 'POST', headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ emailOrLdapLoginId: process.env.N8N_SANDBOX_EMAIL, password: process.env.N8N_SANDBOX_PASSWORD }),
  });
  if (!res.ok) throw new Error(`scratch login failed: ${res.status}`);
  cookie = (res.headers.get('set-cookie') || '').split(';')[0];
}

// Creates the scenario workflow in the scratch instance and runs it exactly
// like the UI's "Execute workflow" button (manual mode), then waits for it.
async function runWorkflow(request) {
  const wf = build({ mockBaseUrl: MOCK });
  const set = wf.nodes.find((n) => n.name === N.request);
  for (const a of set.parameters.assignments.assignments) if (a.name in request) a.value = request[a.name];
  const created = await api('POST', '/workflows', { name: `${wf.name} #${++wfCounter}`, nodes: wf.nodes, connections: wf.connections, settings: wf.settings });
  const res = await fetch(`${BASE}/rest/workflows/${created.id}/run`, {
    method: 'POST', headers: { 'content-type': 'application/json', cookie },
    body: JSON.stringify({ triggerToStartFrom: { name: N.trigger } }),
  });
  const body = await res.json();
  const executionId = body.data && body.data.executionId;
  if (!executionId) throw new Error(`manual run did not start: ${JSON.stringify(body).slice(0, 300)}`);
  let ex;
  for (let i = 0; i < 600; i++) {
    ex = await api('GET', `/executions/${executionId}?includeData=true`);
    if (ex.finished || ['success', 'error', 'crashed', 'canceled'].includes(ex.status)) break;
    await new Promise((r) => setTimeout(r, 1000));
  }
  const runData = ex.data.resultData.runData;
  if (ex.data.resultData.error) throw new Error(`execution ${executionId} errored: ${ex.data.resultData.error.message}`);
  const pick = (name) => (runData[name] ? runData[name][runData[name].length - 1].data.main[0][0].json : null);
  return { final: pick(N.final) || pick(N.rejected), runData };
}

const results = [];
function check(name, cond, detail) {
  results.push({ name, pass: Boolean(cond), detail });
  console.log(`${cond ? 'PASS' : 'FAIL'}  ${name}${detail ? `  — ${detail}` : ''}`);
}

const VALID = {
  shot: 'shot-01', variant: 1, model: 'wavespeed-ai/minimax-h3/text-to-video',
  model_inputs: '{"prompt":"offline mock test prompt","duration":6}',
};

(async () => {
  await login();
  const tid = await tableId();
  const before = (await ledgerRows(tid)).length;
  const today = new Intl.DateTimeFormat('en-CA', { timeZone: process.env.GENERIC_TIMEZONE || 'America/New_York' }).format(new Date());

  // S1 — dry run (arming switch NOT-APPROVED).
  await mock('/__scenario', { price: 0.2, post: 'ok', polls: ['processing', 'completed'] });
  let r = await runWorkflow({ ...VALID, platform_concept_id: 'e2e-dry', confirm_paid: 'NOT-APPROVED' });
  let s = await mock('/__stats');
  check('S1 dry run ends FAILED_CLEAN with no paid POST', r.final.final_status === 'FAILED_CLEAN' && s.paid_post_calls === 0 && s.price_calls === 1 && r.final.paid_post_attempted === false, `${r.final.final_status} / ${r.final.reason} / posts=${s.paid_post_calls}`);

  // S2 — armed success → ASSET_CANDIDATE, exactly one paid POST, polling loop reached.
  await mock('/__scenario', { price: 0.2, post: 'ok', polls: ['processing', 'http503', 'processing', 'completed'] });
  r = await runWorkflow({ ...VALID, platform_concept_id: 'e2e-success', confirm_paid: 'APPROVED-BY-LUCY' });
  s = await mock('/__stats');
  check('S2 armed run ends ASSET_CANDIDATE (approved=false, published=false, requires_human_approval=true)',
    r.final.final_status === 'ASSET_CANDIDATE' && r.final.approved === false && r.final.published === false && r.final.requires_human_approval === true && /mock\.invalid/.test(r.final.asset_url),
    `${r.final.final_status} ${r.final.asset_url}`);
  check('S2 exactly one paid POST; status GET polled (incl. a 503) without re-POST', s.paid_post_calls === 1 && s.status_get_calls >= 4, `posts=${s.paid_post_calls} gets=${s.status_get_calls}`);
  check('S2 paid POST node ran once; polling loop iterated', r.runData[N.post].length === 1 && r.runData[N.pollCtx].length >= 4, `post_runs=${r.runData[N.post].length} poll_runs=${r.runData[N.pollCtx].length}`);
  const successRow = (await ledgerRows(tid)).find((x) => x.id === r.final.ledger_row_id);
  const hist = JSON.parse(successRow.state_history).map((h) => h.status);
  check('S2 ledger persisted full state path', JSON.stringify(hist) === JSON.stringify(['CREATED', 'PRICE_CHECKED', 'BUDGET_APPROVED', 'SUBMITTING', 'SUBMITTED', 'PROCESSING', 'ASSET_CANDIDATE']) && successRow.prediction_id === 'mock-pred-1' && successRow.estimated_cost_usd === 0.2, hist.join('>'));

  // S3 — same job again (new process = restart-equivalent) → DUPLICATE_GENERATION_BLOCKED.
  await mock('/__scenario', { price: 0.2, post: 'ok' });
  r = await runWorkflow({ ...VALID, platform_concept_id: 'e2e-success', confirm_paid: 'APPROVED-BY-LUCY' });
  s = await mock('/__stats');
  check('S3 duplicate job id blocked across executions', r.final.final_status === 'DUPLICATE_GENERATION_BLOCKED' && s.paid_post_calls === 0, r.final.reason);

  // S4 — uncertain POST (HTTP 500) → PAYMENT_STATE_UNKNOWN, no retry.
  await mock('/__scenario', { price: 0.2, post: 'http500' });
  r = await runWorkflow({ ...VALID, platform_concept_id: 'e2e-uncertain', confirm_paid: 'APPROVED-BY-LUCY' });
  s = await mock('/__stats');
  const unknownRowId = r.final.ledger_row_id;
  check('S4 HTTP 500 on paid POST → PAYMENT_STATE_UNKNOWN, exactly one POST, no polling', r.final.final_status === 'PAYMENT_STATE_UNKNOWN' && s.paid_post_calls === 1 && s.status_get_calls === 0, `${r.final.reason} posts=${s.paid_post_calls}`);

  // S5 — another job while one is PAYMENT_STATE_UNKNOWN → CONCURRENCY_GUARD_BLOCKED.
  await mock('/__scenario', { price: 0.2, post: 'ok' });
  r = await runWorkflow({ ...VALID, platform_concept_id: 'e2e-concurrency', confirm_paid: 'APPROVED-BY-LUCY' });
  s = await mock('/__stats');
  check('S5 unreconciled PAYMENT_STATE_UNKNOWN blocks new paid work (concurrency 1)', r.final.final_status === 'CONCURRENCY_GUARD_BLOCKED' && s.paid_post_calls === 0, r.final.reason);

  // S5b — retrying the uncertain job itself is a duplicate.
  r = await runWorkflow({ ...VALID, platform_concept_id: 'e2e-uncertain', confirm_paid: 'APPROVED-BY-LUCY' });
  s = await mock('/__stats');
  check('S5b uncertain job cannot be re-POSTed', r.final.final_status === 'DUPLICATE_GENERATION_BLOCKED' && s.paid_post_calls === 0, r.final.reason);

  // Human reconciliation (simulated): mark the unknown row FAILED_CLEAN.
  await api('PATCH', `/data-tables/${tid}/rows/update`, { filter: { type: 'and', filters: [{ columnName: 'id', condition: 'eq', value: unknownRowId }] }, data: { status: 'FAILED_CLEAN', last_reason: 'e2e: simulated human reconciliation' } });

  // S6 — price above the $0.25 ceiling.
  await mock('/__scenario', { price: 0.3, post: 'ok' });
  r = await runWorkflow({ ...VALID, platform_concept_id: 'e2e-price', confirm_paid: 'APPROVED-BY-LUCY' });
  s = await mock('/__stats');
  check('S6 price $0.30 > $0.25 ceiling → BUDGET_GUARD_BLOCKED', r.final.final_status === 'BUDGET_GUARD_BLOCKED' && s.paid_post_calls === 0, r.final.reason);

  // S7 — model not on the allowlist → rejected before any ledger write or network call.
  await mock('/__scenario', { price: 0.2, post: 'ok' });
  const rowsBeforeS7 = (await ledgerRows(tid)).length;
  r = await runWorkflow({ ...VALID, platform_concept_id: 'e2e-model', model: 'wavespeed-ai/veo3/text-to-video', confirm_paid: 'APPROVED-BY-LUCY' });
  s = await mock('/__stats');
  check('S7 non-allowlisted model rejected before ledger, no calls', r.final.final_status === 'REJECTED_BEFORE_LEDGER' && s.price_calls === 0 && s.paid_post_calls === 0 && (await ledgerRows(tid)).length === rowsBeforeS7, r.final.reason);

  // S8 — clean 401 rejection → FAILED_CLEAN, one POST, no retry.
  await mock('/__scenario', { price: 0.2, post: 'http401' });
  r = await runWorkflow({ ...VALID, platform_concept_id: 'e2e-401', confirm_paid: 'APPROVED-BY-LUCY' });
  s = await mock('/__stats');
  check('S8 HTTP 401 → FAILED_CLEAN, exactly one POST', r.final.final_status === 'FAILED_CLEAN' && s.paid_post_calls === 1, r.final.reason);

  // S10 — race: 3 armed executions of different jobs started at the same instant.
  // At most MAX_CONCURRENT_GENERATIONS (1) prediction may be live at WaveSpeed at once.
  await mock('/__scenario', { price: 0.2, post: 'ok', polls: ['processing', 'processing', 'processing', 'completed'] });
  const race = await Promise.all([1, 2, 3].map((n) => runWorkflow({ ...VALID, platform_concept_id: `e2e-race-${Date.now()}-${n}`, confirm_paid: 'APPROVED-BY-LUCY' })));
  s = await mock('/__stats');
  const outcomes = race.map((x) => x.final.final_status).sort();
  check('S10 simultaneous runs: never more than 1 live paid prediction', s.max_active_predictions <= 1 && outcomes.every((o) => ['ASSET_CANDIDATE', 'CONCURRENCY_GUARD_BLOCKED'].includes(o)) && outcomes.includes('ASSET_CANDIDATE'),
    `outcomes=${outcomes.join(',')} posts=${s.paid_post_calls} max_active=${s.max_active_predictions}`);

  // S9 — daily spend: seed committed rows for today up to $9.90, then a $0.20 job.
  const seed = Array.from({ length: 33 }, (_, i) => ({
    generation_job_id: `e2e-seed-${i}`, platform_concept_id: 'e2e-seed', shot: 's', model: 'wavespeed-ai/minimax-h3/text-to-video',
    estimated_cost_usd: 0.3, status: 'ASSET_CANDIDATE', spend_date: today, payment_state: 'COMMITTED_ESTIMATED',
    approved: false, published: false, requires_human_approval: true,
  }));
  await api('POST', `/data-tables/${tid}/rows`, { data: seed, returnType: 'count' });
  await mock('/__scenario', { price: 0.2, post: 'ok' });
  r = await runWorkflow({ ...VALID, platform_concept_id: 'e2e-daily', confirm_paid: 'APPROVED-BY-LUCY' });
  s = await mock('/__stats');
  check('S9 committed today (earlier successes + $9.90 seeded) + $0.20 > $10.00 → BUDGET_GUARD_BLOCKED', r.final.final_status === 'BUDGET_GUARD_BLOCKED' && /DAILY_SPEND_EXCEEDED/.test(r.final.reason) && s.paid_post_calls === 0, r.final.reason);

  const after = await ledgerRows(tid);
  check('Ledger rows written this run', after.length > before, `${before} → ${after.length}`);
  const failed = results.filter((x) => !x.pass).length;
  console.log(`\n${results.length - failed}/${results.length} checks passed`);
  process.exit(failed ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
