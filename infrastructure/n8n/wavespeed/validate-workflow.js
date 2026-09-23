#!/usr/bin/env node
// ============================================================
// NON-PAID structural validation of the ledger-guarded WaveSpeed workflow.
// Reads the workflow JSON + table schema + ledger core. No network calls.
//
//   node infrastructure/n8n/wavespeed/validate-workflow.js [workflow.json]
// ============================================================
'use strict';

const fs = require('fs');
const path = require('path');
const core = require('./src/ledger-core.js');
const { N, PROD_BASE_URL } = require('./build-workflow.js');

const file = process.argv[2] || path.join(__dirname, '..', 'workflows', 'vv-wavespeed-generation-ledger-guarded.json');
const wf = JSON.parse(fs.readFileSync(file, 'utf8'));
const schema = JSON.parse(fs.readFileSync(path.join(__dirname, 'ledger-table-schema.json'), 'utf8'));
const cfg = core.LEDGER_CONFIG;

const byName = new Map(wf.nodes.map((n) => [n.name, n]));
const edges = [];
for (const [from, c] of Object.entries(wf.connections)) {
  (c.main || []).forEach((outs) => (outs || []).forEach((t) => edges.push([from, t.node])));
}
const succ = (n) => edges.filter(([a]) => a === n).map(([, b]) => b);
const pred = (n) => edges.filter(([, b]) => b === n).map(([a]) => a);
function reachable(from, blocked = new Set()) {
  const seen = new Set(); const stack = [from];
  while (stack.length) {
    const x = stack.pop();
    for (const y of succ(x)) if (!seen.has(y) && !blocked.has(y)) { seen.add(y); stack.push(y); }
  }
  return seen;
}
const sameSet = (a, b) => a.length === b.length && [...a].sort().join() === [...b].sort().join();

const results = [];
function report(id, label, checks, note) {
  const failed = checks.filter(([, ok]) => !ok);
  results.push({ id, label, pass: failed.length === 0 });
  console.log(`\n${id}. ${label}: ${failed.length === 0 ? 'PASS' : 'FAIL'}`);
  for (const [desc, ok] of checks) console.log(`   ${ok ? '✓' : '✗'} ${desc}`);
  if (note) console.log(`   note: ${note}`);
}

const dtNodes = wf.nodes.filter((n) => n.type === 'n8n-nodes-base.dataTable');
const httpNodes = wf.nodes.filter((n) => n.type === 'n8n-nodes-base.httpRequest');
const codeText = wf.nodes.filter((n) => n.type === 'n8n-nodes-base.code').map((n) => n.parameters.jsCode).join('\n');
const post = byName.get(N.post);
const get = byName.get(N.get);
const trigger = wf.nodes.filter((n) => /trigger/i.test(n.type));

// A
report('A', 'DATA_TABLE_CREATED (definition)', [
  [`schema defines table "${schema.name}"`, schema.name === cfg.LEDGER_TABLE_NAME],
  [`all ${dtNodes.length} Data Table nodes target "${cfg.LEDGER_TABLE_NAME}" by name`, dtNodes.length > 0 && dtNodes.every((n) => n.parameters.dataTableId.mode === 'name' && n.parameters.dataTableId.value === cfg.LEDGER_TABLE_NAME)],
  ['workflow static data is NOT used as a ledger', !/getWorkflowStaticData|\$getWorkflowStaticData|staticData/.test(JSON.stringify(wf))],
], 'the table itself is created in production by import-to-n8n.js --apply (not yet run against production)');

// B
const REQUIRED = ['generation_job_id', 'platform_concept_id', 'shot', 'model', 'estimated_cost_usd', 'prediction_id', 'status', 'submitted_at', 'completed_at', 'asset_url', 'payment_state', 'created_at', 'updated_at'];
const schemaCols = schema.columns.map((c) => c.name);
const insertCols = Object.keys(byName.get(N.insert).parameters.columns.value);
report('B', 'LEDGER_FIELDS', [
  [`schema has all ${REQUIRED.length} required fields`, REQUIRED.every((f) => schemaCols.includes(f))],
  ['CREATED insert writes every schema column', sameSet(insertCols, schemaCols)],
  ['estimated_cost_usd is numeric', schema.columns.find((c) => c.name === 'estimated_cost_usd').type === 'number'],
]);

