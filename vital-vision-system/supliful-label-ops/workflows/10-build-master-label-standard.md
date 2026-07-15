# Workflow 10: Build the Vital Vision Master Label Standard

## Goal

Create the official, versioned Vital Vision Master Label Standard — a single document that defines every repeatable design rule for all current and future Vital Vision product labels. Once approved by Lucy, this document becomes the authoritative reference for every label created, reviewed, or redesigned.

## When to Use

- After completing Workflow 08 (Analyze Current Label Designs) and having clear design analysis data
- When the product family has grown beyond one product and consistency across labels matters
- Before any significant label redesign, so the redesign has a standard to build toward
- When onboarding a new designer or tool that will produce Vital Vision labels

## Required Inputs

- All current product label screenshots (front + back for all four products)
- Completed analysis from Workflow 08 (if available)
- Consistency review from Label Consistency Reviewer (if available)
- `vital-vision-system/brand/visual-rules.md`
- `vital-vision-system/brand/brand-voice.md`
- `vital-vision-system/brand/approved-language.md`
- Any existing Canva brand kit (colors, fonts)
- Supliful label dimension specs for all product SKUs

## Agents Involved

1. Label Design System Manager — primary builder of the standard
2. Label Consistency Reviewer — supplies the consistency analysis
3. Premium Label Architect — validates layout rules against Supliful constraints
4. Luxury Packaging Director — validates premium feel criteria
5. Supplement Compliance Reviewer — validates legal text placement rules
6. Brand Label Guardian — validates brand representation rules

## Step-by-Step Process

### Step 1 — Pre-Work: Gather All Inputs

Before starting, confirm you have:
- [ ] Screenshots of all current labels (or analysis from Workflow 08)
- [ ] The brand visual rules file
- [ ] Supliful label dimensions for each SKU
- [ ] Any existing color hex codes or font names being used

### Step 2 — Design Audit (Label Design System Manager)

Use `prompts/master-label-standard-prompt.md`:
- Submit all current label screenshots
- Ask the Label Design System Manager to audit existing design elements
- Identify what is already consistent (becomes a standard rule)
- Identify what is inconsistent (becomes a decision point)

Output: Design audit with a table of what exists vs. what needs to be standardized.

### Step 3 — Consistency Analysis (Label Consistency Reviewer)

If not already done in Workflow 08:
- Run the Label Consistency Reviewer across all four products
- Collect differences table and consistency scores
- Identify the best baseline candidate

### Step 4 — Draft the Typography System

Define:

| Level | Use | Font Name | Weight | Size (print) | Case | Color |
|---|---|---|---|---|---|---|
| H1 | Product name | [font] | [weight] | [size] | [case] | [hex] |
| H2 | Subtitle | [font] | [weight] | [size] | [case] | [hex] |
| H3 | Key benefits | [font] | [weight] | [size] | [case] | [hex] |
| Body | Supplement Facts, Suggested Use | [font] | [weight] | [size] | — | [hex] |
| Legal | FDA disclaimer, address | [font] | [weight] | [size (min)] | — | [hex] |

**Human decision gate:** Lucy confirms the typography choices before they are codified.

### Step 5 — Draft the Color System

Define:
- Primary brand background color (hex + name)
- Product-line accent colors (one per product, if differentiation is used)
- Primary text color (dark)
- Secondary text color (muted, for subtitles and body)
- Legal text color
- Supplement Facts table border color
- Divider/rule color

**Human decision gate:** Lucy confirms the color system.

### Step 6 — Draft the Layout Grid

For each panel type (front, back, full wrap), define:
- Overall safe area dimensions
- Zone positions and sizes
- Internal gutter spacing
- Edge margins from safe area boundary
- Supplement Facts table position and column widths

### Step 7 — Draft Product-Line Differentiation Rules

Define how Inner Bloom, Inner Calm, Inner Balance, and Inner Grow are visually distinguished while staying part of the same family:
- Accent color per product
- Any product-specific icon or botanical element
- Product-name color treatment differences (if any)

### Step 8 — Draft Legal and Compliance Text Rules

Define:
- FDA disclaimer: font, size, color, position, whether it is visually set apart
- Manufacturer address: font, size, position
- Suggested Use: font, size, position, section header style
- Caution / Warning: font, size, position, section header style

### Step 9 — Supliful Constraint Integration

Cross-check the draft standard against Supliful's technical requirements:
- Every rule must be achievable inside Supliful's editor or via Canva-to-Supliful
- Flag any rule that conflicts with Supliful constraints and propose resolution

### Step 10 — Full Standard Review

Run the draft standard through:
- Premium Label Architect (validate structure rules)
- Luxury Packaging Director (validate premium feel criteria)
- Brand Label Guardian (validate brand representation)
- Supplement Compliance Reviewer (validate legal text rules)

### Step 11 — Human Approval

**Full human approval gate:** Lucy reviews the complete draft Master Label Standard.

- She may approve it as-is (APPROVED v1.0)
- She may request changes and a second review pass
- She may approve it with noted pending items

No label should be built to this standard until Lucy has approved it.

### Step 12 — Publish the Standard

Save the approved standard as:
`vital-vision-system/supliful-label-ops/templates/master-label-standard-template.md`

Version-stamp it: `v1.0 — [date] — Approved by Lucy`

Log the creation:
`logs/[date]-master-label-standard-v1.md`

## Human Approval Gates

| Gate | Condition |
|---|---|
| Typography choices | Lucy confirms before codifying |
| Color system | Lucy confirms before codifying |
| Full standard draft | Lucy reviews and approves complete draft |
| Publish decision | Standard only published after Lucy's explicit approval |

## Output Generated

- Completed, approved `templates/master-label-standard-template.md` (v1.0)
- Log entry in `logs/`

## Validation Checklist

- [ ] All current labels audited
- [ ] Consistency analysis complete
- [ ] Typography system defined and approved
- [ ] Color system defined and approved
- [ ] Layout grid defined
- [ ] Product-line differentiation defined
- [ ] Legal text rules defined
- [ ] Supliful constraints cross-checked
- [ ] Full standard review complete
- [ ] Lucy approved the complete standard
- [ ] Standard version-stamped and published
- [ ] Log entry created

## Risks

- **Risk:** Building a standard that is too rigid and prevents organic design improvements.
  - Mitigation: The standard includes "open decisions" fields and a version number — it can be updated with Lucy's approval.
- **Risk:** Standard built before enough analysis data exists.
  - Mitigation: Always run Workflow 08 before Workflow 10.

## Plan B

If a full Master Label Standard cannot be completed in one session:
1. Build it section by section (typography first, then color, then layout).
2. Mark each section as DRAFT or APPROVED individually.
3. Do not use any section to build labels until Lucy has approved that section.
