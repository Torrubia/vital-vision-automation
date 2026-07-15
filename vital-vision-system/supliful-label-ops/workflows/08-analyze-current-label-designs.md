# Workflow 08: Analyze Current Label Designs

## Goal

Produce a comprehensive design analysis of all current Vital Vision product labels — evaluating premium feel, readability, brand consistency, layout quality, Supliful technical readiness, and compliance-safe copy. Identify what to preserve and what to redesign before any redesign work begins.

This workflow runs before any redesign decision is made. It is a diagnostic — not a redesign.

## When to Use

- Before planning any label redesign or visual upgrade
- When onboarding this system for the first time with existing labels
- When Supliful has migrated labels and you want to evaluate the full design quality (beyond the migration check in Workflow 01)
- When preparing a business review of the product packaging

## Required Inputs

- Label screenshots for all products being analyzed (front and back panels, or full wrap)
  - Inner Bloom — Advanced Probiotic Formula
  - Inner Calm — Magnesium Glycinate
  - Inner Balance — Complete Multivitamin
  - Inner Grow — Hair, Skin & Nails Support
- Label text for each product (typed out or readable from screenshot)
- Reference: `vital-vision-system/brand/visual-rules.md`

## Agents Involved

1. Premium Label Architect — layout and structural quality
2. Luxury Packaging Director — premium feel, creative direction
3. Label Design Critic — legibility and visual quality (already in module)
4. Supplement Compliance Reviewer — compliance-safe copy check (already in module)
5. Label Consistency Reviewer — cross-product family analysis
6. Label Design System Manager — identifies what should become the standard

## Step-by-Step Process

### Step 1 — Prepare Screenshots

Before starting:
1. Open each product in the Supliful editor.
2. Take clear screenshots of front panel and back panel for each product.
3. Organize in a folder: `inner-bloom-front.png`, `inner-bloom-back.png`, etc.
4. Do NOT make any changes to any label. This is observation only.

### Step 2 — Premium Label Architect Analysis

Use `prompts/premium-label-architect-prompt.md` → select the "Analyze Existing Layout" variant.

For each product:
- Is the layout structured with a clear grid?
- Is all content inside the safe area?
- Is the matrix code zone clear?
- Is the Supplement Facts table in a legible position?
- Is the information hierarchy logical?

Collect: a structural assessment for each product.

### Step 3 — Luxury Packaging Director Assessment

Use `prompts/luxury-packaging-director-prompt.md` → select the "Evaluate Current Label" variant.

For each product:
- First impression (3-second shelf test)
- Premium feel score
- Color palette assessment
- Typography assessment
- Whitespace assessment
- What to preserve
- Single highest-impact improvement

Collect: a premium feel assessment per product.

### Step 4 — Compliance Review (Quick Pass)

Use `prompts/supplement-claims-review-prompt.md`.

For each product, check label text for:
- Any forbidden language
- FDA disclaimer present and correct
- Required elements all present

Collect: compliance status per product (Pass / Flag / Escalate).

### Step 5 — Consistency Review

Use `prompts/product-line-comparison-prompt.md`.

Provide all four sets of screenshots together and ask the Label Consistency Reviewer to:
- Complete the differences table
- Score each dimension
- Identify the master standard baseline candidate
- List the top 3 inconsistencies

Collect: consistency report and differences table.

### Step 6 — Analysis Report Assembly

Compile all findings into a single analysis report using `templates/current-label-analysis-report-template.md`.

The report must include:
- Per-product structural assessment
- Per-product premium feel score and notes
- Per-product compliance status
- Cross-product consistency score
- Master list: what to preserve
- Master list: what to redesign
- Priority order for any changes

### Step 7 — Human Review and Decision

Lucy reviews the full analysis report.

Decision required:
- Which labels are acceptable as-is after migration review (Workflow 01)?
- Which labels need minor design improvements?
- Which labels need a premium redesign (Workflow 09)?
- Does the product family need a Master Label Standard built (Workflow 10)?

**Human approval gate:** Lucy must sign off on the analysis conclusions and approve the next action before any label is changed.

### Step 8 — Log the Analysis

Save the completed analysis report:
`logs/[date]-design-analysis-all-products.md`

## Human Approval Gates

| Gate | Condition |
|---|---|
| Analysis conclusions | Lucy reviews and approves findings before any redesign action |
| Redesign decision | Lucy explicitly decides which products will be redesigned and when |

## Output Generated

- Per-product premium feel assessment
- Structural assessment per product
- Compliance quick-pass results
- Consistency report with differences table
- Completed `templates/current-label-analysis-report-template.md`
- Log entry in `logs/`

## Validation Checklist

- [ ] Screenshots collected for all products (front + back)
- [ ] Premium Label Architect review complete for all products
- [ ] Luxury Packaging Director assessment complete for all products
- [ ] Compliance quick-pass complete for all products
- [ ] Consistency review complete (differences table)
- [ ] Analysis report assembled
- [ ] What to preserve documented
- [ ] What to redesign documented
- [ ] Human review and decision gate complete
- [ ] Analysis logged

## Risks

- **Risk:** Analysis leads to a knee-jerk full redesign decision that breaks brand recognition.
  - Mitigation: The analysis explicitly documents what to preserve before any redesign. See `DESIGN_PRESERVATION_AND_REDESIGN_POLICY.md`.
- **Risk:** Screenshot quality too low to assess legibility or color accurately.
  - Mitigation: Export label previews at maximum resolution from Supliful. Do not screenshot a zoomed-out view.

## Plan B

If full analysis of all four products is too large for a single Claude session:
1. Run the analysis per product in separate sessions.
2. Collect all per-product reports.
3. Assemble the consistency comparison in a final session with all reports attached.
