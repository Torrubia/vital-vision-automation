# Vital Vision Shop — Meta Pre-Publishing Checklist
# config/publishing/vv-meta-publisher-checklist.md
#
# Operational config-level gate for all Vital Vision content
# before it goes live on Meta platforms (Instagram or Facebook).
#
# This file defines the gate. The AI-executable skill is at:
#   skills/vv-meta-publisher-checklist.md  →  invoke as /vv-meta-publisher-checklist
#
# HOW TO USE THIS FILE:
#   1. One checklist instance per content piece.
#   2. Copy this template into the publishing log for that piece.
#   3. Complete every section before advancing status.
#   4. No item may advance to "Ready to Schedule" unless all required checks pass.
#
# AUTO_PUBLISH=false
# REQUIRE_HUMAN_APPROVAL=true
# SAFE_DRAFT_MODE=true

Created: 2026-09-01
Applies to: Instagram Feed · Instagram Reel · Instagram Story · Facebook Page
Pipeline position: After "Creative Ready" — before "Ready to Schedule"
Governed by: config/publishing/safe-publishing-rules.md

---

## STATUS GATE ARCHITECTURE

All content must move through these states in order.
No state may be skipped. No state may be self-certified by an automation.

```
Pack Ready
    ↓  (visual production complete — Canva or approved tool)
Creative Ready
    ↓  (this checklist complete — all sections pass)
Ready to Schedule
    ↓  (human schedules manually in Meta Business Suite, Metricool, Later, or Canva Content Planner)
Scheduled
    ↓  (post goes live)
Published
    ↓  (log created — logs/publishing/[date]-[product]-[platform]-[row]-log.md)
```

**GATE RULE:** This checklist is the gate between "Creative Ready" and "Ready to Schedule."
A content piece MUST NOT be scheduled if this checklist is not completed and signed off.

---

## CHECKLIST INSTANCE — FILL OUT ONE PER CONTENT PIECE

Copy the block below for each piece you are preparing for publishing.

```
Content piece:
Pack file:
Canva brief:
Platform:
Placement:
Date prepared:
Prepared by:
```

---

## SECTION 1 — HUMAN APPROVAL

This section must be completed first. Do not proceed if any item fails.

- [ ] **Visual reviewed by Lucy** — Lucy has seen the final visual alongside the caption, not separately
- [ ] **Caption approved by Lucy** — final copy approved as written, including hashtags and disclaimer
- [ ] **Final approval confirmed before scheduling** — Lucy gives explicit go-ahead for this specific piece on this specific date/platform
- [ ] **No unapproved changes made after approval** — if any change was made after Lucy's sign-off, re-approval is required

**BLOCK:** If any item above is unchecked, stop. Do not proceed to the next section.

---

## SECTION 2 — BRAND + PRODUCT ACCURACY

- [ ] Correct Vital Vision product featured (Inner Bloom / Inner Calm / Inner Balance / Inner Grow)
- [ ] Product name spelled correctly and consistently throughout caption and visual
- [ ] Product URL is the correct organic URL — NOT the paid quiz URL
  - Organic quiz URL: `https://www.vitalvision.shop/#finder-quiz-16047`
  - Paid traffic only (do NOT use in organic posts): `https://www.vitalvision.shop/#finder-quiz-15203`
- [ ] Product is correctly positioned for this content piece (e.g. not cross-promoted against its own line)
- [ ] Brand voice is preserved: premium, warm, educational, calm, trustworthy — no hype, no fear, no aggression
- [ ] No unsupported product statements — all benefit language is structure/function only

---

## SECTION 3 — PLATFORM + FORMAT

- [ ] Platform is confirmed (Instagram / Facebook)
- [ ] Placement is confirmed (Feed / Reel / Story)
- [ ] Visual dimensions are correct for the placement:

| Placement | Required dimensions | Aspect ratio |
|---|---|---|
| Instagram Feed | 1080 x 1080 px or 1080 x 1350 px | 1:1 or 4:5 |
| Instagram Reel | 1080 x 1920 px | 9:16 |
| Instagram Story | 1080 x 1920 px | 9:16 |
| Facebook Post | 1200 x 630 px or 1080 x 1080 px | 1.91:1 or 1:1 |
| Facebook Reel | 1080 x 1920 px | 9:16 |
| Carousel (per slide) | 1080 x 1080 px | 1:1 |

- [ ] Caption length is appropriate for the platform:
  - Instagram: under 2,200 characters; first line works as standalone hook in truncated view
  - Facebook: caption works without hashtag reliance; external link preview image is correct if link post
- [ ] CTA is appropriate for this placement (e.g. "Link in bio" is valid for Feed/Reel; link sticker is correct for Story)
- [ ] Hashtags are relevant, not restricted, and appropriate in count for the platform
- [ ] For multi-slide carousel: slides are in correct order; all slides follow correct dimensions

---

## SECTION 4 — COMPLIANCE

The compliance gate was passed earlier in the pipeline (Organic Content Queue Asset Status = Approved).
This section confirms compliance holds for the final published version, including the visual.

- [ ] AI compliance gate was passed (Organic Content Queue: Asset Status = Approved)
- [ ] No disease claims in caption or visual text (cure / treat / prevent / diagnose / heals / reverses)
- [ ] No guaranteed outcome language ("guaranteed," "you will feel," "proven to," "eliminates," "fixes")
- [ ] No before/after health transformation framing in caption or visual
- [ ] No named medical conditions used as treatment targets
- [ ] Structure/function language only — uses "may support," "helps support," "designed to complement," "supports daily wellness"
- [ ] "Results may vary" present wherever a benefit is stated — in caption AND on visual if benefit appears there
- [ ] FDA disclaimer present in caption for feed posts and Facebook posts that include benefit claims:
  `"These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease."`
