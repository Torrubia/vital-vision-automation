# Workflow 03: Supliful Label Save Approval

## Goal

Provide a mandatory, documented human approval gate that must be completed before clicking "Save label" in the Supliful editor. This workflow cannot be delegated to or bypassed by any automated system.

## When to Use

Every single time you are about to click "Save label" in Supliful — whether after a migration review, a new label creation, a revision, or any other change.

No exceptions. No shortcuts.

## Who Must Complete This

**Lucy only.** No automated system, no agent, and no assistant may click Save on a Supliful label. This is a permanent human-only gate.

## Required Inputs

- Completed QA review report for this label (from Workflow 01 or 02)
- Completed `checklists/save-label-approval-checklist.md` (all items checked)
- Product name and label version being saved
- Decision from QA Label Reviewer: must be SAVE (not REVISE, not ESCALATE)

## Step-by-Step Process

### Step 1 — Confirm You Have a SAVE Decision

Before opening this workflow, confirm:
- The QA Label Reviewer has issued a SAVE decision for this label.
- No unresolved REVISE or ESCALATE flags remain.

If you do not have a completed QA report, stop and run Workflow 01 or 02 first.

### Step 2 — Complete the Save-Label Approval Checklist

Open `checklists/save-label-approval-checklist.md` and work through it line by line while looking at the label on screen in Supliful.

Do not check any box from memory. Look at the label and confirm each item visually.

**Every single checkbox must be marked before you proceed.**

### Step 3 — Final Visual Confirmation

Before clicking Save, do a final 30-second visual scan of the label in Supliful:

1. Read the product name out loud.
2. Read the FDA disclaimer to confirm it is present.
3. Confirm the Supplement Facts table is visible and readable.
4. Confirm your contact address is visible.
5. Check one more time that no forbidden language is visible anywhere.

### Step 4 — Human Approval Declaration

You are about to save a permanent label record in Supliful. By proceeding:

- You confirm the label has passed full review.
- You confirm the compliance checklist is complete.
- You accept responsibility for this label version being saved.
- You understand that Supliful may attach this label to product orders.

**Approval statement:** "I, Lucy, approve saving this label for [Product Name] on [Date]. All review steps have been completed. The save-label-approval-checklist is complete."

Write this statement in the approval record template before clicking Save.

### Step 5 — Click Save in Supliful

Now and only now: click "Save label" in the Supliful editor.

Confirm the save was successful (Supliful shows a confirmation message).

### Step 6 — Log the Save Action

Immediately after saving:

1. Copy `templates/human-approval-record-template.md`.
2. Fill in all fields.
3. Save the record as `logs/[YYYY-MM-DD]-[product-name]-save-approved.md`.

## Human Approval Gates

This entire workflow is a single human approval gate. It cannot be automated.

| Item | Requirement |
|---|---|
| QA decision | Must be SAVE |
| Approval checklist | All items checked |
| Visual confirmation | Done on screen |
| Approval declaration | Written out |
| Log record | Created after saving |

## Output Generated

- Completed `checklists/save-label-approval-checklist.md` (screenshot or copy)
- Completed `templates/human-approval-record-template.md` saved to `logs/`

## What Can Go Wrong

- **Saving before completing the checklist:** The label may have issues that weren't caught. Always complete the checklist.
- **Saving the wrong product's label:** Confirm the product name in the Supliful editor URL and on screen before saving.
- **Supliful save confirmation not appearing:** Refresh and check the label status before assuming the save succeeded.

## Plan B

If you are uncertain about any item on the approval checklist:
1. Stop. Do not save.
2. Run the relevant checklist from `checklists/` again.
3. If the concern is compliance-related, use `prompts/supplement-claims-review-prompt.md` to get a second review.
4. Only save when you are certain.

When in doubt, do not save. A label that is not saved can be reviewed again. A label saved with a compliance error requires correction and creates a record of the mistake.
