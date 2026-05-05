# VQB API Update Draft — Vital Vision Shop
# This file summarises the structured payload in vqb-api-update-draft.json
# AUTO_PUBLISH=false | REQUIRE_HUMAN_APPROVAL=true | VQB_API_MODE=read_only
# DRY-RUN ONLY — not submitted to any API.

---

## Status

| Item | Status |
|---|---|
| Payload built | YES — automations/drafts/vqb-api-update-draft.json |
| Compliance scan | PASSED |
| Dry-run completed | YES — 6 screens, 0 write calls |
| Diff report | YES — reports/vqb/vqb-update-diff-report.md |
| API auth confirmed | NO — 403 on fetch; auth format needs confirmation |
| Human approval file | NOT YET — required before any write |
| Write executed | NO |

---

## Screens Covered

1. Email Capture Screen — 5 fields
2. Discount Code Screen — 6 fields
3. Inner Bloom Result Card + Why This Match
4. Inner Calm Result Card + Why This Match
5. Inner Grow Result Card + Why This Match
6. Inner Balance Result Card + Why This Match

Full field values: `automations/drafts/vqb-api-update-draft.json`

---

## Before Any Write

Complete all 7 gates in `config/vqb-api-write-policy.md`:

- [x] Gate 1: Backup exists — `backups/vqb/2026-05-05T17-20-22-715Z-combined-backup.json`
- [x] Gate 2: Dry-run passed — `reports/vqb/2026-05-05T17-20-32-344Z-dry-run-result.json`
- [x] Gate 3: Diff report exists — `reports/vqb/vqb-update-diff-report.md`
- [ ] Gate 4: QA Guard APPROVED — run `/vv-qa-guard`
- [ ] Gate 5: Human approval file — create `automations/approved/2026-05-05-vqb-update-approval.md`
- [ ] Gate 6: VQB_API_MODE=approved_write — set manually just before write run
- [ ] Gate 7: Rollback command — `npm run vqb:rollback -- --backup=backups/vqb/2026-05-05T17-20-22-715Z-combined-backup.json`

---

## Pending: VQB API Auth Format

Run `npm run vqb:fetch-current` with the correct auth header once confirmed.
Until then, the "Current (before)" column in the diff shows UNKNOWN.

---

*DRY-RUN ONLY. Human approval required. No automation writes to VQB.*
