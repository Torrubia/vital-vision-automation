# Result Page Mobile QA Checklist
# Vital Vision Shop — PageFly Inner Line Result Pages
# Generated: 2026-05-11
# Status: CHECKLIST — run before publishing any result page

---

## How to Run This Checklist

- Use Chrome DevTools → Toggle Device Toolbar → iPhone SE (375px width)
- OR test on a real iPhone device
- Run the full checklist for each result page before publishing
- Do NOT publish any page until all checks in all sections are marked PASS

---

## SECTION 1 — Above the Fold (First View, No Scroll)

Check what a user sees without scrolling at 375px.

| # | Check | Pass? |
|---|---|---|
| 1.1 | Hero headline "Your Quiz Match: [Product]" is fully visible | [ ] |
| 1.2 | Hero subheadline is visible and readable | [ ] |
| 1.3 | Primary CTA button "VIEW YOUR MATCH →" is visible without scrolling | [ ] |
| 1.4 | No text is cut off or hidden by the browser chrome | [ ] |
| 1.5 | Hero image or background is visible and renders correctly | [ ] |
| 1.6 | Page does not have a horizontal scrollbar | [ ] |
| 1.7 | Hero text is readable over the background (sufficient contrast) | [ ] |
| 1.8 | Small disclaimer "Educational only. Not medical advice." visible in hero | [ ] |

---

## SECTION 2 — Product Visibility

| # | Check | Pass? |
|---|---|---|
| 2.1 | Product name is visible and fully readable | [ ] |
| 2.2 | Product name does not wrap beyond 2 lines at 375px | [ ] |
| 2.3 | Product image renders correctly (not stretched, not missing) | [ ] |
| 2.4 | Product image loads within 3 seconds on mobile connection | [ ] |
| 2.5 | Product description is readable (min 13px font size) | [ ] |
| 2.6 | "Your Daily Match" section heading is visible | [ ] |
| 2.7 | "Based on your quiz answers." subheading is visible | [ ] |
| 2.8 | No product content is hidden or clipped | [ ] |

---

## SECTION 3 — CTA Visibility and Function

| # | Check | Pass? |
|---|---|---|
| 3.1 | Primary CTA button is full-width at 375px | [ ] |
| 3.2 | Primary CTA button is at least 48px tall (tap target) | [ ] |
| 3.3 | Primary CTA button text is fully visible (not truncated) | [ ] |
| 3.4 | Primary CTA links to correct Shopify product page (test the tap) | [ ] |
| 3.5 | Shopify product page loads after tapping CTA | [ ] |
| 3.6 | Secondary CTA "WHY THIS MATCH?" is visible below primary CTA | [ ] |
| 3.7 | Secondary CTA tap area is at least 44px | [ ] |
| 3.8 | Final CTA button at bottom of page is full-width | [ ] |
| 3.9 | Final CTA links to correct Shopify product page | [ ] |
| 3.10 | "Retake the Quiz" link is visible and tappable | [ ] |

---

## SECTION 4 — Compliance and Medical Claims

| # | Check | Pass? |
|---|---|---|
| 4.1 | No use of: cure, treat, prevent, diagnose, reverse, guaranteed | [ ] |
| 4.2 | No disease names: anxiety, depression, insomnia, IBS, diabetes, cancer | [ ] |
| 4.3 | No "FDA approved" or "doctor recommended" language | [ ] |
| 4.4 | No "clinically proven" without cited study | [ ] |
| 4.5 | "Results may vary" appears at least once on the page | [ ] |
| 4.6 | "Educational only. Not medical advice." appears at least once | [ ] |
| 4.7 | Full FDA disclaimer visible: "These statements have not been evaluated..." | [ ] |
| 4.8 | Additional disclaimer visible: consult healthcare professional | [ ] |
| 4.9 | No before/after body imagery used anywhere on the page | [ ] |
| 4.10 | `npm run result:check-copy` passed with 0 violations | [ ] |

---

## SECTION 5 — Load Speed

