# Workflow 01: Review a Migrated Supliful Label

## Goal

Determine whether a Supliful-migrated label is safe to save in its current state. Produce a documented Save / Revise / Escalate decision before any action is taken in the Supliful editor.

## When to Use

Use this workflow when:
- Supliful has migrated one of your product labels to a new template format
- A label appears differently than expected after Supliful updated their editor
- You need to validate a label you did not create from scratch

## Required Inputs

- Product name (Inner Balance / Inner Bloom / Inner Calm / Inner Grow)
- Screenshot of the label as it appears in the Supliful editor (front panel, back panel, or full wrap view)
- Screenshot of the original label (if available — for side-by-side comparison)
- Supliful editor URL for that product (for reference, do not click Save yet)

## Agents Involved

1. Supliful Label Project Manager — orchestrates the review
2. Label Architect — layout and structure
3. Supplement Compliance Reviewer — claims and required elements
4. Brand Label Guardian — brand consistency
5. Label Design Critic — legibility and visual quality
6. QA Label Reviewer — final decision

## Step-by-Step Process

### Step 1 — Preparation (2 minutes)

1. Log in to Supliful and navigate to the product's label editor.
2. Take a screenshot of the current label view (front panel, then back panel, then full wrap if available).
3. Do NOT click Save yet.
4. Note the product name exactly as shown in Supliful.
5. If you have the original label exported, locate that file.

### Step 2 — Open the Review Prompt

1. Open `prompts/migrated-label-review-prompt.md`.
2. Copy the full prompt.
3. Open Claude Code or Claude.ai.
4. Paste the prompt and attach your screenshots.

### Step 3 — Label Architect Review

Claude will first review the structure:
- Is all text inside the safe area?
- Is the bleed area free of critical content?
- Is the matrix code zone clear?
- Are there duplicated elements from the old label?
- Is the label orientation correct?

Wait for the Label Architect report before proceeding.

### Step 4 — Supplement Compliance Review

Claude will review all text for compliance:
- Flag any forbidden claims ("cures," "treats," "prevents disease," etc.)
- Verify FDA disclaimer is present and correctly worded
- Verify Supplement Facts panel is complete
- Verify Suggested Use is present
- Verify Caution / Warning is present
- Verify manufacturer address is present
- Verify net quantity is stated

**Human approval gate:** If any compliance issue is flagged, STOP. Do not proceed to subsequent steps until the issue is resolved or escalated.

### Step 5 — Brand Label Guardian Review

Claude will check brand consistency:
- Product name spelled correctly
- Subtitle matches approved version
- Vital Vision brand tone (warm, premium, educational)
- Logo correct
- No off-brand language

### Step 6 — Label Design Critic Review

Claude will check visual quality:
- All text legible at print size
- Supplement Facts readable
- Hierarchy logical
- Professional appearance

### Step 7 — QA Label Reviewer Final Decision

Claude will aggregate all findings and produce:
- Summary of all issues
- SAVE / REVISE / ESCALATE decision
- Required fixes (if REVISE or ESCALATE)
- Compliance risks
- Human approval checklist

### Step 8 — Human Approval Gate

Review the QA report.

If decision is REVISE or ESCALATE:
- Do not save.
- Make the required fixes in the Supliful editor.
- Return to Step 2 and run the review again.

If decision is SAVE:
- Complete `checklists/save-label-approval-checklist.md` item by item.
- Only after all checklist items are marked: click Save in Supliful.

### Step 9 — Log the Action

After saving (or deciding not to save):
- Copy the `templates/label-review-report-template.md`.
- Fill in the product, date, decision, issues found, and your name.
- Save the completed record in `logs/[date]-[product]-label-review.md`.

## Human Approval Gates

| Gate | Location in Workflow | Condition |
|---|---|---|
| Compliance stop | Step 4 | Any compliance flag found |
| Final approval | Step 8 | Must complete save-label-approval-checklist.md |

## Output Generated

- QA review report (in Claude conversation)
- Completed `checklists/save-label-approval-checklist.md`
- Log record in `logs/`

## Validation Checklist

- [ ] Screenshots taken before starting
- [ ] All four agent reviews completed
- [ ] QA report produced
- [ ] Save / Revise / Escalate decision issued
- [ ] If SAVE: approval checklist completed
- [ ] If SAVE: label saved in Supliful manually
- [ ] Review logged

## Risks

- **Risk:** Missing a compliance issue leads to a label with an illegal health claim.
  - Mitigation: Never skip the Supplement Compliance Reviewer step.
- **Risk:** Migrated label has duplicated elements that aren't visible at zoom level.
  - Mitigation: Zoom in on all panels before screenshotting.
- **Risk:** Saving the wrong label version.
  - Mitigation: Confirm the Supliful editor shows the correct product before saving.

## Plan B

If Claude cannot review the label because the screenshot is too small or unclear:
1. Re-export the label at higher resolution from the Supliful editor.
2. Review the back panel text manually using `checklists/migrated-label-checklist.md`.
3. Complete the checklist yourself without AI assistance.
4. Only save when all checklist items pass.
