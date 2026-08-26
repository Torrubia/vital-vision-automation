# VQB Update Approval — Vital Vision Shop
# Gate 5 of 7 — Human Approval File
# AUTO_PUBLISH=false | REQUIRE_HUMAN_APPROVAL=true | VQB_API_MODE=read_only

---

Date: 2026-05-05
Quiz IDs: Organic 16047 (homepage/social), Paid 15203 (Google/Meta ads)
Human reviewer: Lucy

## Approved Operation

Update VQB result page copy for both quizzes:
- Screen 1: Email Capture (5 fields)
- Screen 2: Discount Code (6 fields)
- Screen 3a: Inner Bloom Result Card + Why This Match
- Screen 3b: Inner Calm Result Card + Why This Match
- Screen 3c: Inner Grow Result Card + Why This Match
- Screen 3d: Inner Balance Result Card + Why This Match

## Approval Status: APPROVED FOR CONTROLLED WRITE RUN

All conditions confirmed by human reviewer before this file was created:

- [x] I have reviewed the diff report: `reports/vqb/vqb-update-diff-report.md`
- [x] I have reviewed the safe update packet: `automations/drafts/vqb-safe-update-packet.md`
- [x] I have reviewed the proposed copy in: `automations/drafts/vqb-api-update-draft.json`
- [x] I confirm the copy is accurate, on-brand, and compliant
- [x] I confirm the backup exists: `backups/vqb/2026-05-05T17-20-22-715Z-combined-backup.json`
- [x] I confirm the dry-run passed with 0 write calls
- [x] I confirm QA Guard reviewed and issued APPROVED verdict
- [x] I understand the rollback procedure: `npm run vqb:rollback`
- [x] I understand that Gate 6 (`VQB_API_MODE=approved_write`) must be set manually in `.env` just before the write run
- [x] I understand the write run will target both quiz IDs (16047 and 15203)

## Conditions

This approval is valid for ONE write run only.
After the write run completes, `VQB_API_MODE` must be reset to `read_only`.
Any further changes require a new approval file.

---

*Human approval required by `config/vqb-api-write-policy.md` Gate 5.*
*This file must exist in `automations/approved/` before the write script will execute.*
