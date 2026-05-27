# Q&A Card Generation Workflow
# Vital Vision Shop

Version: 1.0
Created: 2026-05-27
Agent: agents/vv-qa-card-creative-agent.md
Style rules: config/qa-card-style-rules.md
Generator spec: scripts/image/qa-card-generator-spec.md

AUTO_PUBLISH=false
REQUIRE_HUMAN_APPROVAL=true
SAFE_DRAFT_MODE=true

---

## Purpose

This workflow defines how Vital Vision Shop creates, reviews, approves, and uses Q&A cards, carousel cards, Story cards, and feed graphics.

Two production methods are supported:

1. **Canva (manual template method)** — primary method now. Fast, visual, no code.
2. **Node/sharp (script method)** — batch production method. Requires the generator script to be built first. See scripts/image/qa-card-generator-spec.md.

No card is published automatically. Every card requires Lucy's approval before use.

---

## Workflow Overview

```
Content brief
     ↓
Agent extracts copy + writes card spec (draft)
     ↓
Human builds card — Canva (now) or Node/sharp (when ready)
     ↓
Card saved as draft in assets/generated/qa-cards/
     ↓
Lucy reviews card
     ↓
Approved → renamed to -approved, added to publishing pack
Rejected → noted in log, revised or discarded
     ↓
Card used in content/publishing-queue/
     ↓
Published manually
```

---

## Step 0 — Prerequisites

Confirm before starting:

- [ ] Source content is from content/approved/ or content/drafts/ (compliance-checked)
- [ ] config/qa-card-style-rules.md has been read
- [ ] Canva templates exist in assets/templates/qa-cards/ (or Node/sharp script is ready)
- [ ] Product and theme are identified

---

## Step 1 — Define the Card Brief

For each card set, define:

| Field | Example |
|---|---|
| Card type | Q&A Story card |
| Product | Inner Bloom |
| Theme | Stomach feels like a balloon after eating |
| Source file | content/approved/inner-bloom-phase4a-2026-05-22-approved.md |
| Number of cards | 1 (Story) or 5 (carousel) |
| Platform | Instagram Story / Feed carousel |
| Format | 1080 x 1920 / 1080 x 1080 |

---

## Step 2 — Agent Writes Card Spec

Invoke the Q&A Card Creative Agent with the brief.

The agent produces a structured spec file saved to:
```
assets/generated/qa-cards/
```

Spec file naming:
```
YYYY-MM-DD-[product]-[theme]-[card-type]-spec-draft.md
```

The spec contains:
- All copy (question, answer, CTA, disclaimer, brand signature)
- Background colour and layout zone breakdown
- Typography instructions per text element
- Canva layer notes or Node/sharp layer array
- Compliance confirmation

Review the spec before building:
- [ ] Copy is compliance-safe
- [ ] Disclaimer present where required
- [ ] Brand signature included
- [ ] Layout zones are clear
- [ ] Copy fits within character limits

---

## Step 3A — Build in Canva (Primary Method)

1. Open Canva (canva.com).
2. Open the relevant template from assets/templates/qa-cards/.
   - Q&A Story: vv-qa-story-template-v1
   - Carousel: vv-carousel-template-v1
   - Feed graphic: vv-feed-graphic-template-v1
3. Duplicate the template (never edit the master).
4. Replace placeholder text with the copy from the card spec.
5. Check typography, colour, spacing against config/qa-card-style-rules.md.
6. Check disclaimer is present if required.
7. Check brand signature is present.
8. Export as PNG:
   - Resolution: 1x (native 1080px width)
   - Format: PNG
   - File name: YYYY-MM-DD-[product]-[theme]-[card-type]-v1-draft.png
9. Save exported PNG to: assets/generated/qa-cards/

---

## Step 3B — Generate with Node/sharp (Batch Method — when script is ready)

1. Confirm scripts/image/qa-card-generator-spec.md has been implemented as a working Node script.
2. Prepare the card data input file (JSON or MD) following the spec format.
3. Run the script:
   ```
   node scripts/image/generate-qa-card.js --input [spec-file] --output assets/generated/qa-cards/
   ```
4. Review the generated PNG output.
5. If output looks incorrect, adjust the spec and re-run — do not manually edit the generated PNG.

---

## Step 4 — Save Card as Draft

All cards saved to: assets/generated/qa-cards/

File naming:
```
YYYY-MM-DD-[product]-[theme]-[card-type]-v[number]-draft.png
```

Example:
```
2026-05-27-inner-bloom-balloon-qa-story-v1-draft.png
```

Do not rename to -approved until Lucy has reviewed.

---

## Step 5 — Lucy Reviews the Card

Open the draft PNG and check every item:

### Card Review Checklist

- [ ] Colours match brand palette (config/qa-card-style-rules.md)
- [ ] Typography is correct — font, size, weight, alignment
- [ ] All text is within safe zones — no text cut off at edges
- [ ] Copy is compliance-safe — no forbidden claims
- [ ] Disclaimer present and legible (if supplement benefit mentioned)
- [ ] Brand signature present ("Self-care starts here.")
- [ ] Card feels premium, warm, and educational — not salesy
- [ ] No before-and-after or medical imagery
- [ ] CTA is clear and correct
- [ ] Lucy approves for use

**If approved:**
- Rename: replace -draft with -approved
- Note approval in log file

**If rejected:**
- Note rejection reason in log
- Revise spec and rebuild

---

## Step 6 — Add to Publishing Pack

Once approved, reference the card in the relevant publishing pack in content/publishing-queue/.

When publishing via Meta Business Suite, Later, Metricool, or Canva Content Planner:
- Upload the approved PNG from assets/generated/qa-cards/
- Pair with the approved caption from the publishing pack
- Do not use draft cards in any published content

---

## Step 7 — Log the Card

Create or update the log in: logs/images/qa-cards/

Log file naming:
```
YYYY-MM-DD-[product]-[theme]-[card-type]-log.md
```

Log fields:
```
Date: YYYY-MM-DD
Card type: [Q&A Story / carousel / feed graphic]
Product: [product name]
Theme: [content theme]
Source file: [path]
Spec file: [path]
Method: Canva / Node/sharp
Card file: [path to draft PNG]
Compliance check: Passed / Failed
Approved by: Lucy / Pending
Approval date: YYYY-MM-DD
Approved file: [path to approved PNG]
Used in publishing pack: Yes / No / Pending
Notes:
```

---

## Canva Template Setup (One-Time)

Before the first card set is built, Lucy needs to create the master Canva templates.

Templates to create:

| Template name | Size | Use |
|---|---|---|
| vv-qa-story-template-v1 | 1080 x 1920 | Q&A Stories, tip Stories, Reel covers |
| vv-carousel-template-v1 | 1080 x 1080 | Carousel slides (all slides consistent) |
| vv-feed-graphic-template-v1 | 1080 x 1080 | Feed graphics, educational posts |

Each template must:
- Use the colour palette from config/qa-card-style-rules.md
- Use the typography stack from config/qa-card-style-rules.md
- Include placeholder zones for all required text elements
- Include a disclaimer text layer (hidden by default, shown when needed)
- Include the brand signature layer
- Be saved to assets/templates/qa-cards/ as a shared Canva link or exported template reference

---

## Node/sharp Script Status

Status: Spec written — not yet implemented.
Spec file: scripts/image/qa-card-generator-spec.md

When ready, the script will:
- Accept a JSON or MD card spec as input
- Composite text layers over a background using sharp
- Export PNG to assets/generated/qa-cards/
- Support batch generation of carousel sets

Implementation is a future task. Canva is the primary method until the script is built and tested.
