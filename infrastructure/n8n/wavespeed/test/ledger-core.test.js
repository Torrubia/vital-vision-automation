// Offline unit tests for the WaveSpeed ledger guard logic.
// Run: node --test infrastructure/n8n/wavespeed/test/ledger-core.test.js
// No network. No credentials. No paid calls.
const test = require('node:test');
const assert = require('node:assert/strict');
const core = require('../src/ledger-core.js');

const { LEDGER_CONFIG: cfg, STATES } = core;
const TODAY = '2026-09-23';
const JOB = 'wsg__concept-1__shot-a__wavespeed-ai-minimax-h3-text-to-video__v1';

function row(id, status, extra = {}) {
  return { id, generation_job_id: `other-${id}`, status, estimated_cost_usd: 0.2, spend_date: TODAY, ...extra };
}
const self = (extra = {}) => row(100, 'PRICE_CHECKED', { generation_job_id: JOB, ...extra });
const guard = (rows, cost = 0.2) =>
  core.evaluateLedgerGuards({ rows, selfRowId: 100, generationJobId: JOB, estimatedCostUsd: cost, spendDate: TODAY });

test('first-test limits are the approved values', () => {
  assert.equal(cfg.MAX_COST_PER_GENERATION_USD, 0.25);
  assert.equal(cfg.MAX_DAILY_WAVESPEED_SPEND_USD, 10.0);
  assert.equal(cfg.MAX_GENERATIONS_PER_BATCH, 1);
  assert.equal(cfg.MAX_CONCURRENT_GENERATIONS, 1);
  assert.deepEqual([...cfg.MODEL_ALLOWLIST], ['wavespeed-ai/minimax-h3/text-to-video']);
  assert.equal(cfg.AUTO_PUBLISH, false);
  assert.equal(cfg.REQUIRE_HUMAN_APPROVAL, true);
  assert.equal(cfg.SAFE_DRAFT_MODE, true);
});

test('job id is deterministic and variant-scoped', () => {
  const base = { platform_concept_id: 'Concept 1', shot: 'Shot A', model: 'wavespeed-ai/minimax-h3/text-to-video' };
  assert.equal(core.buildGenerationJobId(base), JOB);
  assert.equal(core.buildGenerationJobId({ ...base, variant: 1 }), JOB);
  assert.notEqual(core.buildGenerationJobId({ ...base, variant: 2 }), JOB);
});

test('static validation: batch limit, allowlist, inputs', () => {
  const ok = { platform_concept_id: 'c', shot: 's', model: 'wavespeed-ai/minimax-h3/text-to-video', model_inputs: '{"prompt":"x"}' };
  assert.equal(core.validateJobRequests([ok]).ok, true);
  assert.match(core.validateJobRequests([ok, ok]).reason, /BATCH_LIMIT_EXCEEDED/);
  assert.match(core.validateJobRequests([{ ...ok, model: 'wavespeed-ai/veo3' }]).reason, /MODEL_NOT_ALLOWLISTED/);
  assert.match(core.validateJobRequests([{ ...ok, model_inputs: 'nope' }]).reason, /NOT_JSON/);
  assert.match(core.validateJobRequests([{ ...ok, model_inputs: '{}' }]).reason, /MISSING_PROMPT/);
  assert.equal(core.validateJobRequests([]).ok, false);
  assert.match(core.validateJobRequests([{ ...ok, platform_concept_id: 'REPLACE-me' }]).reason, /PLACEHOLDER/);
  assert.match(core.validateJobRequests([{ ...ok, model_inputs: '{"prompt":"REPLACE with prompt"}' }]).reason, /PLACEHOLDER/);
});

