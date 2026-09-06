# New Competitor Onboarding — Vital Vision Shop
# vital-vision-system/reverse-engineering/new-competitor-onboarding.md
#
# PURPOSE: Lightweight playbook for adding new competitors to the research pipeline
#          without writing new code. Follow this workflow top to bottom.
# SAFETY: All insights must be adapted — never copy exact captions, designs, or testimonials.
# GATE: Lucy must approve all competitor entries before content is generated from them.

Created: 2026-09-01

---

## When to Onboard a New Competitor

Add a new competitor when:
- A brand is discovered that uses a content format, hook pattern, or positioning angle not yet in the system
- Lucy identifies a brand worth studying for a specific product line
- An existing competitor changes their content strategy significantly
- A new product category angle is needed (e.g. a new Inner Grow competitor)

Do NOT add a competitor just to add one. Every competitor added creates content strategy debt — only onboard if there is clear adaptation value.

---

## Onboarding Checklist

### Step 1 — Qualify the competitor

Before adding anything to any file, answer:

- [ ] Does this brand's content strategy offer something not already covered by Ritual, Seed, or Love Wellness?
- [ ] Which VV product does this competitor's content map to? (Inner Bloom / Inner Calm / Inner Balance / Inner Grow)
- [ ] What is the primary content format they use that's worth studying? (Carousel / UGC Video / Story CTA / Founder Post / other)
- [ ] What is the compliance risk of their content style? (LOW / MEDIUM / HIGH)
- [ ] Is their positioning style compatible with VV brand voice? (Premium / Warm / Educational / Softly persuasive)

If any answer is unclear, do not proceed. Research first.

---

### Step 2 — Add to Google Sheets (Competitors tab)

Add the brand as a new row in the **Competitors tab** of `vital_vision_competitor_research_tracker`.

Required columns to fill:
- Priority
- Brand (name)
- Instagram URL
- Category / Angle (one-line description of their positioning)
- Why Study (one-line rationale — be specific)
- Product Match (which VV product their content strategy maps to)
- Status → set to: **To Research**

Do NOT set Status = Analyzed until Step 4 is complete.

**Column rule:** Do not add new columns to the Competitors tab. Use existing columns only.

---

### Step 3 — Research and extract intelligence

Study the competitor's publicly available content. Extract:

1. **Content formats they use** — which formats, how structured, what funnel stage
2. **Hook patterns** — structural pattern only, NOT their exact wording
3. **Creator persona style** — who they use, what role they play (curious researcher / founder / everyday wellness person)
4. **Educational angle** — what they teach and how
5. **CTA patterns** — how they close and what action they drive
6. **Compliance observation** — what language do they use/avoid? Any red flags?
7. **Adaptation opportunity** — what can VV do differently or better in the same space?

**Swipe rules apply:** See `vital-vision-system/reverse-engineering/swipe-rules.md`.
- Extract structure and pattern only
- Never copy exact hooks, scripts, captions, or designs
- Never use competitor testimonials or personal results framing
- Never copy medical or disease-claim language (even if competitor uses it — they may be non-compliant)

---

### Step 4 — Populate the reverse-engineering files

Add entries to the relevant files in `vital-vision-system/reverse-engineering/`:

| Intelligence type | File to update |
|---|---|
| Brand overview, positioning, status | `competitor-list.md` |
| Hook patterns (structural) | `hook-patterns.md` |
| Content formats observed | `content-formats.md` |
| UGC creator style and script patterns | `ugc-patterns.md` |
| Canva card / carousel / story design patterns | `canva-card-patterns.md` |
| Offer or positioning angles | `offer-angles.md` |

**Naming convention for new entries:**
- competitor-list.md: Add a new `### [Brand Name]` section following the existing format
- hook-patterns.md: Number the next hook (e.g. HOOK-010, HOOK-011, HOOK-012 for 3 asset types)
- content-formats.md: Only add a new FORMAT if this competitor uses a format NOT already documented
- ugc-patterns.md: Add UGC-004, UGC-005, etc.
- canva-card-patterns.md: Add CARD-004, CARD-005, etc.
- offer-angles.md: Add ANGLE-008, etc.

Update the Google Sheet row: Status → **Analyzed**

---

### Step 5 — Brief the content generation

Once intelligence is in the reverse-engineering files, use it to generate OCQ rows:

1. Open `scripts/generate-organic-content-queue.js`
2. The `CONTENT_PLAN` object contains hardcoded competitor strategies. To add a new competitor's content strategy to the automation, add a new entry to `CONTENT_PLAN` following the existing structure (one entry per asset type: `ugcVideo`, `carousel`, `storyCTA`)
3. Run the script in dry-run mode first: `npm run competitors:queue-dry-run`
4. Review output, then with Lucy's approval: `npm run competitors:queue-write`

**If you are NOT adding to the automation (manual content only):** You can use the reverse-engineering files directly as briefing context for manual content generation via Claude or a VA. No script change required.

---

### Step 6 — Get Lucy approval

Before any content is generated from new competitor intelligence:

- [ ] Show Lucy the populated reverse-engineering entries for this competitor
- [ ] Confirm the VV adaptation approach is correct
- [ ] Confirm compliance approach is appropriate
- [ ] Get explicit approval to proceed with content generation

**AUTO_PUBLISH=false — no content goes live without human approval at every stage.**

---

## Key Constraints

- Never rebuild the competitor research system — only extend it
- Never add new columns to the Google Sheets Competitors tab without explicit approval
- Never copy competitor exact wording, captions, or scripts — patterns and structures only
- Never use competitor medical claims in VV content — even if competitor uses them
- Always pass generated content through `config/compliance-rules.md` before use
- Always pass generated content through `config/publishing/vv-meta-publisher-checklist.md` before scheduling

---

## Related Files

| File | Purpose |
|---|---|
| `vital-vision-system/reverse-engineering/swipe-rules.md` | What can/cannot be extracted from competitors |
| `vital-vision-system/reverse-engineering/competitor-list.md` | All analyzed competitors |
| `vital-vision-system/reverse-engineering/hook-patterns.md` | Structural hook patterns |
| `vital-vision-system/reverse-engineering/content-formats.md` | Validated content formats |
| `vital-vision-system/reverse-engineering/ugc-patterns.md` | UGC creator styles and scripts |
| `vital-vision-system/reverse-engineering/canva-card-patterns.md` | Canva card and carousel patterns |
| `vital-vision-system/reverse-engineering/offer-angles.md` | Offer positioning angles |
| `scripts/generate-organic-content-queue.js` | OCQ generation script (CONTENT_PLAN object) |
| `config/compliance-rules.md` | Compliance language rules |
| `config/publishing/vv-meta-publisher-checklist.md` | Pre-publish gate |
