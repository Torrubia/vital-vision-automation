#!/usr/bin/env node
// ============================================================
// Imports the ledger-guarded WaveSpeed workflow into n8n via the
// n8n PUBLIC API — creating a NEW, INACTIVE workflow.
//
//   N8N_API_KEY=... node infrastructure/n8n/wavespeed/import-to-n8n.js            # plan only (read-only)
//   N8N_API_KEY=... node infrastructure/n8n/wavespeed/import-to-n8n.js --apply    # create table + workflow
//
// Env:
//   N8N_BASE_URL  default http://localhost:5678
//   N8N_API_KEY   n8n API key (Settings → n8n API). Read from env only; never printed or written.
//
// Guarantees:
//   - Never overwrites or modifies an existing workflow (refuses if the name already exists).
//   - Never activates anything. Never creates, reads or modifies credentials.
//   - Never deletes anything (the existing connection-test workflow is untouched).
//   - Creates the Data Table only if missing; if it exists, verifies its columns and aborts on mismatch.
//   - Makes no WaveSpeed calls.
// ============================================================
'use strict';

const fs = require('fs');
const path = require('path');

const BASE = (process.env.N8N_BASE_URL || 'http://localhost:5678').replace(/\/+$/, '');
const KEY = process.env.N8N_API_KEY || '';
const APPLY = process.argv.includes('--apply');
const WORKFLOW_FILE = path.join(__dirname, '..', 'workflows', 'vv-wavespeed-generation-ledger-guarded.json');
const SCHEMA_FILE = path.join(__dirname, 'ledger-table-schema.json');

function die(msg) { console.error(`ABORT: ${msg}`); process.exit(1); }

async function api(method, p, body) {
  const res = await fetch(`${BASE}/api/v1${p}`, {
    method,
    headers: { 'X-N8N-API-KEY': KEY, accept: 'application/json', ...(body ? { 'content-type': 'application/json' } : {}) },
    body: body ? JSON.stringify(body) : undefined,
  });
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

async function main() {
  if (!KEY) die('N8N_API_KEY is not set (export it in your shell; do not commit it).');
  const wf = JSON.parse(fs.readFileSync(WORKFLOW_FILE, 'utf8'));
  const schema = JSON.parse(fs.readFileSync(SCHEMA_FILE, 'utf8'));
  if (/OFFLINE MOCK/.test(wf.name)) die('refusing to import the offline mock variant');
  if (JSON.stringify(wf).includes('127.0.0.1')) die('workflow contains a localhost URL — rebuild without --mock-base-url');

  console.log(`n8n: ${BASE}   mode: ${APPLY ? 'APPLY' : 'PLAN ONLY (read-only)'}`);

  // 1. Data Table
  const tables = await listAll('/data-tables');
  const existing = tables.find((t) => t.name === schema.name);
  let tableAction;
  if (existing) {
    const detail = existing.columns ? existing : await api('GET', `/data-tables/${existing.id}`);
    const have = new Map((detail.columns || []).map((c) => [c.name, c.type]));
    const missing = schema.columns.filter((c) => have.get(c.name) !== c.type);
    if (missing.length) die(`data table "${schema.name}" exists but columns differ: ${missing.map((c) => `${c.name}:${c.type}`).join(', ')}`);
    tableAction = `EXISTS (id ${existing.id}) — columns verified`;
  } else {
    tableAction = 'MISSING — will be created';
  }
  console.log(`Data table ${schema.name}: ${tableAction}`);

  // 2. Workflow (never overwrite)
  const workflows = await listAll(`/workflows?name=${encodeURIComponent(wf.name)}`);
  const clash = workflows.filter((w) => w.name === wf.name);
  if (clash.length) die(`a workflow named "${wf.name}" already exists (id ${clash.map((w) => w.id).join(', ')}). Not overwriting. Rename or archive it in the UI first.`);
  console.log(`Workflow "${wf.name}": not present — will be created INACTIVE`);

  if (!APPLY) { console.log('\nPlan only. Re-run with --apply to create.'); return; }

  if (!existing) {
    const created = await api('POST', '/data-tables', { name: schema.name, columns: schema.columns });
    console.log(`Created data table ${schema.name} (id ${created.id})`);
  }
  const createdWf = await api('POST', '/workflows', { name: wf.name, nodes: wf.nodes, connections: wf.connections, settings: wf.settings });
  const check = await api('GET', `/workflows/${createdWf.id}`);
  if (check.active) die(`workflow ${createdWf.id} reports active=true — deactivate it in the UI immediately`);
  console.log(`Created workflow ${createdWf.id} — active=${check.active}`);
  console.log('\nNext (in the n8n UI): bind the EXISTING WaveSpeed credential on the 3 WaveSpeed HTTP nodes. Do not edit the credential itself.');
}

main().catch((e) => die(e && e.message ? e.message : String(e)));
