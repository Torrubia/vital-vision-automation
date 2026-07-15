# Migrated Label Review Prompt

## Purpose

Use this prompt specifically when Supliful has migrated one of your product labels to a new format and you need to determine whether the migrated version is safe to save.

This is a focused version of the master orchestrator prompt, optimized for migration review.

---

## Prompt (Copy Everything Below This Line)

---

You are reviewing a Supliful supplement label that was recently migrated to a new format for Vital Vision Shop.

Vital Vision Shop products: Inner Balance (Complete Multivitamin), Inner Bloom (Advanced Probiotic Formula), Inner Calm (Magnesium Glycinate), Inner Grow (Hair, Skin & Nails Support).

## Product

[FILL IN: e.g., Inner Calm — Magnesium Glycinate]

## Context

Supliful migrated this label from an older format to a newer template. I have not made any edits to it. I need to know:
1. Did the migration preserve everything correctly?
2. Are there any elements duplicated, missing, or displaced from the migration?
3. Is this label safe to save as-is, or does it need fixes?

## Screenshots Provided

[ATTACH: Current migrated label — front and back panels if possible]
[ATTACH: Original label (if available) — for comparison]

---

## Review Tasks

### Task 1 — Migration Integrity Check

Compare the label (or review it on its own if no original is available) for signs of migration issues:

- [ ] Any text blocks appear duplicated (same text appearing twice)
- [ ] Any text appears in the wrong position (e.g., back panel content on the front panel)
- [ ] Any element from the old label is floating outside a text box
- [ ] Any white space appears where content should be
- [ ] Any element appears to be clipped or partially visible at a panel edge
- [ ] Layout looks structurally sound and intentional

Report: **MIGRATION INTEGRITY: PASS / ISSUES FOUND**

---

### Task 2 — Required Elements Check

Confirm all required FDA supplement label elements are present and visible:

- [ ] Supplement Facts panel (serving size, servings per container, ingredient list)
- [ ] FDA disclaimer (complete exact wording)
- [ ] Suggested Use
- [ ] Caution or Warning
- [ ] Manufacturer or distributor name and address
- [ ] Net quantity (e.g., "60 Capsules")

Report: **REQUIRED ELEMENTS: ALL PRESENT / MISSING: [list]**

---

### Task 3 — Quick Compliance Scan

Check for any obvious compliance issues:

- Any forbidden language ("cures," "treats," "prevents," "heals," "diagnoses," "guaranteed results")
- FDA disclaimer correct and complete
- Claims use safe language ("supports," "helps support," "may help support")

Report: **COMPLIANCE SCAN: PASS / ISSUES: [list]**

---

### Task 4 — Brand Check

Confirm:
- Product name spelled correctly
- Subtitle matches the approved version
- Vital Vision brand appears correctly

Report: **BRAND CHECK: PASS / ISSUES: [list]**

---

### Task 5 — Final Decision

Based on Tasks 1–4:

**MIGRATION REVIEW DECISION:**
- **SAVE AS-IS** — migration preserved everything correctly, label is ready for save approval
- **MINOR FIXES NEEDED** — small corrections needed before saving (list them)
- **SIGNIFICANT ISSUES** — migration created structural or compliance problems, do not save yet (list all)
- **ESCALATE** — compliance or legal risk found, requires closer review before any action

**Required fixes before saving:**
1. ___
2. ___

---

## Important

If any part of the label is unclear in the screenshot, tell me:
"I cannot read [element] clearly — please provide a clearer screenshot or zoom in on this section."

Do not assume content is correct if you cannot read it.

---

## End of Prompt
