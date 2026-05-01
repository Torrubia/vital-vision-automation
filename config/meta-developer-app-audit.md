# Vital Vision — Meta Developer App Audit
*Configuration reference only. No tokens generated. No APIs called. No publishing enabled.*

---

## App Status

| Field | Value |
|---|---|
| App Name | Vital Vision (or TBD — confirm in Meta Developer dashboard) |
| App Type | Business |
| Last Audited | 2026-05-01 |
| Auto-Publish | DISABLED |
| Tokens Generated | None |
| API Calls Made | None |
| Publishing Enabled | No |

---

## Use Cases Added

| Use Case | Added | Notes |
|---|---|---|
| Manage messaging & content on Instagram | ✅ Yes | Added for organic content management |
| Manage everything on your Page | ✅ Yes | Added for Facebook page management |
| Threads API | ❌ No | Not added — not in current scope |
| Live Video API | ❌ No | Not added — not in current scope |
| Embed content | ❌ No | Not added — not in current scope |

---

## Permissions Granted

No permissions have been tested or granted yet.
No access tokens have been generated.
No API calls have been made.

When permissions are needed, document each one here before use:

| Permission | Purpose | Status |
|---|---|---|
| instagram_basic | Read basic Instagram account info | Not requested |
| instagram_content_publish | Publish content to Instagram | Not requested |
| pages_manage_posts | Manage Facebook Page posts | Not requested |
| pages_read_engagement | Read Page engagement data | Not requested |

---

## Safety Rules (from config/safety-rules.md)

- Never auto-publish to Instagram or Facebook
- Never generate tokens without human review and documentation
- Never connect new APIs without updating this audit file
- Never store tokens in any file other than .env
- Never expose tokens in logs, outputs, or commits
- .env is gitignored — tokens must never be committed

---

## Token Log

No tokens generated. Update this section when tokens are created.

| Token Type | Created | Expires | Scope | Stored In |
|---|---|---|---|---|
| — | — | — | — | — |

---

## Change Log

| Date | Change | Who |
|---|---|---|
| 2026-05-01 | File created. Added use cases: Instagram messaging/content + Page management. No tokens or API calls. | Luciana |

---

## Next Steps (when ready)

1. Generate a User Access Token in Meta Developer dashboard
2. Exchange for a Long-Lived Token (60-day expiry)
3. Store in .env as META_ACCESS_TOKEN — never commit
4. Document token scope and expiry in Token Log above
5. Test read-only API call before enabling any write/publish permissions
6. Update this audit file before and after any permission change

---
*No APIs connected. No publishing enabled. No tokens generated.*
*All changes to Meta app configuration must be documented here before implementation.*