| # | Check | Pass? |
|---|---|---|
| 5.1 | Page visible in under 3 seconds on mobile connection (throttled 4G in DevTools) | [ ] |
| 5.2 | Hero image is optimized (under 300KB recommended for mobile) | [ ] |
| 5.3 | No render-blocking scripts visible in DevTools Network tab | [ ] |
| 5.4 | PageFly page does not show loading spinner for more than 1 second | [ ] |
| 5.5 | No broken image placeholders (all images load) | [ ] |

---

## SECTION 6 — Button Links and Navigation

| # | Check | Pass? |
|---|---|---|
| 6.1 | All CTA buttons link to correct destination (no 404) | [ ] |
| 6.2 | "Retake the Quiz" link leads back to the quiz page | [ ] |
| 6.3 | No links open in a new tab unexpectedly (unless intended) | [ ] |
| 6.4 | No broken anchor links (#why-this-match, etc.) | [ ] |
| 6.5 | Product page link includes correct Shopify product handle | [ ] |
| 6.6 | Page URL handle is correct: /pages/inner-[product]-result | [ ] |

---

## SECTION 7 — Result Accuracy

| # | Check | Pass? |
|---|---|---|
| 7.1 | Page headline matches the correct product (not wrong product name) | [ ] |
| 7.2 | Product image is for the correct product | [ ] |
| 7.3 | "Your Wellness Goal" label matches the correct quiz answer category | [ ] |
| 7.4 | "Why This Match" copy is specific to this product (not copy-pasted from another) | [ ] |
| 7.5 | Routine steps are appropriate for this product (morning vs evening) | [ ] |
| 7.6 | FAQ answers reference the correct product name | [ ] |
| 7.7 | VQB routing delivers the customer to the correct result page | [ ] |

---

## SECTION 8 — Disclaimer Visibility

| # | Check | Pass? |
|---|---|---|
| 8.1 | Hero disclaimer visible at top of page | [ ] |
| 8.2 | Short disclaimer below product recommendation section | [ ] |
| 8.3 | Compliance tag after "Why This Match" section | [ ] |
| 8.4 | FDA disclaimer below benefit bullets (full verbatim text) | [ ] |
| 8.5 | Trust block disclaimer visible and readable | [ ] |
| 8.6 | Final disclaimer at bottom of page | [ ] |
| 8.7 | All disclaimer text is at least 11px — not invisible | [ ] |
| 8.8 | Disclaimer text is not the same color as the background | [ ] |

---

## Per-Page Sign-Off

Complete this block for each result page before publishing.

### Inner Bloom Result Page (/pages/inner-bloom-result)

| Item | Status |
|---|---|
| All Section 1–8 checks passed | [ ] |
| Tested on real iPhone device | [ ] |
| Compliance scan passed | [ ] |
| CTA links to correct product page | [ ] |
| VQB routing tested | [ ] |
| Human reviewer | _______________ |
| Date approved | _______________ |
| Approved to publish | YES / NO |

---

### Inner Calm Result Page (/pages/inner-calm-result)

| Item | Status |
|---|---|
| All Section 1–8 checks passed | [ ] |
| Tested on real iPhone device | [ ] |
| Compliance scan passed | [ ] |
| CTA links to correct product page | [ ] |
| VQB routing tested | [ ] |
| Human reviewer | _______________ |
| Date approved | _______________ |
| Approved to publish | YES / NO |

---

### Inner Grow Result Page (/pages/inner-grow-result)

| Item | Status |
|---|---|
| All Section 1–8 checks passed | [ ] |
| Tested on real iPhone device | [ ] |
| Compliance scan passed | [ ] |
| CTA links to correct product page | [ ] |
| VQB routing tested | [ ] |
| Human reviewer | _______________ |
| Date approved | _______________ |
| Approved to publish | YES / NO |

---

### Inner Balance Result Page (/pages/inner-balance-result)

| Item | Status |
|---|---|
| All Section 1–8 checks passed | [ ] |
| Tested on real iPhone device | [ ] |
| Compliance scan passed | [ ] |
| CTA links to correct product page | [ ] |
| VQB routing tested | [ ] |
| Human reviewer | _______________ |
| Date approved | _______________ |
| Approved to publish | YES / NO |

---

*No result pages have been published.*
*This checklist must be completed before any page goes live.*