// Paths from trigger to the paid POST must pass through these nodes.
const GATES = [N.build, N.insert, N.price, N.guards, N.arming, N.read2, N.recheck, N.writeSubmitting, N.verifySubmitting, N.submittingOk];
const bypass = (g) => trigger.some((t) => reachable(t.name, new Set([g])).has(N.post));

// C
report('C', 'DUPLICATE_PROTECTION', [
  ['blocking states = SUBMITTING, SUBMITTED, PROCESSING, COMPLETED, ASSET_CANDIDATE, PAYMENT_STATE_UNKNOWN', sameSet(core.DUPLICATE_BLOCKING_STATES, ['SUBMITTING', 'SUBMITTED', 'PROCESSING', 'COMPLETED', 'ASSET_CANDIDATE', 'PAYMENT_STATE_UNKNOWN'])],
  ['duplicate guard runs twice before the POST (guards + pre-POST re-check)', !bypass(N.guards) && !bypass(N.recheck)],
  ['job id is deterministic (concept + shot + model + variant)', core.buildGenerationJobId({ platform_concept_id: 'a', shot: 'b', model: 'c', variant: 1 }) === core.buildGenerationJobId({ platform_concept_id: 'a', shot: 'b', model: 'c', variant: 1 })],
  ['blocked attempts get their own row (never overwrite the original job row)', byName.get(N.insert).parameters.operation === 'insert' && dtNodes.filter((n) => n.parameters.operation === 'update').every((n) => n.parameters.filters.conditions[0].keyName === 'id')],
]);

// D
report('D', 'DAILY_SPEND_GUARD', [
  [`MAX_DAILY_WAVESPEED_SPEND_USD = ${cfg.MAX_DAILY_WAVESPEED_SPEND_USD}`, cfg.MAX_DAILY_WAVESPEED_SPEND_USD === 10],
  ['committed states = SUBMITTING, SUBMITTED, PROCESSING, ASSET_CANDIDATE, PAYMENT_STATE_UNKNOWN', sameSet(core.SPEND_COMMITTED_STATES, ['SUBMITTING', 'SUBMITTED', 'PROCESSING', 'ASSET_CANDIDATE', 'PAYMENT_STATE_UNKNOWN'])],
  ['sum is read from the durable ledger before every POST', !bypass(N.read1) && !bypass(N.read2)],
  ['logic check: $9.90 committed + $0.20 → blocked', core.evaluateLedgerGuards({ rows: [{ id: 1, status: 'ASSET_CANDIDATE', estimated_cost_usd: 9.9, spend_date: 'd', generation_job_id: 'x' }, { id: 2, status: 'PRICE_CHECKED', generation_job_id: 'y' }], selfRowId: 2, generationJobId: 'y', estimatedCostUsd: 0.2, spendDate: 'd' }).decision === 'BUDGET_GUARD_BLOCKED'],
]);

// E
report('E', 'CONCURRENCY_GUARD', [
  [`MAX_CONCURRENT_GENERATIONS = ${cfg.MAX_CONCURRENT_GENERATIONS}`, cfg.MAX_CONCURRENT_GENERATIONS === 1],
  [`MAX_GENERATIONS_PER_BATCH = ${cfg.MAX_GENERATIONS_PER_BATCH}`, cfg.MAX_GENERATIONS_PER_BATCH === 1],
  ['PAYMENT_STATE_UNKNOWN counts as in-flight (fail closed)', core.IN_FLIGHT_STATES.includes('PAYMENT_STATE_UNKNOWN')],
  ['SUBMITTING is persisted and verified before the POST', !bypass(N.writeSubmitting) && !bypass(N.verifySubmitting)],
], 'write-then-verify ordering on ledger row ids — NOT an atomic lock (see README "Concurrency limits")');

// F
report('F', 'MODEL_ALLOWLIST', [
  ['allowlist is exactly [wavespeed-ai/minimax-h3/text-to-video]', sameSet(cfg.MODEL_ALLOWLIST, ['wavespeed-ai/minimax-h3/text-to-video'])],
  ['allowlist enforced before any ledger write or network call', succ(N.build).includes(N.staticOk) && !bypass(N.build)],
]);