test('price extraction prefers discounted_price and fails closed', () => {
  const p = core.extractPrice({ statusCode: 200, body: { code: 200, data: { unit_price: 0.3, discounted_price: 0.2, currency: 'USD' } } });
  assert.equal(p.ok, true);
  assert.equal(p.estimated_cost_usd, 0.2);
  assert.equal(core.extractPrice({ statusCode: 200, body: { data: { unit_price: 0.2 } } }).estimated_cost_usd, 0.2);
  assert.equal(core.extractPrice({ statusCode: 500, body: {} }).ok, false);
  assert.equal(core.extractPrice({ statusCode: 200, body: { data: {} } }).ok, false);
  assert.equal(core.extractPrice({ statusCode: 200, body: { data: { unit_price: 0.2, currency: 'EUR' } } }).ok, false);
  assert.equal(core.extractPrice({}).ok, false);
});

test('clean ledger with $0.20 job → BUDGET_APPROVED', () => {
  const r = guard([self()]);
  assert.equal(r.decision, STATES.BUDGET_APPROVED);
  assert.equal(r.projected_today_usd, 0.2);
});

test('duplicate protection blocks on every blocking state', () => {
  for (const s of ['SUBMITTING', 'SUBMITTED', 'PROCESSING', 'COMPLETED', 'ASSET_CANDIDATE', 'PAYMENT_STATE_UNKNOWN']) {
    const r = guard([self(), row(5, s, { generation_job_id: JOB, spend_date: '2026-01-01' })]);
    assert.equal(r.decision, STATES.DUPLICATE_GENERATION_BLOCKED, s);
  }
});

test('duplicate protection allows a re-run after a clean/blocked prior attempt', () => {
  for (const s of ['FAILED_CLEAN', 'BUDGET_GUARD_BLOCKED', 'DUPLICATE_GENERATION_BLOCKED', 'CONCURRENCY_GUARD_BLOCKED']) {
    assert.equal(guard([self(), row(5, s, { generation_job_id: JOB })]).decision, STATES.BUDGET_APPROVED, s);
  }
});

test('concurrency: any other in-flight or unknown row blocks (limit 1)', () => {
  for (const s of ['SUBMITTING', 'SUBMITTED', 'PROCESSING', 'PAYMENT_STATE_UNKNOWN']) {
    assert.equal(guard([self(), row(5, s, { spend_date: '2026-01-01' })]).decision, STATES.CONCURRENCY_GUARD_BLOCKED, s);
  }
});

test('concurrency: older live pre-claim row wins, newer one yields to us', () => {
  assert.equal(guard([self(), row(99, 'CREATED')]).decision, STATES.CONCURRENCY_GUARD_BLOCKED);
  assert.equal(guard([self(), row(101, 'BUDGET_APPROVED')]).decision, STATES.BUDGET_APPROVED);
  // Mirror: the newer attempt (id 101) must yield to us (id 100).
  const mirror = core.evaluateLedgerGuards({
    rows: [self(), row(101, 'PRICE_CHECKED')], selfRowId: 101, generationJobId: 'other-101', estimatedCostUsd: 0.2, spendDate: TODAY,
  });
  assert.equal(mirror.decision, STATES.CONCURRENCY_GUARD_BLOCKED);
});

test('per-generation ceiling is $0.25', () => {
  assert.equal(guard([self()], 0.25).decision, STATES.BUDGET_APPROVED);
  assert.equal(guard([self()], 0.2501).decision, STATES.BUDGET_GUARD_BLOCKED);
  assert.equal(guard([self()], 1.0).decision, STATES.BUDGET_GUARD_BLOCKED);
  assert.equal(guard([self()], 0).decision, STATES.BUDGET_GUARD_BLOCKED);
  assert.equal(guard([self()], NaN).decision, STATES.BUDGET_GUARD_BLOCKED);
});

