# Personal Image Clone Rules — Vital Vision Shop

Created: 2026-05-22
Applies to: All lifestyle image generation featuring Lucy or Vital Vision products
Agent: agents/vv-personal-brand-clone-agent.md

AUTO_PUBLISH=false
REQUIRE_HUMAN_APPROVAL=true

---

## Purpose

These rules govern how the Vital Vision Personal Brand Clone system generates, reviews, approves, and uses lifestyle images of Lucy and Vital Vision products in organic content.

---

## Reference Image Rule

All image generation must be anchored to Lucy-approved reference images.

Reference images are stored in:

assets/personal-reference/

No image generation prompt may describe Lucy's appearance without a reference image being nominated by Lucy first.

Reference images must be added manually by Lucy. This system does not add, fetch, or modify reference images automatically.

Each reference image must be named clearly:

```
YYYY-MM-DD-reference-[number]-[brief description].jpg
```

Examples:
```
2026-05-22-reference-01-morning-kitchen.jpg
2026-05-22-reference-02-coffee-shop.jpg
```

---

## Identity Protection Rules — Never Violate

- Never alter Lucy's body shape, weight, height, or proportions.
- Never alter Lucy's age — images must reflect her current appearance.
- Never alter Lucy's ethnicity, skin tone, or facial features.
- Never alter Lucy's hair colour, texture, or style without her explicit instruction.
- Never add or remove tattoos, piercings, or identifying features.
- Never create a thinner, taller, younger, or otherwise physically altered version of Lucy.
- Never sexualise or objectify Lucy in any image.
- Never use Lucy's likeness in a way she has not approved.

---

## Prohibited Image Types

Never create or prompt for:

- Before-and-after imagery (weight, skin, hair, body)
- Medical or clinical imagery (hospital settings, lab coats, medical equipment)
- Disease treatment or symptom imagery
- Body-shaming or body-comparison imagery
- Exaggerated transformation imagery
- Celebrity or public figure references
- Stock photo compositions (too perfect, too staged, white background product shots)
- Heavily retouched or AI-smoothed skin
- Unrealistic or fantastical wellness imagery
- Imagery implying guaranteed results
- Imagery that could be mistaken for a medical advertisement

---

## Required Image Style

Every generated image must match this style:

**Photography style:**
Realistic iPhone or lifestyle photography. Not professional studio. Not editorial. Not stock photo. Feels like a real person took this in a real moment.

**Light:**
Warm natural light. Morning light, golden hour, or soft indoor window light. Avoid harsh flash, studio lighting, or cold white light.

**Skin:**
Real skin texture. Soft, natural, and warm. No porcelain smoothing. No airbrushing. No heavy digital retouching. Lucy looks like herself — healthy and real.

**Expression:**
Natural and candid. Slight smile, thoughtful, or looking off-camera. Not posed. Not performing. Not a commercial smile. Feels like a real moment.

**Composition:**
- Close-up: face and product, warm and intimate
- Medium shot: waist up, in scene, candid feel
- Over-the-shoulder: looking at something, natural
- Flat lay or scene: product in setting, no person needed
- Do not centre the subject like a commercial ad

**Background:**
Clean, warm, and uncluttered. Soft focus. Depth of field. Feels like a real space, not a set.

**Colour palette:**
Warm whites, creams, sage greens, blush tones, natural wood, linen, marble. Avoid cold greys, neon, or high-contrast colour schemes.

**Overall feeling:**
Premium but approachable. Wellness-forward. Real. The kind of image that performs well organically on Instagram because it looks like someone's real life, not an ad.

---

## Product Placement Rules

When Inner Bloom, Inner Calm, Inner Grow, or Inner Balance appears in an image:

**Allowed:**
- Product held naturally in one hand, relaxed grip
- Product on a counter or surface alongside everyday objects (mug, book, plant, journal, water glass)
- Product partially visible at the edge of a scene
- Product label readable but not the hero of the image
- Multiple products styled together on a surface

