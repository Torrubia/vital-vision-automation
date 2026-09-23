# WaveSpeed Generation — Durable Ledger (n8n)

> **Status:** built and validated OFFLINE (no paid call made). Not yet imported into production n8n.
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
| `import-to-n8n.js` | Creates the Data Table and a NEW, INACTIVE workflow through the n8n public API. Plan-only unless you pass `--apply`. |
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

## Import into production (Lucy's Mac)

Prerequisites: n8n 2.23.2 running (`bash infrastructure/n8n/scripts/verify-n8n.sh`), plus an n8n API key (Settings → n8n API) with scopes `dataTable:list`, `dataTable:read`, `dataTable:create`, `workflow:list`, `workflow:read`, `workflow:create`. Export the key in your shell only; never commit it.

```bash
node infrastructure/n8n/wavespeed/validate-workflow.js          # must be 10/10 PASS
N8N_API_KEY=… node infrastructure/n8n/wavespeed/import-to-n8n.js          # plan (read-only)
N8N_API_KEY=… node infrastructure/n8n/wavespeed/import-to-n8n.js --apply  # create
```

The script refuses to overwrite a workflow with the same name. It never activates anything and never touches credentials. It deletes nothing, so the existing connection-test workflow stays until this one is validated.

Then, in the n8n UI:
1. Open the new workflow and bind the **existing** WaveSpeed credential on the 3 WaveSpeed HTTP nodes (Price Check, Paid POST, Status GET). If that credential isn't a Header Auth type, switch the node's *Generic Auth Type* to match it. Don't edit the credential itself.
2. Fill **Job Request** (`platform_concept_id`, `shot`, `model_inputs` with the approved prompt). Leave `confirm_paid = NOT-APPROVED`.
3. **Production dry run** (non-paid): execute. Expect `FAILED_CLEAN` / `DRY_RUN_COMPLETE`, a ledger row with `estimated_cost_usd ≈ 0.20`, and no paid POST. This proves the credential, the pricing endpoint response shape and the Data Table in production.
4. Only then, for the **first paid test**: set `confirm_paid = APPROVED-BY-LUCY` and execute once. Afterwards, set it back to `NOT-APPROVED`.

## Offline end-to-end test (scratch instance only)
Install `n8n@2.23.2` in a scratch folder and start it on a non-5678 port with its own `N8N_USER_FOLDER`. Create an owner and an API key, then start `test/mock-wavespeed-server.js`. Run `import-to-n8n.js --apply` against the scratch instance, then run `test/offline-e2e.js` (env vars are listed in its header). The runner refuses port 5678.
