# Workflow 02: Create a New Label from a Product Brief

## Goal

Create a complete, compliant, brand-consistent label for a new Vital Vision Shop product in Supliful, starting from a product brief and ending with a reviewed, human-approved label ready to save.

## When to Use

Use this workflow when:
- Launching a new Vital Vision product that needs a Supliful label for the first time
- Rebuilding a label from scratch because the existing version is not salvageable
- Creating a variant label (e.g., different size or formula) for an existing product

## Required Inputs

- Completed `templates/product-label-brief-template.md` for the product
- Product name, subtitle, and container type (capsules / softgels / gummies / powder)
- Net quantity (e.g., 60 Capsules, 30 Servings)
- Serving size and servings per container
- Ingredient list with amounts and % Daily Values
- Approved key benefits (2–4 benefit statements from `compliance/approved-claims.md`)
- Suggested Use instructions
- Caution / Warning text
- Manufacturer or distributor name and address
- Brand visual reference: `vital-vision-system/brand/visual-rules.md`

## Agents Involved

1. Supliful Label Project Manager — orchestrates
2. Supplement Compliance Reviewer — validates brief before label is built
3. Brand Label Guardian — validates brand elements before building
4. Label Architect — reviews layout once built
5. Label Design Critic — reviews visual quality
6. QA Label Reviewer — final decision before save

## Step-by-Step Process

### Step 1 — Complete the Product Label Brief

Fill out `templates/product-label-brief-template.md` completely.
Do not skip the ingredient list or required FDA elements.

### Step 2 — Pre-Build Compliance Review

Before building anything in Supliful, run the brief through the Supplement Compliance Reviewer:
- Use `prompts/supplement-claims-review-prompt.md`
- Paste all planned claims and benefit statements
- Confirm all are approved before proceeding

**Human approval gate:** Fix any flagged claims before building the label.

### Step 3 — Build the Label in Supliful

1. Open Supliful and navigate to the product's label editor.
2. Select or confirm the correct Supliful template for the container type.
3. Enter the product name, subtitle, and key benefits on the front panel.
4. Enter the Supplement Facts, Suggested Use, Caution/Warning, FDA disclaimer, and address on the back panel.
5. Apply brand colors and typography per `vital-vision-system/brand/visual-rules.md`.
6. Do NOT click Save yet.

### Step 4 — Screenshot and Review

Take screenshots of all panels and run through Workflow 01 steps 3–7:
- Label Architect review
- Supplement Compliance Review (second pass on built label)
- Brand Label Guardian review
- Label Design Critic review
- QA Label Reviewer final decision

### Step 5 — Human Approval Gate

Complete `checklists/save-label-approval-checklist.md` before saving.

### Step 6 — Save and Log

Save the label in Supliful.
Log the creation in `logs/[date]-[product]-label-created.md`.

## Human Approval Gates

| Gate | Condition |
|---|---|
| Pre-build compliance check | All claims approved before building |
| Post-build QA review | SAVE decision from QA Reviewer |
| Final save approval | save-label-approval-checklist.md complete |

## Output Generated

- Completed `templates/product-label-brief-template.md`
- QA review report
- Log record in `logs/`

## Risks

- **Risk:** Building label with unapproved claims then having to rebuild.
  - Mitigation: Always complete Step 2 compliance pre-check before touching Supliful.
- **Risk:** Supplement Facts data entered incorrectly.
  - Mitigation: Cross-check against Supliful product specification sheet before entry.

## Plan B

If Supliful template does not match the required container type:
1. Contact Supliful support to identify the correct template.
2. Do not improvise with the wrong template.
3. Document the issue in `logs/errors.md`.
