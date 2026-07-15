# Workflow 12: Supliful Dashboard Label Build

## Goal

Provide a safe, structured, step-by-step process for building or rebuilding a product label inside the Supliful label editor dashboard — using an approved design specification, approved copy blocks, and the Supliful Dashboard Design Operator's build guide. This workflow ends with a completed label ready for QA review, NOT with a saved label.

## When to Use

- After completing Workflow 09 (Create Premium Label from Scratch) and receiving the build guide
- When rebuilding a label after a failed migration using an approved specification
- When applying the Master Label Standard to an existing label that needs to be rebuilt

## Required Inputs

- Completed `templates/new-label-build-spec-template.md` (the approved design package)
- All approved copy blocks (product name, subtitle, benefits, Supplement Facts, Suggested Use, Caution, FDA disclaimer, address)
- Approved color hex codes
- Approved font names (confirm availability in Supliful)
- Logo file ready to upload (correct version, PNG with transparent background)
- Supliful account access with the correct product template open

## Agents Involved

- Supliful Dashboard Design Operator — produces the step-by-step build guide
- Premium Label Architect — validates the final built label against the specification
- Premium Label QA Reviewer — final review after build is complete

## Pre-Build Confirmation

Before opening Supliful, confirm all of the following:

- [ ] The approved design package is complete (`templates/new-label-build-spec-template.md`)
- [ ] All copy is compliance-reviewed and approved
- [ ] Logo file is ready in the correct format
- [ ] Color hex codes are written down and ready
- [ ] Font names are confirmed and available in Supliful (or Canva alternative is ready)
- [ ] You are logged in to Supliful and can see the correct product template

---

## Step-by-Step Build Process

### Phase A — Template Setup

**Step A1 — Open the Correct Product in Supliful**

1. Log in to your Supliful account.
2. Navigate to My Products → [Product Name].
3. Click "Design Label" or "Edit Label" to open the label editor.
4. Confirm the template shown matches the container type for this product.
   - If template is wrong: stop. Do not build on the wrong template.

**Step A2 — Review the Canvas**

5. Before adding anything, look at the blank canvas in the editor:
   - Identify where the safe area boundary is shown (Supliful shows this as a guide line).
   - Identify where the matrix code zone is (bottom-right corner in most Supliful templates).
   - Take a screenshot of the blank canvas for reference.

**Step A3 — Set the Background**

6. Set the background color using the hex code from the approved build spec.
   - In Supliful: click the background or canvas area → color picker → enter hex code.
   - If using a background image: upload the approved image and position it to fill the bleed area.
7. Confirm: background extends to the bleed edge (no white gaps at label edges).

---

### Phase B — Front Panel Build

**Step B1 — Place the Logo**

8. Upload the approved logo file (PNG, transparent background).
9. Position the logo in the approved zone (per the layout specification — typically top-left or top-center).
10. Resize to the approved size (percentage of label width per spec).
11. Confirm the logo is fully inside the safe area.

**Step B2 — Product Name**

12. Add a text box.
13. Type the product name exactly as approved: e.g., `INNER CALM`
14. Set font to the approved H1 font.
15. Set weight, size, color, letter-spacing per specification.
16. Position in the product name zone per layout spec.
17. Confirm text is inside the safe area.

**Step B3 — Subtitle**

18. Add a text box.
19. Type the subtitle exactly as approved: e.g., `Magnesium Glycinate`
20. Set font to the approved H2 style.
21. Position directly below the product name per layout spec.
22. Confirm inside safe area.

**Step B4 — Key Benefit Statements**

23. Add a text box for benefit claims.
24. Type the approved benefit statements (maximum 3 on front panel):
    - Use only compliance-reviewed, approved copy.
    - Do NOT add any new language at this step.
25. Set font to the approved H3 or body style for benefits.
26. Position in the benefit zone per layout spec.
27. Confirm inside safe area.

**Step B5 — Net Quantity Callout (if on front panel)**

28. Add a text box for the net quantity: e.g., `60 Capsules`
29. Set style per specification.
30. Position in the lower callout zone.

**Step B6 — Front Panel Final Check**

31. Zoom out and review the front panel.
32. Ask: does it look like the approved layout specification?
33. Check all text is inside the safe area.
34. Take a screenshot.

---

### Phase C — Back Panel Build

**Step C1 — Supplement Facts Table**

