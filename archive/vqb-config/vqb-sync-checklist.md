# VQB Sync Checklist — Vital Vision Shop

Complete this checklist before making any VQB API call or quiz embed change.

## Pre-Flight Safety Check

- [ ] `VQB_API_MODE=read_only` is set in .env
- [ ] `AUTO_PUBLISH=false` is set in .env
- [ ] `REQUIRE_HUMAN_APPROVAL=true` is set in .env
- [ ] Ran `npm run vqb:check` and it passed
- [ ] No API keys are visible in any output, log, or terminal history

## Before Any Read-Only API Call

- [ ] Purpose of the API call is documented
- [ ] Only reading data — not modifying any quiz
- [ ] Output will be saved to `reports/vqb/` (gitignored)
- [ ] No results will be published or shared without human review

## Before Any Shopify Theme Edit (Quiz Embed)

- [ ] Human has reviewed and approved the embed plan
- [ ] Backed up the following files:
  - [ ] `templates/index.json`
  - [ ] `sections/slideshow.liquid`
  - [ ] `layout/theme.liquid`
  - [ ] `sections/custom-liquid.liquid` (if editing)
- [ ] Tested embed on Shopify Preview before pushing live
- [ ] Confirmed correct Quiz ID for the placement:
  - [ ] Homepage → VQB_ORGANIC_QUIZ_ID
  - [ ] Paid landing page → VQB_PAID_QUIZ_ID
- [ ] VQB_BROWSER_API_KEY used (not VQB_PRIVATE_API_KEY) in any frontend code

## After Any API Call or Embed Change

- [ ] Verified no keys were logged or printed in full
- [ ] Verified quiz still loads correctly on Shopify storefront
- [ ] Saved a report or note to `reports/vqb/`
- [ ] Updated `config/vqb-api-audit.md` change log

## Never Do

- [ ] Auto-call any API on a schedule without explicit per-run approval
- [ ] Edit, publish, or delete any quiz via API
- [ ] Expose VQB_PRIVATE_API_KEY in Shopify theme or frontend code
- [ ] Push Shopify theme changes without human review
- [ ] Connect VQB to Meta or Google ad accounts automatically
