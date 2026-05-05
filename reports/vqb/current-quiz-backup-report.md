# VQB Current Quiz Backup Report — Vital Vision Shop
# Updated by: npm run vqb:backup-current
# AUTO_PUBLISH=false | REQUIRE_HUMAN_APPROVAL=true | VQB_API_MODE=read_only

---

## Latest Backup

| Field | Value |
|---|---|
| Backup timestamp | 2026-05-05T17-20-22-715Z |
| Organic quiz ID | 16047 |
| Paid quiz ID | 15203 |
| Backup files | backups/vqb/2026-05-05T17-20-22-715Z-combined-backup.json |
| Live data captured | NO — VQB API returned 403 on fetch attempt |
| Backup valid for dry-run | YES |

## API Fetch Status

The VQB API returned HTTP 403 on all auth header variants tried:
- `Authorization: Bearer {PRIVATE_KEY}`
- `X-API-Key: {PRIVATE_KEY}`
- `Authorization: Bearer {PUBLIC_KEY}`

**Action required:** Confirm the correct authorization header format from the VQB API documentation or dashboard. Once the correct format is known, update `scripts/vqb/fetch-current-quiz.js` and re-run `npm run vqb:fetch-current`.

Common VQB auth formats to try:
- `Authorization: Token {key}`
- `api-key: {key}`
- Query parameter: `?api_key={key}`

## Rollback Command

```
npm run vqb:rollback -- --backup=backups/vqb/2026-05-05T17-20-22-715Z-combined-backup.json
```

## Gate Status

| Gate | Status |
|---|---|
| Gate 1 — Backup exists | COMPLETE ✅ |

---

*Backups are gitignored. This report file is committed for tracking.*
*No write calls were made. No VQB content was modified.*
