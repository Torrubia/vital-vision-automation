# Workflow 04: Shopify Product Sync Review

## Goal

Review and confirm that the Shopify product listing for a Vital Vision product is consistent with the current Supliful label. Identify and document any discrepancies so they can be corrected with human approval.

## When to Use

Use this workflow when:
- A label has just been saved in Supliful and you want to confirm the Shopify page still matches
- A Shopify product description needs to be updated to reflect a label change
- Launching a new product and setting up the Shopify listing for the first time
- Running a periodic sync audit across all four products

## Required Inputs

- Current label content for the product (all panels, text)
- Shopify Admin access to the product page
- Product file from `vital-vision-system/products/[product].md`
- Optional: Shopify product URL

## Agents Involved

1. Shopify Sync Reviewer — compares label vs. Shopify content
2. Supplement Compliance Reviewer — verifies that Shopify description uses safe language
3. QA Label Reviewer — if Shopify changes are needed, reviews the updated content

## Step-by-Step Process

### Step 1 — Export Label Content

Write out the text from all panels of the current saved label:
- Product name and subtitle (front panel)
- Key benefits text (front panel)
- Supplement Facts data (back panel)
- Suggested Use (back panel)
- Caution/Warning (back panel)
- FDA disclaimer (back panel)
- Address (back panel)
- Net quantity

### Step 2 — Export Shopify Product Content

From Shopify Admin:
1. Go to Products → find the product.
2. Copy the product title, description, and variant details (quantity, size).
3. Note the product images (label-based or lifestyle).

### Step 3 — Shopify Sync Review

Use `prompts/shopify-sync-review-prompt.md`:
1. Paste the label content.
2. Paste the Shopify product content.
3. Ask the Shopify Sync Reviewer to identify discrepancies.

### Step 4 — Compliance Check on Shopify Description

Run the Shopify product description through the Supplement Compliance Reviewer:
- Use `prompts/supplement-claims-review-prompt.md`
- Confirm all claims in the description are approved
- Confirm no claim in the description is stronger than what appears on the label

**Human approval gate:** If any compliance issue is found in the Shopify description, flag it for correction before Step 5.

### Step 5 — Review Discrepancy Report

Review the Shopify Sync Reviewer's report:
- Note each discrepancy (label vs. Shopify)
- Decide which surface needs updating

General rule: the label is the authoritative source. If the label says "60 Capsules" and Shopify says "60 count," update Shopify to match the label.

### Step 6 — Prepare Shopify Updates for Human Approval

For each discrepancy:
1. Write the current Shopify text.
2. Write the proposed new Shopify text.
3. Record in `templates/api-action-request-template.md` or a manual update note.

**Human approval gate:** Review all proposed changes before making any edits in Shopify Admin.

### Step 7 — Make Approved Shopify Updates

After Lucy approves each change:
1. Make the edit in Shopify Admin.
2. Save the product.
3. Confirm the live page reflects the update.

### Step 8 — Log the Sync Review

Save a sync review record in `logs/[date]-[product]-shopify-sync.md`.

## Human Approval Gates

| Gate | Condition |
|---|---|
| Compliance check | All Shopify description claims approved |
| Change approval | All Shopify edits reviewed and approved by Lucy before execution |

## Output Generated

- Shopify Sync Reviewer discrepancy report
- List of proposed Shopify edits
- Approval records for each edit
- Log record in `logs/`

## Risks

- **Risk:** Shopify description contains a stronger claim than the label, creating a compliance gap.
  - Mitigation: Always run the Shopify description through the Supplement Compliance Reviewer.
- **Risk:** Editing the wrong Shopify product.
  - Mitigation: Confirm the product ID in the Shopify Admin URL before saving.

## Plan B

If Shopify Admin is unavailable or unclear:
1. Note the discrepancies in `logs/`.
2. Return when access is restored.
3. Do not attempt to make Shopify edits through any API call without explicit approval.
