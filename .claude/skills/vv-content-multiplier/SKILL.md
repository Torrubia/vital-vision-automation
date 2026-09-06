---
name: vv-content-multiplier
description: Turn one core idea into a full weekly content batch — 7 formats covering email, social posts, Reel script, lead magnet concept, and podcast/YouTube titles. Use when Lucy wants to multiply a single insight or angle across platforms without reinventing the creative strategy each time.
argument-hint: "[product] [core idea or angle]"
---

# Vital Vision Shop — Content Multiplier

One core idea → 7 fully developed formats, all expressing the same throughline.

---

## Product-Aware Operation

When a product is specified, load verified product information from existing sources before generating:

- `skills/vv-creative-brand-system.md` — verified product facts, certifications, compliant CTAs, avoid language, Shopify CDN image URLs
- `config/product-library.md` — per-product audience language, core pain, safe positioning, organic angle

**Current Vital Vision products:**
- **Inner Bloom** — Advanced Probiotic Formula (gut wellness / daily gut balance)
- **Inner Calm** — Magnesium Glycinate | Daily Balance Support (evening ritual / mineral balance)
- **Inner Balance** — Daily Multivitamin | Everyday Wellness Support (foundational daily wellness)
- **Inner Grow** — Hair, Skin & Nails Support | Beauty Wellness Supplement (beauty from within)

Do NOT hardcode product facts inside this skill — load them from the sources above at runtime.
Do NOT inherit product facts from competitor content, purchased templates, or general model knowledge.
If the product cannot be confidently resolved from context, ask before generating.

---

## Input Resolution

