# VQB API Auth Notes — Vital Vision Shop
# Technical reference for API authentication investigation.
# AUTO_PUBLISH=false | REQUIRE_HUMAN_APPROVAL=true | VQB_API_MODE=read_only

---

## API Base URL

```
https://api-production.visualquizbuilder.com/api/public
```

Both `.env` variables point to the same URL:
- `VQB_API_BASE_URL` (older key)
- `VQB_PUBLIC_API_BASE_URL` (active key used by scripts)

Keep both in sync. Scripts use `VQB_PUBLIC_API_BASE_URL`.

---

## Credentials in .env

| Variable | Type | Length | Use |
|---|---|---|---|
| `VQB_PRIVATE_API_KEY` | Alphanumeric string | 33 chars | Server-side API calls |
| `VQB_PUBLIC_API_KEY` | Alphanumeric string | 32 chars | Public-facing API (if any) |
| `VQB_BROWSER_API_KEY` | JWT (HS256) | ~170 chars | Browser embed only |

### Browser JWT structure

```
Header: {"alg":"HS256","typ":"JWT"}
Payload: {"iss":"whai-api","iat":{timestamp},"sub":7546}
```

- `iss: "whai-api"` — issued by the Whai platform (VQB is a Whai product)
- `sub: 7546` — the store's internal Whai account ID
- This JWT is signed with a Whai secret — it is a public token designed for browser use

**The browser JWT should NOT be used in write API calls.** It is for quiz embedding only.

---

## Diagnostic Results (2026-05-05, 29 probes)

### Error Pattern 1: No Origin header → `"domain not allowed"`

The API performs a pre-auth domain check. Requests without an `Origin` header are rejected before credentials are evaluated. All 12 auth header formats returned this error without an Origin header.

**Action: always include `Origin: https://vitalvision.shop` in API requests.**

### Error Pattern 2: With Origin → `"Request not allowed, Check Integration -> VQB for configurations."`

With any valid `Origin` header, the error changes to a specific integration configuration message. This means:
- The API accepted the domain
- The auth/key layer is potentially fine
- But the VQB dashboard integration is not configured for API access

This is a **dashboard-side blocker**, not a code issue.

---

## The Integration Setting That Must Be Configured

VQB Dashboard path: **Integration → VQB** (or similar — exact label may vary by dashboard version)

This is where domains are approved for API access. Without this:
- The API will always return 403 regardless of auth format
- No read OR write API call can succeed

### Domains to add

1. `vitalvision.shop`
2. `www.vitalvision.shop`
3. `rum0nq-hs.myshopify.com` (optional — include if option exists)

---

## Endpoint Structure (Confirmed Reachable)

The endpoint path `/quizzes/{id}` is correct — it reaches the integration layer (confirmed by error message progression).

### Quiz IDs

| Quiz | ID | Purpose |
|---|---|---|
| Organic (homepage/social) | 16047 | VQB_ORGANIC_QUIZ_ID |
| Paid (Google/Meta ads) | 15203 | VQB_PAID_QUIZ_ID |

### Confirmed endpoint candidates (to test once integration is configured)

```
GET {BASE_URL}/quizzes/{id}               → primary
GET {BASE_URL}/quizzes/{id}/result-pages  → result page content
GET {BASE_URL}/result-pages               → all result pages
```

---

## Auth Formats to Test After Integration Is Configured

Test in this order — most likely to least likely:

| Priority | Header Format | Reason |
|---|---|---|
| 1 | `Authorization: Bearer {BROWSER_JWT}` | JWT has store context (sub=7546); most VQB API docs reference JWT auth |
| 2 | `Authorization: Bearer {PRIVATE_KEY}` | Standard bearer; private key is for server-side |
| 3 | `ACCESSKEY: {PRIVATE_KEY}` | Some Whai API variants use this header name |
| 4 | `Authorization: Token {PRIVATE_KEY}` | DRF-style token auth |
| 5 | `X-API-Key: {PRIVATE_KEY}` | Generic API key header |

Re-run `npm run vqb:diagnose-auth` after the integration setting is saved — it will test all 5 automatically.

---

## Script Reference

| Command | Script | Purpose |
|---|---|---|
| `npm run vqb:diagnose-auth` | `scripts/vqb/diagnose-vqb-auth.js` | Full auth diagnostic (29 probes) |
| `npm run vqb:fetch-current` | `scripts/vqb/fetch-current-quiz.js` | Fetch live quiz data |
| `npm run vqb:backup-current` | `scripts/vqb/backup-current-quiz.js` | Create pre-write backup |

---

## fetch-current-quiz.js — Auth Header to Update

Once the working format is confirmed, update `scripts/vqb/fetch-current-quiz.js` line 69–73.

Current headers array:
```js
const authHeaders = [
  { 'Authorization': `Bearer ${PRIVATE_KEY}`, 'Content-Type': 'application/json' },
  { 'X-API-Key': PRIVATE_KEY, 'Content-Type': 'application/json' },
  { 'Authorization': `Bearer ${PUBLIC_KEY}`, 'Content-Type': 'application/json' },
];
```

The script also needs an `Origin` header added. After diagnostic confirms the working format, update to:
```js
// Example — update to working format after integration is configured
const headers = {
  'Authorization': `Bearer ${BROWSER_JWT}`,  // or whichever format works
  'Origin': 'https://vitalvision.shop',
  'Content-Type': 'application/json',
};
```

---

## Write vs Read Endpoint Note

The public API likely uses:
- `GET /quizzes/{id}` — read quiz data
- `PUT /quizzes/{id}` or `PATCH /quizzes/{id}` — update quiz fields

**Do NOT attempt any PUT/PATCH/POST/DELETE until:**
1. The integration setting is configured
2. GET succeeds and returns quiz data
3. All 7 write gates are met
4. `VQB_API_MODE=approved_write` is set

---

## Change Log

| Date | Event |
|---|---|
| 2026-05-05 | Diagnostic run — 29 probes — root cause identified: dashboard Integration setting |
| 2026-05-05 | Script `diagnose-vqb-auth.js` created (`npm run vqb:diagnose-auth`) |

---

*No VQB or Shopify content was modified.*
*All API keys masked in all output and reports.*
