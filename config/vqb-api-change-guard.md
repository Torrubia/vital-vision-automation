# VQB API Change Guard — Vital Vision Shop
# This file defines the automated gates that must pass before any VQB API write.
# AUTO_PUBLISH=false | REQUIRE_HUMAN_APPROVAL=true | VQB_API_MODE=read_only

---

## What Is the Change Guard?

The Change Guard is a set of conditions that every VQB API write must satisfy.
It is enforced by:
1. The `validate-vqb-env.js` script (environment gates)
2. The QA Security Guard agent (`agents/qa-security-devops-guard.md`)
3. The write script itself (startup gates)

If any gate fails, the write is blocked. No exceptions.

---

## Gate 1 — Environment Security

| Check | Command | Required Result |
|---|---|---|
| .env is gitignored | `git check-ignore -v .env` | `.gitignore:1:.env .env` |
| No key in git history | `git log --oneline -5` | No .env references |
| VQB_API_MODE | `grep VQB_API_MODE .env` | `approved_write` (write run only) |
| AUTO_PUBLISH | `grep AUTO_PUBLISH .env` | `false` |
| REQUIRE_HUMAN_APPROVAL | `grep REQUIRE_HUMAN_APPROVAL .env` | `true` |

**Failure action:** Block all writes. Fix environment. Re-run `npm run vqb:check`.

---

## Gate 2 — Backup Exists

- A backup of the current VQB quiz state must exist in `backups/vqb/`
- Backup must be timestamped and reference the target quiz ID
- Backup must be from this session (not older than 24 hours)

**File pattern:** `backups/vqb/{timestamp}-{quizId}-backup.json`

**Failure action:** Run `npm run vqb:backup` before proceeding.

---

## Gate 3 — Dry-Run Passed

- The write script must be run in `DRY_RUN=true` mode first
- Dry-run output must be saved to `reports/vqb/{timestamp}-dry-run.md`
- Human must have reviewed the dry-run output

**Failure action:** Run dry-run. Review output. Do not skip.

---

## Gate 4 — Diff Report Exists

- A before/after diff report must exist for the proposed changes
- Diff must show exactly what will be changed, field by field
- Saved to `reports/vqb/{timestamp}-diff-report.md`

**Failure action:** Dry-run produces the diff. Do not write without reviewing it.

---

## Gate 5 — QA Guard Approved

- The QA Security Guard agent must have reviewed:
  - The proposed copy (compliance check)
  - The write script (safety gate check)
  - The dry-run output
- QA verdict must be APPROVED in `reports/vqb/api-write-readiness-report.md`

**Failure action:** Invoke `/vv-qa-guard` and resolve all blocking issues.

---

## Gate 6 — Human Approval File Exists

- A human must have created an approval file in `automations/approved/`
- Approval file must reference:
  - The quiz ID being edited
  - The operation being performed
  - The date of approval
  - The reviewer's name

**File pattern:** `automations/approved/{date}-vqb-{operation}-approval.md`

**Failure action:** Human creates approval file. Automation waits.

---

## Gate 7 — Rollback Command Exists

- The write script must have a rollback function
- Rollback must be testable in dry-run mode
- Rollback command must be documented in the script and in the approval file

**Example:** `npm run vqb:rollback -- --backup=backups/vqb/{timestamp}-{quizId}-backup.json`

**Failure action:** Add rollback to script before proceeding.

---

## Gate 8 — VQB_API_MODE Lifecycle

| Phase | VQB_API_MODE Value |
|---|---|
| All times (default) | `read_only` |
| During approved write run only | `approved_write` |
| Immediately after write completes | `read_only` (reset manually) |

- `approved_write` is set manually in `.env` by a human just before the write run.
- It is reset to `read_only` immediately after the script completes.
- Scripts block if `VQB_API_MODE` is not the correct value for the operation.

---

## Gate Failure Reference

| Gate | Failure Symptom | Resolution |
|---|---|---|
| 1 — Environment | `npm run vqb:check` fails | Fix .env values |
| 2 — Backup | No backup file | Run `npm run vqb:backup` |
| 3 — Dry-run | No dry-run output | Run script with DRY_RUN=true |
| 4 — Diff | No diff report | Dry-run generates it |
| 5 — QA Guard | QA verdict is BLOCKED | Resolve QA issues |
| 6 — Human approval | No approval file | Human creates it |
| 7 — Rollback | No rollback function | Add to script |
| 8 — API mode | Wrong VQB_API_MODE | Set correct value in .env |

---

*This file is enforced by scripts and agents — not optional.*
*All 8 gates must pass before any VQB API write is executed.*
