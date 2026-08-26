# VQB Quiz Result Page — Mobile Recovery Plan
# Vital Vision Shop | Quiz: VV Home Quick Match Quiz — 1Q (ID: 16047)
# Generated: 2026-05-11
# Status: PLAN ONLY — nothing has been changed

---

## Situation

Previous CSS/JS injection via VQB Custom JavaScript broke the mobile result page layout.
Goal: restore a clean, readable, mobile-first result page using native VQB settings.
JavaScript should only be reintroduced if native settings cannot achieve the desired result.

---

## STEP 0 — Before You Touch Anything: Take Screenshots

Screenshot these views BEFORE making any changes. These become your rollback reference.

| # | What to screenshot | How |
|---|---|---|
| S1 | Live quiz result page — mobile (Inner Bloom) | Open quiz on phone or Chrome DevTools 375px |
| S2 | Live quiz result page — mobile (Inner Calm) | Same |
| S3 | Live quiz result page — mobile (Inner Grow) | Same |
| S4 | Live quiz result page — mobile (Inner Balance) | Same |
| S5 | VQB Custom JavaScript console — current contents | VQB → Settings → Custom JavaScript |
| S6 | Each result card's current copy fields | VQB → Result Pages → each card |

Save these in a folder before proceeding. They are your rollback proof.

---

## STEP 1 — Remove the Custom JavaScript (Do This First)

The VV Fix Pack v1.0 JS block is the most likely cause of broken mobile layout.
Removing it restores VQB's default rendering with zero risk to content or mappings.

**Navigation path:**
VQB Dashboard → select VV Home Quick Match Quiz — 1Q → Settings → Custom JavaScript
(may also appear as: Advanced → JS Console, or Settings → JavaScript)

**Actions:**
1. Select all content in the JS editor (Ctrl+A / Cmd+A)
2. Delete it entirely — the field should be empty
3. Click **Save** (NOT Save & Publish)
4. Open VQB preview → switch to mobile view (375px) → confirm layout improves

**What this removes:**
- `data-vv-fix-pack-v1` style tag (current fix pack)
- `data-vv-premium-quiz-style` style tag (older attempt, if present)
- `data-vv-safe-mobile-quiz-style` style tag (older attempt, if present)
- All VV-injected typography, button, and layout overrides

**What this does NOT change:**
- All copy fields
- Product mappings and answer routing
- Product images, prices, variants
- Quiz logic and flow
- Discount codes
- Email capture settings

**Expected result after removal:**
VQB renders its own default styles. These may not be perfect, but they will not be broken.
Assess the default state before adding anything back.

---

## STEP 2 — Apply the Desired Copy via Native VQB Fields

These are copy-only changes. No code. No CSS. No JavaScript.
Apply to each result card individually. Click Save after each card — not Save & Publish.

**Navigation path:**
VQB Dashboard → VV Home Quick Match Quiz — 1Q → Result Pages → [select card]

### Global Labels (apply identically to all 4 result cards)

| Field name in VQB | Value to paste |
|---|---|
| Match label / Result label | Your Wellness Match ✨ |
| Section subheading / Subtitle | Selected from your quiz answers. |
| Product section heading | Your Daily Match |
| Product section subheading | Based on your quiz answers. |
| Primary CTA button text | VIEW PRODUCT |
| Secondary CTA button text | WHY THIS MATCH? |
| Short disclaimer | Educational only. Not medical advice. |

> If VQB uses different field names, match by position and context — not by exact label.
> The match label is usually above the product image or product name.
> The section heading is usually above the product card block.

### Per-Card Copy (paste into the matching result card)

**Inner Bloom — quiz answer: Digestion & Gut Wellness**

| Field | Value |
|---|---|
| Result headline | Your gut may be ready for daily support. |
| Product display name | Inner Bloom — Advanced Probiotic Formula |
| Short description | Formulated to support healthy digestion and daily gut balance as part of a consistent wellness routine. One simple ritual, every morning. |
| Quantity label | Choose Your Starting Point |
| Why This Match headline | Why Inner Bloom? |
| Why This Match body | Your answers suggest your body may benefit from daily digestive support. Inner Bloom is formulated with a targeted probiotic blend designed to support gut balance and overall digestive wellbeing. Most customers make it part of their morning routine and commit to 60–90 days for their best results. Consistency is the key. |
| Compliance tag | Results may vary. This is not medical advice. |

---

**Inner Calm — quiz answer: Stress & Calm**

