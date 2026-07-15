# API Permissions Matrix

This matrix defines what API operations are allowed, when, and under what conditions for Vital Vision Shop's Supliful label operations.

**Last reviewed:** [date]
**Reviewed by:** Lucy

---

## Permission Levels

| Level | Meaning |
|---|---|
| ALLOWED NOW | Can be done in current phase (Phase 1: research only) |
| ALLOWED PHASE 2 | Read-only API calls — after Phase 1 exit criteria met |
| ALLOWED PHASE 3 | Draft operations — after Phase 2 validated |
| REQUIRES APPROVAL | Write operations — require Lucy's explicit written approval each time |
| FORBIDDEN | Never allowed without documented special authorization |

---

## Supliful Operations

| Action | Permission Level | Notes |
|---|---|---|
| Read Supliful documentation | ALLOWED NOW | Research only |
| Contact Supliful about API access | ALLOWED NOW | Research |
| Read product catalog via Supliful API (if available) | ALLOWED PHASE 2 | GET only |
| Read label status or metadata (if available) | ALLOWED PHASE 2 | GET only |
| Create a draft label via API | ALLOWED PHASE 3 | Test product only first |
| Update label content via API | REQUIRES APPROVAL | Lucy must approve each update |
| Save/publish a label via API | REQUIRES APPROVAL | Plus save-label-approval-checklist required |
| Delete a label via API | FORBIDDEN | Manual deletion only, with explicit Lucy consent |

---

## Shopify Admin API Operations

| Action | Permission Level | Notes |
|---|---|---|
| Read product title, description, status | ALLOWED PHASE 2 | read_products scope |
| Read product images | ALLOWED PHASE 2 | read_products scope |
| Read variant details (size, quantity) | ALLOWED PHASE 2 | read_products scope |
| Read inventory levels | ALLOWED PHASE 2 | read_inventory scope |
| Read order data | ALLOWED PHASE 2 | read_orders scope (separate approval) |
| Create a draft/test product | ALLOWED PHASE 3 | Draft status only, not live |
| Update product description | REQUIRES APPROVAL | Lucy approves each update; one product at a time |
| Update product images | REQUIRES APPROVAL | Lucy approves; must match current label |
| Update variant title or details | REQUIRES APPROVAL | Lucy approves each change |
| Publish or unpublish a product | REQUIRES APPROVAL | High risk — affects customer-facing store |
| Change product price | FORBIDDEN | Pricing changes require separate explicit process |
| Change inventory quantity | FORBIDDEN | Inventory changes require separate explicit process |
| Delete a product | FORBIDDEN | No deletion via API without documented authorization |
| Delete a product image | REQUIRES APPROVAL | Must confirm no other surface depends on the image |
| Modify compliance text (description claims) | REQUIRES APPROVAL | Plus compliance review required before and after |
| Bulk update multiple products | REQUIRES APPROVAL | Batch approval required — each product individually reviewed |

---

## General Rules

| Rule | Description |
|---|---|
| Credentials never in files | API keys and tokens stored in `.env` only — never in git-tracked files |
| Dry-run first | Every write operation must have a dry-run description reviewed before execution |
| One record at a time | Until Phase 5 is validated, no batch writes without individual approval for each record |
| Visual confirmation required | After every write, confirm the result in the platform UI (Supliful or Shopify Admin) |
| Log every action | Every API call that executes must be logged in `logs/` |
| Rollback plan required | Every write operation needs a documented rollback plan |
| Test before live | All write operations tested on a non-live test product before touching real products |

---

## Phase Transition Approval

Before moving from one API phase to the next, Lucy must explicitly confirm:

| Phase transition | Exit criteria | Lucy approval |
|---|---|---|
| Phase 1 → Phase 2 | API research notes complete, permissions matrix reviewed | [ ] Approved |
| Phase 2 → Phase 3 | Successful read calls logged and reviewed | [ ] Approved |
| Phase 3 → Phase 4 | Draft operations tested and validated on test product | [ ] Approved |
| Phase 4 → Phase 5 | Supervised writes validated, rollback tested | [ ] Approved |
