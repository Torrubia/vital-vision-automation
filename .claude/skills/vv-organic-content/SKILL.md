---
name: vv-organic-content
description: Generate safe, compliant organic content drafts for Vital Vision Shop. Use when creating Instagram captions, Facebook posts, Reel scripts, carousel copy, or Canva briefs for any product. Saves drafts to content/drafts/ only — never publishes automatically.
argument-hint: "[product] [content type: caption|reel|carousel|canva-brief|facebook] [goal: awareness|education|conversion]"
---

# Vital Vision Shop — Organic Content Draft Generator

Generate safe, compliant organic content drafts for Vital Vision Shop.

Save all outputs to `content/drafts/` only. Never publish. Never connect APIs. All content requires human approval before use.

---

## On Activation

When invoked:

1. Read `config/brand-voice.md` and `config/compliance-rules.md`
2. Read `config/product-library.md` for product context
3. Read the product seed if available: `content/drafts/[product]-organic-seed.md`
4. If inputs not provided, ask:
   - Product focus (Inner Bloom / Inner Calm / Inner Grow / Inner Balance / Brand Awareness)
   - Content type (Instagram caption / Facebook post / Reel script / Carousel copy / Canva brief)
   - Goal (Awareness / Quiz clicks / Product education / Trust building / Conversion)
   - Tone shift if needed (default: premium, calm, trustworthy)
5. Generate draft using the correct output template below
6. Run compliance check before saving
7. Save to `content/drafts/YYYY-MM-DD-[content-type]-[product-slug].md`
8. Confirm file path and remind: human approval required

---

## Compliant Language Reference

### Allowed
- may support / supports overall wellness / helps maintain / designed to support
- daily wellness routine / daily support / wellness ritual / from within
- nourishes / supports balance / supports a sense of calm
- may support a healthy sleep cycle / supports digestive wellness
- supports healthy-looking hair, skin, and nails / supports your inner routine

### Prohibited
- cure / treat / prevent / diagnose / heals (medical) / reverses hair loss / fixes anxiety
- guaranteed results / proven to work (without citation) / FDA approved / clinically proven (without citation)
- you will feel better / stops hair loss / eliminates stress / FDA approved

---

## Product Reference

| Product | Safe Benefit Language |
|---|---|
| Inner Bloom | "may support digestive comfort" · "supports microbiome balance" · "supports gut wellness" |
| Inner Calm | "may support a sense of calm" · "may support a healthy sleep cycle" · "supports healthy relaxation" |
| Inner Grow | "supports healthy-looking hair, skin, and nails" · "nourishes beauty from within" |
| Inner Balance | "supports overall daily wellness" · "designed to support nutritional balance" · "supports your daily foundation" |

---

## Output Templates

### Template 1 — Instagram Caption

```
---
DRAFT — NOT APPROVED FOR PUBLISHING
Date: [YYYY-MM-DD]
Product: [Product Name]
Goal: [Awareness / Quiz clicks / Education / Trust / Conversion]
---

## Instagram Caption Draft

### Hook (first line — stop the scroll)
[One punchy line. No period. Under 10 words.]

### Body Copy
[2–4 short paragraphs. Compliant wellness language only.
Speak to daily ritual, feeling, and identity — not symptoms or disease.
Results may vary.]

### CTA
[One soft CTA — quiz link, product link, or "link in bio"]

### Hashtags
[10–15 relevant hashtags. No medical condition hashtags.]

### Compliance Check
- [ ] No disease claims
- [ ] No cure/treat/prevent language
- [ ] No guaranteed results
- [ ] Uses compliant wellness language
- [ ] Results may vary included

### Human Approval Status
Draft only — not approved for publishing.
```

---

### Template 2 — Facebook Post

```
---
DRAFT — NOT APPROVED FOR PUBLISHING
Date: [YYYY-MM-DD]
Product: [Product Name]
Goal: [Goal]
---

## Facebook Post Draft

### Headline
[Short, benefit-led. Under 12 words. No medical claims.]

### Body Copy
[3–5 paragraphs. Conversational but premium tone.
Compliant wellness language only.]

### CTA
[Clear action: shop, take quiz, learn more]

### Compliance Check
- [ ] No disease claims
- [ ] No cure/treat/prevent language
- [ ] No guaranteed results
- [ ] Uses compliant wellness language
- [ ] Results may vary included

### Human Approval Status
Draft only — not approved for publishing.
```