35. The Supplement Facts table is typically pre-populated by Supliful from your product data.
    - If it is not: add a text block and format it as a standard FDA Supplement Facts table.
    - Font: approved tertiary font, minimum 7pt at print size.
    - Confirm: serving size, servings per container, all ingredients and amounts, % DV, footnote if needed.
36. Position in the Supplement Facts zone per layout spec.
37. Confirm the table is readable — zoom in to check.

**Step C2 — Suggested Use**

38. Add a text box.
39. Type the approved Suggested Use text exactly.
40. Set font to approved body style.
41. Position per layout spec.

**Step C3 — Caution / Warning**

42. Add a text box.
43. Type the approved Caution / Warning text exactly.
44. Set font to approved body style.
45. Position per layout spec.

**Step C4 — FDA Disclaimer**

46. Add a text box.
47. Type the FDA disclaimer exactly:
    "These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease."
48. Set font to approved legal text style (minimum size — must be legible).
49. Position in the legal text zone per layout spec.

**Step C5 — Manufacturer Address**

50. Add a text box.
51. Type the approved manufacturer or distributor name and address exactly.
52. Set font to approved legal text style.
53. Position per layout spec.

**Step C6 — Matrix Code Zone Confirmation**

54. Confirm the matrix code / barcode in the reserved zone is clear.
55. Confirm no text box or image element overlaps the matrix code zone.

**Step C7 — Back Panel Final Check**

56. Zoom out and review the back panel.
57. Ask: is everything readable? Is the Supplement Facts table complete? Is the FDA disclaimer visible?
58. Take a screenshot.

---

### Phase D — Preview and Handoff

**Step D1 — Use Supliful's Preview**

59. Use Supliful's preview mode to review the label as it will appear on the bottle.
60. Check: front panel reads cleanly. Product name is dominant.
61. Check: back panel is organized. No element is cut off.
62. Take a screenshot of the preview.

**Step D2 — Handoff Screenshots for QA Review**

63. Collect all screenshots:
    - Blank canvas (safe area visible)
    - Front panel build
    - Back panel build
    - Preview mode

64. Pass these to the QA review workflow (Workflow 01 for standard review, or Premium Label QA Reviewer for new/redesign labels).

**Step D3 — DO NOT CLICK SAVE**

The label must NOT be saved until:
- The QA review is complete
- The Premium Label QA Reviewer has issued a READY decision
- Lucy has completed the save-label-approval-checklist
- Workflow 03 (Save Approval) has been completed

---

## Human Approval Gates

| Gate | Condition |
|---|---|
| Pre-build | Design package approved before opening Supliful |
| Post-build | QA review complete and READY decision issued before saving |
| Save | Workflow 03 completed by Lucy — never automated |

## Output Generated

- Built label in Supliful (not yet saved)
- Screenshots: canvas, front panel, back panel, preview
- QA review initiated

## Validation Checklist

- [ ] Correct Supliful template confirmed
- [ ] Background set per spec
- [ ] Logo placed in approved zone, inside safe area
- [ ] Product name built per spec
- [ ] Subtitle built per spec
- [ ] Benefit claims built from approved copy only
- [ ] Net quantity placed (if front panel)
- [ ] Supplement Facts table complete and readable
- [ ] Suggested Use entered exactly
- [ ] Caution / Warning entered exactly
- [ ] FDA disclaimer entered exactly
- [ ] Manufacturer address entered exactly
- [ ] Matrix code zone clear and unobstructed
- [ ] Preview reviewed
- [ ] Screenshots taken
- [ ] QA review initiated
- [ ] Save NOT clicked

## Risks

- **Risk:** Font used in Supliful does not match the approved brand font.
  - Mitigation: If brand fonts are not available in Supliful, document the discrepancy and evaluate Canva-to-Supliful as an alternative.
- **Risk:** Supplement Facts data pre-populated by Supliful contains errors.
  - Mitigation: Always cross-check the Supliful Supplement Facts against the official product specification sheet.
- **Risk:** Clicking Save accidentally before QA is complete.
  - Mitigation: Close the Supliful Save dialog immediately if it appears. Do not confirm.

## Plan B

If Supliful's editor cannot reproduce the approved design:
1. Document which specific element cannot be built in Supliful.
2. Evaluate building in Canva with brand fonts, exporting as a label-ready file, and uploading to Supliful's custom label upload.
3. Log the workaround decision in `logs/[date]-[product]-supliful-workaround.md`.
4. Get Lucy's approval before using any workaround.