| Field | Value |
|---|---|
| Result headline | Your evenings may deserve a calmer ritual. |
| Product display name | Inner Calm — Magnesium Glycinate |
| Short description | Formulated with magnesium glycinate to support a calm evening routine and overall wellness. A quiet daily ritual designed just for you. |
| Quantity label | Choose Your Starting Point |
| Why This Match headline | Why Inner Calm? |
| Why This Match body | Your answers suggest your evenings could use more intentional support. Inner Calm uses magnesium glycinate — a form of magnesium designed to support relaxation and overall calm as part of a consistent nightly routine. Magnesium is one of the most common nutritional gaps in modern diets — Inner Calm is designed to support that daily need. One small step each evening. |
| Compliance tag | Results may vary. This is not medical advice. |

---

**Inner Grow — quiz answer: Hair, Skin & Nails**

| Field | Value |
|---|---|
| Result headline | Your glow may start from within. |
| Product display name | Inner Grow — Hair, Skin & Nails Support |
| Short description | Formulated to support healthy hair, skin, and nails from within as part of a consistent daily wellness routine. Nourishment that works with your body. |
| Quantity label | Choose Your Starting Point |
| Why This Match headline | Why Inner Grow? |
| Why This Match body | Your answers suggest your hair, skin, and nails may benefit from daily nutritional support from within. Inner Grow combines key nutrients designed to nourish the body from the inside out as part of a consistent daily wellness routine. Results may vary. Most customers commit to 60–90 days with consistent daily use. |
| Compliance tag | Results may vary. This is not medical advice. |

---

**Inner Balance — quiz answer: Overall Daily Wellness**

| Field | Value |
|---|---|
| Result headline | Your body may be ready for a complete daily foundation. |
| Product display name | Inner Balance — Daily Complete Multivitamin |
| Short description | A complete daily multivitamin designed to support your overall wellness from within. One capsule. One ritual. Every day. |
| Quantity label | Choose Your Starting Point |
| Why This Match headline | Why Inner Balance? |
| Why This Match body | Your answers suggest a strong daily nutritional foundation may be your most important starting point right now. Inner Balance is a complete daily multivitamin designed to support overall wellness from within — covering the essentials in one simple daily capsule. Build from a place of strength. |
| Compliance tag | Results may vary. This is not medical advice. |

---

## STEP 3 — Mobile Layout Checklist

Test in Chrome DevTools at 375px (iPhone SE) OR on a real iPhone.
Complete the quiz to reach a result card before running these checks.

Do these checks AFTER Step 1 (JS removed) but BEFORE any JS is reintroduced.