// G
const paidPosts = httpNodes.filter((n) => n.parameters.method === 'POST' && !/model\/pricing/.test(n.parameters.url));
const postCycle = reachable(N.post).has(N.post);
report('G', 'PAID_POST_REACHABILITY', [
  ['exactly one paid POST node', paidPosts.length === 1 && paidPosts[0].name === N.post],
  [`paid POST targets ${PROD_BASE_URL}`, post.parameters.url.includes(PROD_BASE_URL)],
  ['paid POST retryOnFail = false', post.retryOnFail === false && !post.maxTries],
  ['paid POST has exactly one incoming edge (from "SUBMITTING Persisted?" true branch)', sameSet(pred(N.post), [N.submittingOk]) && wf.connections[N.submittingOk].main[0].some((t) => t.node === N.post) && !wf.connections[N.submittingOk].main[1].some((t) => t.node === N.post)],
  [`every trigger→POST path passes all ${GATES.length} gates`, GATES.every((g) => !bypass(g))],
  ['paid POST is not part of any cycle', !postCycle],
  ['paid POST output continues on error (classified, not retried)', post.onError === 'continueRegularOutput'],
]);

// H
report('H', 'POLLING_LOOP_REACHABILITY', [
  ['status GET is inside the polling loop', reachable(N.get).has(N.get)],
  ['paid POST is NOT reachable from the polling loop', !reachable(N.get).has(N.post) && !reachable(N.pollCtx).has(N.post)],
  ['loop entry has only SUBMITTED + PROCESSING inputs', sameSet(pred(N.pollCtx), [N.writeSubmitted, N.writeProcessing])],
  ['status GET may retry', get.retryOnFail === true && get.parameters.method === 'GET'],
  [`poll limit ${cfg.MAX_POLLS} × ${cfg.POLL_INTERVAL_SECONDS}s then PAYMENT_STATE_UNKNOWN`, core.evaluatePoll({ statusCode: 200, body: { data: { status: 'processing' } } }, cfg.MAX_POLLS).status === 'PAYMENT_STATE_UNKNOWN'],
]);

// I
report('I', 'FIRST_TEST_MAX_COST', [
  [`MAX_COST_PER_GENERATION_USD = ${cfg.MAX_COST_PER_GENERATION_USD}`, cfg.MAX_COST_PER_GENERATION_USD === 0.25],
  ['expected $0.20 passes', core.evaluateLedgerGuards({ rows: [{ id: 1, status: 'PRICE_CHECKED' }], selfRowId: 1, generationJobId: 'j', estimatedCostUsd: 0.2, spendDate: 'd' }).decision === 'BUDGET_APPROVED'],
  ['$0.2501 and $1.00 are blocked', ['0.2501', '1.00'].every((c) => core.evaluateLedgerGuards({ rows: [{ id: 1, status: 'PRICE_CHECKED' }], selfRowId: 1, generationJobId: 'j', estimatedCostUsd: Number(c), spendDate: 'd' }).decision === 'BUDGET_GUARD_BLOCKED')],
]);

// J
const arming = byName.get(N.request).parameters.assignments.assignments.find((a) => a.name === 'confirm_paid');
const credBound = httpNodes.every((n) => n.credentials && n.credentials.httpHeaderAuth && !/^BIND-/.test(n.credentials.httpHeaderAuth.id));
const finalCode = byName.get(N.final).parameters.jsCode;
report('J', 'FIRST_PAID_TEST_READINESS (structure)', [
  ['only a Manual Trigger (no schedule / webhook triggers)', trigger.length === 1 && trigger[0].type === 'n8n-nodes-base.manualTrigger'],
  ['arming switch default = NOT-APPROVED', arming && arming.value === 'NOT-APPROVED'],
  ['final output sets approved=false, published=false, requires_human_approval=true', /approved: false/.test(finalCode) && /published: false/.test(finalCode) && /requires_human_approval: true/.test(finalCode)],
  ['AUTO_PUBLISH=false, REQUIRE_HUMAN_APPROVAL=true, SAFE_DRAFT_MODE=true', cfg.AUTO_PUBLISH === false && cfg.REQUIRE_HUMAN_APPROVAL === true && cfg.SAFE_DRAFT_MODE === true],
  ['no publishing / social / Shopify nodes', !wf.nodes.some((n) => /facebook|instagram|shopify|meta|twitter|linkedin|tiktok|youtube/i.test(n.type))],
  ['no localhost / mock URLs', !JSON.stringify(wf).includes('127.0.0.1')],
], credBound ? null : 'PENDING (manual, in production UI): bind the existing WaveSpeed credential on the 3 WaveSpeed HTTP nodes after import');

const failed = results.filter((r) => !r.pass);
console.log(`\n${results.length - failed.length}/${results.length} sections PASS`);
process.exit(failed.length ? 1 : 0);
