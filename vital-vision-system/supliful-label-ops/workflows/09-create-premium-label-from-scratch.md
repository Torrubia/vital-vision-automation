# Workflow 09: Create a Premium Label from Scratch

## Goal

Design and build a new premium Supliful-ready label for a Vital Vision product from a product brief to a Supliful-ready build spec, with compliance-safe copy, layout specification, creative direction, and a human-approved build guide. The output is a complete design package that can be handed to the Supliful Dashboard Design Operator to build inside Supliful.

## When to Use

- Creating a label for a brand new product
- Doing a premium redesign of an existing label (after Workflow 08 analysis recommends redesign)
- Rebuilding a label after a failed migration
- Creating a new product variant with its own label

## Required Inputs

- Completed `templates/premium-label-design-brief-template.md` for the product
- Product file: `vital-vision-system/products/[product].md`
- Supplement Facts data (from Supliful product specification)
- Approved color system (`templates/master-label-standard-template.md` if built, or `brand/visual-rules.md`)
- Logo file (correct version)
- Supliful label template dimensions for this SKU
- Any analysis report from Workflow 08 (if redesigning an existing label)
- Reference: `DESIGN_PRESERVATION_AND_REDESIGN_POLICY.md`

## Agents Involved

1. Supliful Label Project Manager — orchestrates
2. Label Design System Manager — applies Master Label Standard
3. Premium Label Architect — defines layout specification
4. Luxury Packaging Director — provides creative direction
5. Supplement Compliance Reviewer — pre-approves all copy
6. Brand Label Guardian — brand consistency check
7. Supliful Dashboard Design Operator — produces build guide
8. Premium Label QA Reviewer — final review before save

## Step-by-Step Process

### Step 1 — Complete the Design Brief

Fill out `templates/premium-label-design-brief-template.md` completely.

Required:
- Product name, subtitle, type
- Container type and Supliful label dimensions
- Net quantity, serving size, servings per container
- Supplement Facts data (all ingredients, amounts, % DV)
- Approved key benefit statements (max 3 for front panel)
- Suggested Use, Caution, FDA disclaimer (standard text)
- Manufacturer address
- Any specific design direction (e.g., "softer than Inner Bloom," "more botanical feel")

### Step 2 — Compliance Pre-Check on All Copy

Before any design work, use `prompts/supplement-claims-review-prompt.md`:
- Submit all planned benefit statements and claims
- Confirm all are approved before building

**Human approval gate:** Fix any flagged claims before proceeding.

### Step 3 — Layout Specification (Premium Label Architect)

Use `prompts/premium-label-architect-prompt.md`:
- Provide the label dimensions and panel count
- Request the full layout specification: zones, grid, spacing, font size minimums

Output: Layout specification document.

### Step 4 — Creative Direction (Luxury Packaging Director)

Use `prompts/luxury-packaging-director-prompt.md`:
- Provide the product name, brief, and any existing labels for reference
- Request the creative direction brief: color direction, typography direction, first-impression goal, tone

If the Master Label Standard exists (`templates/master-label-standard-template.md`): reference it here.

Output: Creative direction brief.

### Step 5 — Copy Block Assembly

Compile all approved copy into a clean, organized copy block document:

```
PRODUCT: [name]

FRONT PANEL:
- Product name: [INNER CALM]
- Subtitle: [Magnesium Glycinate]
- Benefit 1: [Helps support relaxation and restful sleep]
- Benefit 2: [May help support muscle recovery]
- Benefit 3: [Designed for daily calm and stress balance]
- Net quantity: [60 Capsules]

BACK PANEL:
- Supplement Facts: [full table text]
- Suggested Use: [text]
- Caution: [text]
- FDA disclaimer: [exact standard wording]
- Address: [manufacturer name and full address]
```

All copy must be from the compliance-reviewed set only.

### Step 6 — Design Review (Brand Label Guardian)

Submit the creative direction brief and copy blocks to the Brand Label Guardian:
- Confirm product name and subtitle match approved versions
- Confirm tone is on-brand
- Confirm no off-brand language appears in the benefit statements

### Step 7 — Build Specification (New Label Build Spec)

Compile the following into `templates/new-label-build-spec-template.md`:
- Layout specification (from Step 3)
- Creative direction (from Step 4)
- Approved copy blocks (from Step 5)
- Color system (hex codes)
- Typography specification (font names, sizes, weights)
- Logo file reference

This is the complete "design package" — everything needed to build the label.

**Human approval gate:** Lucy reviews and approves the complete design package before the dashboard build begins.

### Step 8 — Supliful Dashboard Build Guide

Use `prompts/supliful-dashboard-build-prompt.md`:
- Provide the complete design package
- Request step-by-step Supliful dashboard build instructions

Output: `workflows/12-supliful-dashboard-label-build.md` instructions for this label.

### Step 9 — Build in Supliful

Follow the Supliful Dashboard Design Operator's build guide inside Supliful.
Take screenshots of all panels when complete.
Do NOT click Save.

### Step 10 — Full QA Review

Run the built label through the full premium QA sequence:
- Structural check (Premium Label Architect — does the built label match the spec?)
- Compliance check (Supplement Compliance Reviewer)
- Brand check (Brand Label Guardian)
- Design quality check (Label Design Critic)
- Premium feel check (Luxury Packaging Director)
- Final decision (Premium Label QA Reviewer)

### Step 11 — Human Approval and Save

If decision is READY:
- Complete `checklists/save-label-approval-checklist.md`
- Follow Workflow 03 (Save Approval)
- Save the label in Supliful
- Log in `logs/`

## Human Approval Gates

| Gate | Condition |
|---|---|
| Compliance pre-check | All copy approved before design begins |
| Design package approval | Lucy approves layout spec + creative direction + copy blocks |
| Post-build QA | READY decision from Premium Label QA Reviewer |
| Final save | Workflow 03 complete |

## Output Generated

- Completed `templates/premium-label-design-brief-template.md`
- Completed `templates/new-label-build-spec-template.md`
- Supliful dashboard build guide
- Premium Label QA report
- Human approval record in `logs/`

## Validation Checklist

- [ ] Design brief complete
- [ ] Compliance pre-check passed
- [ ] Layout specification produced
- [ ] Creative direction brief produced
- [ ] Copy blocks assembled and approved
- [ ] Brand Guardian check passed
- [ ] New label build spec assembled
- [ ] Lucy approved the design package
- [ ] Supliful dashboard build guide produced
- [ ] Label built in Supliful
- [ ] Screenshots taken
- [ ] Full QA review completed
- [ ] READY decision issued
- [ ] Save approval completed (Workflow 03)
- [ ] Logged in `logs/`

## Risks

- **Risk:** Building a complex design that cannot be reproduced in Supliful's limited editor.
  - Mitigation: The Premium Label Architect and Dashboard Operator both validate buildability in Supliful before the build begins.
- **Risk:** Copy changes after the design is built require rebuilding text boxes.
  - Mitigation: Always finalize and compliance-approve all copy BEFORE the Supliful build.

## Plan B

If Supliful's editor cannot reproduce the approved design:
1. Document the limitation in `logs/[date]-[product]-supliful-limitation.md`.
2. Evaluate Canva-to-Supliful workflow: build in Canva, export, upload to Supliful.
3. Do not compromise the design to fit a tool limitation without Lucy's approval.
