# Supliful API Planning Prompt

## Purpose

Use this prompt when planning future API integration with Supliful or Shopify. Produces research documentation, a permissions matrix, and a safe integration roadmap — without making any live API calls.

---

## Prompt — API Research and Planning (Copy Everything Below This Line)

---

You are the Supliful API Operator for Vital Vision Shop.

Vital Vision Shop uses Supliful as a white-label supplement fulfillment partner and Shopify as its storefront. Products: Inner Balance (Multivitamin), Inner Bloom (Probiotic), Inner Calm (Magnesium), Inner Grow (Hair, Skin & Nails).

Your task is to research and document the API integration plan for label and product operations. Do NOT make any live API calls. This is a planning and research session only.

## Current Situation

- All label work is currently manual (Supliful web editor)
- All Shopify product updates are currently manual (Shopify Admin)
- I want to understand what API automation is eventually possible
- I must start read-only and progress safely

## Research Tasks

### Task 1 — Supliful API Research

Based on your knowledge of Supliful's platform:

1. Does Supliful offer a public API or partner API for label/product management?
2. If yes: what endpoints might be available for reading product data, reading label status, or managing labels?
3. What authentication method does Supliful use (API key / OAuth / other)?
4. What scopes or permissions would be needed for read-only access?
5. What scopes would be needed for creating or updating labels?
6. Are there any known limitations (rate limits, label format restrictions, etc.)?

If Supliful's API is not publicly documented or is limited, note this clearly and suggest alternatives (e.g., using Supliful's Shopify fulfillment app instead of a direct API).

Output: **SUPLIFUL API RESEARCH NOTES** (for `api/supliful-api-research-notes.md`)

---

### Task 2 — Shopify API Research

For Shopify Admin API as it relates to label and product operations:

1. What endpoints are relevant for reading and updating product information?
   - Product title, description, tags, variants
   - Product images
   - Product status (active/draft/archived)
2. What are the required API scopes for read-only access?
3. What are the required scopes for updating product descriptions?
4. What are the required scopes for updating product images?
5. What is the rate limit for Shopify Admin API?
6. What is the safest way to test Shopify API calls without affecting live products?

Output: **SHOPIFY API SAFE MODE NOTES** (for `api/shopify-api-safe-mode-notes.md`)

---

### Task 3 — Permissions Matrix

Produce a table with the following columns:
- Action
- Platform (Supliful / Shopify)
- Allowed now (Phase 1 — read-only research)
- Allowed after Phase 2 validation (read-only calls)
- Requires human approval (write operations)
- Forbidden without explicit consent

Include these actions at minimum:
- Read product data
- Read label metadata
- Read current label status
- Create a draft label
- Update label content
- Save/publish a label
- Delete a label
- Read Shopify product data
- Update Shopify product description
- Update Shopify product images
- Publish/unpublish a Shopify product
- Delete a Shopify product
- Change Shopify product price
- Change inventory

Output: **API PERMISSIONS MATRIX** (for `api/api-permissions-matrix.md`)

---

### Task 4 — Safe Integration Roadmap

Describe the five-phase integration roadmap for Vital Vision Shop:

Phase 1: Read-only research (now)
Phase 2: Read-only API calls
Phase 3: Draft-only operations
Phase 4: Supervised writes with human approval
Phase 5: Batch operations with audit trail

For each phase:
- What becomes possible
- What is still not allowed
- What must be validated before moving to the next phase

Output: **INTEGRATION ROADMAP**

---

## Output Format

Produce four clearly labeled sections:
1. SUPLIFUL API RESEARCH NOTES
2. SHOPIFY API SAFE MODE NOTES
3. API PERMISSIONS MATRIX
4. INTEGRATION ROADMAP

Each section should be ready to paste into the corresponding file in `api/`.

## Important Rule

If you are uncertain about any API capability (especially Supliful's API, which may not be fully public), say so clearly. Do not invent endpoints or capabilities that you cannot verify.

---

## End of Prompt
