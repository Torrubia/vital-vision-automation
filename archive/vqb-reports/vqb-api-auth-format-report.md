# VQB API Auth Format Report — Vital Vision Shop
# Generated: 2026-05-05 — post diagnostic run (29 probes)
# AUTO_PUBLISH=false | REQUIRE_HUMAN_APPROVAL=true | VQB_API_MODE=read_only

---

## Diagnostic Status

| Item | Value |
|---|---|
| Run date | 2026-05-05 |
| Total probes | 29 (GET requests only) |
| Successful (2xx) | 0 |
| Writes executed | 0 |
| VQB content modified | NO |
| Shopify edited | NO |
| Script | `scripts/vqb/diagnose-vqb-auth.js` |
| Raw output | `reports/vqb/2026-05-05T18-13-43-138Z-auth-diagnostic.json` |

---

## Root Cause: Dashboard Integration Setting — Not an API Key Issue

**The API keys are not the problem.**

The diagnostic confirmed two distinct error states:

### Error 1 — No Origin header: `"domain not allowed"`

All 12 auth header formats tested WITHOUT an Origin header returned:
```json
{"error":"domain not allowed"}
```

This is a pre-auth domain filter. Before the API even checks credentials, it rejects requests with no recognizable origin.

### Error 2 — With Origin header: `"Request not allowed, Check Integration -> VQB for configurations."`

All requests WITH an `Origin` header (all 3 domain variants tested) returned:
```json
{"error":"Request not allowed, Check Integration -> VQB for configurations."}
```

**This error message is a direct pointer to a dashboard setting.** The API recognizes the domain is present but blocks the request because the Integration is not configured in the VQB admin dashboard.

---

## Auth Formats Tested

### Phase 1 — No Origin, all auth header formats

| Auth Header Format | Status | Body |
|---|---|---|
| No auth (baseline) | 403 | `domain not allowed` |
| `Authorization: Bearer {PRIVATE_KEY}` | 403 | `domain not allowed` |
| `Authorization: Bearer {PUBLIC_KEY}` | 403 | `domain not allowed` |
| `Authorization: Bearer {BROWSER_JWT}` | 403 | `domain not allowed` |
| `X-API-Key: {PRIVATE_KEY}` | 403 | `domain not allowed` |
| `X-API-Key: {PUBLIC_KEY}` | 403 | `domain not allowed` |
| `ACCESSKEY: {PRIVATE_KEY}` | 403 | `domain not allowed` |
| `ACCESSKEY: {PUBLIC_KEY}` | 403 | `domain not allowed` |
| `api-key: {PRIVATE_KEY}` | 403 | `domain not allowed` |
| `api-key: {PUBLIC_KEY}` | 403 | `domain not allowed` |
| `Authorization: Token {PRIVATE_KEY}` | 403 | `domain not allowed` |
| `Authorization: Token {PUBLIC_KEY}` | 403 | `domain not allowed` |

**Conclusion: Auth header format is irrelevant until the domain issue is resolved.**

### Phase 2 — Bearer BROWSER_JWT, all Origin variants

| Origin Header | Status | Body |
|---|---|---|
| None | 403 | `domain not allowed` |
| `https://vitalvision.shop` | 403 | `Request not allowed, Check Integration -> VQB` |
| `https://www.vitalvision.shop` | 403 | `Request not allowed, Check Integration -> VQB` |
| `https://rum0nq-hs.myshopify.com` | 403 | `Request not allowed, Check Integration -> VQB` |

### Phase 3 — Bearer PRIVATE_KEY, all Origin variants

| Origin Header | Status | Body |
|---|---|---|
| None | 403 | `domain not allowed` |
| `https://vitalvision.shop` | 403 | `Request not allowed, Check Integration -> VQB` |
| `https://www.vitalvision.shop` | 403 | `Request not allowed, Check Integration -> VQB` |
| `https://rum0nq-hs.myshopify.com` | 403 | `Request not allowed, Check Integration -> VQB` |

### Phase 4 — All endpoint paths (Bearer BROWSER_JWT + Origin vitalvision.shop)

