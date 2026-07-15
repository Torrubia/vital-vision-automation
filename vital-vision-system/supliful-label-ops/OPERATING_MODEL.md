# Supliful Label Ops — Operating Model

## Core Principle

Every label action at Vital Vision Shop follows a single rule:

**Human requests → Agents review → Human approves → Human acts.**

Claude and its agents never save, publish, delete, or modify a live label without Lucy's explicit approval. The system is designed to reduce cognitive load and catch compliance errors — not to act autonomously.

---

## Operating Phases

### MVP — Do It Manually With Checklists

Use the checklists and prompts in this module to review each label by hand. Claude helps analyze screenshots and flag issues. You make the final decision.

**Goal:** establish the review habit and validate the checklist quality.

### Validation — Run the Review Workflow Repeatedly

After reviewing 2–3 labels, note which checklist items keep catching issues. Update the checklists. Validate that the prompts produce useful output.

**Goal:** prove the review process is reliable before adding any automation.

### Safe API Draft Mode — Read First, Never Write

Connect to Supliful and Shopify APIs in read-only mode only. Pull label metadata, product data, and status information. Review what the API exposes without making any changes.

**Goal:** understand what can be automated before building any automation.

### Supervised Automation — Draft Actions With Human Approval Gate

Build automation that prepares actions (e.g., "label X is ready to save") but requires Lucy to click a confirmation before anything is executed. No autonomous saves, no autonomous publishes.

**Goal:** reduce manual steps without removing human control.

### Scale — Batch Operations With Audit Logs

After supervised automation is proven reliable, allow batch operations with full audit logs, rollback capability, and human-readable review summaries.

**Goal:** process all products efficiently while maintaining compliance and brand integrity.

---

## Agent Team

The following specialist agents handle label review tasks. Each is defined in `agents/`.

| Agent | Role |
|---|---|
| Supliful Label Project Manager | Routes requests to the right agents, tracks status |
| Label Architect | Reviews layout, safe area, bleed, and structural integrity |
| Supplement Compliance Reviewer | Checks all claims and required FDA elements |
| Brand Label Guardian | Verifies brand consistency, tone, and visual rules |
| Label Design Critic | Reviews legibility, hierarchy, and professional appearance |
| Supliful API Operator | Plans and documents safe API interactions (read-only now) |
| Shopify Sync Reviewer | Reviews Shopify product data alignment with label content |
| QA Label Reviewer | Produces final Save / Revise / Escalate decision |

---

## End-to-End Flow

```
Lucy submits label screenshot or label review request
          |
          v
Supliful Label Project Manager
  - Identifies product and review type
  - Routes to relevant agents
          |
          v
Label Architect
  - Checks safe area, bleed, matrix code zone
  - Confirms layout structure is intact
  - Flags overlapping or duplicated elements
          |
          v
Supplement Compliance Reviewer
  - Reviews all claims against approved/forbidden language
  - Confirms Supplement Facts panel is present and readable
  - Confirms FDA disclaimer, Suggested Use, Caution/Warning
  - Confirms manufacturer/distributor address
          |
          v
Brand Label Guardian
  - Checks logo placement and version
  - Checks brand colors and typography
  - Checks product name spelling and subtitle
  - Confirms tone matches brand voice
          |
          v
Label Design Critic
  - Reviews legibility at small sizes
  - Reviews visual hierarchy
  - Flags anything that looks unprofessional or unclear
          |
          v
QA Label Reviewer
  - Aggregates all agent findings
  - Produces final decision: SAVE / REVISE / ESCALATE
  - Lists all required fixes if REVISE or ESCALATE
  - Generates human approval checklist
          |
          v
Human Approval Gate (Lucy)
  - Reviews QA report
  - Completes save-label-approval-checklist.md
  - Manually clicks Save in Supliful
  - Logs the action in logs/
```

---

## Decision Outcomes

| Decision | Meaning | Action Required |
|---|---|---|
| SAVE | All checks passed. Label is compliant and brand-correct. | Complete approval checklist. Click Save in Supliful. Log the action. |
| REVISE | Issues found that must be fixed before saving. | Fix noted issues in Supliful label editor. Re-run review. |
| ESCALATE | Compliance risk, legal concern, or structural problem that needs expert review. | Do not save. Document the issue. Consult compliance reference or legal guidance. |

---

## What Claude Can and Cannot Do

### Claude Can

- Review label screenshots and identify issues
- Cross-reference claims against `compliance/approved-claims.md` and `compliance/forbidden-claims.md`
- Check layout structure against safe area and bleed rules
- Generate a label review report
- Prepare a draft action request for human approval
- Log completed reviews in `logs/`
- Research API endpoints and document what is safe to call

### Claude Cannot

- Click Save in Supliful
- Push changes to a live Shopify product
- Delete any label or product
- Make live API calls without explicit permission
- Generate or store API keys
- Approve its own review output — human approval is always required

---

## Compliance Guardrails

All label content must follow the rules in:

- `vital-vision-system/compliance/approved-claims.md`
- `vital-vision-system/compliance/forbidden-claims.md`
- `vital-vision-system/compliance/fda-disclaimer.md`

Supplement labels additionally require:

- Supplement Facts panel (serving size, servings per container, ingredient amounts, % DV)
- FDA disclaimer statement: "These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease."
- Suggested Use instructions
- Caution / Warning section
- Manufacturer or distributor name and address
- Net quantity of contents

---

## Log and Audit Trail

Every completed review must be recorded in `logs/` using the format from `templates/label-review-report-template.md`.

Logs must include:

- Date
- Product name
- Review type (migrated, new, batch)
- Decision (Save / Revise / Escalate)
- Issues found
- Human who approved
- Timestamp of save action (if applicable)

---

## Escalation Path

If a label raises a compliance concern that cannot be resolved by reviewing the existing rules:

1. Mark decision as ESCALATE in the review report.
2. Document the specific concern clearly.
3. Do not save the label.
4. Consult FTC supplement advertising guidelines or Supliful's label requirements documentation.
5. If needed, consult a regulatory or legal contact.
6. Return to the review workflow after the concern is resolved.