**Not allowed:**
- Product held up to camera like an advertisement
- Product centred and foregrounded like a product shot
- Product beside medical props (pill bottles, measuring tape, scale, stethoscope)
- Product beside before-and-after indicators
- Product with exaggerated "glow" or special effects
- Product with text overlays in the generated image (add text in Canva separately)

---

## Approved Settings

| Setting | Lighting | Mood | Notes |
|---|---|---|---|
| Kitchen — morning | Warm window light | Calm, routine, nourishing | Best for Inner Bloom, Inner Balance |
| Coffee shop | Soft window light | Focused, lifestyle, real | Best for lifestyle content, any product |
| Bathroom counter | Warm vanity or window | Self-care, personal | Best for Inner Grow, Inner Calm |
| Home desk or office | Soft daylight | Productive, elegant | Behind the scenes, educational |
| Park or outdoor | Golden hour | Fresh, natural | Lifestyle content, brand feel |
| Car | Natural window light | Candid, real, on-the-go | DM prompts, relatable content |
| Living room — morning | Soft ambient | Cozy, calm, ritual | Morning or evening routine content |
| Dining table — morning | Warm light | Routine, simple, real | Product alongside breakfast |

---

## Prompt Writing Rules

When writing an image generation prompt:

1. Start with the photography style anchor:
   "Realistic iPhone lifestyle photo, warm natural light, organic Instagram feel, premium but natural."

2. Describe the subject using reference-based language. Always note which reference image to use.

3. Describe the setting with specific sensory detail — light direction, surface textures, background depth.

4. Describe the expression and body language — never "posing for the camera" unless it is a deliberate portrait.

5. Describe the product placement if applicable — natural, incidental, not the hero.

6. End every prompt with a negative prompt block:
   "Do not: stock photo feel, heavy retouching, airbrushed skin, medical imagery, before-and-after implication, celebrity likeness, sexualised composition, altered body proportions, cold lighting, studio backdrop."

---

## Approval Gate

Every generated image must be reviewed by Lucy before use.

Review checklist — Lucy completes this for each image:

- [ ] Image looks natural and authentic
- [ ] Appearance is accurate — no alteration of body shape, age, ethnicity, or identity
- [ ] Skin texture is real and natural — not retouched
- [ ] No medical or before-and-after implication
- [ ] Product placement is natural (if applicable)
- [ ] Warm wellness aesthetic matches brand voice
- [ ] Appropriate for the platform and content format
- [ ] Lucy approves for use

If approved: image moves to the relevant publishing pack.
If rejected: image goes to content/rejected/ or is deleted. Note the reason in the image log.

---

## File Storage Rules

| File type | Location |
|---|---|
| Lucy-approved reference images | assets/personal-reference/ |
| Generated Lucy lifestyle images | assets/generated/personal-brand/ |
| Generated product lifestyle images | assets/generated/vital-vision-lifestyle/ |
| Image generation prompts (drafts) | assets/generated/personal-brand/ |
| Image logs | logs/images/personal-clone/ |

---

## Naming Conventions

Reference images:
```
YYYY-MM-DD-reference-[number]-[description].jpg
```

Generated image prompts:
```
YYYY-MM-DD-[theme]-[platform]-prompt-draft.md
```

Generated images:
```
YYYY-MM-DD-[theme]-[platform]-v[number]-draft.jpg
```

Approved images:
```
YYYY-MM-DD-[theme]-[platform]-approved.jpg
```

Image logs:
```
YYYY-MM-DD-[theme]-[platform]-image-log.md
```

---

## What This System Never Does

- Never generates images automatically
- Never calls any image API
- Never reads .env files
- Never publishes images
- Never schedules images
- Never moves images to content/approved/ or content/publishing-queue/ without Lucy's approval
- Never alters Lucy's identity, body, or appearance
- Never creates medical, before-and-after, or disease-treatment visuals
