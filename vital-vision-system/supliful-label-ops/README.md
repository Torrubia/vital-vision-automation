# Supliful Label Ops

## What This Module Is

Supliful Label Ops is the label management operating system inside `vital-vision-automation`. It gives Vital Vision Shop a structured, compliance-safe, human-approved workflow for reviewing, creating, validating, and eventually automating Supliful supplement labels.

This module lives inside:

```
vital-vision-system/supliful-label-ops/
```

It follows the same safety principles as the rest of `vital-vision-system`: no autonomous publishing, no destructive actions without approval, no API writes without human sign-off.

---

## Why This Exists

Supliful allows white-label supplement brands to design, save, and connect product labels to a Shopify storefront. When Supliful migrates labels to a new format, or when you create new products, the labels need to be:

- Visually reviewed for layout integrity
- Checked for supplement-safe compliance language
- Validated against Supliful's safe area, bleed, and matrix code zones
- Confirmed to include all required FDA-required elements
- Approved by a human before saving or publishing

This module makes that process repeatable, fast, and consistent across all Vital Vision products.

---

## Products Covered

| Product | Type |
|---|---|
| Inner Balance | Complete Multivitamin |
| Inner Bloom | Advanced Probiotic Formula |
| Inner Calm | Magnesium Glycinate |
| Inner Grow | Hair, Skin & Nails Support |

---

## Folder Structure

```
supliful-label-ops/
  README.md                   ← This file
  OPERATING_MODEL.md          ← How the system works end to end

  agents/                     ← Specialist agent definitions
  workflows/                  ← Step-by-step operational playbooks
  checklists/                 ← Checkbox-format review tools for use on screen
  prompts/                    ← Copy-paste prompts for Claude, ChatGPT, or Claude Code
  templates/                  ← Reusable report and record formats
  api/                        ← Future API integration planning (no live calls yet)
  logs/                       ← Review records and approval logs
```

---

## Safest First Workflow to Run

If you have a Supliful migrated label and want to know whether to save it, start here:

**Workflow 01 — Review Migrated Label**

```
vital-vision-system/supliful-label-ops/workflows/01-review-migrated-label.md
```

Steps at a glance:

1. Open Supliful in your browser and navigate to the label editor.
2. Take a screenshot or export the label preview.
3. Open `prompts/master-label-orchestrator-prompt.md` and copy the prompt.
4. Paste it into Claude Code or Claude.ai with the screenshot attached.
5. Claude will route the review through the appropriate agents.
6. A Save / Revise / Escalate decision will be produced.
7. Complete the `checklists/save-label-approval-checklist.md` before clicking Save.

You are the final approver. Claude reviews — you decide.

---

## Safety Rules for This Module

- Never click Save on a Supliful label without completing `checklists/save-label-approval-checklist.md`.
- Never allow Claude to make live API calls to Supliful or Shopify without explicit human approval.
- Never use disease-treatment claims such as "cures," "treats," "prevents," "heals," or "diagnoses."
- Always use safe language: "supports," "helps support," "may help support," "helps maintain," "designed to support."
- All label changes must be logged in `logs/`.

---

## Integration With Existing System

This module references and extends:

- `vital-vision-system/compliance/` — Supplement claims rules
- `vital-vision-system/brand/` — Brand voice and visual rules
- `vital-vision-system/products/` — Product specifications
- `vital-vision-system/security/` — Permission and API key rules

---

## Current Status

| Area | Status |
|---|---|
| Manual label review | Ready to use |
| Supliful API integration | Planning only — no live calls |
| Shopify product sync | Planning only — read-only research |
| Batch label review | Workflow documented, manual process |
| Automated label generation | Future phase — not started |

---

## Premium Label Architecture and Design System

This module includes a full premium label design system built on top of the core review workflows.

### New Agents (Design System)

| Agent | Role |
|---|---|
| `agents/premium-label-architect.md` | Layout specification, zones, grid, print readiness |
| `agents/luxury-packaging-director.md` | Premium feel, creative direction, shelf presence |
| `agents/label-design-system-manager.md` | Master Label Standard — repeatable design rules |
| `agents/label-consistency-reviewer.md` | Cross-product family consistency analysis |
| `agents/supliful-dashboard-design-operator.md` | Step-by-step Supliful editor build guide |
| `agents/premium-label-qa-reviewer.md` | Final READY / REVISE / ESCALATE for new labels |

### New Workflows (Design System)

| Workflow | Purpose |
|---|---|
| `08-analyze-current-label-designs.md` | Evaluate all existing labels before any redesign |
| `09-create-premium-label-from-scratch.md` | Design + build a new premium label end-to-end |
| `10-build-master-label-standard.md` | Create the official Vital Vision design rulebook |
| `11-compare-product-line-labels.md` | Score family consistency across all four products |
| `12-supliful-dashboard-label-build.md` | Step-by-step Supliful dashboard build process |

### Key Prompts (Design System)

| Prompt | When to use |
|---|---|
| `prompts/current-label-analysis-prompt.md` | Analyze an existing label |
| `prompts/new-premium-label-creation-prompt.md` | Create a new premium label |
| `prompts/product-line-comparison-prompt.md` | Compare Inner Bloom vs Inner Grow vs others |
| `prompts/master-label-standard-prompt.md` | Build the Master Label Standard |
| `prompts/luxury-packaging-director-prompt.md` | Get premium feel direction |
| `prompts/supliful-dashboard-build-prompt.md` | Generate Supliful build instructions |

### Design Skill

Use the Claude Code skill for all label design tasks:

```
/vv-premium-label-architect inner-bloom analyze
/vv-premium-label-architect inner-calm create
/vv-premium-label-architect compare
/vv-premium-label-architect master-standard
```

Skill file: `.claude/skills/vv-premium-label-architect/SKILL.md`

### Design Policy

Before any redesign: read `DESIGN_PRESERVATION_AND_REDESIGN_POLICY.md`

Preserve what works. Improve what is weak. Redesign only with strategic intent.
The Save action in Supliful always requires Lucy's explicit human approval.
