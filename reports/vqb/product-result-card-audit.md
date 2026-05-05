# VQB Product Result Card Audit — Vital Vision Shop
# PLANNING DOCUMENT — No changes have been made to VQB or Shopify.
# AUTO_PUBLISH=false | REQUIRE_HUMAN_APPROVAL=true | VQB_API_MODE=read_only

Date: 2026-05-04

---

## Current State Summary

The VQB result card currently shows:
- Recommended product (image + name)
- Quantity selector
- "Shop This Match" CTA
- "Why This Match?" section

These are the right elements. The issues are in copy quality, mobile layout,
visual hierarchy, and compliance clarity.

---

## Issue Audit

### Issue 1 — No Personalized Result Headline
**Current:** Product name appears as the first major text element.
**Problem:** No emotional hook connecting the quiz answer to the product.
**Impact:** User does not immediately feel that the result is personalized to them.

**Fix:**
Add a personalized result headline above the product name.
- Inner Bloom: "Your gut may be ready for daily support."
- Inner Calm: "Your evenings may deserve a calmer ritual."
- Inner Grow: "Your glow may start from within."
- Inner Balance: "Your daily wellness foundation may start here."

**Reference:** config/vqb-product-result-card-copy.md

---

### Issue 2 — Generic Product Description
**Current:** Product description is the same as the Shopify product page copy.
Not tailored to the quiz context.
**Problem:** Misses the opportunity to reinforce why this product matches
this user's specific quiz answer.

**Fix:**
Use quiz-context-specific short descriptions for each product on the result card.
Each description connects the product to the user's quiz answer without
making disease claims.

**Reference:** config/vqb-product-result-card-copy.md — Short product description

---

### Issue 3 — Mobile Layout: Image and Text Side-by-Side
**Current:** On mobile viewports (375–390px), product image and product text
appear side by side.
**Problem:** Creates a cramped, non-premium layout. Neither element gets
adequate visual weight. Product title often wraps to 3+ lines.

**Fix:**
Stack image above text on mobile. Image should be full card width.
Product name and description below the image in a single column.

**Reference:** config/vqb-product-result-layout-rules.md — Mobile stacked layout

---

### Issue 4 — Product Title Wrapping
**Current:** "Inner Grow — Hair, Skin & Nails Support" wraps to 3 lines
at 375px with current font size.
**Problem:** Creates a large text block before the user reaches the CTA.
Reduces the premium feel of the result.

**Fix:**
- Reduce product name font size to 16px on mobile.
- Display product name on one line, subname on a second line in smaller muted text.
  - Line 1: "Inner Grow" (16px medium)
  - Line 2: "Hair, Skin & Nails Support" (13px muted)

**Reference:** config/vqb-product-result-layout-rules.md — Typography scale

---

### Issue 5 — Primary and Secondary CTA Have Similar Visual Weight
**Current:** "Shop This Match" and "Why This Match?" appear at similar
visual prominence.
**Problem:** Two equally weighted actions create decision friction.
User may choose "Why This Match?" instead of converting, reducing CVR.

**Fix:**
- Primary CTA: full-width, brand primary color, bold, 48px height.
- Secondary CTA: text link or subtle outline only — clearly less prominent.
- "Why This Match?" must not compete visually with the primary CTA.

**Reference:** config/vqb-product-result-layout-rules.md — CTA hierarchy

---

### Issue 6 — "Why This Match?" Copy Is Generic or Missing
**Current:** "Why This Match?" section either shows generic product marketing
copy or is absent.
**Problem:** Does not build personalized trust. Does not connect quiz answer
to product recommendation with clear, compliant reasoning.

**Fix:**
Write product-specific "Why This Match?" copy for all 4 outcomes.
Each version:
- Acknowledges the user's quiz answer ("Your answers suggest...")
- Explains the product's relevant function in compliant language
- Reinforces daily ritual / consistency framing
- Closes with "Results may vary. This is not medical advice."

**Reference:** config/vqb-why-this-match-copy.md

---

### Issue 7 — Compliance Disclaimer Missing or Buried
**Current:** Disclaimer may be absent from the result card or only visible
in a page footer.
**Problem:** FTC and FDA guidelines require structure/function claim disclaimers
to be clear and conspicuous near the claim.

**Fix:**
Add a short disclaimer directly below the "Why This Match?" section on the result card:
> "This recommendation is for educational purposes only and is not medical advice.
> Results may vary."

Full disclaimer below the CTA block:
> "These statements have not been evaluated by the Food and Drug Administration.
> This product is not intended to diagnose, treat, cure, or prevent any disease."

**Reference:** config/vqb-product-result-card-copy.md — Disclaimer

---

### Issue 8 — Quantity Selector UX
**Current:** Quantity selector may be a dropdown or number input, which is
difficult to interact with on mobile.
**Problem:** Dropdowns are poor UX on mobile touch screens.

**Fix:**
Use horizontal pill/chip buttons for quantity selection on mobile.
- Default: 1 Bottle — 30-Day Supply (pre-selected)
- Option: 2 Bottles — 60-Day Supply
- Option: 3 Bottles — 90-Day Supply (optional "Best Value" badge)

**Reference:** config/vqb-product-result-layout-rules.md — Quantity selector rules

---

## Priority Order for Implementation

| # | Fix | Effort | Conversion Impact |
|---|---|---|---|
| 1 | Add personalized result headline per product | Low | High |
| 2 | Rewrite short product descriptions for quiz context | Low | High |
| 3 | Add compliance disclaimer to result card | Low | High |
| 4 | Rewrite "Why This Match?" copy for all 4 products | Low | High |
| 5 | Reduce secondary CTA visual weight | Low | Medium |
| 6 | Fix mobile stacking: image above text | Medium | High |
| 7 | Fix product title wrapping at 375px | Low | Medium |
| 8 | Switch quantity selector to pill chips on mobile | Medium | Medium |
| 9 | Test all cards at 375px and 390px | Low | High |

---

## Files Created — Reference Index

| File | Contents |
|---|---|
| config/vqb-product-result-card-copy.md | Final copy for all 4 product result cards |
| config/vqb-product-result-layout-rules.md | Mobile and desktop layout rules |
| config/vqb-why-this-match-copy.md | "Why This Match?" copy for all 4 products |
| reports/vqb/product-result-card-audit.md | This file — issue audit and priority list |

---

## Next Steps

1. Human reviews this audit and the copy files.
2. Human opens VQB dashboard and updates result card copy directly.
3. Human adjusts layout settings in VQB if supported.
4. Test on mobile at 375px before publishing.
5. Human approves and publishes. No automation touches VQB.

---

*No changes have been made to VQB, Shopify, or any live content.*
*This is a planning and copy document only.*
*All changes require human approval before implementation.*
