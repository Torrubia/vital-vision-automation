# Dry-Run Policy

## Purpose

Every API write operation at Vital Vision Shop's Supliful label ops module must be described as a dry-run before it is executed. This document defines what a dry-run is, what it must contain, and who must review it.

---

## What is a Dry-Run?

A dry-run is a plain-language description of exactly what an API call will do, written before the call is executed. It answers:

1. What record will be affected?
2. What will change?
3. What will stay the same?
4. What is the worst case if it goes wrong?
5. How can it be undone?

A dry-run is NOT a test execution of the code. It is a written description that Lucy reads and approves before any code runs.

---

## Dry-Run Is Required For

| Operation type | Dry-run required |
|---|---|
| GET (read-only) | No — reads are safe and do not require dry-run |
| POST (create) | Yes |
| PUT / PATCH (update) | Yes |
| DELETE | Yes — plus additional approval |
| Bulk operations | Yes — one dry-run per record being modified |

---

## Dry-Run Format

Every dry-run must be documented using the `templates/api-action-request-template.md` and include:

```
DRY-RUN DESCRIPTION
====================
Action: [what the API call does in one sentence]

Before this call:
- [Product / label / record] currently has: [current state]

After this call:
- [Product / label / record] will have: [new state]

What will NOT change: [anything that stays the same]

Worst case if this goes wrong:
- [Describe the most harmful possible outcome]
- [Likelihood: Low / Medium / High]

Rollback plan:
- [Exactly how to undo this if needed]

Human confirmation required: YES — do not execute without Lucy's explicit approval
```

---

## Approval Rule

No dry-run may be executed without Lucy's explicit approval.

Approval must be:
- **Specific** — approving this exact operation, not "API operations in general"
- **Written** — noted in the `templates/api-action-request-template.md` record
- **Time-stamped** — includes date and time of approval
- **Scoped** — approves only the described action, not any other action

---

## After Execution

After a dry-run is approved and the operation executes:

1. Log the actual result in the `templates/api-action-request-template.md` record.
2. Confirm the result visually in the platform (Supliful or Shopify Admin).
3. If the result does not match the dry-run description: **STOP**. Initiate Workflow 07 (Rollback and Incident Response).

---

## Dry-Run Examples

### Example 1 — Update Shopify Product Description (Safe)

```
DRY-RUN DESCRIPTION
====================
Action: Update the product description for Inner Calm in Shopify Admin

Before this call:
- Inner Calm product description currently reads: [current text]

After this call:
- Inner Calm product description will read: [new text]

What will NOT change:
- Product title, price, variants, images, inventory, status

Worst case if this goes wrong:
- Description shows incorrect content to customers
- Likelihood: Low (the new text has been reviewed and approved)

Rollback plan:
- Revert the description to the previous text manually in Shopify Admin
- Previous text is saved in this record before the call executes

Human confirmation required: YES
```

### Example 2 — Read Product Data (No Dry-Run Needed)

```
GET /admin/api/2024-01/products/[id].json

This is a read-only call. It will not modify any data.
No dry-run required. Logging the call and response for reference.
```

---

## Forbidden Dry-Run Bypasses

The following are NOT valid reasons to skip a dry-run:

- "It's just a small change"
- "I've done this before"
- "It's urgent"
- "The script handles it automatically"
- "It's a read-adjacent write" (there is no such thing)

Every write operation gets a dry-run, every time.
