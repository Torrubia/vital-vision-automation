# API — Supliful Label Ops

## Purpose

This folder contains planning documentation for future API integration between Vital Vision Shop, Supliful, and Shopify. No live API calls are made from this folder. This is research and planning only.

## Current Status

**Phase 1 — Read-Only Research**

No live API calls are being made. All content here is documentation and planning.

## Files in This Folder

| File | Purpose |
|---|---|
| `supliful-api-research-notes.md` | Research notes on Supliful's API capabilities and endpoints |
| `shopify-api-safe-mode-notes.md` | Shopify Admin API notes for safe, label-related operations |
| `api-permissions-matrix.md` | What is allowed now, what requires approval, what is forbidden |
| `dry-run-policy.md` | Rules for dry-run descriptions before any API write operation |

## Rules for This Folder

1. No API credentials, tokens, or keys may be stored in any file here.
2. No executable API scripts live here — those go in `scripts/supliful-label-ops/`.
3. All content here is documentation — it describes what an API call would do, not a live call.
4. Before any API integration moves beyond research, the `api-permissions-matrix.md` must be reviewed and approved by Lucy.

## How to Use API Planning Prompts

To generate content for these files, use `prompts/supliful-api-planning-prompt.md`:

1. Open the prompt file.
2. Copy the full prompt.
3. Paste into Claude Code or Claude.ai.
4. Paste the output into the relevant file in this folder.

## Integration Phases

| Phase | Status | Description |
|---|---|---|
| 1 — Read-only research | Current | Documentation and planning only |
| 2 — Read-only API calls | Future | GET requests to read product/label data |
| 3 — Draft-only operations | Future | Create draft records, no live changes |
| 4 — Supervised writes | Future | Write operations with human approval gate |
| 5 — Batch operations | Future | Batch processing with full audit trail |

See `workflows/05-api-safe-mode-workflow.md` for the full phase-by-phase plan.
