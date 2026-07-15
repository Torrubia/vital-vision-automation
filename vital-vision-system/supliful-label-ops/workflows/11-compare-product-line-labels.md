# Workflow 11: Compare Product-Line Labels

## Goal

Produce a structured, scored comparison of all four Vital Vision product labels to identify which design elements are consistent, which are inconsistent, which label is the strongest baseline, and what the priority order for alignment should be. This workflow produces the input data for Workflow 10 (Build Master Label Standard).

## When to Use

- Before building a Master Label Standard (run this first)
- When a new product is added and you want to see how it fits with the existing family
- When Supliful has migrated all labels and you want to assess family consistency after migration
- When planning a design alignment project across the product line

## Required Inputs

- Label screenshots for all four products — front and back panels
  - Inner Bloom — Advanced Probiotic Formula
  - Inner Calm — Magnesium Glycinate
  - Inner Balance — Complete Multivitamin
  - Inner Grow — Hair, Skin & Nails Support
- Label text for each product (for compliance comparison)

## Agents Involved

1. Label Consistency Reviewer — primary comparison agent
2. Luxury Packaging Director — premium feel scoring per product
3. Label Design Critic — legibility scoring per product

## Step-by-Step Process

### Step 1 — Prepare All Label Materials

Collect:
- Clear screenshots, front and back, for all four products
- Text transcripts for each label (or readable screenshots of the back panel)

Organize files:
- `inner-bloom-front.png`, `inner-bloom-back.png`
- `inner-calm-front.png`, `inner-calm-back.png`
- `inner-balance-front.png`, `inner-balance-back.png`
- `inner-grow-front.png`, `inner-grow-back.png`

### Step 2 — Run the Label Consistency Reviewer

Use `prompts/product-line-comparison-prompt.md`.

Attach all eight screenshots (or four if full-wrap).

Ask the Label Consistency Reviewer to:
1. Complete the differences table (all design dimensions vs. all products)
2. Score each dimension for consistency (1–5)
3. Calculate overall family consistency score
4. Identify the three biggest inconsistency problems
5. Name the strongest label as the Master Standard baseline candidate
6. Define the recommended fix priority order

### Step 3 — Premium Feel Scoring (Luxury Packaging Director)

For each product separately, ask the Luxury Packaging Director:
- First impression score (1–5)
- Premium feel score (1–5)
- Color palette score (1–5)
- Typography score (1–5)
- Shelf presence score (1–5)
- One-sentence assessment

This produces a premium feel leaderboard across the four products.

### Step 4 — Legibility Scoring (Label Design Critic)

For each product:
- Supplement Facts legibility score (1–5)
- Body text legibility score (1–5)
- Overall design score (1–5)

### Step 5 — Assemble the Comparison Report

Compile all findings into `templates/product-line-comparison-report-template.md`.

The report must include:
- Differences table (all elements vs. all products)
- Consistency scores per dimension
- Premium feel leaderboard
- Legibility scores
- Master standard baseline recommendation
- Top 3 inconsistency problems
- Fix priority order
- What to preserve across the family
- What should be standardized

### Step 6 — Human Review

**Human approval gate:** Lucy reviews the comparison report.

She decides:
- Does she agree with the baseline recommendation?
- Which inconsistencies are priorities to fix?
- Are there any elements she wants to preserve that weren't flagged?
- Should any product label be redesigned vs. just aligned?

Lucy's decisions from this review feed directly into Workflow 10.

### Step 7 — Log

Save: `logs/[date]-product-line-comparison.md`

## Human Approval Gates

| Gate | Condition |
|---|---|
| Comparison conclusions | Lucy reviews and approves the comparison report before any alignment or redesign begins |

## Output Generated

- Completed `templates/product-line-comparison-report-template.md`
- Premium feel leaderboard
- Legibility scores
- Fix priority order
- Log entry in `logs/`

## Validation Checklist

- [ ] Screenshots collected for all four products (front + back)
- [ ] Label Consistency Reviewer completed — differences table done
- [ ] Consistency scores assigned
- [ ] Family consistency score calculated
- [ ] Premium feel scores from Luxury Packaging Director
- [ ] Legibility scores from Label Design Critic
- [ ] Master standard baseline candidate identified
- [ ] Top 3 inconsistencies documented
- [ ] Fix priority order defined
- [ ] Comparison report assembled
- [ ] Lucy reviewed and approved findings
- [ ] Logged

## Risks

- **Risk:** Two products score similarly as premium baseline candidates — creates ambiguity.
  - Mitigation: If tied, present both options to Lucy with a clear pros/cons comparison for her to decide.
- **Risk:** Different panels were used for some products than others (e.g., one is a full-wrap, others are two-panel).
  - Mitigation: Note the panel format difference at the top of the comparison. Compare only panels that are comparable.

## Plan B

If not all four products have clear, high-quality screenshots:
1. Proceed with the products that have usable screenshots.
2. Note which products are "data pending" in the report.
3. Do not complete the comparison report or move to Workflow 10 until all four products are included.

## Comparison Quick Guide: What to Look For

When looking at the four labels side by side, ask:

**Does the family look unified?**
→ If a shopper saw all four bottles together, would they read them as one brand?

**Which one looks most premium?**
→ Trust your first impression. Which one would you pick up first on a shelf?

**Which one looks most complete?**
→ Which label feels like it has the fewest rough edges?

**What is the one element that makes them feel inconsistent?**
→ Often it's a font change, a color difference, or a back panel layout that doesn't match.

**What one element do all four get right?**
→ This is probably already your Master Standard baseline for that element.
