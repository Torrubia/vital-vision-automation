# VQB Dashboard Automation Readiness Report — Vital Vision Shop
# Generated: 2026-05-05T23:53:50.461Z
# AUTO_PUBLISH=false | REQUIRE_HUMAN_APPROVAL=true | VQB_API_MODE=read_only

---

## Summary

| Item | Value |
|---|---|
| Generated | 2026-05-05T23:53:50.461Z |
| Mode | DRY-RUN (no browser, no API calls) |
| Screens covered | 6 |
| Fields to update | 55 |
| Characters to update | ~3592 |
| Writes executed | 0 |
| VQB content modified | NO |
| Shopify edited | NO |
| Readiness gates passed | 6 / 10 |

---

## Readiness Gates

| Gate | Status |
|---|---|
| Approved copy payload exists | READY ✅ |
| Human approval file exists | READY ✅ |
| Copy-paste reference exists | READY ✅ |
| Playwright installed | NOT MET ⚠️  — run: npm install playwright && npx playwright install chromium |
| VQB_DASHBOARD_EMAIL set | NOT MET ⚠️  — add to .env |
| VQB_DASHBOARD_PASSWORD set | NOT MET ⚠️  — add to .env |
| VQB_DASHBOARD_URL set | DEFAULT (https://app.visualquizbuilder.com) |
| VQB_API_MODE=read_only | CONFIRMED ✅ |
| AUTO_PUBLISH=false | CONFIRMED ✅ |
| REQUIRE_HUMAN_APPROVAL=true | CONFIRMED ✅ |

---

## Screen Map

| Screen | Fields | VQB Location |
|---|---|---|
| Screen 1 — Email Capture | 5 | Quiz Settings → Email Gate / Lead Capture Screen |
| Screen 2 — Discount Code | 6 | Quiz Settings → Discount Screen / Coupon Screen |
| Screen 3a — Inner Bloom Result Card + Why This Match | 11 | Result Pages → Inner Bloom (quiz answer: Digestion & Gut Wellness) |
| Screen 3b — Inner Calm Result Card + Why This Match | 11 | Result Pages → Inner Calm (quiz answer: Stress & Calm) |
| Screen 3c — Inner Grow Result Card + Why This Match | 11 | Result Pages → Inner Grow (quiz answer: Hair, Skin & Nails) |
| Screen 3d — Inner Balance Result Card + Why This Match | 11 | Result Pages → Inner Balance (quiz answer: Overall Daily Wellness) |

---

## Complete Field Map (Proposed Values)

| Screen | Field | Proposed Value |
|---|---|---|
| Screen 1 — Email Capture | Headline | Unlock Your Personalized Result |
| Screen 1 — Email Capture | Subhead | Your personalized result is ready — plus 10% off your first ... |
| Screen 1 — Email Capture | Email placeholder | Your email address |
| Screen 1 — Email Capture | CTA button | Reveal My Match → |
| Screen 1 — Email Capture | Micro-copy | No spam. Unsubscribe anytime. |
| Screen 2 — Discount Code | Headline | Your 10% Off Code Is Ready |
| Screen 2 — Discount Code | Subhead | Continue to see your personalized wellness match. |
| Screen 2 — Discount Code | Code | WELCOME10 |
| Screen 2 — Discount Code | Instructions | Applied automatically at checkout · Valid for 48 hours |
| Screen 2 — Discount Code | CTA button | See My Product Match ↓ |
| Screen 2 — Discount Code | Micro-copy | No purchase required to see your result. |
| Screen 3a — Inner Bloom Result Card + Why This Match | Global label | Your Recommended Wellness Match |
| Screen 3a — Inner Bloom Result Card + Why This Match | Result headline | Your gut may be ready for daily support. |
| Screen 3a — Inner Bloom Result Card + Why This Match | Product name | Inner Bloom — Advanced Probiotic Formula |
| Screen 3a — Inner Bloom Result Card + Why This Match | Short description | Formulated to support healthy digestion and daily gut balanc... |
| Screen 3a — Inner Bloom Result Card + Why This Match | Quantity label | Choose Your Starting Point |
| Screen 3a — Inner Bloom Result Card + Why This Match | Primary CTA | Shop This Match |
| Screen 3a — Inner Bloom Result Card + Why This Match | Secondary CTA | Why This Match? |
| Screen 3a — Inner Bloom Result Card + Why This Match | Disclaimer | This recommendation is for educational purposes only and is ... |
| Screen 3a — Inner Bloom Result Card + Why This Match | Why This Match headline | Why Inner Bloom? |
| Screen 3a — Inner Bloom Result Card + Why This Match | Why This Match body | Your answers suggest your body may benefit from daily digest... |
| Screen 3a — Inner Bloom Result Card + Why This Match | Why This Match tag | Results may vary. This is not medical advice. |
| Screen 3b — Inner Calm Result Card + Why This Match | Global label | Your Recommended Wellness Match |
| Screen 3b — Inner Calm Result Card + Why This Match | Result headline | Your evenings may deserve a calmer ritual. |
| Screen 3b — Inner Calm Result Card + Why This Match | Product name | Inner Calm — Magnesium Glycinate |
| Screen 3b — Inner Calm Result Card + Why This Match | Short description | Formulated with magnesium glycinate to support a calm evenin... |
| Screen 3b — Inner Calm Result Card + Why This Match | Quantity label | Choose Your Starting Point |
| Screen 3b — Inner Calm Result Card + Why This Match | Primary CTA | Shop This Match |
| Screen 3b — Inner Calm Result Card + Why This Match | Secondary CTA | Why This Match? |
| Screen 3b — Inner Calm Result Card + Why This Match | Disclaimer | This recommendation is for educational purposes only and is ... |
| Screen 3b — Inner Calm Result Card + Why This Match | Why This Match headline | Why Inner Calm? |
| Screen 3b — Inner Calm Result Card + Why This Match | Why This Match body | Your answers suggest your evenings could use more intentiona... |
| Screen 3b — Inner Calm Result Card + Why This Match | Why This Match tag | Results may vary. This is not medical advice. |
| Screen 3c — Inner Grow Result Card + Why This Match | Global label | Your Recommended Wellness Match |
| Screen 3c — Inner Grow Result Card + Why This Match | Result headline | Your glow may start from within. |
| Screen 3c — Inner Grow Result Card + Why This Match | Product name | Inner Grow — Hair, Skin & Nails Support |
| Screen 3c — Inner Grow Result Card + Why This Match | Short description | Formulated to support healthy hair, skin, and nails from wit... |
| Screen 3c — Inner Grow Result Card + Why This Match | Quantity label | Choose Your Starting Point |
| Screen 3c — Inner Grow Result Card + Why This Match | Primary CTA | Shop This Match |
| Screen 3c — Inner Grow Result Card + Why This Match | Secondary CTA | Why This Match? |
| Screen 3c — Inner Grow Result Card + Why This Match | Disclaimer | This recommendation is for educational purposes only and is ... |
| Screen 3c — Inner Grow Result Card + Why This Match | Why This Match headline | Why Inner Grow? |
| Screen 3c — Inner Grow Result Card + Why This Match | Why This Match body | Your answers suggest your hair, skin, and nails may benefit ... |
| Screen 3c — Inner Grow Result Card + Why This Match | Why This Match tag | Results may vary. This is not medical advice. |
| Screen 3d — Inner Balance Result Card + Why This Match | Global label | Your Recommended Wellness Match |
| Screen 3d — Inner Balance Result Card + Why This Match | Result headline | Your body may be ready for a complete daily foundation. |
| Screen 3d — Inner Balance Result Card + Why This Match | Product name | Inner Balance — Daily Complete Multivitamin |
| Screen 3d — Inner Balance Result Card + Why This Match | Short description | A complete daily multivitamin designed to support your overa... |
| Screen 3d — Inner Balance Result Card + Why This Match | Quantity label | Choose Your Starting Point |
| Screen 3d — Inner Balance Result Card + Why This Match | Primary CTA | Shop This Match |
| Screen 3d — Inner Balance Result Card + Why This Match | Secondary CTA | Why This Match? |
| Screen 3d — Inner Balance Result Card + Why This Match | Disclaimer | This recommendation is for educational purposes only and is ... |
| Screen 3d — Inner Balance Result Card + Why This Match | Why This Match headline | Why Inner Balance? |
| Screen 3d — Inner Balance Result Card + Why This Match | Why This Match body | Your answers suggest a strong daily nutritional foundation m... |
| Screen 3d — Inner Balance Result Card + Why This Match | Why This Match tag | Results may vary. This is not medical advice. |

---

## Global Disclaimer (all result cards)

This recommendation is for educational purposes only and is not medical advice. Results may vary. These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease. Consult a healthcare professional before use.

---

## Automation Mode Available

| Mode | Command | Requires |
|---|---|---|
| Dry-run (no browser) | npm run vqb:dashboard-dry-run | Nothing — works now |
| Guided browser apply | npm run vqb:dashboard-assisted-apply | Playwright + dashboard credentials |
| Manual copy-paste | config/vqb-result-copy-to-paste.md | VQB dashboard login only |

---

## Setup Checklist (for guided browser apply)

```bash
npm install playwright
npx playwright install chromium
```

Add to .env (not committed):
```
VQB_DASHBOARD_EMAIL=your@email.com
VQB_DASHBOARD_PASSWORD=yourpassword
VQB_DASHBOARD_URL=https://app.visualquizbuilder.com
```

Then run:
```bash
npm run vqb:dashboard-assisted-apply
```

---

*No VQB or Shopify content was modified by this script.*
*Human approval required before any save or publish action.*
