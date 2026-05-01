# Skill: vv-canva-brief-builder
# Vital Vision Shop — Canva Design Brief Generator

---

## Purpose
Generate complete, actionable Canva design briefs for Vital Vision organic content.
Each brief gives a non-designer everything they need to build an on-brand visual:
dimensions, colors, typography direction, image placement, copy on image, and compliance notes.
Output is saved as a draft — never auto-published.

---

## When to Use
- When a caption or Reel script is approved and needs a matching visual
- When planning a week of content and batching design briefs together
- When a Canva template needs to be briefed for a new product or campaign
- Before handing off to a designer or VA

---

## Inputs
- Content type: Feed post / Story / Reel cover / Carousel / Facebook banner
- Product focus (Inner Calm / Inner Grow / Inner Bloom / Inner Balance / Quiz Funnel)
- Goal (Awareness / Quiz clicks / Product education / Trust / Conversion)
- Headline copy (must be pre-approved compliant copy)
- Whether product appears in image: Yes / No
- Mood: Minimal / Warm lifestyle / Bold text / Soft editorial

---

## Outputs
- Complete Canva brief with all sections filled
- Saved to: automations/drafts/YYYY-MM-DD-canva-brief-[product-slug].md
- Compliance check on all image copy
- Reminder: visual requires same human approval as caption before publishing

---

## Vital Vision Brand Specifications

### Colors
| Name | Hex | Use |
|---|---|---|
| Brand Green | #1F3D2B | Primary buttons, text accents, dark backgrounds |
| Off-White | #F9F8F6 | Clean backgrounds, card backgrounds |
| White | #FFFFFF | Text on dark, card fill |
| Soft Sage | #E8EDE6 | Secondary backgrounds, subtle accents |

### Typography Direction
- Headlines: Clean, modern sans-serif (Canva: Plus Jakarta Sans / DM Sans / Inter)
- Body: Lightweight sans-serif — airy, readable
- Avoid: Script fonts, decorative fonts, anything that feels busy or unserious

### Logo
- Always place Vital Vision wordmark or icon
- Preferred position: Bottom center or bottom right
- Minimum clear space: 20px on all sides

### Photography Style
- Soft natural light, no harsh flash
- Neutral surfaces: white, linen, sage green, warm wood
- Props: water glass, journal, small plant, linen cloth, supplement bottle
- No stock-photo-looking imagery — lifestyle and real feel preferred
- No clinical or medical imagery (lab coats, syringes, hospital settings)

---

## Output Template

```
---
DRAFT — NOT APPROVED FOR PUBLISHING
File: automations/drafts/[filename]
Date: [YYYY-MM-DD]
Product: [Product Name]
Content Type: [Feed post / Story / Reel cover / Carousel / Facebook banner]
Goal: [Goal]
---

## Canva Brief

### Format and Dimensions
[Feed post: 1080x1080px / Story/Reel cover: 1080x1920px / Carousel: 1080x1080px per slide]

### Background
[Color or image direction. Reference brand hex codes above.]

### Headline Text (on image)
[Pre-approved compliant copy. Under 8 words. No disease claims.]

### Supporting Text on Image (optional)
[One line max. Move longer copy to caption.]

### Product in Image
[Yes / No. If yes: flat lay / hand-held / lifestyle shot direction.]

### Props and Styling
[Specific props. Surface. Arrangement.]

### Mood and Lighting
[Soft natural / Warm tones / Clean minimal / Bold text-forward]

### Logo Placement
[Bottom center / Bottom right / Top left]

### CTA on Image (if any)
[Keep minimal. E.g. "Find your match →"]

### Disclaimer on Image
[Include "Results may vary." if any benefit claim appears on image.]

### Designer Notes
[Any additional direction for execution.]

### Compliance Check
- [ ] No disease claims in image text
- [ ] No cure/treat/prevent language
- [ ] No before/after imagery
- [ ] No restricted health claim in visual
- [ ] "Results may vary" present if benefit claim on image
- [ ] On-brand colors and typography

### Human Approval Status
Draft only — not approved for publishing.
```

---

## Vital Vision Context

### Quiz URLs
- Organic: https://www.vitalvision.shop/#finder-quiz-16047
- Paid traffic: https://www.vitalvision.shop/#finder-quiz-15203 (do not use in organic visuals)

### Core Products
- Inner Calm — Calm evening ritual, magnesium glycinate
- Inner Bloom — Gut wellness, probiotic
- Inner Grow — Hair, skin, nails, beauty from within
- Inner Balance — Daily multivitamin, wellness foundation

---

## Safety and Compliance Rules

- Never include disease claims in image text (these are harder to moderate than captions)
- Before/after imagery is prohibited — lifestyle imagery only
- Any benefit claim visible on image must include "Results may vary"
- Clinical or medical-looking imagery is prohibited
- All image copy must pass vv-compliance-guardian before brief is approved

---

## Example Prompt

> Use vv-canva-brief-builder. Product: Inner Grow. Type: Feed post. Goal: Awareness. Mood: Soft editorial. Headline: "Nourish what shows." Product in image: Yes.

---

## Validation Checklist

- [ ] Dimensions specified for correct platform
- [ ] Brand colors used (no off-brand colors)
- [ ] Headline is pre-approved compliant copy
- [ ] No disease claims in any image text
- [ ] "Results may vary" included if benefit claim present
- [ ] Product photography direction is lifestyle (not clinical)
- [ ] Logo placement specified
- [ ] Brief saved to automations/drafts/
- [ ] Human approval required before sending to designer or publishing
