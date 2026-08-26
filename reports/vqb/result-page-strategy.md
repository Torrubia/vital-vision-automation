# Quiz Result Page Strategy — Vital Vision Shop
# Vital Vision Shop
# Generated: 2026-05-11
# Status: STRATEGY ONLY — no live changes made

---

## Why the VQB Result Page Is Not Converting Well

### 1. It Looks Like a Quiz Tool, Not a Product Page

VQB result cards are optimized for quiz completion UX — not e-commerce conversion.
The layout is template-driven: every product gets the same card structure, same spacing,
same button style. A customer who just answered "What is your wellness goal?" deserves
a page that feels like it was built specifically for their answer — not a form output.

### 2. No Premium Visual Storytelling

VQB result pages cannot easily support:
- Full-width hero imagery with layered text
- Brand photography with mobile-first art direction
- Before/after routine framing (morning ritual, evening ritual)
- Section-by-section narrative flow

The quiz result is the highest-intent moment in the customer journey.
The page design should match that intent.

### 3. Mobile Layout Is Fragile

The VQB result card renders inside a Shopify app iframe. CSS/JS injected via the
VQB Custom JavaScript console applies globally to the quiz context — any override
risks breaking the layout on update or plan change. We experienced this directly:
the VV Fix Pack v1.0 caused a broken mobile layout that required manual recovery.

Native VQB mobile layout is constrained by the platform's own template system.
We cannot control it with the same precision as a Shopify/PageFly page.

### 4. Limited Trust Architecture

A high-converting product recommendation page needs:
- Compliance disclaimer block (prominently placed)
- "Why this was matched to you" narrative
- Routine steps (how to use it)
- FAQ section addressing objections
- Social proof or trust signals

VQB result cards cannot easily accommodate all of these sections in a structured,
visually distinct layout. They surface in one flat card without hierarchy.

### 5. No Per-Product Analytics Isolation

When a customer converts from the VQB result page, the referral path is:
quiz app → product page → checkout. This makes it difficult to measure which result
card converts best, or to A/B test different result page variants.

Separate Shopify pages with distinct URLs give clean per-product conversion data
in Google Analytics, and allow UTM parameters to track which quiz result drove
the purchase.

### 6. VQB Platform Lock-In

Any investment in VQB result page polish (copy, design, JS) is locked inside the
VQB platform. If VQB changes its plan, template, or iframe structure, the investment
is lost. Building the result experience on Shopify/PageFly decouples the quiz logic
from the result page presentation.

---

## Why PageFly/Shopify Result Pages May Convert Better

| Factor | VQB Result Card | PageFly Result Page |
|---|---|---|
| Design control | Template-constrained | Full layout control |
| Mobile optimization | CSS injection required | Native PageFly mobile tools |
| Hero imagery | Small product card format | Full-width hero section |
| Personalized narrative | Single text block | Multi-section story |
| Trust blocks | Limited | Full FAQ, disclaimer, routine steps |
| Analytics | App iframe path | Clean Shopify URL + GA4 |
| A/B testing | Not available | PageFly built-in or Google Optimize |
| Load speed | Dependent on VQB app load | Shopify CDN |
| SEO | Not indexed (quiz flow) | Indexable if desired |
| Rollback safety | VQB version history | Shopify page history + PageFly autosave |

---

## How to Use VQB as a Router Only

This is the core strategy shift.

**Current flow:**
Quiz answer → VQB result card → product page

**New flow:**
Quiz answer → VQB result card (minimal, with one CTA) → PageFly result page → product page

**Implementation:**
1. In VQB, set each result card's primary CTA to redirect to the matching result page
   (instead of directly to the Shopify product page)
2. The PageFly result page carries the personalized experience, copy, and trust elements
3. The Shopify product page remains the transactional endpoint
4. VQB handles quiz logic only — result page handles conversion

**VQB result card in router-only mode (minimal copy needed):**
- Match label: Your Wellness Match ✨
- Result headline: We found your match. See your personalized recommendation →
- Primary CTA: VIEW MY RESULT → (links to /pages/[product]-result)
- No product card needed on VQB — the result page handles that

**Or: keep VQB result card as-is and treat the PageFly pages as optional deep links**
- VQB result card CTA routes to Shopify product page (unchanged)
- PageFly result pages are accessible via direct link or campaign
- Quiz CTA on homepage can link to result pages directly for certain campaigns
- Both flows coexist — no quiz logic change needed

---

## Risks and Limits

| Risk | Mitigation |
|---|---|
| VQB redirect field may not support custom URLs | Test in VQB before building pages |
| PageFly page building takes time | Build Inner Bloom first — use as template for others |
| Customer who skips the quiz lands on a result page | Add "Take the quiz first" UX pattern |
| Result page becomes out of date if product changes | Maintain a page update checklist |
| Medical claim risk in copy | Run `npm run result:check-copy` on all drafts |
| PageFly page not mobile-optimized | Mobile QA checklist before publishing |
| Duplicate content if pages are indexed by Google | Add canonical tag or noindex if desired |

---

## Recommended Build Order

1. **Inner Bloom** — build first (highest quiz traffic from gut wellness queries)
2. **Inner Calm** — build second (strong magnesium keyword intent)
3. **Inner Grow** — build third (beauty supplement category is visual — design matters)
4. **Inner Balance** — build fourth (broadest audience — good as fallback page)

---

## Implementation Phases

| Phase | Action | Requires |
|---|---|---|
| 1 (now) | Create copy drafts + strategy docs | No access needed |
| 2 | Build Inner Bloom result page in PageFly | Shopify + PageFly access |
| 3 | Mobile QA on Inner Bloom | Browser DevTools |
| 4 | Update VQB Inner Bloom CTA to link to result page | VQB access |
| 5 | Test full flow: quiz → result page → product | Manual QA |
| 6 | Approve and publish Inner Bloom | Human sign-off |
| 7 | Repeat for Inner Calm, Inner Grow, Inner Balance | — |

---

*No changes made to VQB, Shopify, PageFly, or any live system.*
*This is a planning document only.*
