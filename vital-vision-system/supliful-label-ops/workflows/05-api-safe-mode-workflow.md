# Workflow 05: API Safe Mode Workflow

## Goal

Design and validate a safe, phased approach to integrating Supliful and Shopify APIs into the label operations workflow. Start with read-only operations and progressively unlock write capability only after each phase is validated and human-approved.

## When to Use

Use this workflow when:
- Planning future API integration for label operations
- Evaluating whether an API operation is safe to execute
- Deciding whether to move from one API phase to the next
- Responding to an incident involving an API action gone wrong

## Current Status

**Phase 1 — Read-Only Research** (current phase)

No live API calls are being made. Research only.

## API Integration Phases

### Phase 1 — Read-Only Research (Now)

**What is allowed:**
- Read Supliful documentation and API reference
- Read Shopify Admin API documentation
- Identify relevant endpoints for product and label data
- Document what each endpoint returns
- Build the `api/api-permissions-matrix.md`

**What is NOT allowed:**
- Making any API call (even GET requests to live endpoints)
- Storing any credentials in code files

**Exit criteria for Phase 1:**
- [ ] Supliful API endpoints documented in `api/supliful-api-research-notes.md`
- [ ] Shopify API endpoints documented in `api/shopify-api-safe-mode-notes.md`
- [ ] Permissions matrix complete in `api/api-permissions-matrix.md`
- [ ] Dry-run policy documented in `api/dry-run-policy.md`
- [ ] Lucy approves moving to Phase 2

---

### Phase 2 — Read-Only API Calls (Next)

**What is allowed:**
- GET requests to Supliful API to read product and label metadata
- GET requests to Shopify Admin API to read product data
- Logging API responses to review files (no secrets in logs)
- Comparing API data against label review findings

**What is NOT allowed:**
- POST, PUT, PATCH, DELETE to any endpoint
- Saving, updating, or deleting any label or product via API
- Storing tokens in git-tracked files

**Exit criteria for Phase 2:**
- [ ] Successful read of product data from Supliful API (if available)
- [ ] Successful read of product data from Shopify API
- [ ] API response logged and reviewed
- [ ] No sensitive data stored in logs
- [ ] Lucy approves moving to Phase 3

---

### Phase 3 — Draft-Only API Actions

**What is allowed:**
- Creating draft records or draft labels (if Supliful supports draft mode)
- Preparing Shopify product update payloads that are saved locally but NOT sent
- Generating review reports from API data

**What is NOT allowed:**
- Publishing any draft to a live product
- Sending any update payload to Shopify or Supliful without Lucy's explicit approval
- Creating or modifying any record that affects customer-facing content

**Exit criteria for Phase 3:**
- [ ] Draft creation tested on a test product (not Inner Balance / Bloom / Calm / Grow)
- [ ] Draft reviewed and validated
- [ ] No live product affected
- [ ] Lucy approves moving to Phase 4

---

### Phase 4 — Supervised Automation With Approval Gate

**What is allowed:**
- System prepares a complete action (e.g., "update Inner Calm Shopify description to match label")
- System presents the action for Lucy's review in a formatted approval request
- Lucy reviews and explicitly approves each action before it executes
- System executes the approved action and logs the result

**What is NOT allowed:**
- Executing any action without Lucy's explicit confirmation
- Batch-executing multiple actions in sequence without individual approval
- Any deletion or overwrite without a documented backup

**Exit criteria for Phase 4:**
- [ ] Single-product supervised update tested and logged
- [ ] Rollback verified (can undo the change)
- [ ] Audit log reviewed
- [ ] Lucy approves moving to Phase 5

---

### Phase 5 — Batch Operations With Audit Trail (Future)

**What is allowed:**
- Batch review of all four products (Inner Balance / Bloom / Calm / Grow)
- Batch preparation of Shopify update payloads
- Batch execution after batch approval
- Full audit log of all actions

**What is NOT allowed:**
- Fully autonomous execution without any human review point
- Deleting products, variants, or images without explicit approval and backup

---

## Safety Rules for All API Phases

1. **No secrets in files.** API keys, tokens, and credentials live only in `.env` (local, git-ignored). Never in `.md`, `.json`, `.js` files tracked by git.
2. **Dry-run first.** Every write operation must be described as a dry-run before execution. Document: what will change, what will be created, what will be deleted.
3. **One record at a time.** Until Phase 5 is fully validated, test on one product before running on all.
4. **Backup before overwrite.** If overwriting a label or product record, save the current state first.
5. **Log everything.** Every API action that executes must be logged with: timestamp, endpoint, payload summary, response, human approver.
6. **No deletion without approval.** Deleting any record requires explicit written approval from Lucy.
7. **Rollback plan required.** Every write operation requires a documented rollback plan before execution.

## Human Approval Gates

| Gate | Condition |
|---|---|
| Phase transition | Lucy must approve before moving to next phase |
| Any write operation | Documented dry-run + Lucy's explicit approval |
| Any deletion | Written approval record required |
| Batch operations | Full batch review and batch approval before execution |

## Output Generated

- `api/supliful-api-research-notes.md` — Phase 1 output
- `api/shopify-api-safe-mode-notes.md` — Phase 1 output
- `api/api-permissions-matrix.md` — ongoing
- `templates/api-action-request-template.md` — for each planned action
- Log entries in `logs/` — for each executed action

## Risks

- **Risk:** A write API call executes without human approval.
  - Mitigation: All write calls must have a human-approval gate in the code — a confirmation prompt that cannot be bypassed.
- **Risk:** Credentials leak into git.
  - Mitigation: `.env` is in `.gitignore`. Audit git history after any credential change.
- **Risk:** Shopify product goes live with incorrect data from an API update.
  - Mitigation: Review Shopify product live page after every update. Rollback immediately if needed.

## Plan B

If an API call produces unexpected results:
1. Stop all API activity immediately.
2. Run Workflow 07 — Rollback and Incident Response.
3. Log the incident in `logs/errors.md`.
4. Do not resume API operations until the incident is understood and resolved.