test('daily spend sums committed states for today only', () => {
  // 39 × 0.25 = 9.75 committed today in ASSET_CANDIDATE (terminal, not in flight).
  const committed = Array.from({ length: 39 }, (_, i) => row(i + 1, 'ASSET_CANDIDATE', { estimated_cost_usd: 0.25 }));
  assert.equal(guard([self(), ...committed], 0.25).decision, STATES.BUDGET_APPROVED); // 10.00 exactly
  const r = guard([self(), ...committed, row(60, 'ASSET_CANDIDATE', { estimated_cost_usd: 0.01 })], 0.25);
  assert.equal(r.decision, STATES.BUDGET_GUARD_BLOCKED);
  assert.match(r.reason, /DAILY_SPEND_EXCEEDED/);
  // Yesterday and non-committed states do not count.
  const noise = [
    ...Array.from({ length: 60 }, (_, i) => row(200 + i, 'ASSET_CANDIDATE', { spend_date: '2026-09-22' })),
    ...Array.from({ length: 60 }, (_, i) => row(300 + i, 'FAILED_CLEAN')),
    ...Array.from({ length: 60 }, (_, i) => row(400 + i, 'BUDGET_GUARD_BLOCKED')),
  ];
  assert.equal(guard([self(), ...noise]).decision, STATES.BUDGET_APPROVED);
});

test('daily spend: invalid cost on committed row counts as the ceiling', () => {
  const rows = Array.from({ length: 40 }, (_, i) => row(i + 1, 'ASSET_CANDIDATE', { estimated_cost_usd: '' }));
  assert.equal(guard([self(), ...rows], 0.2).decision, STATES.BUDGET_GUARD_BLOCKED);
});

test('missing own row fails clean', () => {
  assert.equal(guard([row(5, 'FAILED_CLEAN')]).decision, STATES.FAILED_CLEAN);
});

test('paid POST classification never marks uncertainty as clean', () => {
  assert.equal(core.classifyPostResult({ statusCode: 200, body: { code: 200, data: { id: 'p1', status: 'created' } } }).status, STATES.SUBMITTED);
  assert.equal(core.classifyPostResult({ statusCode: 200, body: { data: {} } }).status, STATES.PAYMENT_STATE_UNKNOWN);
  assert.equal(core.classifyPostResult({ statusCode: 500, body: { message: 'x' } }).status, STATES.PAYMENT_STATE_UNKNOWN);
  assert.equal(core.classifyPostResult({ statusCode: 502, body: '<html>' }).status, STATES.PAYMENT_STATE_UNKNOWN);
  assert.equal(core.classifyPostResult({ error: 'ETIMEDOUT' }).status, STATES.PAYMENT_STATE_UNKNOWN);
  assert.equal(core.classifyPostResult({}).status, STATES.PAYMENT_STATE_UNKNOWN);
  assert.equal(core.classifyPostResult({ statusCode: 400, body: '<html>' }).status, STATES.PAYMENT_STATE_UNKNOWN);
  assert.equal(core.classifyPostResult({ statusCode: 401, body: { message: 'unauthorized' } }).status, STATES.FAILED_CLEAN);
});

test('polling: completed → ASSET_CANDIDATE, failed/timeout → UNKNOWN, else continue', () => {
  const done = core.evaluatePoll({ statusCode: 200, body: { data: { status: 'completed', outputs: ['https://x/v.mp4'] } } }, 3);
  assert.equal(done.status, STATES.ASSET_CANDIDATE);
  assert.equal(done.asset_url, 'https://x/v.mp4');
  assert.equal(core.evaluatePoll({ statusCode: 200, body: { data: { status: 'completed', outputs: [] } } }, 3).action, 'CONTINUE');
  assert.equal(core.evaluatePoll({ statusCode: 200, body: { data: { status: 'failed' } } }, 3).status, STATES.PAYMENT_STATE_UNKNOWN);
  assert.equal(core.evaluatePoll({ statusCode: 200, body: { data: { status: 'processing' } } }, 3).action, 'CONTINUE');
  assert.equal(core.evaluatePoll({ statusCode: 503 }, 3).action, 'CONTINUE');
  const t = core.evaluatePoll({ statusCode: 200, body: { data: { status: 'processing' } } }, cfg.MAX_POLLS);
  assert.equal(t.status, STATES.PAYMENT_STATE_UNKNOWN);
});
