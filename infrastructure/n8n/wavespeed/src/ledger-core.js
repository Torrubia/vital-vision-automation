// ============================================================
// VITAL VISION — WAVESPEED GENERATION LEDGER CORE
// Pure guard logic shared by the n8n Code nodes (inlined at build time
// by build-workflow.js) and by the offline unit tests.
//
// No network calls. No credentials. No side effects.
// The durable ledger itself is the n8n Data Table `vv_wavespeed_generation_ledger`;
// these functions only DECIDE — the Data Table nodes PERSIST.
//
// AUTO_PUBLISH=false | REQUIRE_HUMAN_APPROVAL=true | SAFE_DRAFT_MODE=true
// ============================================================

const LEDGER_CONFIG = Object.freeze({
  LEDGER_TABLE_NAME: 'vv_wavespeed_generation_ledger',
  // First paid production test limits. Raise only after the first paid test
  // is validated (see infrastructure/n8n/wavespeed/README.md).
  MAX_COST_PER_GENERATION_USD: 0.25,
  MAX_DAILY_WAVESPEED_SPEND_USD: 10.0,
  MAX_GENERATIONS_PER_BATCH: 1,
  MAX_CONCURRENT_GENERATIONS: 1,
  MODEL_ALLOWLIST: Object.freeze(['wavespeed-ai/minimax-h3/text-to-video']),
  // First-test arming switch. The Job Request default is NOT-APPROVED.
  ARMING_VALUE: 'APPROVED-BY-LUCY',
  // Status polling (GET only — never the paid POST).
  POLL_INTERVAL_SECONDS: 15,
  MAX_POLLS: 40,
  AUTO_PUBLISH: false,
  REQUIRE_HUMAN_APPROVAL: true,
  SAFE_DRAFT_MODE: true,
});

const STATES = Object.freeze({
  CREATED: 'CREATED',
  PRICE_CHECKED: 'PRICE_CHECKED',
  BUDGET_APPROVED: 'BUDGET_APPROVED',
  SUBMITTING: 'SUBMITTING',
  SUBMITTED: 'SUBMITTED',
  PROCESSING: 'PROCESSING',
  ASSET_CANDIDATE: 'ASSET_CANDIDATE',
  FAILED_CLEAN: 'FAILED_CLEAN',
  PAYMENT_STATE_UNKNOWN: 'PAYMENT_STATE_UNKNOWN',
  BUDGET_GUARD_BLOCKED: 'BUDGET_GUARD_BLOCKED',
  DUPLICATE_GENERATION_BLOCKED: 'DUPLICATE_GENERATION_BLOCKED',
  // Added beyond the requested list so a concurrency refusal is not
  // mislabelled as a budget or duplicate block. Terminal, never billed.
  CONCURRENCY_GUARD_BLOCKED: 'CONCURRENCY_GUARD_BLOCKED',
});

// An existing row for the same generation_job_id in any of these states
// blocks a new paid POST (DUPLICATE_GENERATION_BLOCKED).
const DUPLICATE_BLOCKING_STATES = Object.freeze([
  'SUBMITTING', 'SUBMITTED', 'PROCESSING', 'COMPLETED', 'ASSET_CANDIDATE', 'PAYMENT_STATE_UNKNOWN',
]);

// Rows in these states count toward today's committed/estimated spend.
const SPEND_COMMITTED_STATES = Object.freeze([
  'SUBMITTING', 'SUBMITTED', 'PROCESSING', 'ASSET_CANDIDATE', 'PAYMENT_STATE_UNKNOWN',
]);

// A paid request may be live at WaveSpeed. PAYMENT_STATE_UNKNOWN is included
// (fail closed): nothing new is submitted until a human reconciles it.
const IN_FLIGHT_STATES = Object.freeze([
  'SUBMITTING', 'SUBMITTED', 'PROCESSING', 'PAYMENT_STATE_UNKNOWN',
]);

// Attempts that are alive but have not yet claimed a paid slot.
const PRE_CLAIM_STATES = Object.freeze(['CREATED', 'PRICE_CHECKED', 'BUDGET_APPROVED']);

