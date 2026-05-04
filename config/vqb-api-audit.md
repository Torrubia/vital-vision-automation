# VQB API Audit — Vital Vision Shop

## Overview
Visual Quiz Builder (VQB) is used to power the Vital Vision product recommendation quiz funnel.
This audit documents the API setup, confirmed endpoints, and safety constraints.

## API Credentials Status

| Variable | Status | Notes |
|---|---|---|
| VQB_PUBLIC_API_BASE_URL | Confirmed | `https://api-production.visualquizbuilder.com/api/public` |
| VQB_PRIVATE_API_KEY | Pending | Add to .env only — never commit |
| VQB_PUBLIC_API_KEY | Pending | Add to .env only — never commit |
| VQB_BROWSER_API_KEY | Pending | Add to .env only — never commit |
| VQB_ORGANIC_QUIZ_ID | Pending | Organic/homepage quiz — add to .env |
| VQB_PAID_QUIZ_ID | Pending | Paid traffic quiz — add to .env |
| VQB_API_MODE | Set | Must always be `read_only` for automation scripts |

## Confirmed Base URL
```
https://api-production.visualquizbuilder.com/api/public
```

## Key Types

- **Private API Key** — server-side only. Never expose in browser or frontend code.
- **Public API Key** — may be used in client-facing contexts per VQB documentation.
- **Browser API Key** — for browser/client-side embed integrations only.

## Safety Rules

- `VQB_API_MODE=read_only` must be set. Scripts will exit(1) if it is not.
- No automation script will edit, publish, or delete any quiz.
- No automation script will change Shopify content via VQB.
- All API calls must be explicitly authorized per-run — no scheduled auto-calls.
- Keys are masked in all output (first 6 characters only).

## Funnel Map

See `config/quiz-funnel-map.json` for the full organic/paid quiz routing map.

## Planned API Use Cases (Read-Only, Future)

| Use Case | Endpoint (planned) | Status |
|---|---|---|
| Fetch quiz structure | `GET /quizzes/{id}` | Not yet called |
| Fetch quiz results | `GET /quizzes/{id}/results` | Not yet called |
| Fetch quiz analytics | `GET /quizzes/{id}/analytics` | Not yet called |

## Change Log

| Date | Change | Author |
|---|---|---|
| 2026-05-04 | Initial audit created. Base URL confirmed. Env vars defined. | Automation setup |