---

### Template 3 — Reel Script

```
---
DRAFT — NOT APPROVED FOR PUBLISHING
Date: [YYYY-MM-DD]
Product: [Product Name]
Goal: [Goal]
---

## Reel Script Draft

### Format
[Talking head / Voiceover + B-roll / Text on screen / POV]

### Duration
[Target: 15s / 30s / 60s]

### Hook (0–3 seconds)
[Scroll-stopping first line. Spoken or text on screen.]

### Body (3–25 seconds)
[Short sentences. One idea per beat. Compliant wellness language only.]

### CTA (final 3–5 seconds)
[Soft CTA. Link in bio or quiz.]

### Visual Direction
[What appears on screen. Props. Setting. Text overlays.]

### Caption for Post
[Short caption to accompany the Reel when posted.]

### Compliance Check
- [ ] No disease claims
- [ ] No cure/treat/prevent language
- [ ] No guaranteed results
- [ ] No before/after health outcome claims
- [ ] Uses compliant wellness language
- [ ] Results may vary included

### Human Approval Status
Draft only — not approved for publishing.
```

---

### Template 4 — Carousel Copy

```
---
DRAFT — NOT APPROVED FOR PUBLISHING
Date: [YYYY-MM-DD]
Product: [Product Name]
Goal: [Goal]
---

## Carousel Copy Draft

### Slide 1 — Cover (Hook)
Headline: [Bold, scroll-stopping. Under 8 words.]
Subtext: [Optional. One line.]

### Slides 2–4
Headline: [Point or benefit]
Body: [1–2 sentences. Compliant language.]

### Slide 5 — CTA Slide
Headline: [Soft action line]
CTA: [Quiz link / Shop link / Link in bio]
Disclaimer: Results may vary.

### Caption
[Short caption to accompany the carousel when posted.]

### Compliance Check
- [ ] No disease claims
- [ ] No cure/treat/prevent language
- [ ] No guaranteed results
- [ ] Uses compliant wellness language
- [ ] Results may vary on final slide

### Human Approval Status
Draft only — not approved for publishing.
```

---

### Template 5 — Canva Brief

```
---
DRAFT — NOT APPROVED FOR PUBLISHING
Date: [YYYY-MM-DD]
Product: [Product Name]
Content Type: [Post / Story / Reel Cover / Carousel]
Goal: [Goal]
---

## Canva Brief Draft

### Format and Dimensions
[Post: 1080x1080px / Story: 1080x1920px / Reel Cover: 1080x1920px]

### Background
[Color, texture, or image direction. Brand colors: #173F2D deep green · #F7F0E3 warm cream · #C9A44C gold]

### Headline Text (on image)
[Short. Under 8 words. Safe wellness language only.]

### Product Placement
[Yes / No. If yes: flat lay / hand-held / lifestyle.]

### Mood and Lighting
[Soft natural light / Warm tones / Clean and minimal / Premium lifestyle]

### Logo Placement
[Bottom center / Bottom right / Top left]

### Disclaimer on Image (if benefit claim appears)
Results may vary.

### Compliance Check
- [ ] No disease claims in image text
- [ ] No cure/treat/prevent language
- [ ] No before/after imagery
- [ ] Results may vary if benefit claim present

### Human Approval Status
Draft only — not approved for publishing.
```

---

## Required Footer Disclaimer

Append to every draft file:

```
---
*This content is for planning purposes only and has not been approved for publishing.*
*All supplement benefit claims are structure/function claims only.*
*These statements have not been evaluated by the Food and Drug Administration.*
*These products are not intended to diagnose, treat, cure, or prevent any disease.*
*Results may vary.*
```

---

## Hard Safety Rules

- AUTO_PUBLISH = false
- REQUIRE_HUMAN_APPROVAL = true
- Never publish to Instagram, Facebook, or any platform
- Never call any API
- Never expose API keys or tokens
- Never make disease claims
- Never use: cure, treat, prevent, diagnose, heals, reverses, fixes, guaranteed
- Always save to `content/drafts/` — never to `content/approved/`
- Always include compliance check in output
