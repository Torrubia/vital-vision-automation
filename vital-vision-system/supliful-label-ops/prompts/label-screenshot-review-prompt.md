# Label Screenshot Review Prompt

## Purpose

A quick, focused prompt for reviewing a single label screenshot. Use this when you want a fast visual review of one specific panel or one specific aspect of a label. Faster than the master orchestrator prompt — best for spot-checks or follow-up reviews after making fixes.

---

## Prompt — Full Panel Review (Copy Below This Line)

---

You are reviewing a supplement label screenshot for Vital Vision Shop.

**Product:** [FILL IN]
**Panel:** [front / back / full wrap]
**Focus:** [all elements / layout only / compliance only / design only]

[ATTACH screenshot]

Review this label panel and report:

1. **Layout issues:** Any text clipped at edges, outside the safe area, or duplicated.
2. **Compliance issues:** Any forbidden language, missing FDA disclaimer, missing required elements.
3. **Brand issues:** Product name incorrect, tone off-brand, off-brand elements present.
4. **Design issues:** Any text too small to read, poor contrast, crowded or unreadable sections.

For each issue found, state:
- What the issue is
- Where it is located on the panel
- Severity: Critical / Moderate / Minor
- Recommended fix

End with: **QUICK VERDICT: LOOKS GOOD / NEEDS FIXES / DO NOT SAVE**

---

## End of Full Panel Prompt

---

## Prompt — Compliance-Only Check (Copy Below This Line)

---

Review the following label text for compliance with FTC supplement advertising guidelines and FDA labeling requirements.

**Product:** [FILL IN]

**Label text:**
[PASTE ALL VISIBLE TEXT FROM THE LABEL HERE]

Check for:
1. Any forbidden language: "cures," "treats," "prevents disease," "heals," "guarantees results," "diagnoses," disease names as claim targets
2. FDA disclaimer: present and exact wording confirmed
3. Supplement Facts: present and includes serving size, servings per container, ingredients, amounts, % DV
4. Suggested Use: present
5. Caution/Warning: present
6. Manufacturer address: present
7. Net quantity: stated

For each issue, state the exact text found and the rule it violates.

End with: **COMPLIANCE STATUS: PASS / FAIL / ESCALATE**

---

## End of Compliance-Only Prompt

---

## Prompt — Single Element Check (Copy Below This Line)

---

You are checking one specific element of a Vital Vision Shop supplement label.

**Product:** [FILL IN]
**Element to check:** [e.g., FDA disclaimer / Supplement Facts / Suggested Use / product name / Caution]

**Current text for this element:**
[PASTE THE TEXT YOU WANT REVIEWED]

Is this text:
1. Compliant with FDA supplement labeling requirements?
2. Using approved language only (no forbidden claims)?
3. Complete and correctly worded?
4. Consistent with Vital Vision Shop's brand voice?

If anything needs to be changed, provide the corrected version.

End with: **ELEMENT STATUS: APPROVED / NEEDS REVISION**

---

## End of Single Element Prompt
