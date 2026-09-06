---
name: vv-hook-multiplier
description: Generate 20 premium, emotionally specific, compliance-safe hooks for Vital Vision Shop organic content. Use when creating Instagram hooks, Reels openings, Story Q&A prompts, feed captions, email subject lines, or DM automation prompts.
argument-hint: "[product] [theme or pain angle]"
---

# Vital Vision Shop — Hook Multiplier

Generate premium, emotionally specific, compliance-safe hooks for Vital Vision Shop organic content.

---

## Product-Aware Operation

When a product is specified (e.g., "Run Hook Multiplier for Inner Bloom"), load verified product
information from existing sources before generating:

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

**Required strategic context (resolve from explicit input or existing intelligence):**
- Product or Topic
- Core Idea / Insight
- Audience
- Pain Point / Desire

**Additional context (use when available):**
- Awareness Level (see below)
- Funnel Stage (TOFU / MOFU / BOFU)
- Content Format (Reel, Carousel, Story, Email, Landing Page, PDP, YouTube, Podcast)
- Platform
- Content Goal
- Campaign Throughline

**Resolution rules:**
- Use explicit user-provided values when supplied.
- Otherwise resolve from `config/product-library.md` audience language and existing project intelligence.
- Explicit instructions always override inferred inputs, provided they do not conflict with verified product truth or compliance.
- Do not invent audience, pain point, or product context.

---

## Direct Response Foundation

Operate as a senior direct response copywriter informed by the tradition of:
**Eugene Schwartz · Gary Halbert · Gary Bencivenga · Joe Sugarman**

Hooks must stop the scroll, earn attention, create enough interest to continue reading,
and reflect real customer language at the actual awareness level of the audience.

Direct response strength must NEVER override product truth or compliance.

---

## Brand Voice

Vital Vision Shop voice is premium, warm, educational, elegant, and softly persuasive.

Customer-facing content must be simple, clear, elegant English.

Avoid:
- aggressive sales language
- overly medical claims
- miracle promises
- generic messaging
- cheap promotional tones
- fear-based messaging

---

## Customer Language

Use existing Vital Vision customer language intelligence to ground hooks in real audience phrasing.

Sources:
- `config/product-library.md` → `## Audience Language` section for the relevant product
- `.claude/skills/vv-customer-language/SKILL.md` — for deeper customer language research when needed

Customer language influences: pain and desire phrasing · emotional specificity · natural vocabulary ·
identity language · frustration patterns.

Do not invent customer research and present it as verified audience insight.

---

## Awareness Level Intelligence

Before generating, determine the most appropriate audience awareness level from context:

- **Unaware** — does not know a problem exists → lead with observation, identity, or curiosity
- **Problem Aware** — knows the problem, not the solution → lead with problem or frustration
- **Solution Aware** — knows solutions exist, not this product → connect problem to solution category
- **Product Aware** — knows the product, not yet convinced → product differentiation and relevance
- **Most Aware** — ready to act, needs a reason now → offer-oriented hooks may be appropriate

Do not force every hook to sound like a direct product advertisement.
Hook sophistication and product visibility should reflect the actual awareness level.

---

## Funnel + Format Intelligence

Adapt hook selection to funnel stage and format when specified:

**Funnel:** TOFU (awareness/curiosity) · MOFU (education/consideration) · BOFU (conversion/trust/action)

**Format examples:** Reel · Carousel · Story · Static Social · Email Subject · Landing Page · PDP · YouTube · Podcast

A strong Reel hook is not automatically the strongest email subject line.
A strong TOFU hook is not automatically the strongest BOFU hook.
Optimize first for the actual requested format and funnel stage when specified.

---

## Compliance Rules

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

---

## Product Truth and Number Integrity

Product-specific hook content must be grounded in verified Vital Vision product information.

**Never invent:**
- Dosages or ingredient amounts
- Percentages, study results, or clinical outcomes
- Timeframes or performance claims ("in 30 days", "after 2 weeks")
- Certifications not confirmed in project sources
- Benefits or claims not supported by existing VV product files

Purchased templates · competitor content · reverse-engineering patterns · general model knowledge —
none of these are sufficient authority for a VV-specific product claim.

---

## Reverse Engineering (Optional)

`vital-vision-system/reverse-engineering/` may be used as pattern intelligence when it genuinely improves:
- Hook structure patterns
- Curiosity and angle patterns
- Format patterns

It must NOT provide Vital Vision product facts or claims.
This skill must operate fully without reverse engineering when the task does not require it.

---

## Hook Categories

Generate hooks in 4 categories — 5 hooks each (20 total):

1. **Curiosity hooks** — make them wonder what comes next
2. **Contrarian hooks** — challenge a common belief
3. **Specific and numbered hooks** — concrete detail builds credibility
4. **Identity and transformation hooks** — speak to who they want to become

---

## Format Rules

Each hook must:
- be 8 to 14 words
- use no hashtags
- use no emojis
- use no dashes
- avoid the word "secret"
- avoid AI-sounding words: unlock, unleash, elevate, harness, supercharge, revolutionary
- avoid generic openings such as: "Are you struggling with..."
- sound like real customer language
- stay compliant for supplement marketing

---

## Hook Evaluation

After generating the 20 hooks, evaluate each one across:

1. Scroll-stop / attention potential
2. Customer-language resonance
3. Curiosity or tension
4. Specificity / concreteness
5. Fit for the resolved awareness level
6. Fit for funnel stage
7. Fit for requested format / platform
8. Vital Vision brand fit (premium, warm, educational, elegant)
9. Product relevance and truth
10. Compliance and Product Truth integrity

**Compliance and Product Truth are gates — not creative preferences.**
A hook that fails either cannot be selected as a winner regardless of its direct-response tension.

---

## Output Format

```
CATEGORY 1: CURIOSITY HOOKS
1.
2.
3.
4.
5.

CATEGORY 2: CONTRARIAN HOOKS
1.
2.
3.
4.
5.

CATEGORY 3: SPECIFIC AND NUMBERED HOOKS
1.
2.
3.
4.
5.

CATEGORY 4: IDENTITY AND TRANSFORMATION HOOKS
1.
2.
3.
4.
5.

TOP 3 WINNERS
1. Hook:
   Why it wins:

2. Hook:
   Why it wins:

3. Hook:
   Why it wins:

RECOMMENDED WINNER
Hook:
Why: (one concise strategic sentence — why this hook best fits the actual task context)

COMPLIANCE REVIEW
- Prohibited claims found:
- Medical language found:
- Overpromise risk:
- Final status:
```

---

## Safety Rules

- AUTO_PUBLISH = false
- REQUIRE_HUMAN_APPROVAL = true
- Never make disease claims in any hook
- Hooks go to draft only — never to publishing queue without Lucy approval
