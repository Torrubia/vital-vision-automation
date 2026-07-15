# API Action Request Template

Use this template to document any API action that requires human approval before execution.
No API write operation may proceed without a completed and approved record of this type.

Save as: `logs/[YYYY-MM-DD]-api-action-request-[description].md`

---

## Request Header

| Field | Value |
|---|---|
| Date | |
| Requested by | Lucy / Automated script |
| Prepared by | Claude Code / script name |
| Action description | |
| Platform | Supliful / Shopify |
| Operation type | Read / Draft / Write / Delete |
| Risk level | Low (read) / Medium (draft) / High (live write) / Critical (delete) |

---

## What This Action Will Do

Describe in plain language exactly what this API call will do:

**Before this action:**

**After this action:**

**What will change:**

**What will NOT change:**

---

## Dry-Run Summary

| Field | Value |
|---|---|
| HTTP method | GET / POST / PUT / PATCH / DELETE |
| Endpoint | (describe — do not paste real credentials) |
| Target record | (e.g., "Shopify Product ID for Inner Calm") |
| Payload summary | (key fields that will be sent, no sensitive values) |
| Expected response | (what a successful response looks like) |

---

## Risk Assessment

**What is the worst case if this action goes wrong?**

**Can this action be undone?** Yes / No / Partially

**Rollback plan if something goes wrong:**

**Has a backup of the current state been saved?** Yes / No / N/A

---

## Checklist Before Approval

- [ ] API endpoint documented in `api/` research notes
- [ ] Authentication scope confirmed (no over-permission)
- [ ] Dry-run description complete
- [ ] Only one record targeted (not batch — unless explicitly a batch operation)
- [ ] Rollback plan documented
- [ ] Current state backed up (if write or delete operation)
- [ ] API safe mode checklist completed (`checklists/api-safe-mode-checklist.md`)

---

## Human Approval

**Approver:** Lucy

By approving, I confirm:
- I have read the dry-run description
- I understand what will change
- I have reviewed the rollback plan
- I authorize this specific API action only — not other actions

**Approval:** YES, proceed / NO, do not proceed

**Approval date and time:** ___________________________

**Approval conditions or notes:**

---

## Execution Record

| Field | Value |
|---|---|
| Executed by | |
| Execution date | |
| Execution confirmed | Yes / No |
| Response status | 200 OK / error code |
| Result | |

**Post-execution visual verification in platform UI:** Yes / No

**Any unexpected result:** Yes (see incident log) / No
