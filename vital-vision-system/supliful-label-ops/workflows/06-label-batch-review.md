# Workflow 06: Label Batch Review

## Goal

Review all four Vital Vision Shop product labels in a single structured session. Produce individual QA reports for each product and a batch summary that identifies which labels can be saved, which need revision, and which require escalation.

## When to Use

Use this workflow when:
- Supliful has migrated all product labels and you need to review them all
- Running a quarterly label audit across all products
- Preparing for a product catalog update that touches all four products
- Onboarding a new label template and validating all products against it

## Products in Batch

| # | Product | Type |
|---|---|---|
| 1 | Inner Balance | Complete Multivitamin |
| 2 | Inner Bloom | Advanced Probiotic Formula |
| 3 | Inner Calm | Magnesium Glycinate |
| 4 | Inner Grow | Hair, Skin & Nails Support |

## Required Inputs

- Label screenshots for each of the four products (front and back panels)
- Supliful editor access for all four products
- Prior label versions for comparison (if available)

## Agents Involved

For each product (repeated four times):
1. Label Architect
2. Supplement Compliance Reviewer
3. Brand Label Guardian
4. Label Design Critic
5. QA Label Reviewer

Plus the Supliful Label Project Manager to orchestrate and produce the batch summary.

## Step-by-Step Process

### Step 1 — Preparation

1. Open Supliful and navigate to the label editor for all four products.
2. Take screenshots of all panels for all four products.
3. Organize screenshots by product name in a temporary folder.
4. Do NOT click Save on any product yet.

### Step 2 — Review Product 1: Inner Balance

Run the full Workflow 01 review for Inner Balance:
- Label Architect
- Supplement Compliance Reviewer
- Brand Label Guardian
- Label Design Critic
- QA Label Reviewer final decision

Record: SAVE / REVISE / ESCALATE + issues list.

### Step 3 — Review Product 2: Inner Bloom

Run the full Workflow 01 review for Inner Bloom.

Record: SAVE / REVISE / ESCALATE + issues list.

### Step 4 — Review Product 3: Inner Calm

Run the full Workflow 01 review for Inner Calm.

Record: SAVE / REVISE / ESCALATE + issues list.

### Step 5 — Review Product 4: Inner Grow

Run the full Workflow 01 review for Inner Grow.

Record: SAVE / REVISE / ESCALATE + issues list.

### Step 6 — Batch Summary Report

After all four reviews, ask Claude to produce a batch summary:

```
Produce a batch label review summary for all four Vital Vision products.

For each product, state:
- Final decision (SAVE / REVISE / ESCALATE)
- Number of issues found
- Top issue (if any)
- Recommended next action

Then produce:
- Overall batch status (e.g., "2 SAVE, 1 REVISE, 1 ESCALATE")
- Priority order for fixing REVISE items
- Any cross-product pattern (e.g., "FDA disclaimer formatting issue appears on all four labels")
```

### Step 7 — Human Review of Batch Summary

Review the batch summary with Lucy.

Decide:
- Which labels to save now (SAVE decisions)
- Which labels to fix and re-review (REVISE decisions)
- Which labels to escalate (ESCALATE decisions)

### Step 8 — Save Approved Labels

For each label with a SAVE decision:
- Complete `checklists/save-label-approval-checklist.md`
- Follow Workflow 03 (Save Approval)
- Save the label in Supliful
- Log in `logs/[date]-[product]-label-saved.md`

### Step 9 — Queue REVISE Labels

For each label with a REVISE decision:
- Document required fixes in `logs/[date]-[product]-needs-revision.md`
- Schedule a follow-up review session

### Step 10 — Escalate as Needed

For each ESCALATE decision:
- Document the specific concern in `logs/[date]-[product]-escalated.md`
- Do not save until the concern is resolved

### Step 11 — Batch Log

Save a master batch review log:
`logs/[date]-batch-label-review-summary.md`

Include:
- Date
- Products reviewed
- Decision for each
- Actions taken
- Pending items

## Human Approval Gates

| Gate | Condition |
|---|---|
| Individual label QA | Each product reviewed fully before save decision |
| Batch summary approval | Lucy reviews and confirms batch summary |
| Individual save approval | Workflow 03 for each SAVE label |

## Output Generated

- Four individual QA review reports (one per product)
- One batch summary report
- Four save approval records (for SAVE decisions)
- Log entries for each product outcome

## Tips for Efficiency

- Review one product at a time, fully, before starting the next.
- Keep screenshots organized in a temporary folder named by product.
- Use `prompts/batch-label-review-prompt.md` to start each product's review quickly.
- Note cross-product patterns — if the same issue appears on all labels, fix it once and note it in the batch summary.

## Risks

- **Risk:** Reviewing multiple labels in the same Claude conversation causes cross-contamination of findings.
  - Mitigation: Start a fresh conversation for each product, or clearly label each product's section in the conversation.
- **Risk:** Saving a REVISE label accidentally because you lost track of which product was which.
  - Mitigation: Confirm product name in Supliful editor URL before saving each label.

## Plan B

If the batch review cannot be completed in one session:
1. Stop after completing full reviews for the products already done.
2. Save partial batch summary in `logs/[date]-batch-partial.md`.
3. Note which products are still pending review.
4. Resume from the next pending product in the next session.