**Required (resolve from explicit input or existing intelligence):**
- Product or Topic
- Core Idea / Insight (the single truth this week's content is built around)

**Additional context (use when available):**
- Awareness Level (see below)
- Funnel Stage (TOFU / MOFU / BOFU)
- Platform emphasis (Meta, Instagram, Facebook, Email)
- Campaign Throughline (if Lucy provides one; otherwise derive it)

**Resolution rules:**
- Use explicit user-provided values when supplied.
- Otherwise resolve from `config/product-library.md` audience language and existing project intelligence.
- Explicit instructions always override inferred inputs, provided they do not conflict with verified product truth or compliance.
- Do not invent audience, pain point, or product context.

---

## Direct Response Foundation

Operate as a senior direct response copywriter informed by the tradition of:
**Eugene Schwartz · Gary Halbert · Gary Bencivenga · Joe Sugarman**

Every format must earn the reader's attention and reward continued reading.
Direct response strength must NEVER override product truth or compliance.

---

## The Throughline

Define the throughline FIRST — before writing any format.

The throughline is a single sentence that names:
- The specific emotional truth or insight
- The product's role in supporting it
- The audience transformation (not a cure — a ritual, shift, or consistency)

All 7 formats express this same throughline from different angles.
The throughline is the connective thread — not the exact copy, not the hook, not the CTA.

**Example format:**
> "When you build a quiet evening ritual around a simple supplement, rest stops feeling like something you have to earn."

State the throughline at the top of your output before any format generation begins.

---

## Awareness + Funnel Intelligence

Before generating, determine the most appropriate audience awareness level from context:

- **Unaware** — does not know a problem exists → lead with observation, identity, or curiosity
- **Problem Aware** — knows the problem, not the solution → lead with problem or frustration
- **Solution Aware** — knows solutions exist, not this product → connect problem to solution category
- **Product Aware** — knows the product, not yet convinced → product differentiation and relevance
- **Most Aware** — ready to act, needs a reason now → offer-oriented copy may be appropriate

**Funnel stage:**
- **TOFU** — awareness and curiosity; no product push; educational and identity-resonant
- **MOFU** — education and consideration; gentle product introduction; trust-building
- **BOFU** — conversion and action; product-forward; CTA-led

Adapt each of the 7 formats to the resolved awareness level and funnel stage.
A strong TOFU email is not the same as a BOFU email — optimize per format, per stage.

**Weekly progression logic (when generating a full week):**
Format the week to move the audience naturally: curiosity/awareness → education → gentle product relevance → CTA.
Do not push conversion in every format simultaneously.

---

## Customer Language

Use existing Vital Vision customer language intelligence to ground all formats in real audience phrasing.

Sources:
- `config/product-library.md` → `## Audience Language` section for the relevant product
- `.claude/skills/vv-customer-language/SKILL.md` — for deeper customer language research when needed

Customer language influences: pain and desire phrasing · emotional specificity · natural vocabulary · identity language · frustration patterns.

Do not invent customer research and present it as verified audience insight.

---

## Hook Multiplier Integration

The `vv-hook-multiplier` skill is the upstream hook generation capability.

When to invoke Hook Multiplier before Content Multiplier:
- When the task explicitly requests hook variations
- When Lucy has not yet identified the anchor hook for the week
- When the content objective would benefit from 20 hook candidates before committing to one throughline

When NOT to invoke:
- When Lucy provides a specific hook or core idea directly — proceed to Content Multiplier
- Do NOT run both skills in full when one is sufficient

This skill does not duplicate Hook Multiplier — it uses the resolved hook as input and multiplies it into 7 formats.

---

## Product Truth Gate

Product-specific content must be grounded in verified Vital Vision product information.

**Never invent:**
- Dosages or ingredient amounts
- Percentages, study results, or clinical outcomes
- Timeframes or performance claims ("in 30 days", "after 2 weeks")
- Certifications not confirmed in project sources
- Benefits or claims not supported by existing VV product files

If any product fact in a generated format cannot be traced to `skills/vv-creative-brand-system.md` or `config/product-library.md`:

**STOP → flag the unverifiable claim → rewrite using verified language or remove**

Purchased templates · competitor content · reverse-engineering patterns · general model knowledge —
none of these are sufficient authority for a VV-specific product claim.

---

## Compliance Gate

Never use:
- cure, treat, heal, fix, prevent disease, diagnose
- guaranteed results
- no more bloating / fix your gut / heal your stomach / cure digestion
- anxiety cure / insomnia cure / IBS treatment
- stop hair loss / detox disease claims

Use instead:
- may support
- helps support
- designed to support
- supports daily digestive wellness
- supports gut balance / digestive comfort / overall wellness
- part of a gentler daily routine
- helps you build a consistent self-care ritual

**Compliance is a gate — not a creative preference.**
A format that fails compliance cannot advance to any queue regardless of creative quality.

---

## Reverse Engineering (Optional)

`vital-vision-system/reverse-engineering/` may be used as pattern intelligence when it genuinely improves:
- Hook structure patterns
- Storytelling arc patterns
- Format rhythm and pacing

It must NOT provide Vital Vision product facts or claims.
This skill must operate fully without reverse engineering when the task does not require it.

---

## Format Intelligence

Each format has its own logic. Optimize per format:

| Format | Primary job | Length | Tone |
|---|---|---|---|
| Email | Relationship and education | Long-form, scannable | Warm, personal, educational |
| Story Post | Immediate scroll-stop + single insight | Very short (2–4 lines) | Intimate, direct |
| Contrarian Post | Challenge a belief the audience holds | Short–medium | Confident, measured |
| List Post | Deliver immediate value | 3–5 items | Clear, credible |
| Mistake Post | Name a common error + reframe | Medium | Empathetic, non-judgmental |
| Manifesto Post | Identity declaration | Short–medium | Elevated, affirming |
| Reel Script | Hook → payoff → CTA in 30–60 seconds | Timed script | Natural, energetic, real |
| Lead Magnet Concept | Name + one-sentence description + opt-in reason | One concept | Value-clear |
| Podcast/YouTube Titles | Click-worthy + SEO-aware | 3 options | Curiosity + specificity |

A strong email is not automatically a strong Reel hook.
A strong Reel script is not automatically a strong list post.
Rewrite for the medium — do not copy-paste across formats.

---

## Brand Voice

Vital Vision Shop voice is premium, warm, educational, elegant, and softly persuasive.

Avoid:
- aggressive sales language
- overly medical claims
- miracle promises
- generic messaging
- cheap promotional tones
- fear-based messaging

---

## Content Evaluation

After generating all 7 formats, evaluate the full batch across:

1. Throughline integrity — does every format express the same core truth?
2. Customer-language resonance — does it sound like the audience's own words?
3. Awareness level fit — is the sophistication right for where the audience is?
4. Funnel stage fit — is the product push calibrated correctly per format?
5. Format native-ness — does each piece read like it belongs to that format?
6. Hook strength — does the opening earn the read?
7. Brand voice — premium, warm, educational, elegant?
8. Compliance — no forbidden language?
9. Product truth — every claim traceable to verified sources?
10. CTA alignment — does the CTA fit the funnel stage and format?
11. Non-redundancy — do the 7 formats feel distinct or like copies of each other?
12. Week coherence — does the batch tell a coherent story across the week?

**Compliance and Product Truth are gates — not creative preferences.**
A format that fails either cannot advance regardless of quality on other dimensions.

---

## Output Format

```
THROUGHLINE
[One sentence — the core truth connecting all 7 formats]

AWARENESS LEVEL: [resolved level]
FUNNEL STAGE: [TOFU / MOFU / BOFU]
PRODUCT: [product name]

---

FORMAT 1 — EMAIL
Subject line: [subject]
Preview text: [preview]

[Full email body — warm greeting → educational insight → soft product relevance → CTA]

CTA: [approved organic CTA]
FDA Disclaimer: [include if benefit claims present]

---

FORMAT 2 — STORY POST (Instagram / Facebook Story)
[2–4 lines max — immediate, intimate, single insight]

CTA: [swipe-up or comment prompt]

---

FORMAT 3 — CONTRARIAN POST
[Short–medium — challenges a belief, delivers a reframe, ends with product relevance or identity]

CTA: [comment prompt or save prompt]

---

FORMAT 4 — LIST POST
Hook: [opening line]

[3–5 items — concise, credible, value-delivering]

CTA: [save or comment prompt]

---

FORMAT 5 — MISTAKE POST
Hook: [opening line — names the mistake without shaming]

[Body — empathetic explanation + reframe + gentle product relevance]

CTA: [save or comment prompt]

---

FORMAT 6 — MANIFESTO POST
[Short–medium identity declaration — who they are, what they believe, what they choose]

CTA: [identity-affirming prompt — "if this is you, save this"]

---

FORMAT 7 — REEL SCRIPT (30–60 seconds)
[Hook line — first 3 seconds, on-screen text + spoken]
[Beat 1 — observation or problem (5–8 seconds)]
[Beat 2 — insight or education (10–15 seconds)]
[Beat 3 — product relevance (5–8 seconds)]
[CTA — final 3–5 seconds]

Estimated runtime: [X seconds]
On-screen text overlays: [key lines for text]
Visual direction: [brief note — no lifestyle photography if NOT VERIFIED]

---

LEAD MAGNET CONCEPT
Name: [title]
One-sentence description: [what they get and why it's valuable]
Opt-in reason: [why they'd give their email for this]
Format suggestion: [PDF checklist / guide / mini-course / quiz]

---

PODCAST / YOUTUBE TITLES (3 options)
1.
2.
3.

---

CONTENT EVALUATION
1. Throughline integrity:
2. Customer-language resonance:
3. Awareness level fit:
4. Funnel stage fit:
5. Format native-ness:
6. Hook strength:
7. Brand voice:
8. Compliance:
9. Product truth:
10. CTA alignment:
11. Non-redundancy:
12. Week coherence:

---

PRODUCT TRUTH GATE
- Claims requiring verification:
- Unverifiable claims found:
- Action taken:

---

COMPLIANCE REVIEW
- Prohibited claims found:
- Medical language found:
- Overpromise risk:
- Final status:

---

APPROVAL STATUS
Status: DRAFT — requires Lucy review before use
Next step: Lucy reviews and approves each format individually
AUTO_PUBLISH=false | REQUIRE_HUMAN_APPROVAL=true
```

---

## Safety Rules

- AUTO_PUBLISH = false
- REQUIRE_HUMAN_APPROVAL = true
- Never make disease claims in any format
- All 7 formats go to draft only — never to publishing queue without Lucy approval
- Lucy approves each format individually — approval of one does not constitute approval of others
