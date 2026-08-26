# VQB Manual Implementation Checklist — Vital Vision Shop
# Terminal Fix Pack v1.0 — 2026-05-06
# AUTO_PUBLISH=false | REQUIRE_HUMAN_APPROVAL=true | VQB_API_MODE=read_only

Complete this checklist in order. Do not skip steps.
Do not click Save & Publish until Step 8 (mobile QA) passes.

---

## Pre-Flight (complete before opening VQB)

- [ ] Run `npm run vqb:print-fix-pack` — confirm copy prints cleanly in terminal
- [ ] Have `config/vqb-result-visual-copy.md` open (for copy reference)
- [ ] Have `config/vqb-result-safe-css-js.md` open (for JS reference)
- [ ] Confirm `VQB_API_MODE=read_only` in .env
- [ ] Confirm `AUTO_PUBLISH=false` in .env
- [ ] Confirmed quiz to edit: **VV Home Quick Match Quiz — 1Q (ID: 16047)**
- [ ] VQB dashboard is open and logged in (via Shopify admin → Apps → Visual Quiz Builder)

---

## STEP 1 — Email Capture Screen

**Find in VQB:** Quiz Settings → Email Gate / Lead Capture Screen

| # | Field | Value to paste | Done |
|---|---|---|---|
| 1.1 | Headline | Unlock Your Personalized Result | [ ] |
| 1.2 | Subhead | Your personalized result is ready — plus 10% off your first order. | [ ] |
| 1.3 | Email placeholder | Your email address | [ ] |
| 1.4 | CTA button | Reveal My Match → | [ ] |
| 1.5 | Micro-copy | No spam. Unsubscribe anytime. | [ ] |

- [ ] Click **Save** (NOT Save & Publish)
- [ ] Preview on mobile — screen fits in one viewport, CTA is visible without scrolling
- [ ] **Do NOT change:** email provider, redirect URL, toggle on/off

---

## STEP 2 — Discount Code Screen

**Find in VQB:** Quiz Settings → Discount Screen / Coupon Screen

| # | Field | Value to paste | Done |
|---|---|---|---|
| 2.1 | Headline | Your 10% Off Code Is Ready | [ ] |
| 2.2 | Subhead | Continue to see your personalized wellness match. | [ ] |
| 2.3 | Instructions | Applied automatically at checkout · Valid for 48 hours | [ ] |
| 2.4 | CTA button | See My Product Match ↓ | [ ] |
| 2.5 | Micro-copy | No purchase required to see your result. | [ ] |

- [ ] Click **Save** (NOT Save & Publish)
- [ ] Preview on mobile — screen fits in one viewport
- [ ] **Do NOT change:** discount code value (WELCOME10), discount percentage, CTA link

---

## STEP 3 — Inner Bloom Result Card

**Find in VQB:** Result Pages → Inner Bloom (quiz answer: Digestion & Gut Wellness)

| # | Field | Value to paste | Done |
|---|---|---|---|
| 3.1 | Match label | Your Wellness Match ✨ | [ ] |
| 3.2 | Result headline | Your gut may be ready for daily support. | [ ] |
| 3.3 | Product section heading | Your Daily Match | [ ] |
| 3.4 | Product section subheading | Recommended for your routine. | [ ] |
| 3.5 | Product display name | Inner Bloom — Advanced Probiotic Formula | [ ] |
| 3.6 | Short description | Formulated to support healthy digestion and daily gut balance as part of a consistent wellness routine. One simple ritual, every morning. | [ ] |
| 3.7 | Quantity label | Choose Your Starting Point | [ ] |
| 3.8 | Primary CTA | View Product | [ ] |
| 3.9 | Secondary CTA | Why This Match? | [ ] |
| 3.10 | Short disclaimer | Educational only. Not medical advice. | [ ] |
| 3.11 | Why This Match headline | Why Inner Bloom? | [ ] |
| 3.12 | Why This Match body | Your answers suggest your body may benefit from daily digestive support. Inner Bloom is formulated with a targeted probiotic blend designed to support gut balance and overall digestive wellbeing. Most customers make it part of their morning routine and commit to 60–90 days for their best results. Consistency is the key. | [ ] |
| 3.13 | Compliance tag | Results may vary. This is not medical advice. | [ ] |

