# VQB Live Implementation Copy — Vital Vision Shop
# PLANNING DOCUMENT — Human applies these changes manually in VQB dashboard.
# AUTO_PUBLISH=false | REQUIRE_HUMAN_APPROVAL=true | VQB_API_MODE=read_only

---

## How to Use This File

1. Open your VQB dashboard.
2. Navigate to the quiz result pages.
3. Copy and paste each section below into the corresponding VQB field.
4. Follow the Manual Edit Order exactly.
5. Save each screen individually before moving to the next.
6. Test on mobile (375px) before publishing.
7. Human approval required before going live.

---

## Manual Edit Order

| Step | Screen | Action |
|---|---|---|
| 1 | Email capture | Replace headline, subhead, CTA, micro-copy |
| 2 | Discount code | Simplify to headline + code + single CTA |
| 3 | Inner Bloom result | Replace headline, description, CTAs, disclaimer |
| 4 | Inner Calm result | Replace headline, description, CTAs, disclaimer |
| 5 | Inner Grow result | Replace headline, description, CTAs, disclaimer |
| 6 | Inner Balance result | Replace headline, description, CTAs, disclaimer |
| 7 | Why This Match (×4) | Replace all 4 with approved copy |
| 8 | Mobile layout | Apply CSS/font changes if VQB supports it |

---

## Step 1 — Email Capture Screen

Find in VQB: Quiz Settings → Email Gate / Lead Capture Screen

| Field | Copy to paste |
|---|---|
| Headline | Unlock Your Personalized Result |
| Subhead | Your personalized result is ready — plus 10% off your first order. |
| Email placeholder | Your email address |
| CTA button | Reveal My Match → |
| Micro-copy | No spam. Unsubscribe anytime. |

---

## Step 2 — Discount Code Screen

Find in VQB: Quiz Settings → Discount / Coupon Screen

| Field | Copy to paste |
|---|---|
| Headline | Your 10% Off Code Is Ready |
| Subhead | Continue to see your personalized wellness match. |
| Discount code | WELCOME10 |
| Instructions | Applied automatically at checkout · Valid for 48 hours |
| CTA button | See My Product Match ↓ |
| Optional micro-copy | No purchase required to see your result. |

**Remove from this screen:**
- Any product images
- Any long marketing copy
- Any countdown timers
- Any secondary CTAs

---

## Step 3 — Inner Bloom Result Card

Find in VQB: Result Pages → Inner Bloom (or result matched to "Digestion & Gut Wellness")

| Field | Copy to paste |
|---|---|
| Global label | Your Recommended Wellness Match |
| Result headline | Your gut may be ready for daily support. |
| Product name | Inner Bloom — Advanced Probiotic Formula |
| Short description | Formulated to support healthy digestion and daily gut balance as part of a consistent wellness routine. One simple ritual, every morning. |
| Quantity label | Choose Your Starting Point |
| Primary CTA | Shop This Match |
| Secondary CTA | Why This Match? |
| Disclaimer | This recommendation is for educational purposes only and is not medical advice. Results may vary. |

---

## Step 4 — Inner Calm Result Card

Find in VQB: Result Pages → Inner Calm (or result matched to "Stress & Calm")

| Field | Copy to paste |
|---|---|
| Global label | Your Recommended Wellness Match |
| Result headline | Your evenings may deserve a calmer ritual. |
| Product name | Inner Calm — Magnesium Glycinate |
| Short description | Formulated with magnesium glycinate to support a calm evening routine and overall wellness. A quiet daily ritual designed just for you. |
| Quantity label | Choose Your Starting Point |
| Primary CTA | Shop This Match |
| Secondary CTA | Why This Match? |
| Disclaimer | This recommendation is for educational purposes only and is not medical advice. Results may vary. |

---

## Step 5 — Inner Grow Result Card

Find in VQB: Result Pages → Inner Grow (or result matched to "Hair, Skin & Nails")

