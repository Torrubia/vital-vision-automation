# Vital Vision — Image Generation Scripts
# Nano Banana / Gemini Image API — Safe Mode

---

## Status

AUTO_PUBLISH=false
REQUIRE_HUMAN_APPROVAL=true
RUN_IMAGE_GENERATION=false (must be set to true explicitly to generate)

No images have been generated.
No API calls have been made.
No keys are stored in this file.

---

## Purpose

Generate product and lifestyle images for Vital Vision organic content using
the Google Gemini Image API. All outputs are saved locally only — never
auto-uploaded to Instagram, Facebook, or any platform.

---

## Directory Structure

```
scripts/image/
  README.md                        ← This file
  check-env.js                     ← Verifies required env vars exist
  generate-image-placeholder.js    ← Safe placeholder generator (no real API call unless enabled)

assets/
  generated/                       ← All generated images saved here
  prompts/                         ← All prompt records saved here (JSON logs)
```

---

## Scripts

### image:check
Verifies that GOOGLE_API_KEY and GEMINI_IMAGE_MODEL exist in .env.
Does NOT print the key value. Does NOT make an API call.

```bash
node scripts/image/check-env.js
```

### image:generate:test
Runs the placeholder generator in safe mode.
Only makes a real API call if RUN_IMAGE_GENERATION=true in .env.
Saves prompt record to assets/prompts/ regardless.
Saves image to assets/generated/ only if generation runs.

```bash
node scripts/image/generate-image-placeholder.js
```

---

## Safety Rules

- API keys must only be stored in .env — never in scripts, configs, or markdown
- Never print or log the full API key — only print first 6 characters for confirmation
- Never auto-publish or upload generated images to Meta or Shopify
- Never run image generation unless RUN_IMAGE_GENERATION=true is explicitly set
- All outputs go to assets/generated/ and assets/prompts/ only
- Human approval required before any generated image is used in a post

---

## Cost and Limit Notes

| Model | Estimated Cost | Free Tier |
|---|---|---|
| Gemini 1.5 Flash | ~$0.00035 / image (est.) | Limited free quota |
| Gemini 1.5 Pro | ~$0.0035 / image (est.) | Limited free quota |
| Imagen 3 (via Vertex) | ~$0.02 / image (est.) | No free tier |

- Set daily_image_generation_limit in config/api-limits.json (currently: 10/day)
- Monitor usage in Google Cloud Console — do not exceed daily limit
- All generation attempts are logged to assets/prompts/ for cost tracking

---

## Compliance Notes

All image prompts must:
- Produce lifestyle wellness imagery only — no clinical or medical settings
- Not imply before/after health transformation
- Not show exaggerated product results
- Follow Vital Vision brand style (soft light, minimal, sage/off-white/green palette)
- Be reviewed by a human before the image is published anywhere

---
*No API calls made. No images generated. No keys stored here.*