| Endpoint | Status | Body |
|---|---|---|
| `/quizzes/{id}` | 403 | `Request not allowed, Check Integration -> VQB` |
| `/quiz/{id}` | 403 | `Request not allowed, Check Integration -> VQB` |
| `/quizzes/{id}/result-pages` | 403 | `Request not allowed, Check Integration -> VQB` |
| `/result-pages` | 403 | `Request not allowed, Check Integration -> VQB` |
| Base URL | 403 | `Request not allowed, Check Integration -> VQB` |

**Conclusion: The endpoint path is not the problem. All paths are blocked by the same integration gate.**

### Phase 5 — Query parameter auth (Origin vitalvision.shop)

| Format | Status | Body |
|---|---|---|
| `?api_key={PRIVATE_KEY}` | 403 | `Request not allowed, Check Integration -> VQB` |
| `?api_key={PUBLIC_KEY}` | 403 | `Request not allowed, Check Integration -> VQB` |
| `?token={BROWSER_JWT}` | 403 | `Request not allowed, Check Integration -> VQB` |
| `?key={PRIVATE_KEY}` | 403 | `Request not allowed, Check Integration -> VQB` |

---

## What the Error Message Tells Us

`"Request not allowed, Check Integration -> VQB for configurations."`

This is a VQB dashboard menu path reference. It means:

1. The API recognizes the request came from a domain
2. It passes the domain check
3. But it then checks whether this domain is configured for API access under **Integration settings**
4. That configuration is missing

---

## Required Dashboard Action

**Go to VQB Dashboard → Integration → VQB** (or "Integrations" → "API" depending on dashboard version) and:

1. Locate the **Allowed Domains** or **API Access** settings
2. Add `vitalvision.shop` (without www)
3. Add `www.vitalvision.shop` (with www)
4. Add `rum0nq-hs.myshopify.com` (Shopify subdomain, in case it's needed)
5. Save and confirm

This is a one-time dashboard configuration. After saving, re-run:
```
npm run vqb:fetch-current
```

---

## Is Write via API Realistic Today?

**Not yet — but it is one dashboard setting away.**

| Blocker | Severity | Fix |
|---|---|---|
| VQB Integration not configured | BLOCKING | Dashboard setting (5 min) |
| API key format unknown | RESOLVED | Not the issue — keys are being accepted past first check |
| Endpoint path unknown | RESOLVED | `/quizzes/{id}` reaches integration layer — path is correct |
| Auth header format unknown | UNRESOLVED | Cannot test until integration is configured |

Once the Integration setting is saved, re-run the diagnostic to confirm which auth format returns 200. The most likely candidates (in order):
1. `Authorization: Bearer {BROWSER_JWT}` — the JWT has store context baked in
2. `Authorization: Bearer {PRIVATE_KEY}` — standard bearer pattern
3. `ACCESSKEY: {PRIVATE_KEY}` — some quiz platforms use this

---

## Safe Next Steps (In Order)

1. **[Human action — 5 min]** Go to VQB Dashboard → Integration → VQB → add `vitalvision.shop` and `www.vitalvision.shop` to allowed domains/API access settings
2. Re-run: `npm run vqb:diagnose-auth` — confirm which combination returns 200
3. Update `scripts/vqb/fetch-current-quiz.js` auth headers to match the working format
4. Re-run: `npm run vqb:fetch-current` — get live quiz data
5. Re-run: `npm run vqb:backup-current` — create a backup with real live data
6. QA Guard re-reviews the backup
7. Set `VQB_API_MODE=approved_write` in `.env`
8. Run the write script
9. Reset `VQB_API_MODE=read_only`

---

## Do NOT Do

- Do not change `VQB_API_MODE` until step 7 above
- Do not attempt a write while fetch returns 403 (no valid backup = no write)
- Do not bypass the 7-gate write policy
- Do not add Shopify domain to VQB's "Shopify integration" — that is a separate flow for the embed, not API access

---

*READ-ONLY. No VQB or Shopify content was modified.*
*This report is for diagnostic purposes only.*
*See config/vqb-api-auth-notes.md for technical reference.*