| Field | Copy to paste |
|---|---|
| Global label | Your Recommended Wellness Match |
| Result headline | Your glow may start from within. |
| Product name | Inner Grow — Hair, Skin & Nails Support |
| Short description | Formulated to support healthy hair, skin, and nails from within as part of a consistent daily wellness routine. Nourishment that works with your body. |
| Quantity label | Choose Your Starting Point |
| Primary CTA | Shop This Match |
| Secondary CTA | Why This Match? |
| Disclaimer | This recommendation is for educational purposes only and is not medical advice. Results may vary. |

---

## Step 6 — Inner Balance Result Card

Find in VQB: Result Pages → Inner Balance (or result matched to "Overall Daily Wellness")

| Field | Copy to paste |
|---|---|
| Global label | Your Recommended Wellness Match |
| Result headline | Your body may be ready for a complete daily foundation. |
| Product name | Inner Balance — Daily Complete Multivitamin |
| Short description | A complete daily multivitamin designed to support your overall wellness from within. One capsule. One ritual. Every day. |
| Quantity label | Choose Your Starting Point |
| Primary CTA | Shop This Match |
| Secondary CTA | Why This Match? |
| Disclaimer | This recommendation is for educational purposes only and is not medical advice. Results may vary. |

---

## Step 7 — "Why This Match?" Copy (all 4)

Find in VQB: Result Pages → each result → "Why This Match?" or explanation section

### Inner Bloom
**Headline:** Why Inner Bloom?
**Body:** Your answers suggest your body may benefit from daily digestive support. Inner Bloom is formulated with a targeted probiotic blend designed to support gut balance and overall digestive wellbeing. Most customers make it part of their morning routine and commit to 60–90 days for their best results. Consistency is the key.
**Compliance tag:** Results may vary. This is not medical advice.

### Inner Calm
**Headline:** Why Inner Calm?
**Body:** Your answers suggest your evenings could use more intentional support. Inner Calm uses magnesium glycinate — a form of magnesium designed to support relaxation and overall calm as part of a consistent nightly routine. One small step each evening. Designed for how you actually live.
**Compliance tag:** Results may vary. This is not medical advice.

### Inner Grow
**Headline:** Why Inner Grow?
**Body:** Your answers suggest your hair, skin, and nails may benefit from daily nutritional support from within. Inner Grow combines key nutrients designed to nourish the body from the inside out, as part of a consistent daily wellness routine. Results may vary. Most customers commit to 60–90 days with consistent daily use.
**Compliance tag:** Results may vary. This is not medical advice.

### Inner Balance
**Headline:** Why Inner Balance?
**Body:** Your answers suggest a strong daily nutritional foundation may be your most important starting point right now. Inner Balance is a complete daily multivitamin designed to support overall wellness from within — covering the essentials in one simple daily capsule. Build from a place of strength.
**Compliance tag:** Results may vary. This is not medical advice.

---

## Full FDA Disclaimer (add to all result cards)

> This recommendation is for educational purposes only and is not medical advice.
> Results may vary. These statements have not been evaluated by the Food and Drug Administration.
> This product is not intended to diagnose, treat, cure, or prevent any disease.
> Consult a healthcare professional before use.

---

## Step 8 — Mobile Layout Notes

If VQB supports custom CSS or layout overrides, apply these:

- Product image: stacks above product name on mobile (< 480px)
- Product title: max 16px on mobile, no wrapping beyond 2 lines
- Primary CTA: width: 100%; min-height: 48px; font-weight: bold
- Secondary CTA: visually subordinate — text link or outline only
- "Why This Match?": collapsed by default on mobile

If VQB does not support CSS overrides, note this in the checklist and request
a layout adjustment from VQB support or your developer.

---

*PLANNING DOCUMENT — No VQB or Shopify edits have been made by any script.*
*Human review and approval required before implementing.*