- [ ] Click **Save** (NOT Save & Publish)
- [ ] Preview on mobile at 375px
- [ ] **Do NOT change:** product link, product ID, quiz answer mapping, product image, price

---

## STEP 4 — Inner Calm Result Card

**Find in VQB:** Result Pages → Inner Calm (quiz answer: Stress & Calm)

| # | Field | Value to paste | Done |
|---|---|---|---|
| 4.1 | Match label | Your Wellness Match ✨ | [ ] |
| 4.2 | Result headline | Your evenings may deserve a calmer ritual. | [ ] |
| 4.3 | Product section heading | Your Daily Match | [ ] |
| 4.4 | Product section subheading | Recommended for your routine. | [ ] |
| 4.5 | Product display name | Inner Calm — Magnesium Glycinate | [ ] |
| 4.6 | Short description | Formulated with magnesium glycinate to support a calm evening routine and overall wellness. A quiet daily ritual designed just for you. | [ ] |
| 4.7 | Quantity label | Choose Your Starting Point | [ ] |
| 4.8 | Primary CTA | View Product | [ ] |
| 4.9 | Secondary CTA | Why This Match? | [ ] |
| 4.10 | Short disclaimer | Educational only. Not medical advice. | [ ] |
| 4.11 | Why This Match headline | Why Inner Calm? | [ ] |
| 4.12 | Why This Match body | Your answers suggest your evenings could use more intentional support. Inner Calm uses magnesium glycinate — a form of magnesium designed to support relaxation and overall calm as part of a consistent nightly routine. Magnesium is one of the most common nutritional gaps in modern diets — Inner Calm is designed to support that daily need. One small step each evening. | [ ] |
| 4.13 | Compliance tag | Results may vary. This is not medical advice. | [ ] |

- [ ] Click **Save** (NOT Save & Publish)
- [ ] Preview on mobile at 375px

---

## STEP 5 — Inner Grow Result Card

**Find in VQB:** Result Pages → Inner Grow (quiz answer: Hair, Skin & Nails)

| # | Field | Value to paste | Done |
|---|---|---|---|
| 5.1 | Match label | Your Wellness Match ✨ | [ ] |
| 5.2 | Result headline | Your glow may start from within. | [ ] |
| 5.3 | Product section heading | Your Daily Match | [ ] |
| 5.4 | Product section subheading | Recommended for your routine. | [ ] |
| 5.5 | Product display name | Inner Grow — Hair, Skin & Nails Support | [ ] |
| 5.6 | Short description | Formulated to support healthy hair, skin, and nails from within as part of a consistent daily wellness routine. Nourishment that works with your body. | [ ] |
| 5.7 | Quantity label | Choose Your Starting Point | [ ] |
| 5.8 | Primary CTA | View Product | [ ] |
| 5.9 | Secondary CTA | Why This Match? | [ ] |
| 5.10 | Short disclaimer | Educational only. Not medical advice. | [ ] |
| 5.11 | Why This Match headline | Why Inner Grow? | [ ] |
| 5.12 | Why This Match body | Your answers suggest your hair, skin, and nails may benefit from daily nutritional support from within. Inner Grow combines key nutrients designed to nourish the body from the inside out as part of a consistent daily wellness routine. Results may vary. Most customers commit to 60–90 days with consistent daily use. | [ ] |
| 5.13 | Compliance tag | Results may vary. This is not medical advice. | [ ] |

- [ ] Click **Save** (NOT Save & Publish)
- [ ] Preview on mobile at 375px

---

## STEP 6 — Inner Balance Result Card

**Find in VQB:** Result Pages → Inner Balance (quiz answer: Overall Daily Wellness)