- [ ] No restricted health claims visible in image overlays or on-screen text

**DO NOT WEAKEN OR BYPASS EXISTING COMPLIANCE RULES.**
If a compliance conflict is found, the piece goes back to draft. Do not publish with unresolved flags.

---

## SECTION 5 — ORGANIC CONVERSION

This is a $100K/month organic-first growth engine. Vanity posting is not the goal.
Every piece must be designed for a measurable user action.

- [ ] Hook is clear — first line of caption (and first frame if Reel) creates an immediate reason to stop scrolling
- [ ] CTA is intentional — there is exactly one clear call to action, and it is appropriate to the funnel stage:
  - TOFU (Awareness): "Comment BLOOM" / "Save this" / "Tag someone who needs this"
  - MOFU (Consideration): "Link in bio" / "Explore Inner [Product]" / "Comment [KEYWORD] for more"
  - BOFU (Purchase): "Shop now — link in bio" / "Use code [X] at checkout"
- [ ] Destination URL matches the CTA — if caption says "link in bio," bio link goes to the correct destination
- [ ] Content has a defined funnel stage (TOFU / MOFU / BOFU) — not "general awareness" without a stage
- [ ] Product/content relationship makes sense — the product mentioned is logically connected to the content hook and angle
- [ ] Content is designed for at least one measurable user action:
  - Save / Share / Comment / Link click / DM trigger / Profile visit

---

## SECTION 6 — ANALYTICS READINESS METADATA

**PURPOSE:** Do not build the analytics system now. This section captures the metadata required to associate post performance with its source when the analytics layer is built. Fill this out for every piece before scheduling — once the piece is live, this data cannot be reconstructed accurately.

```
Batch ID:                  [e.g. batch-2026-08-30-rows6-10 or leave blank if not part of a batch]
Source Row (Sheet):        [e.g. row 6]
Source Competitor/Pattern: [e.g. Seed — knowledge-leader educational carousel]
Product:                   [Inner Bloom / Inner Calm / Inner Balance / Inner Grow]
Content Type:              [Educational Carousel / Reel / Feed Post / Story / Q&A Card]
Hook:                      [first line of caption or first frame text]
Angle:                     [e.g. Microbiome literacy — curiosity-driven, no treatment claims]
Platform:                  [Instagram / Facebook]
Placement:                 [Feed / Reel / Story]
Funnel Stage:              [TOFU / MOFU / BOFU]
CTA:                       [exact CTA text used]
Metric to Watch:           [e.g. Carousel completion rate, Saves, Comment quality]
```

This metadata block must be saved with the publishing log at:
`logs/publishing/[date]-[product]-[platform]-[row]-log.md`

---

## SECTION 7 — STATUS GATES CONFIRMATION

Before recording the verdict:

- [ ] Content piece is currently at status: **Creative Ready** in Google Sheet
- [ ] Pack file exists and is intact at: `content/publishing-queue/`
- [ ] Canva brief exists at: `automations/drafts/`
- [ ] No changes were made to the 5 existing Pack Ready rows without explicit approval
- [ ] `AUTO_PUBLISH=false` — this checklist does not publish anything; a human publishes manually after this gate passes

---

## VERDICT

Complete all sections above before recording a verdict.

**READY TO SCHEDULE** — All boxes in all sections checked. Human may advance status to "Ready to Schedule" and schedule manually in Meta Business Suite (or Metricool / Later / Canva Content Planner).

**HOLD — DO NOT PUBLISH** — One or more boxes failed or were left unchecked. Record which section and which item blocked. Fix before resubmitting.

```
Verdict:
Blocked by (if HOLD):
Checklist completed by:
Date:
```

---

## AFTER PUBLISHING

When the post goes live:

1. Create a publishing log at: `logs/publishing/[date]-[product]-[platform]-[row]-log.md`
   Include: content piece, scheduled date/time, published by (Lucy), platform, post URL, analytics metadata from Section 6, notes.

2. Update Google Sheet: Post Status → **Published** for the relevant row.

3. Do NOT delete the pack file or Canva brief. Keep them for the analytics feedback loop.

---

## SAFETY INVARIANTS — NEVER VIOLATE

- `AUTO_PUBLISH=false` — always
- `REQUIRE_HUMAN_APPROVAL=true` — always
- Direct Meta API publishing is not permitted until a separate API security review is completed
- Content may only come from `content/publishing-queue/` — not from drafts, not from `content/approved/` directly
- Paid quiz URL (`finder-quiz-15203`) must never appear in organic content
- No piece advances to "Ready to Schedule" unless this checklist is complete
- If a compliance conflict is found at any step, the piece stops and goes back to draft

---

## RELATED FILES

| File | Purpose |
|---|---|
| `skills/vv-meta-publisher-checklist.md` | AI-executable skill — invoke as `/vv-meta-publisher-checklist` for AI-assisted pre-publish review |
| `config/publishing/safe-publishing-rules.md` | Master publishing safety rules |
| `config/compliance-rules.md` | Compliance language rules |
| `config/brand-voice.md` | Brand voice reference |
| `config/meta/meta-scheduling-config.md` | Platform scheduling config and cadence |
| `config/meta/manychat-config.md` | DM automation config |
| `automations/meta/meta-business-suite-scheduling-workflow.md` | Scheduling workflow |
| `content/publishing-queue/` | All Pack Ready files |
| `automations/drafts/` | All Canva briefs |
| `logs/publishing/` | Publishing logs (create after each post) |