const TERMINAL_STATES = Object.freeze([
  'ASSET_CANDIDATE', 'FAILED_CLEAN', 'PAYMENT_STATE_UNKNOWN',
  'BUDGET_GUARD_BLOCKED', 'DUPLICATE_GENERATION_BLOCKED', 'CONCURRENCY_GUARD_BLOCKED',
]);

function toMoney(n) {
  return Math.round(Number(n) * 10000) / 10000;
}

function slug(value) {
  return String(value == null ? '' : value)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Deterministic, human-readable job id. Same concept + shot + model + variant
// always yields the same id, so a re-run is recognised as a duplicate.
// A deliberate regeneration must bump `variant`.
function buildGenerationJobId({ platform_concept_id, shot, model, variant }) {
  const v = Number.isInteger(Number(variant)) && Number(variant) > 0 ? Number(variant) : 1;
  return ['wsg', slug(platform_concept_id), slug(shot), slug(model), `v${v}`].join('__');
}

// Static (pre-ledger) validation of the job request batch.
function validateJobRequests(requests, cfg = LEDGER_CONFIG) {
  if (!Array.isArray(requests) || requests.length === 0) {
    return { ok: false, reason: 'EMPTY_BATCH' };
  }
  if (requests.length > cfg.MAX_GENERATIONS_PER_BATCH) {
    return { ok: false, reason: `BATCH_LIMIT_EXCEEDED (${requests.length} > ${cfg.MAX_GENERATIONS_PER_BATCH})` };
  }
  const r = requests[0] || {};
  for (const field of ['platform_concept_id', 'shot', 'model']) {
    if (!String(r[field] || '').trim()) return { ok: false, reason: `MISSING_FIELD:${field}` };
    if (/REPLACE/i.test(String(r[field]))) return { ok: false, reason: `PLACEHOLDER_NOT_REPLACED:${field}` };
  }
  if (!cfg.MODEL_ALLOWLIST.includes(String(r.model).trim())) {
    return { ok: false, reason: `MODEL_NOT_ALLOWLISTED:${r.model}` };
  }
  let inputs = r.model_inputs;
  if (typeof inputs === 'string') {
    try { inputs = JSON.parse(inputs); } catch (e) { return { ok: false, reason: 'MODEL_INPUTS_NOT_JSON' }; }
  }
  if (!inputs || typeof inputs !== 'object' || Array.isArray(inputs)) {
    return { ok: false, reason: 'MODEL_INPUTS_NOT_OBJECT' };
  }
  if (!String(inputs.prompt || '').trim()) return { ok: false, reason: 'MODEL_INPUTS_MISSING_PROMPT' };
  if (/REPLACE/i.test(JSON.stringify(inputs))) return { ok: false, reason: 'PLACEHOLDER_NOT_REPLACED:model_inputs' };
  return { ok: true, request: { ...r, model: String(r.model).trim(), model_inputs: inputs } };
}

// Parse the (non-paid) WaveSpeed pricing response. Uses discounted_price when
// present (what is billed), otherwise unit_price. Anything unparseable → null,
// which the workflow treats as FAILED_CLEAN (no paid POST).
function extractPrice(httpResult) {
  const res = httpResult || {};
  const status = Number(res.statusCode || 0);
  if (status < 200 || status >= 300) return { ok: false, reason: `PRICE_HTTP_${status || 'NO_RESPONSE'}` };
  let body = res.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch (e) { body = null; } }
  const data = body && typeof body === 'object' ? (body.data && typeof body.data === 'object' ? body.data : body) : null;
  if (!data) return { ok: false, reason: 'PRICE_BODY_UNPARSEABLE' };
  const discounted = Number(data.discounted_price);
  const unit = Number(data.unit_price);
  const currency = String(data.currency || 'USD').toUpperCase();
  if (currency !== 'USD') return { ok: false, reason: `PRICE_CURRENCY_${currency}` };
  const price = Number.isFinite(discounted) && discounted > 0 ? discounted
    : (Number.isFinite(unit) && unit > 0 ? unit : NaN);
  if (!Number.isFinite(price) || price <= 0) return { ok: false, reason: 'PRICE_MISSING' };
  return {
    ok: true,
    estimated_cost_usd: toMoney(price),
    unit_price_usd: Number.isFinite(unit) ? toMoney(unit) : null,
    discounted_price_usd: Number.isFinite(discounted) ? toMoney(discounted) : null,
  };
}

