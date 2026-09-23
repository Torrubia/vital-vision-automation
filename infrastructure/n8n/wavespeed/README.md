# WaveSpeed Generation — Durable Ledger (n8n)

> **Status:** built and validated OFFLINE (no paid call made). Not yet imported into production n8n (`https://n8n.vitalvision.shop`).
> `AUTO_PUBLISH=false` | `REQUIRE_HUMAN_APPROVAL=true` | `SAFE_DRAFT_MODE=true`

Production workflow: `infrastructure/n8n/workflows/vv-wavespeed-generation-ledger-guarded.json`
(**generated**: edit `src/ledger-core.js` / `build-workflow.js`, then rebuild. Don't hand-edit the JSON.)

Durable store: n8n Data Table **`vv_wavespeed_generation_ledger`** (`ledger-table-schema.json`).
Workflow static data is **not** used for any ledger, spend or lock state.

---

## Files

| File | Purpose |
|---|---|
| `src/ledger-core.js` | Guard logic and first-test limits (single source of truth). Inlined into the n8n Code nodes at build time. |
| `build-workflow.js` | Generates the importable workflow JSON. |
| `ledger-table-schema.json` | Data Table columns. |
| `validate-workflow.js` | Non-paid structural validation (report items A–J). |
| `import-to-n8n.js` | Creates the Data Table and a NEW, INACTIVE workflow through the n8n public API, binding the existing credential by name. Plan-only (GET) unless you pass `--apply`. |
| `verify-dry-run.js` | Read-only verification of the single production dry run. |
| `dry-run-request.example.json` | Template for the Job Request values used at import. |
| `test/ledger-core.test.js` | Unit tests for the guards. |
| `test/mock-wavespeed-server.js`, `test/offline-e2e.js` | End-to-end test against a **scratch** n8n instance and a local mock. Never production. |

```bash
npm run wavespeed:build      # regenerate workflow JSON
npm run wavespeed:test       # unit tests
npm run wavespeed:validate   # structural A–J validation
```

---

## First-test limits (`src/ledger-core.js` → `LEDGER_CONFIG`)

| Setting | Value |
|---|---|
| `MAX_COST_PER_GENERATION_USD` | **0.25** (the expected price is ~$0.20) |
| `MAX_DAILY_WAVESPEED_SPEND_USD` | 10.00 |
| `MAX_GENERATIONS_PER_BATCH` | 1 |
| `MAX_CONCURRENT_GENERATIONS` | 1 |
| `MODEL_ALLOWLIST` | `wavespeed-ai/minimax-h3/text-to-video` only |
| Arming switch | `confirm_paid` defaults to `NOT-APPROVED`; only `APPROVED-BY-LUCY` arms the paid POST |

After the first paid test is validated, raise `MAX_CONCURRENT_GENERATIONS` to 3 and increase the batch limit in `ledger-core.js`. Then rebuild, re-validate and re-import. Also replace the per-generation arming switch with the automated guards (allowlist + price + budget + ledger). Human approval for **publishing** stays.

---

## Flow

```
Manual Trigger → Job Request → Build Job + Static Guards (batch ≤1, allowlist, no placeholders)
  → Ledger: Insert CREATED  (every attempt gets its own row; row id orders attempts)
  → Price Check (NON-PAID, retry ok) → PRICE_CHECKED
  → Read ledger → Guards: duplicate → concurrency → $0.25 ceiling → $10/day → BUDGET_APPROVED
  → Arming switch (NOT-APPROVED ⇒ dry run ends FAILED_CLEAN, nothing billed)
  → Re-read ledger → Re-check guards
  → Ledger: Write SUBMITTING → verify it persisted
  → PAID POST (single attempt, retryOnFail=false, one incoming edge, not in any loop)
  → classify: accepted → SUBMITTED | clean 4xx → FAILED_CLEAN | anything uncertain → PAYMENT_STATE_UNKNOWN
  → poll loop (GET only, retries ok): PROCESSING … → ASSET_CANDIDATE
       remote failure / 40 polls → PAYMENT_STATE_UNKNOWN
  → Ledger: Write Terminal State → Final Result (approved=false, published=false, requires_human_approval=true)
```

### States
`CREATED` → `PRICE_CHECKED` → `BUDGET_APPROVED` → `SUBMITTING` → `SUBMITTED` → `PROCESSING` → `ASSET_CANDIDATE`

Terminal alternatives: `FAILED_CLEAN`, `PAYMENT_STATE_UNKNOWN`, `BUDGET_GUARD_BLOCKED`, `DUPLICATE_GENERATION_BLOCKED`, and **`CONCURRENCY_GUARD_BLOCKED`**. The last one is extra, so a concurrency refusal isn't mislabelled as a budget block.

Each row stores its full transition history in `state_history` (JSON array with timestamps).

### Guard rules
- **Duplicate:** another row with the same `generation_job_id` in `SUBMITTING`, `SUBMITTED`, `PROCESSING`, `COMPLETED`, `ASSET_CANDIDATE` or `PAYMENT_STATE_UNKNOWN` → `DUPLICATE_GENERATION_BLOCKED`. `generation_job_id = wsg__<concept>__<shot>__<model>__v<variant>`. A deliberate regeneration bumps `variant`.
- **Daily spend:** sums `estimated_cost_usd` of today's rows (`spend_date`, workflow timezone) in `SUBMITTING`, `SUBMITTED`, `PROCESSING`, `ASSET_CANDIDATE`, `PAYMENT_STATE_UNKNOWN`. A committed row with a missing cost counts as $0.25 (fail closed).
- **Price:** uses `discounted_price` when present, else `unit_price`. Any unparseable or non-USD price → `FAILED_CLEAN` with no paid POST.

---

## Concurrency limits (read this)

n8n Data Tables have **no unique constraints, transactions or compare-and-set**, so this is **not an atomic lock**.

The guard is a *write-then-verify* claim. Every attempt inserts its own row first, then reads the whole ledger. It yields if any **other** row is in flight (`SUBMITTING`, `SUBMITTED`, `PROCESSING`, `PAYMENT_STATE_UNKNOWN`), or if an **older (lower id)** row is still alive pre-claim. It re-checks right before writing `SUBMITTING`, and the POST runs only after that write is confirmed.

- This is sound when row ids are assigned in commit order. That holds for the default **SQLite** backend (single writer), which is what the Docker instance uses.
- On **Postgres**, ids can commit out of order, so two attempts could both pass. This is not guaranteed there.
- Offline race test: 3 armed executions started at the same instant → 1 paid POST, 2 `CONCURRENCY_GUARD_BLOCKED`, never >1 live prediction.

**For the first rollout, `MAX_CONCURRENT_GENERATIONS=1` and the trigger is manual-only.** Do not claim atomic safety. Revisit before raising concurrency on a Postgres backend or adding a schedule.

**Fail-closed consequence:** a row stuck in a live state (`CREATED` … `SUBMITTING`, e.g. after a crash) blocks all new paid work until a human reconciles it. So does a row in `SUBMITTED`/`PROCESSING` after a timeout, or any `PAYMENT_STATE_UNKNOWN` row.

### Manual reconciliation
1. Check the WaveSpeed dashboard for the row's `prediction_id` / time window.
2. In the n8n Data Table UI, set `status` to the truth: `ASSET_CANDIDATE` (+ `asset_url`) if it produced output, or `FAILED_CLEAN` if it was never charged. Leave it as `PAYMENT_STATE_UNKNOWN` if still unsure. Add a note in `last_reason`.
3. Never re-run a `PAYMENT_STATE_UNKNOWN` job by bumping `variant` until it is reconciled.

---

## Production deployment — `https://n8n.vitalvision.shop` (VPS)

Production n8n is **`https://n8n.vitalvision.shop`**, not `localhost:5678`. Every step below that writes
to production needs Lucy's explicit approval first (D-039). The existing credential
**`WaveSpeed API - Vital Vision`** is referenced by name and never recreated or modified.

API key scopes (least privilege; there are no update, delete or activate scopes):
`workflow:list` `workflow:read` `workflow:create` `credential:list` `dataTable:list` `dataTable:read`
`dataTable:create` `execution:list` `execution:read` `dataTableRow:read`

```bash
export N8N_BASE_URL=https://n8n.vitalvision.shop     # N8N_API_KEY comes from the shell / environment secrets
cp infrastructure/n8n/wavespeed/dry-run-request.example.json /tmp/dry-run-request.json   # fill in real values
node infrastructure/n8n/wavespeed/validate-workflow.js                                   # must be 10/10
node infrastructure/n8n/wavespeed/import-to-n8n.js --credential-name "WaveSpeed API - Vital Vision" --request /tmp/dry-run-request.json           # PLAN (GET only)
node infrastructure/n8n/wavespeed/import-to-n8n.js --credential-name "WaveSpeed API - Vital Vision" --request /tmp/dry-run-request.json --apply   # after approval
# one dry run: open the workflow in the UI, check confirm_paid = NOT-APPROVED, click "Execute workflow" once
node infrastructure/n8n/wavespeed/verify-dry-run.js --workflow-id <id> --credential-name "WaveSpeed API - Vital Vision"   # GET only
```

`import-to-n8n.js --apply` creates the Data Table if it's missing, then a NEW workflow as INACTIVE. It
forces `confirm_paid = NOT-APPROVED` and binds the credential on the 3 WaveSpeed HTTP nodes. It then
confirms the deployed copy is identical to the validated build and that no pre-existing workflow changed.
It refuses to overwrite a same-named workflow, and it never activates, deletes, or writes credentials.

The dry run makes the free price check only. It ends at the arming switch as `FAILED_CLEAN`
(`DRY_RUN_COMPLETE`) before `SUBMITTING`, so the paid POST can't be reached.

## Offline end-to-end test (scratch instance only)
Install `n8n@2.23.2` in a scratch folder and start it on a non-5678 port with its own `N8N_USER_FOLDER`. Create an owner and an API key, then start `test/mock-wavespeed-server.js`. Run `import-to-n8n.js --scratch --apply` against the scratch instance, then run `test/offline-e2e.js` (env vars are listed in its header). The runner refuses the production host.
