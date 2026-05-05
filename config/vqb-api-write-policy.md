# VQB API Write Policy — Vital Vision Shop
# Governing document for all VQB API write operations.
# AUTO_PUBLISH=false | REQUIRE_HUMAN_APPROVAL=true | VQB_API_MODE=read_only

---

## Policy Statement

No write operation to the Visual Quiz Builder API is permitted unless
all 7 conditions below are satisfied simultaneously.

This policy applies to all team members, agents, and automation scripts.
It cannot be overridden by any single agent, script, or individual without
explicit written amendment to this document with human sign-off.

---

## The 7 Required Conditions

### Condition 1 — Backup Exists
A full backup of the current VQB quiz state must exist in `backups/vqb/`
before any write is attempted. If the backup step fails, the write is cancelled.

**Evidence required:** `backups/vqb/{timestamp}-{quizId}-backup.json` exists.

---

### Condition 2 — Dry-Run Passed
The write script must be executed in `DRY_RUN=true` mode and must complete
without errors. The dry-run output must be saved and reviewed.

**Evidence required:** `reports/vqb/{timestamp}-dry-run.md` exists and reviewed.

---

### Condition 3 — Diff Report Exists
A before/after diff report must document exactly what will change in VQB,
field by field. The diff must be reviewed by a human before the write.

**Evidence required:** `reports/vqb/{timestamp}-diff-report.md` exists and reviewed.

---

### Condition 4 — QA Guard Approved
The QA Security Guard agent must have completed its full checklist and issued
an APPROVED verdict. Any BLOCKED verdict cancels the write until issues are resolved.

**Evidence required:** `reports/vqb/api-write-readiness-report.md` shows APPROVED.

---

### Condition 5 — Human Approval File Exists
A human must have created a signed approval file in `automations/approved/`
specifying the quiz ID, operation, and date of approval.

**Evidence required:** `automations/approved/{date}-vqb-{operation}-approval.md` exists.

**Approval file must include:**
```
Quiz ID: [ID]
Operation: [description of what will be written]
Approved by: [name]
Date: [ISO date]
Backup file: [path]
Rollback command: npm run vqb:rollback -- --backup=[path]
Compliance reviewed: yes
QA Guard verdict: APPROVED
```

---

### Condition 6 — VQB_API_MODE Set to approved_write
`VQB_API_MODE` must be manually set to `approved_write` in `.env` by a human
immediately before the write run. Scripts will exit if this value is not present.

After the write completes, `VQB_API_MODE` must be reset to `read_only`
immediately — within the same session.

**Evidence required:** `.env` contains `VQB_API_MODE=approved_write` at write time.

---

### Condition 7 — Rollback Command Exists and Is Tested
The write script must contain a working rollback function.
The rollback must be testable in dry-run mode before the write.
The rollback command must be documented in the approval file.

**Evidence required:** `npm run vqb:rollback -- --backup=[file]` is documented
and tested in dry-run mode.

---

## Permitted Write Operations

| Operation | Permitted | Notes |
|---|---|---|
| Update result page copy | Yes (with all 7 conditions) | Copy changes only |
| Update email capture copy | Yes (with all 7 conditions) | Copy changes only |
| Update discount screen copy | Yes (with all 7 conditions) | Copy changes only |
| Update "Why This Match?" copy | Yes (with all 7 conditions) | Copy changes only |
| Update quiz question text | Yes (with all 7 conditions) | Requires extra QA review |
| Change quiz answer logic | No | Human-only in VQB dashboard |
| Publish / activate quiz | No | Human-only action |
| Delete quiz or result | No | Permanently blocked |
| Change product mappings | No | Human-only in VQB dashboard |
| Connect to Meta/Google accounts | No | Permanently blocked |

---

## Permanently Blocked Operations

These can never be performed via automation, regardless of approval:

- Publishing or activating a quiz to live users
- Deleting any quiz, result, or question
- Changing answer-to-product routing logic
- Connecting VQB to any ad platform
- Exposing API keys in any log, file, or output
- Committing `.env` to git

---

## Reset Requirement After Every Write

After every approved write run:

1. Set `VQB_API_MODE=read_only` in `.env` immediately.
2. Run `npm run vqb:check` to confirm reset.
3. Verify changes in VQB dashboard manually.
4. Retain backup until human verifies the live quiz.
5. Update `reports/vqb/api-write-readiness-report.md` with post-write status.

---

## Policy Version

| Version | Date | Change |
|---|---|---|
| 1.0 | 2026-05-05 | Initial policy — 7 conditions, 8 change guard gates |

---

*This policy is enforced by agents/qa-security-devops-guard.md and all VQB write scripts.*
*Human approval is required before any write operation.*