// Core ledger decision. `rows` = every row currently in the durable ledger.
// `self` = this attempt's own ledger row id (inserted as CREATED at start).
//
// Concurrency uses a write-then-verify claim: every attempt inserts its own
// row FIRST, then reads the whole table. An attempt yields to any OTHER row
// that is in flight, and to any LOWER-id row that is still alive pre-claim.
// This is best-effort ordering, NOT an atomic lock — see README.
function evaluateLedgerGuards({ rows, selfRowId, generationJobId, estimatedCostUsd, spendDate, cfg = LEDGER_CONFIG }) {
  const all = Array.isArray(rows) ? rows : [];
  const selfId = Number(selfRowId);
  const others = all.filter((r) => Number(r.id) !== selfId);
  const selfRow = all.find((r) => Number(r.id) === selfId);

  if (!selfRow) {
    return { decision: STATES.FAILED_CLEAN, reason: 'OWN_LEDGER_ROW_NOT_FOUND' };
  }

  // 1. Duplicate protection.
  const dup = others.find((r) => r.generation_job_id === generationJobId && DUPLICATE_BLOCKING_STATES.includes(r.status));
  if (dup) {
    return {
      decision: STATES.DUPLICATE_GENERATION_BLOCKED,
      reason: `EXISTING_ROW id=${dup.id} status=${dup.status}`,
    };
  }

  // 2. Concurrency.
  const inFlight = others.filter((r) => IN_FLIGHT_STATES.includes(r.status));
  const olderAlive = others.filter((r) => PRE_CLAIM_STATES.includes(r.status) && Number(r.id) < selfId);
  const occupied = inFlight.length + olderAlive.length;
  if (occupied >= cfg.MAX_CONCURRENT_GENERATIONS) {
    return {
      decision: STATES.CONCURRENCY_GUARD_BLOCKED,
      reason: `SLOTS_OCCUPIED ${occupied}/${cfg.MAX_CONCURRENT_GENERATIONS} (in_flight=${inFlight.map((r) => r.id).join(',') || '-'} older_alive=${olderAlive.map((r) => r.id).join(',') || '-'})`,
    };
  }

  // 3. Per-generation ceiling.
  const cost = Number(estimatedCostUsd);
  if (!Number.isFinite(cost) || cost <= 0) {
    return { decision: STATES.BUDGET_GUARD_BLOCKED, reason: 'ESTIMATED_COST_INVALID' };
  }
  if (cost > cfg.MAX_COST_PER_GENERATION_USD) {
    return {
      decision: STATES.BUDGET_GUARD_BLOCKED,
      reason: `COST_ABOVE_CEILING ${cost} > ${cfg.MAX_COST_PER_GENERATION_USD}`,
    };
  }

  // 4. Daily spend. Missing/invalid cost on a committed row counts as the
  //    per-generation ceiling (fail closed).
  const committedToday = others.filter((r) => r.spend_date === spendDate && SPEND_COMMITTED_STATES.includes(r.status));
  const spentToday = toMoney(committedToday.reduce((sum, r) => {
    const c = Number(r.estimated_cost_usd);
    return sum + (Number.isFinite(c) && c > 0 ? c : cfg.MAX_COST_PER_GENERATION_USD);
  }, 0));
  const projected = toMoney(spentToday + cost);
  if (projected > cfg.MAX_DAILY_WAVESPEED_SPEND_USD) {
    return {
      decision: STATES.BUDGET_GUARD_BLOCKED,
      reason: `DAILY_SPEND_EXCEEDED ${spentToday} + ${cost} = ${projected} > ${cfg.MAX_DAILY_WAVESPEED_SPEND_USD}`,
      spent_today_usd: spentToday,
      projected_today_usd: projected,
    };
  }

  return {
    decision: STATES.BUDGET_APPROVED,
    reason: 'ALL_LEDGER_GUARDS_PASSED',
    spent_today_usd: spentToday,
    projected_today_usd: projected,
  };
}