| # | Check | Pass? |
|---|---|---|
| 3.1 | Match label "Your Wellness Match ✨" visible above product | [ ] |
| 3.2 | Result headline is readable — no clipping or overflow | [ ] |
| 3.3 | Product image appears above product name | [ ] |
| 3.4 | Product name fits on 1–2 lines — no wrapping beyond 2 lines | [ ] |
| 3.5 | Short description is readable at 13–14px | [ ] |
| 3.6 | "Your Daily Match" heading visible above product card | [ ] |
| 3.7 | "Based on your quiz answers." subheading visible | [ ] |
| 3.8 | Quantity selector / dropdown visible | [ ] |
| 3.9 | VIEW PRODUCT button is full-width at 375px | [ ] |
| 3.10 | VIEW PRODUCT button is at least 44px tall (tappable) | [ ] |
| 3.11 | WHY THIS MATCH? button visible below primary CTA | [ ] |
| 3.12 | Disclaimer "Educational only. Not medical advice." visible | [ ] |
| 3.13 | "Results may vary. This is not medical advice." visible | [ ] |
| 3.14 | No content is cut off or hidden below the fold without scroll | [ ] |
| 3.15 | Why This Match section expands on tap (if it's a toggle/accordion) | [ ] |
| 3.16 | Primary CTA taps to correct Shopify product page | [ ] |
| 3.17 | No horizontal scroll on result card | [ ] |
| 3.18 | Text does not overlap with images or buttons | [ ] |

If all 18 checks pass with NO JavaScript: the page is fixed. Do not add JS.
If specific checks fail: note which ones — then assess whether JS is actually needed.

---

## STEP 4 — Screenshots to Take After Recovery

| # | What to screenshot | When |
|---|---|---|
| A1 | Inner Bloom result card — mobile 375px — full scroll | After JS removed + copy applied |
| A2 | Inner Calm result card — mobile 375px | Same |
| A3 | Inner Grow result card — mobile 375px | Same |
| A4 | Inner Balance result card — mobile 375px | Same |
| A5 | VIEW PRODUCT CTA — close-up tap area | After recovery |
| A6 | WHY THIS MATCH? section — expanded view | After recovery |
| A7 | Email capture screen — mobile | After recovery |
| A8 | Discount screen — mobile | After recovery |
| A9 | VQB Custom JavaScript console — confirm it is empty | After Step 1 |

---

## STEP 5 — Rollback Plan

### If removing the JS made things worse:
- Restore the VV Fix Pack v1.0 JS from `config/vqb-result-safe-css-js.md`
- Paste it back into VQB → Settings → Custom JavaScript → Save
- This is a full rollback to the pre-recovery state in under 2 minutes

### If a copy field was changed incorrectly:
- The original approved copy is in `config/vqb-result-visual-copy.md`
- The full terminal reference is available via `npm run vqb:print-fix-pack`
- VQB may also offer version history on result cards — check VQB → Result Pages → [card] → History

### If the quiz itself breaks (wrong product routing):
- Do NOT change any quiz answer → result card mappings
- These are controlled by VQB logic, not copy fields
- If routing breaks: use `npm run vqb:rollback` to restore from backup
  (`backups/vqb/2026-05-05T17-20-22-715Z-combined-backup.json`)
- Rollback is a dry-run by default — requires `VQB_API_MODE=approved_write` to execute live

---

## STEP 6 — Do Not Touch (Ever, Without Explicit Approval)

| Item | Why |
|---|---|
| Quiz answer → result card mappings | Controls which product each customer sees — changing breaks routing |
| Product IDs and product links | Changing breaks VIEW PRODUCT CTA destinations |
| Product images | Managed in Shopify — do not move, rename, or replace |
| Product prices | Financial impact — do not change in VQB or Shopify |
| Quantity/variant selectors | Managed by product variants — do not override |
| Discount code (WELCOME10) | Do not change here — verify it's active in Shopify admin |
| Email capture provider and redirect URL | Changing breaks lead capture flow |
| Quiz publish state | Do not click Save & Publish until mobile QA passes |
| Checkout or cart URLs | Never modified by VQB copy work |
| Campaign or tracking URLs | Out of scope for quiz recovery |
| SEO fields (meta title, meta description) | Out of scope for this recovery |

---

## STEP 7 — Do We Need JavaScript?

### Answer: Not yet. Try native VQB first.

JavaScript was introduced to fix mobile layout issues that native VQB settings couldn't solve.
But before reintroducing JS, verify that the native defaults are actually broken.

**Decision tree:**

```
Step 1: Remove JS → Save → Preview on mobile
│
├── Layout looks correct or acceptable?
│     └── YES → Apply copy (Step 2) → Run mobile QA (Step 3)
│               → If all 18 checks pass: DONE. No JS needed.
│
└── Layout is still broken after JS removed?
      └── Specific issues (e.g. button not full-width, text overflow)?
            → Document exactly which checks fail (Step 3)
            → Only then: write targeted, minimal CSS for those specific failures
            → Scope: fix only the failing elements — no global overrides
            → Re-run mobile QA after each change
```

**If JS is ultimately needed:**
- Use the minimal IIFE pattern (same as VV Fix Pack v1.0)
- Target only the failing elements by class or attribute
- No global selectors (no `*`, `div`, `span` without specific class)
- Test on a real mobile device before saving
- Keep rollback instructions in the JS comment block itself

---

## Implementation Order

```
1. Screenshot current broken state (S1–S6)
2. Open VQB → Custom JavaScript → delete all → Save
3. Preview on mobile at 375px → assess default layout
4. Apply copy fields (Step 2) per result card → Save each
5. Run mobile QA checklist (Step 3)
6. Take recovery screenshots (A1–A9)
7. If all checks pass → done, no JS
8. If specific checks fail → document them → get approval before adding any JS
9. Do NOT click Save & Publish until all QA checks pass
```

---

## Reference Files

| File | Purpose |
|---|---|
| `config/vqb-result-visual-copy.md` | Full approved copy for all 4 result cards |
| `config/vqb-result-safe-css-js.md` | Previous JS block — reference if JS is needed again |
| `reports/vqb/manual-implementation-checklist.md` | Original 10-step implementation guide |
| `backups/vqb/2026-05-05T17-20-22-715Z-combined-backup.json` | Full quiz backup for rollback |

Run `npm run vqb:print-fix-pack` to print all copy + the previous JS block to the terminal.

---

*No VQB content was modified by generating this plan.*
*No JavaScript was added or removed.*
*No Shopify theme was touched.*
*All changes are applied manually by a human in the VQB dashboard.*
