# API Safe Mode Checklist

Use this checklist before executing any API operation related to Supliful or Shopify.
Complete the appropriate section based on the operation type.

**Date:** ___________________________
**Operation planned:** ___________________________
**API target:** Supliful / Shopify
**Operation type:** Read / Draft / Write / Delete

---

## Section 1 — Before Any API Call (All Types)

- [ ] The API endpoint has been documented in `api/supliful-api-research-notes.md` or `api/shopify-api-safe-mode-notes.md`
- [ ] The required authentication scope has been identified
- [ ] API credentials are stored only in `.env` (not in any tracked file)
- [ ] `.env` is confirmed in `.gitignore`
- [ ] A dry-run description has been written: what will happen, what will be created, what will change
- [ ] The dry-run description has been reviewed by Lucy

---

## Section 2 — Read-Only Operations

Read operations retrieve data without modifying anything.

- [ ] Endpoint is a GET request only
- [ ] No data will be modified by this call
- [ ] Response will be logged in a review file (not in a git-tracked file if it contains product IDs or metadata)
- [ ] Lucy is aware this read call is being made

**Proceed:** Yes / No

---

## Section 3 — Draft-Only Operations

Draft operations create or modify records that are not yet live or published.

- [ ] A test product (not Inner Balance / Bloom / Calm / Grow) is being used for this test
- [ ] The draft will not affect any live product
- [ ] The draft can be deleted or discarded if not needed
- [ ] Lucy has approved this draft operation in writing (note approval date): ___________________________
- [ ] A rollback plan exists: ___________________________

**Proceed:** Yes / No

---

## Section 4 — Write Operations on Live Records

Write operations modify live product data, label content, or prices.

- [ ] This is NOT a read-only or draft operation — Lucy has explicitly approved a live write
- [ ] Lucy's written approval is documented: ___________________________
- [ ] The current state of the record has been saved/backed up before the write
- [ ] The exact payload has been reviewed and confirmed
- [ ] Only ONE record is being updated (not a batch)
- [ ] A rollback plan is documented and tested
- [ ] The write will be followed immediately by a visual verification in Shopify/Supliful

**Proceed:** Yes / No — Requires Lucy's explicit verbal confirmation before executing

---

## Section 5 — Delete Operations

Delete operations permanently remove records. These are the highest-risk operations.

- [ ] Lucy has explicitly approved this deletion in writing with the specific record ID
- [ ] The record to be deleted has been identified and confirmed (not a guess)
- [ ] A backup of the record content exists
- [ ] Platform has been checked for soft-delete or archive option (prefer over hard delete)
- [ ] Rollback plan exists and has been documented
- [ ] Legal or compliance implications of deletion have been considered

**Proceed:** Yes / No — Requires Lucy's explicit written approval and confirmation

---

## After Any API Call

- [ ] The API call and response have been logged in `logs/`
- [ ] The response has been reviewed and confirmed correct
- [ ] If a write was made, the live record has been visually confirmed in the platform UI
- [ ] If any unexpected result occurred, Workflow 07 (Rollback and Incident Response) has been initiated