| # | Field | Value to paste | Done |
|---|---|---|---|
| 6.1 | Match label | Your Wellness Match ✨ | [ ] |
| 6.2 | Result headline | Your body may be ready for a complete daily foundation. | [ ] |
| 6.3 | Product section heading | Your Daily Match | [ ] |
| 6.4 | Product section subheading | Recommended for your routine. | [ ] |
| 6.5 | Product display name | Inner Balance — Daily Complete Multivitamin | [ ] |
| 6.6 | Short description | A complete daily multivitamin designed to support your overall wellness from within. One capsule. One ritual. Every day. | [ ] |
| 6.7 | Quantity label | Choose Your Starting Point | [ ] |
| 6.8 | Primary CTA | View Product | [ ] |
| 6.9 | Secondary CTA | Why This Match? | [ ] |
| 6.10 | Short disclaimer | Educational only. Not medical advice. | [ ] |
| 6.11 | Why This Match headline | Why Inner Balance? | [ ] |
| 6.12 | Why This Match body | Your answers suggest a strong daily nutritional foundation may be your most important starting point right now. Inner Balance is a complete daily multivitamin designed to support overall wellness from within — covering the essentials in one simple daily capsule. Build from a place of strength. | [ ] |
| 6.13 | Compliance tag | Results may vary. This is not medical advice. | [ ] |

- [ ] Click **Save** (NOT Save & Publish)
- [ ] Preview on mobile at 375px

---

## STEP 7 — Apply Custom JS (visual styles only)

**Find in VQB:** Settings → Custom JavaScript (or Advanced → JS Console)

1. Copy the JS block from `config/vqb-result-safe-css-js.md`
   OR run `npm run vqb:print-fix-pack` and copy from terminal output
2. Paste into the VQB JS editor
3. Click **Save** (NOT Save & Publish)
4. Open VQB preview and verify:
   - Buttons look cleaner
   - Text is more readable on mobile
   - No layout is broken

To roll back JS: delete the script from VQB JS console, click Save, refresh preview.

⚠️ If the JS field does not exist in your VQB plan, skip this step.
The copy changes (Steps 1–6) are the priority. JS is visual enhancement only.

---

## STEP 8 — Mobile QA (required before publishing)

Complete on a real device OR in Chrome DevTools at 375px (iPhone SE):

| Check | Pass? |
|---|---|
| Email capture fits in one viewport — no scroll to CTA | [ ] |
| Discount screen fits in one viewport — no scroll to CTA | [ ] |
| Inner Bloom: product image above product name | [ ] |
| Inner Bloom: primary CTA full-width, min 48px tall | [ ] |
| Inner Bloom: secondary CTA below primary CTA | [ ] |
| Inner Bloom: disclaimer visible, not cut off | [ ] |
| Inner Calm: same checks as above | [ ] |
| Inner Grow: same checks as above | [ ] |
| Inner Balance: same checks as above | [ ] |
| Product titles do not wrap beyond 2 lines at 375px | [ ] |
| No prohibited language on any screen | [ ] |
| "Results may vary" present on all result cards | [ ] |
| Primary CTA taps to correct Shopify product page | [ ] |
| Discount code "WELCOME10" is active in Shopify | [ ] |
| Full quiz flow tested end-to-end on mobile | [ ] |

**Do NOT publish until all checks above are marked as passed.**

---

## STEP 9 — Human Sign-Off

| Item | Value |
|---|---|
| Reviewer | _______________ |
| Date | _______________ |
| Quiz edited | VV Home Quick Match Quiz — 1Q (ID: 16047) |
| All copy applied | YES / NO |
| JS applied | YES / NO / SKIPPED |
| Mobile QA passed | YES / NO |
| Approved to publish | YES / NO |

---

## STEP 10 — Publish (only after sign-off above)

1. Open VQB → quiz editor
2. Click **Save & Publish** (or Publish, depending on VQB version)
3. Test the live quiz on vitalvision.shop on a real mobile device
4. Confirm the result page loads and CTAs work
5. Check that discount code applies at checkout

---

## Rollback

If any change causes display issues:

1. **Copy rollback:** VQB Dashboard → Result Pages → find the affected screen → use VQB's version history or undo to revert the last save. If unavailable, re-paste original copy from git history.
2. **JS rollback:** VQB → Settings → Custom JavaScript → delete the VV Fix Pack script → Save → refresh preview. All styles revert immediately.
3. **Full rollback:** restore from `backups/vqb/2026-05-05T17-20-22-715Z-combined-backup.json` using `npm run vqb:rollback`.

---

*No VQB or Shopify content has been modified by any script.*
*All changes in this checklist are applied manually by a human in the VQB dashboard.*
