# Workflow 07: Rollback and Incident Response

## Goal

Respond safely and quickly to any label operation incident — including a label saved with errors, an accidental API action, an incorrect Shopify update, or any other unintended change to a Vital Vision product label.

## When to Use

Use this workflow immediately when:
- A label was saved in Supliful with a compliance issue or error
- An API call modified a record unintentionally
- A Shopify product was updated with incorrect information
- A label version was overwritten and the previous version is needed
- Any action was taken that should not have been taken

When in doubt, run this workflow first and ask questions after.

## Step-by-Step Process

### Step 1 — Stop All Activity Immediately

Stop everything you are doing in Supliful, Shopify, or any API script.

Do not try to fix the problem by making more changes. Additional changes create more risk.

### Step 2 — Document What Happened

Open `logs/errors.md` (or create `logs/[date]-incident.md`) and write:

```
INCIDENT REPORT
===============
Date and time: [now]
Product affected: [product name]
Platform: [Supliful / Shopify / API]
What happened: [describe exactly what was done]
Who did it: [Lucy / automated script / Claude]
What was the intended action: [what you meant to do]
What actually happened: [what went wrong]
Current state of the label/product: [what it looks like now]
```

Complete this before taking any corrective action.

### Step 3 — Assess the Incident Type

**Type A — Label Saved With Errors in Supliful**
The label has compliance issues, brand problems, or structural errors but was saved.

Action: Immediately open the label in Supliful. Do not proceed with connecting this label to any product orders. Document the errors. Plan corrections. Re-run Workflow 01. Save a corrected version after full review.

**Type B — Shopify Product Updated With Incorrect Data**
A Shopify product title, description, or variant was changed to incorrect information.

Action: Open Shopify Admin. Find the product. Review what changed. If you have the prior version (from a log or screenshot), revert manually. If you do not have the prior version, reconstruct from the `vital-vision-system/products/[product].md` reference file.

**Type C — API Call Executed Without Approval**
A script made an API call that was not explicitly approved by Lucy.

Action: Immediately stop the script. Review what was sent and what the response was. Log the full API call and response in `logs/[date]-incident.md`. Do not make any corrective API calls without full review. Assess whether any live data was changed.

**Type D — Unknown or Ambiguous**
You are not sure exactly what happened.

Action: Stop. Document everything you do know. Do not take any action until the situation is understood.

### Step 4 — Identify Rollback Path

For each incident type:

| Type | Rollback Path |
|---|---|
| Label saved with errors | Re-open label in Supliful, make corrections, re-review (Workflow 01), save corrected version |
| Shopify product incorrect | Revert fields in Shopify Admin manually using `products/[product].md` as source of truth |
| API call modified a record | Identify the modified record, restore prior state using a manual edit or the backup saved before the API call |
| API call deleted a record | Check if deletion is reversible (some platforms offer soft-delete/archive); if not recoverable, rebuild from documentation |

### Step 5 — Execute the Rollback

Make the minimum number of changes needed to restore a correct, safe state.

Every corrective change must be:
- Documented before it is made
- Logged after it is made
- Reviewed by Lucy before going live

### Step 6 — Verify Corrected State

After rollback:
1. Confirm the product or label is now in the correct state.
2. Run a quick review using the relevant checklist.
3. If a label was saved incorrectly, run the full Workflow 01 on the corrected version.

### Step 7 — Update Incident Log

Update `logs/[date]-incident.md` with:

```
RESOLUTION
==========
Corrective actions taken: [list]
Current state after correction: [description]
Verified by: Lucy
Verification date: [date]
Is the issue fully resolved: Yes / No / Partially

PREVENTION
==========
How will this be prevented in the future: [notes]
Checklist or workflow to update: [if applicable]
```

### Step 8 — Review and Improve

After the incident is resolved:
1. Review whether any checklist needs to be updated to prevent this from happening again.
2. Review whether any workflow step was unclear or was skipped.
3. Update the relevant checklist or workflow file.
4. Note the update in the incident log.

## Human Approval Gates

Every corrective action requires Lucy's review before execution. No automated system should take corrective action without explicit human instruction.

## What Must Never Happen During Incident Response

- Do not make additional API calls to "fix" an API incident without fully understanding what happened.
- Do not delete records to clean up an incident — deletion creates more irreversible risk.
- Do not push changes to a live Shopify product without reviewing what you are pushing.
- Do not assume the incident is resolved without verifying the current state on screen.

## Common Incidents and Quick References

| Incident | First action |
|---|---|
| Saved label with wrong product name | Open Supliful, fix the name, re-run Workflow 01, save again |
| Saved label missing FDA disclaimer | Open Supliful, add FDA disclaimer, re-run compliance check, save again |
| Shopify title updated incorrectly | Open Shopify Admin, correct the title, verify on live storefront |
| Script ran a write call without approval | Stop script, log the call, assess what changed, manual correction only |
| Wrong product label saved on wrong product | Open Supliful, identify affected product, restore correct label or build from brief |
