# VQB to PageFly Routing Plan
# Vital Vision Shop | Quiz ID: 16047
# Generated: 2026-05-11
# Status: PLAN ONLY — no quiz logic has been changed

---

## Overview

This plan defines which VQB quiz answer/result routes to which PageFly result page,
and what needs to be verified in VQB before any routing change is made.

No quiz answer mappings, product IDs, or quiz logic have been changed.
All routing changes require human action in the VQB dashboard after PageFly pages are live.

---

## Current Routing (Do Not Change Yet)

| Quiz Answer | VQB Result Card | Current CTA Destination |
|---|---|---|
| Digestion & Gut Wellness | Inner Bloom card | Shopify product page (direct) |
| Stress & Calm | Inner Calm card | Shopify product page (direct) |
| Hair, Skin & Nails | Inner Grow card | Shopify product page (direct) |
| Overall Daily Wellness | Inner Balance card | Shopify product page (direct) |

**Do not change these until PageFly result pages are built, QA'd, and approved.**

---

## Target Routing (After PageFly Pages Are Live)

| Quiz Answer | VQB Result Card | New CTA Destination |
|---|---|---|
| Digestion & Gut Wellness | Inner Bloom card | https://vitalvision.shop/pages/inner-bloom-result |
| Stress & Calm | Inner Calm card | https://vitalvision.shop/pages/inner-calm-result |
| Hair, Skin & Nails | Inner Grow card | https://vitalvision.shop/pages/inner-grow-result |
| Overall Daily Wellness | Inner Balance card | https://vitalvision.shop/pages/inner-balance-result |

**Change one at a time. Test each routing change before updating the next.**

---

## VQB Fields to Check Before Changing Routing

**Navigation path:**
VQB Dashboard → VV Home Quick Match Quiz — 1Q → Result Pages → [each card]

For each result card, locate and note the current value of:

| Field | What to check | Notes |
|---|---|---|
| Primary CTA button URL | Current destination URL | This is what you will change to the PageFly page URL |
| Primary CTA button text | Current text | Can remain "View Product" OR update to "VIEW MY RESULT →" |
| Secondary CTA behavior | Does it open a panel or link? | Do not change secondary CTA destination |
| Quiz answer → card mapping | Which quiz answer triggers this card | DO NOT CHANGE — routing logic only |
| Product ID / product assignment | Which Shopify product is linked | DO NOT CHANGE |

**Screenshot all current CTA field values before making any change.**

---

## Routing Change Options

### Option A — Full Router Mode (Recommended for conversion testing)

Change the VQB primary CTA to point to the PageFly result page instead of the product page.

- Customer flow: Quiz → VQB result card → PageFly result page → Shopify product page
- Benefit: Full personalized experience on PageFly
- Risk: One extra click before product page — may reduce direct add-to-cart rate

### Option B — Parallel Mode (Lower risk, easier to test)

Keep VQB CTA pointing to the Shopify product page.
Add a link to the PageFly result page from the product page, homepage, or email flows.

- Customer flow: Quiz → VQB result card → Shopify product page (unchanged)
- PageFly pages accessible via campaigns, email, or manual share
- Benefit: No risk to current quiz conversion flow
- Risk: Result pages don't get quiz-origin traffic

### Option C — Campaign Mode

Keep VQB CTA unchanged.
Use PageFly result pages as landing pages for paid campaigns (Google, Meta).
Campaign URL: `vitalvision.shop/pages/inner-bloom-result?utm_source=...`

- No VQB change required
- PageFly result pages serve campaign traffic only
- Quiz remains on its current flow

**Recommendation:** Start with Option C (campaign mode) or Option B (parallel).
Do not change VQB quiz routing until at least one PageFly page is QA'd and live.

---

## Implementation Sequence

| Step | Action | Who | When |
|---|---|---|---|
| 1 | Build Inner Bloom result page in PageFly | Human — PageFly | Before any routing change |
| 2 | Mobile QA Inner Bloom page | Human — browser | Before publishing |
| 3 | Publish Inner Bloom page (Shopify pages only, not as campaign) | Human — Shopify | After QA |
| 4 | Verify page is live: https://vitalvision.shop/pages/inner-bloom-result | Browser | After publish |
| 5 | In VQB: update Inner Bloom card primary CTA URL | Human — VQB | After page is verified live |
| 6 | Test full flow: take quiz → answer Gut/Digestion → confirm redirect lands on Inner Bloom page | Human — browser | After VQB change |
| 7 | If test passes: Save in VQB (NOT Save & Publish) | Human — VQB | After flow test |
| 8 | Approve VQB publish | Human sign-off | After review |
| 9 | Repeat steps 1–8 for Inner Calm, Inner Grow, Inner Balance | — | One at a time |

---

## Pre-Routing Verification Checklist

Complete all checks before updating VQB CTA destinations.

| # | Check | Status |
|---|---|---|
| R1 | PageFly page is published and accessible via browser | [ ] |
| R2 | Page URL matches the planned handle exactly | [ ] |
| R3 | Primary CTA on PageFly page links to correct Shopify product | [ ] |
| R4 | Mobile QA checklist passes (see result-page-mobile-qa-checklist.md) | [ ] |
| R5 | FDA disclaimer visible on page | [ ] |
| R6 | "Results may vary" present on page | [ ] |
| R7 | No prohibited medical claims on page (npm run result:check-copy) | [ ] |
| R8 | VQB current CTA URL noted and backed up (screenshot) | [ ] |
| R9 | VQB secondary CTA and quiz answer mapping NOT changed | [ ] |
| R10 | Human approval received for the routing change | [ ] |

---

## Rollback

If a routing change causes issues:

1. Open VQB → Result Pages → [affected card]
2. Revert primary CTA URL to the original Shopify product page URL
3. Click Save (NOT Save & Publish)
4. Test the flow again to confirm product page routing is restored
5. Do NOT delete the PageFly page — leave it as a draft

Original Shopify product page URLs (do not lose these):

| Product | Shopify product handle |
|---|---|
| Inner Bloom | /products/advanced-probiotic-formula |
| Inner Calm | /products/inner-calm-magnesium-glycinate |
| Inner Grow | /products/inner-grow-hair-skin-and-nails-support |
| Inner Balance | /products/inner-balance-complete-multivitamin |

---

*No quiz routing has been changed.*
*No PageFly pages have been created.*
*This is a planning document only.*
