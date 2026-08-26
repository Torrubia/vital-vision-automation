# VQB Browser API Plan — Vital Vision Shop

## Purpose
Document the planned use of the Visual Quiz Builder Browser API Key
for frontend quiz embed integrations on Vital Vision Shop.

## Browser API Key Usage

The `VQB_BROWSER_API_KEY` is intended for:
- Client-side quiz embed initialization
- Frontend event listeners (quiz started, quiz completed, result shown)
- Browser-to-VQB communication for quiz rendering

It is NOT for:
- Server-side API calls (use VQB_PRIVATE_API_KEY for those)
- Modifying quiz content or settings
- Publishing or deleting quizzes

## Planned Integration Points

### 1. Homepage Quick Match Quiz (Organic)
- Embed ID: `VQB_ORGANIC_QUIZ_ID` (from .env)
- Placement: Homepage hero CTA
- Trigger: Button click — "Take the Quiz"
- Expected result: Product recommendation page

### 2. Paid Traffic Quiz (Google / Meta Ads)
- Embed ID: `VQB_PAID_QUIZ_ID` (from .env)
- Placement: Dedicated quiz landing page
- Trigger: Page load / CTA button
- Expected result: Product recommendation page with ad attribution

## Safety Constraints

- Do not expose VQB_PRIVATE_API_KEY in any frontend code or Shopify theme files.
- VQB_BROWSER_API_KEY is the only key permitted in client-side contexts.
- All Shopify theme edits require human review before deployment.
- No quiz embed changes are made automatically.

## Shopify Theme Integration Notes

- Current quiz provider: Whai (external JS embed)
- VQB integration: planned — requires manual Shopify theme edit
- Confirmed safe edit location: `sections/custom-liquid.liquid`
- Files to back up before any VQB embed change:
  - `templates/index.json`
  - `sections/slideshow.liquid`
  - `layout/theme.liquid`

## Status

| Step | Status |
|---|---|
| Base URL confirmed | Done |
| Env vars defined | Done |
| Browser API key added to .env | Pending |
| Quiz IDs confirmed in VQB dashboard | Pending |
| Test embed on staging | Not started |
| Human approval for Shopify edit | Required before any embed |
| Live deployment | Not started |
