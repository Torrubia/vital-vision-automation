# VQB Mobile UX Checklist — Vital Vision Shop
# Complete this checklist before approving any VQB result flow change.
# PLANNING DOCUMENT — No changes have been made.

---

## Device Test Targets

- [ ] iPhone SE (375px width) — smallest common viewport
- [ ] iPhone 14 / 15 (390px width) — most common iOS
- [ ] iPhone 14 Plus / 15 Pro Max (430px) — large iOS
- [ ] Android mid-range (360px width)
- [ ] Tablet (768px) — confirm layout does not break

---

## Screen 1 — Quiz Completion Transition

- [ ] Headline fits on 1–2 lines at 375px
- [ ] Subhead fits on 2–3 lines at 375px
- [ ] No content is cut off below the fold
- [ ] Transition animation is smooth (no flash or jump)

---

## Screen 2 — Email Capture

- [ ] Headline visible above fold at 375px (no scroll needed)
- [ ] Subhead visible above fold
- [ ] Email input field is full width
- [ ] Email input touch target is at least 48px tall
- [ ] CTA button ("Reveal My Match →") is visible above fold without scrolling
- [ ] CTA button is full width on mobile
- [ ] Micro-copy ("No spam. Unsubscribe anytime.") is below button and does not push button off screen
- [ ] No decorative image pushes CTA below fold
- [ ] Keyboard does not cover the CTA when email input is focused

---

## Screen 3 — Discount Code

- [ ] Screen fits in one mobile viewport — no scroll required to reach CTA
- [ ] Discount code is clearly visible and readable (18px+, monospace)
- [ ] Code is in a visually distinct box (border or background)
- [ ] Instructions ("Applied automatically...") are small and muted
- [ ] CTA ("See My Product Match ↓") is full width
- [ ] CTA is the only action on screen — no competing buttons
- [ ] Screen does not contain product images or long marketing copy

---

## Screen 4 — Product Result Card

- [ ] Product image appears ABOVE the product title on mobile
- [ ] Product image is full width or close to full width
- [ ] Product name does not wrap to more than 2 lines at 375px
- [ ] Result headline is 18px or smaller on mobile
- [ ] Result body copy is 14px on mobile
- [ ] Benefit tags wrap cleanly and do not overflow container
- [ ] "Why This Match?" section is BELOW the CTA button
- [ ] CTA button is full width on mobile
- [ ] CTA button minimum height is 48px
- [ ] No horizontal scrolling on result card
- [ ] Result card fits cleanly in viewport — user can see headline + image + CTA without excessive scroll

---

## Screen 5 — "Why This Match?"

- [ ] Section is collapsed by default on mobile (accordion/expandable)
- [ ] Expand tap target is at least 44px tall
- [ ] Expanded copy is 14px, readable
- [ ] No compliance issues in expanded copy
- [ ] Section does not appear above the CTA button

---

## Screen 6 — Final CTA Block

- [ ] Headline and subhead are concise and fit without overflow
- [ ] "Shop My Match →" button is full width on mobile
- [ ] Reassurance text ("Free shipping...") is below button, small and muted
- [ ] Discount code reminder is present and visible

---

## Compliance Checks (All Screens)

- [ ] No disease claims on any screen
- [ ] No "cure", "treat", "prevent", "fix", "heal" language
- [ ] No guaranteed outcome language
- [ ] "Results may vary" present on result card
- [ ] Full disclaimer present on result card:
  *"This recommendation is for educational purposes only and is not medical advice.
  Results may vary. These statements have not been evaluated by the Food and Drug Administration.
  This product is not intended to diagnose, treat, cure, or prevent any disease."*
- [ ] Compliance reviewed by human before publishing

---

## Performance Checks (Mobile)

- [ ] Product images are compressed and load within 2 seconds on 4G
- [ ] No heavy fonts or icon libraries that delay first paint
- [ ] Quiz result loads without visible layout shift (no CLS issues)
- [ ] Email form submits without page reload or jarring transition

---

## Final Approval Gate

- [ ] All screens tested on iPhone SE (375px)
- [ ] All screens tested on iPhone 14 (390px)
- [ ] Compliance review completed
- [ ] Human has reviewed all copy in config/vqb-result-page-copy.md
- [ ] Human has reviewed result-page-redesign-audit.md priority list
- [ ] Human approves VQB changes before publishing
- [ ] `AUTO_PUBLISH=false` confirmed
- [ ] `REQUIRE_HUMAN_APPROVAL=true` confirmed

---

*No changes have been made to VQB, Shopify, or any live content.*
*All changes require human approval before implementation.*
