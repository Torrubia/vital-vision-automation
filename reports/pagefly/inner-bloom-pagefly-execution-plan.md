# Inner Bloom — PageFly Browser-Assisted Execution Plan
# Page: Inner Bloom — Your Wellness Match (inner-bloom-result)
# Template: Chloe - Product
# Vital Vision Shop
# Generated: 2026-05-11
# Status: EXECUTION PLAN — nothing applied yet

---

## Safety Constraints (Hard Rules — No Exceptions)

- DO NOT click Publish at any point
- DO NOT make the Shopify page visible/active
- DO NOT change VQB routing
- DO NOT touch product URLs, prices, variants, checkout, pixels, campaigns
- DO NOT commit changes
- DO NOT call external APIs
- Save draft is allowed ONLY after human preview confirms correctness
- Publishing is FORBIDDEN

---

## Brand Colors (Override Editing Map — Use These Exact Values)

| Role | Hex |
|---|---|
| Hero background | #0F3B2E |
| Primary CTA fill | #F4C430 |
| Primary CTA text | #0F3B2E |
| Hero heading | #FFFFFF |
| Hero subheading | #FFF8EC |
| Announcement bar background | #0F3B2E |
| Announcement bar text | #F4C430 |
| Body text | #5F6B63 |
| Cream / page background | #FFF8EC |
| Border / divider | #E8DDC8 |
| Dark green text | #1E3A2F |
| White | #FFFFFF |

---

## Execution Phases

### PHASE 1 — OBSERVE ONLY (Current Phase)

Goal: Detect what sections exist in the PageFly editor without changing anything.

Steps:
1. Open Playwright browser (visible, non-headless)
2. Navigate to Shopify admin
3. User manually logs in and navigates to the Inner Bloom PageFly editor
4. Script scans for:
   - PageFly section containers (`.pf-section`, `[data-pf-type]`, `.pf-element`)
   - Visible text content per block
   - Iframe presence (may block DOM access)
   - Section labels in PageFly sidebar
   - Number of editable blocks detected
5. Script saves observe report to `reports/pagefly/inner-bloom-observe-report.md`
6. Script takes screenshot: `reports/pagefly/screenshots/hero-observe.png`
7. Script STOPS — does not click, type, or modify anything

**Run: `npm run pagefly:observe`**
**Requires: live terminal (TTY) — not piped**

---

### PHASE 2 — SECTION MAPPING (After Phase 1)

After Phase 1 report is reviewed, map detected blocks to the editing map:

| Editing Map Section | Expected Chloe Block | Detected? | Action |
|---|---|---|---|
| A — Announcement Bar | Top banner / marquee | TBD | REPLACE |
| B — Hero | Banner / hero block | TBD | REPLACE |
| C — Breadcrumb | Nav / breadcrumb | TBD | DELETE |
| D — Product Card | Product block | TBD | REPLACE |
| E — Why This Match | Tab or accordion | TBD | REPLACE |
| F — Benefit Cards | Icon / feature grid | TBD | REPLACE |
| G — Routine Steps | Review / grid block | TBD | REPLACE |
| H — Trust Block | Badge / trust block | TBD | REPLACE |
| I — FAQ | Accordion / FAQ | TBD | REPLACE |
| J — Related Products | Product carousel | TBD | DELETE |
| K — Final CTA | Footer banner | TBD | REPLACE |

---

### PHASE 3 — APPLY SECTION A + B ONLY (After Human Approval)

Apply only two sections. Stop completely after both are applied.

**Section A — Announcement Bar:**
```
Text:       Your personalized wellness match is ready ✨
Background: #0F3B2E
Text color: #F4C430
```

**Section B — Hero:**
```
Heading:     Your Inner Bloom Match ✨
Subheading:  Based on your answers, Inner Bloom was selected as your gut wellness starting point.
Disclaimer:  Educational only. Not medical advice. Results may vary.
CTA text:    VIEW INNER BLOOM
CTA link:    /products/advanced-probiotic-formula
CTA fill:    #F4C430
CTA text:    #0F3B2E
Hero bg:     #0F3B2E
Heading:     #FFFFFF
Subheading:  #FFF8EC
```

After applying: STOP. Do not touch any other section.
Save as draft (if available in PageFly).
Generate QA report: `reports/pagefly/inner-bloom-pagefly-hero-qa.md`

---

### PHASE 4 — REMAINING SECTIONS (Future, After Phase 3 QA Passes)

To be approved section by section. Not started yet.

| Section | Status |
|---|---|
| D — Product Card | NOT STARTED |
| E — Why This Match | NOT STARTED |
| F — Benefit Cards | NOT STARTED |
| G — Routine Steps | NOT STARTED |
| H — Trust Block | NOT STARTED |
| I — FAQ | NOT STARTED |
| K — Final CTA | NOT STARTED |

---

## Known Risks

| Risk | Likelihood | Mitigation |
|---|---|---|
| PageFly editor in cross-origin iframe | HIGH | Observe script will detect and report — fallback to manual if inaccessible |
| PageFly uses React/SPA — DOM labels don't match visible text | MEDIUM | Scan both visible text and data attributes |
| PageFly auto-saves on certain interactions | LOW | Script will not click Publish — autosave only updates draft |
| Wrong section identified | MEDIUM | Phase 1 observe + human approval before any edit |
| CTA link applied incorrectly | LOW | Script verifies link attribute after setting |

---

## Fallback: If Automation Is Not Viable

If Phase 1 confirms PageFly editor is inaccessible via Playwright (cross-origin iframe,
fully React-managed DOM with no accessible inputs), the fallback is:

1. Open the editing map: `drafts/pagefly/inner-bloom-chloe-template-editing-map.md`
2. Apply Part 3 copy section by section manually in PageFly
3. Use Part 5 color guide for exact hex values
4. Use Part 6 mobile QA checklist after each section
5. Do NOT publish until Part 8 approval checklist is complete

---

*No PageFly edits have been made.*
*Phase 1 (observe) must be run and reviewed before any edit is attempted.*
