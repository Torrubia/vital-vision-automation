# VQB Result Page Redesign Audit — Vital Vision Shop
# PLANNING DOCUMENT — No changes have been made to VQB or Shopify.
# AUTO_PUBLISH=false | REQUIRE_HUMAN_APPROVAL=true | VQB_API_MODE=read_only

Date: 2026-05-04

---

## Audit Summary

| Area | Current State | Issue Severity | Recommended Action |
|---|---|---|---|
| Mobile typography | Text too large | High | Reduce to 16–18px max for results |
| Email capture screen | Too long, overwhelming | High | Single viewport — remove decorative elements |
| Discount screen position | Appears before result | Medium | Keep position, make screen shorter and functional |
| Product result card | Too simple | High | Add benefit tags, "Why This Match?", stronger copy |
| Product title wrapping | Wraps aggressively on mobile | Medium | Reduce font size, limit to 2 lines |
| Product image/text layout | Not optimized for mobile | High | Stack vertically — image above title |
| "Why This Match?" copy | Vague or non-compliant | High | Rewrite with compliant, specific copy per product |
| CTA buttons | Generic labels | Medium | Use premium, conversion-focused labels |
| Result explanation | Weak product-to-answer link | High | Add clear answer-to-product mapping copy |
| Compliance disclaimer | May be missing or buried | High | Add visible disclaimer to every result card |

---

## Detailed Findings

### 1. Mobile Typography
**Issue:** Quiz question text and result headlines are too large on mobile,
creating a non-premium, overwhelming experience.

**Observed:** Headlines appear at 24–28px+ on mobile viewports.
**Recommended:** Cap result headlines at 18–20px on mobile. Body copy at 14px.
**Reference:** config/vqb-mobile-layout-rules.md

---

### 2. Email Capture Screen
**Issue:** Screen is too long. Users must scroll to reach the CTA on mobile.
Decorative elements push the email input and submit button below the fold.

**Recommended fix:**
- Remove decorative imagery from email screen.
- Headline + subhead + email input + CTA must all be visible above the fold at 375px.
- Micro-copy ("No spam. Unsubscribe anytime.") below button — small and muted.

**Reference copy:** config/vqb-result-page-copy.md — Screen 2

---

### 3. Discount Code Screen
**Issue:** Screen appears before the product result, which may cause users to
copy the code and close the page before seeing their recommendation.
Screen is visually heavy.

**Recommended approach:**
- Keep order (discount before result) — this is a VQB flow constraint.
- Make the screen SHORT and functional: code + one CTA to proceed.
- CTA clearly directs to the result: "See My Product Match ↓"
- Remove all marketing copy from this screen.

**Reference copy:** config/vqb-discount-gate-copy.md

---

### 4. Product Result Card
**Issue:** Card is too simple. Lacks benefit tags, "Why This Match?" context,
and a clear emotional hook connecting quiz answer to product.

**Recommended additions:**
- Match label: "Your Wellness Match"
- Result headline (product-specific, emotionally resonant)
- Short result body (2–3 sentences, compliant)
- Benefit tags (3 pill tags per product)
- "Why This Match?" expandable section
- Full-width CTA button

**Reference copy:** config/vqb-result-page-copy.md — Screen 4 & 5

---

### 5. Product Title Wrapping on Mobile
**Issue:** Long product names ("Inner Grow — Hair, Skin & Nails Support") wrap
aggressively at 375px, creating a visual break before the user reaches the CTA.

**Recommended fix:**
- Reduce product title font size to 16px on mobile.
- Limit product title display to 2 lines max.
- If needed, use a short name display ("Inner Grow") with full name below in smaller text.

---

### 6. Product Image & Text Layout
**Issue:** On mobile, product image and text appear side by side, which creates
a cramped layout at 375px width. Neither element gets adequate space.

**Recommended fix:**
- Stack vertically on mobile: image above title.
- Image: full width, aspect ratio 1:1 or 4:3.
- Title and copy below image in full-width single column.

**Reference:** config/vqb-mobile-layout-rules.md — Product Result Card

---

### 7. "Why This Match?" Copy
**Issue:** Current copy is generic or missing. Does not clearly connect the
user's quiz answer to the recommended product. May include vague wellness language.

**Recommended fix:**
- Write product-specific copy for each of the 4 quiz outcomes.
- Lead with the user's implied need ("Your answers suggest...").
- Use compliant language throughout.
- Keep to 3–5 sentences per product.

**Reference copy:** config/vqb-result-page-copy.md — Screen 5

---

### 8. CTA Button Labels
**Issue:** Generic labels ("Buy Now", "Shop Now") do not reinforce the
personalized, premium nature of the quiz experience.

**Recommended labels:**
- Product result card: "Shop [Product Name] →"
- Final CTA block: "Shop My Match →"
- Email capture: "Reveal My Match →"
- Discount screen: "See My Product Match ↓"

---

### 9. Compliance Disclaimer
**Issue:** Disclaimer may be absent from result cards or buried in page footer.

**Required disclaimer (must appear on every result card):**
> This recommendation is for educational purposes only and is not medical advice.
> Results may vary. These statements have not been evaluated by the Food and Drug Administration.
> This product is not intended to diagnose, treat, cure, or prevent any disease.

---

## Priority Implementation Order

| Priority | Change | Effort | Impact |
|---|---|---|---|
| 1 | Rewrite result card copy (all 4 products) | Low | High |
| 2 | Add compliance disclaimer to result cards | Low | High |
| 3 | Simplify discount code screen | Low | Medium |
| 4 | Shorten email capture screen | Low | High |
| 5 | Fix mobile stacking (image above title) | Medium | High |
| 6 | Add benefit tags to result card | Medium | Medium |
| 7 | Add "Why This Match?" section | Medium | High |
| 8 | Update CTA button labels | Low | Medium |
| 9 | Reduce mobile typography sizes | Medium | High |
| 10 | Test all screens at 375px and 390px | Low | High |

---

## Next Steps

1. Human reviews this audit and confirms priorities.
2. Human implements changes directly in VQB dashboard.
3. Use config/vqb-sync-checklist.md before and after any VQB edit.
4. Test on mobile (375px) before publishing.
5. Human approves final result flow before going live.

---

*No changes have been made to VQB, Shopify, or any live content.*
*This is a planning document only.*
*All changes require human approval before implementation.*
