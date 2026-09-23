#!/usr/bin/env node
// ============================================================
// Imports the ledger-guarded WaveSpeed workflow into n8n via the n8n
// PUBLIC API as a NEW, INACTIVE workflow, and creates the ledger Data Table.
//
// Production n8n: https://n8n.vitalvision.shop  (NOT localhost:5678)
//
//   N8N_BASE_URL=https://n8n.vitalvision.shop N8N_API_KEY=... \
//     node infrastructure/n8n/wavespeed/import-to-n8n.js \
//       --credential-name "WaveSpeed API - Vital Vision" \
//       --request infrastructure/n8n/wavespeed/dry-run-request.json            # PLAN ONLY (read-only)
//   ... same command + --apply                                                 # create table + workflow
//
// Env:
//   N8N_BASE_URL  required, no default.
//   N8N_API_KEY   n8n API key. Read from env only; never printed or written.
//                 Scopes: workflow:list, workflow:read, workflow:create, credential:list,
//                 dataTable:list, dataTable:read, dataTable:create.
//
// Guarantees:
//   - Plan mode performs GET requests only.
//   - Never overwrites or modifies an existing workflow (refuses if the name exists).
//   - Never activates anything.
//   - Never creates, updates or deletes credentials. It only LISTS credential
//     metadata (id, name, type; n8n never returns secrets there) to bind the
//     existing credential by exact name.
//   - Never deletes anything (the existing connection-test workflow is untouched).
//   - Creates the Data Table only if missing; if present, verifies its columns and aborts on mismatch.
//   - Forces confirm_paid = NOT-APPROVED in the imported workflow.
//   - Makes no WaveSpeed calls.
// ============================================================
'use strict';

const fs = require('fs');
const path = require('path');
const { N } = require('./build-workflow.js');
const core = require('./src/ledger-core.js');

const PRODUCTION_URL = 'https://n8n.vitalvision.shop';
const BASE = (process.env.N8N_BASE_URL || '').replace(/\/+$/, '');
const KEY = process.env.N8N_API_KEY || '';
const argv = process.argv.slice(2);
const APPLY = argv.includes('--apply');
const SCRATCH = argv.includes('--scratch');
const argValue = (flag) => { const i = argv.indexOf(flag); return i >= 0 ? argv[i + 1] : null; };
const CREDENTIAL_NAME = argValue('--credential-name');
const REQUEST_FILE = argValue('--request');
const WORKFLOW_FILE = (SCRATCH && argValue('--workflow-file')) || path.join(__dirname, '..', 'workflows', 'vv-wavespeed-generation-ledger-guarded.json');
const SCHEMA_FILE = path.join(__dirname, 'ledger-table-schema.json');
const WAVESPEED_HTTP_NODES = [N.price, N.post, N.get];
// Generic HTTP auth types the HTTP Request node can use with an existing credential.
const SUPPORTED_CREDENTIAL_TYPES = ['httpHeaderAuth', 'httpBearerAuth', 'httpQueryAuth', 'httpCustomAuth'];

function die(msg) { console.error(`ABORT: ${msg}`); process.exit(1); }