// Classify the single paid POST. Only an explicit, well-formed 4xx rejection
// is treated as clean (not charged). Everything uncertain → PAYMENT_STATE_UNKNOWN.
// The workflow NEVER retries the paid POST, whatever this returns.
function classifyPostResult(httpResult) {
  const res = httpResult || {};
  const status = Number(res.statusCode || 0);
  let body = res.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch (e) { /* keep string */ } }
  const data = body && typeof body === 'object' && body.data && typeof body.data === 'object' ? body.data : null;
  const predictionId = data && data.id ? String(data.id) : '';

  if (status >= 200 && status < 300 && predictionId) {
    return { status: STATES.SUBMITTED, payment_state: 'COMMITTED_ESTIMATED', prediction_id: predictionId, reason: `HTTP_${status}` };
  }
  const CLEAN_REJECTIONS = [400, 401, 402, 403, 404, 422, 429];
  if (CLEAN_REJECTIONS.includes(status) && body && typeof body === 'object') {
    return { status: STATES.FAILED_CLEAN, payment_state: 'NOT_CHARGED_REJECTED', prediction_id: '', reason: `HTTP_${status}_REJECTED` };
  }
  return {
    status: STATES.PAYMENT_STATE_UNKNOWN,
    payment_state: 'UNKNOWN_RECONCILE_MANUALLY',
    prediction_id: predictionId,
    reason: status ? `UNCERTAIN_HTTP_${status}${predictionId ? '' : '_NO_PREDICTION_ID'}` : `NO_HTTP_RESPONSE${res.error ? ':' + String(res.error).slice(0, 200) : ''}`,
  };
}

// Evaluate one status GET. Returns the next action for the polling loop.
function evaluatePoll(httpResult, pollCount, cfg = LEDGER_CONFIG) {
  const res = httpResult || {};
  const status = Number(res.statusCode || 0);
  let body = res.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch (e) { body = null; } }
  const data = body && typeof body === 'object' && body.data && typeof body.data === 'object' ? body.data : null;
  const remote = data ? String(data.status || '').toLowerCase() : '';
  const outputs = data && Array.isArray(data.outputs) ? data.outputs.filter((o) => typeof o === 'string' && o) : [];

  if (status >= 200 && status < 300 && remote === 'completed' && outputs.length > 0) {
    return { action: 'FINAL', status: STATES.ASSET_CANDIDATE, payment_state: 'COMMITTED_ESTIMATED', asset_url: outputs[0], reason: 'REMOTE_COMPLETED' };
  }
  if (status >= 200 && status < 300 && remote === 'failed') {
    // The prediction was accepted. Whether a remote failure is billed is not
    // verified, so this is NOT marked clean.
    return { action: 'FINAL', status: STATES.PAYMENT_STATE_UNKNOWN, payment_state: 'UNKNOWN_RECONCILE_MANUALLY', asset_url: '', reason: `REMOTE_FAILED:${String((data && data.error) || '').slice(0, 200)}` };
  }
  if (pollCount >= cfg.MAX_POLLS) {
    return { action: 'FINAL', status: STATES.PAYMENT_STATE_UNKNOWN, payment_state: 'UNKNOWN_RECONCILE_MANUALLY', asset_url: '', reason: `POLL_LIMIT_REACHED (${pollCount})` };
  }
  return { action: 'CONTINUE', status: STATES.PROCESSING, payment_state: 'COMMITTED_ESTIMATED', asset_url: '', reason: `REMOTE_${remote || 'UNKNOWN'}_HTTP_${status || 'NONE'}` };
}

function appendHistory(history, status, reason, at) {
  const h = Array.isArray(history) ? history.slice() : [];
  h.push({ status, reason: reason || '', at });
  return h;
}

// @@EXPORTS — everything below is stripped when inlined into n8n Code nodes.
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    LEDGER_CONFIG, STATES, DUPLICATE_BLOCKING_STATES, SPEND_COMMITTED_STATES, IN_FLIGHT_STATES,
    PRE_CLAIM_STATES, TERMINAL_STATES, buildGenerationJobId, validateJobRequests, extractPrice,
    evaluateLedgerGuards, classifyPostResult, evaluatePoll, appendHistory, toMoney,
  };
}