async function api(method, p, body) {
  let res;
  try {
    res = await fetch(`${BASE}/api/v1${p}`, {
      method,
      headers: { 'X-N8N-API-KEY': KEY, accept: 'application/json', ...(body ? { 'content-type': 'application/json' } : {}) },
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch (e) { die(`${method} /api/v1${p} → network error: ${e.cause ? e.cause.code || e.cause.message : e.message}`); }
  const text = await res.text();
  let json; try { json = text ? JSON.parse(text) : {}; } catch (e) { json = { raw: text.slice(0, 300) }; }
  if (!res.ok) die(`${method} /api/v1${p} → HTTP ${res.status}: ${JSON.stringify(json).slice(0, 400)}`);
  return json;
}

async function listAll(p) {
  const out = [];
  let cursor;
  do {
    const sep = p.includes('?') ? '&' : '?';
    const page = await api('GET', `${p}${sep}limit=100${cursor ? `&cursor=${encodeURIComponent(cursor)}` : ''}`);
    out.push(...(page.data || []));
    cursor = page.nextCursor;
  } while (cursor);
  return out;
}

function applyRequest(wf, request) {
  const set = wf.nodes.find((n) => n.name === N.request);
  const allowed = ['platform_concept_id', 'shot', 'variant', 'model', 'model_inputs'];
  for (const k of Object.keys(request)) if (!allowed.includes(k)) die(`--request: unexpected field "${k}" (confirm_paid cannot be set here)`);
  for (const a of set.parameters.assignments.assignments) {
    if (a.name in request) a.value = a.name === 'model_inputs' && typeof request[a.name] !== 'string' ? JSON.stringify(request[a.name]) : request[a.name];
  }
}

function bindCredential(wf, cred) {
  for (const name of WAVESPEED_HTTP_NODES) {
    const node = wf.nodes.find((n) => n.name === name);
    node.parameters.authentication = 'genericCredentialType';
    node.parameters.genericAuthType = cred.type;
    node.credentials = { [cred.type]: { id: cred.id, name: cred.name } };
  }
}

async function main() {
  if (!BASE) die(`N8N_BASE_URL is not set. Production is ${PRODUCTION_URL}.`);
  if (/localhost|127\.0\.0\.1/.test(BASE) && !SCRATCH) die('localhost is not production. Pass --scratch only for an offline scratch instance.');
  if (!KEY) die('N8N_API_KEY is not set (export it in your shell or environment secrets; never commit it).');

  const wf = JSON.parse(fs.readFileSync(WORKFLOW_FILE, 'utf8'));
  const schema = JSON.parse(fs.readFileSync(SCHEMA_FILE, 'utf8'));
  if (!SCRATCH && (/OFFLINE MOCK/.test(wf.name) || JSON.stringify(wf).includes('127.0.0.1'))) die('refusing to import the offline mock variant');

  // Arming switch is forced to NOT-APPROVED regardless of what the file says.
  const arming = wf.nodes.find((n) => n.name === N.request).parameters.assignments.assignments.find((a) => a.name === 'confirm_paid');
  arming.value = 'NOT-APPROVED';
  if (REQUEST_FILE) applyRequest(wf, JSON.parse(fs.readFileSync(REQUEST_FILE, 'utf8')));

  console.log(`n8n: ${BASE}   mode: ${APPLY ? 'APPLY' : 'PLAN ONLY (GET requests only)'}`);

  // 0. Snapshot of existing workflows (to prove nothing else changes).
  const before = await listAll('/workflows');
  console.log(`Existing workflows: ${before.length} (active: ${before.filter((w) => w.active).length}) — none will be modified`);
  for (const w of before) console.log(`   - ${w.id}  active=${w.active}  ${w.name}`);

  // 1. Credential (metadata only).
  let cred = null;
  if (CREDENTIAL_NAME) {
    const creds = (await listAll('/credentials')).filter((c) => c.name === CREDENTIAL_NAME);
    if (creds.length !== 1) die(`expected exactly 1 credential named "${CREDENTIAL_NAME}", found ${creds.length}`);
    cred = { id: creds[0].id, name: creds[0].name, type: creds[0].type };
    if (!SUPPORTED_CREDENTIAL_TYPES.includes(cred.type)) die(`credential "${cred.name}" has type ${cred.type}; supported: ${SUPPORTED_CREDENTIAL_TYPES.join(', ')} — bind it manually in the UI instead`);
    bindCredential(wf, cred);
    console.log(`Credential "${cred.name}": found (id ${cred.id}, type ${cred.type}) — will be REFERENCED on ${WAVESPEED_HTTP_NODES.length} nodes, not modified`);
  } else {
    console.log('Credential: not bound (no --credential-name) — bind manually in the UI');
  }

  // 2. Data Table.
  const tables = await listAll('/data-tables');
  const existing = tables.find((t) => t.name === schema.name);
  if (existing) {
    const detail = existing.columns ? existing : await api('GET', `/data-tables/${existing.id}`);
    const have = new Map((detail.columns || []).map((c) => [c.name, c.type]));
    const bad = schema.columns.filter((c) => have.get(c.name) !== c.type);
    if (bad.length) die(`data table "${schema.name}" exists but columns differ: ${bad.map((c) => `${c.name}:${c.type}`).join(', ')}`);
    console.log(`Data table ${schema.name}: EXISTS (id ${existing.id}) — columns verified, will be reused`);
  } else {
    console.log(`Data table ${schema.name}: MISSING — will be created with ${schema.columns.length} columns`);
  }

  // 3. Workflow (never overwrite).
  const clash = before.filter((w) => w.name === wf.name);
  if (clash.length) die(`a workflow named "${wf.name}" already exists (id ${clash.map((w) => w.id).join(', ')}). Not overwriting.`);
  const req = Object.fromEntries(wf.nodes.find((n) => n.name === N.request).parameters.assignments.assignments.map((a) => [a.name, a.value]));
  console.log(`Workflow "${wf.name}": not present — will be created INACTIVE`);
  console.log(`   Job Request: ${JSON.stringify(req)}`);
  const reqCheck = core.validateJobRequests([req]);
  console.log(`   Job Request static guards: ${reqCheck.ok ? 'PASS' : 'FAIL — ' + reqCheck.reason}`);
  if (APPLY && !reqCheck.ok) die('Job Request would be rejected before the ledger; supply valid values with --request');

  if (!APPLY) { console.log('\nPlan only — nothing was changed. Re-run with --apply after approval.'); return; }

  if (!existing) {
    const created = await api('POST', '/data-tables', { name: schema.name, columns: schema.columns });
    console.log(`Created data table ${schema.name} (id ${created.id})`);
  }
  const createdWf = await api('POST', '/workflows', { name: wf.name, nodes: wf.nodes, connections: wf.connections, settings: wf.settings });
  const deployed = await api('GET', `/workflows/${createdWf.id}`);
  if (deployed.active) die(`workflow ${createdWf.id} reports active=true — deactivate it in the UI immediately`);
  console.log(`Created workflow ${createdWf.id} — active=${deployed.active}`);

  // Post-import verification: deployed copy matches what was validated.
  const mismatched = wf.nodes.filter((n) => {
    const d = deployed.nodes.find((x) => x.name === n.name);
    return !d || JSON.stringify(d.parameters) !== JSON.stringify(n.parameters) || JSON.stringify(d.credentials || null) !== JSON.stringify(n.credentials || null);
  }).map((n) => n.name);
  const connOk = JSON.stringify(deployed.connections) === JSON.stringify(wf.connections);
  const exportPath = path.join(__dirname, '..', 'backups', `wavespeed-deployed-${createdWf.id}.json`); // gitignored
  fs.mkdirSync(path.dirname(exportPath), { recursive: true });
  fs.writeFileSync(exportPath, JSON.stringify({ name: deployed.name, nodes: deployed.nodes, connections: deployed.connections, settings: deployed.settings }, null, 2) + '\n');
  console.log(`Deployed copy: nodes ${mismatched.length ? 'MISMATCH: ' + mismatched.join(', ') : 'identical'} · connections ${connOk ? 'identical' : 'MISMATCH'}`);
  console.log(`Exported deployed copy → ${path.relative(process.cwd(), exportPath)} (run validate-workflow.js on it)`);

  const after = await listAll('/workflows');
  const changed = before.filter((b) => { const a = after.find((x) => x.id === b.id); return !a || a.active !== b.active || a.name !== b.name || a.updatedAt !== b.updatedAt; });
  console.log(`Pre-existing workflows changed: ${changed.length === 0 ? 'none' : changed.map((w) => w.id).join(', ')}`);
  if (mismatched.length || !connOk || changed.length) die('post-import verification failed — do NOT run the workflow; report this');
  console.log(`\nNext: open ${BASE}/workflow/${createdWf.id}, check confirm_paid = NOT-APPROVED, click "Execute workflow" once (dry run).`);
}

main().catch((e) => die(e && e.message ? e.message : String(e)));
