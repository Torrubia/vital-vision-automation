# Vital Vision — Image API Safe Mode Configuration
*No API calls made. No images generated. No keys stored here.*

---

## Status

| Setting | Value |
|---|---|
| AUTO_PUBLISH | false |
| REQUIRE_HUMAN_APPROVAL | true |
| RUN_IMAGE_GENERATION | false (must be set explicitly to enable) |
| API Calls Made | None |
| Images Generated | None |
| Images Published | None |

---

## API Configuration

| Field | Source | Notes |
|---|---|---|
| GOOGLE_API_KEY | .env only | Never stored in markdown or scripts |
| GEMINI_IMAGE_MODEL | .env only | e.g. gemini-1.5-flash or imagen-3 |
| RUN_IMAGE_GENERATION | .env only | Default false — must be set to true to generate |

---

## Safe Mode Rules

1. **RUN_IMAGE_GENERATION must be false by default.**
   Scripts will refuse to generate unless explicitly set to true in .env.

2. **API keys are read from .env only.**
   Never hardcoded in scripts, configs, or markdown files.

3. **Full API keys are never printed or logged.**
   Scripts display only the first 6 characters for confirmation.

4. **Generated images are saved to assets/generated/ only.**
   Never auto-uploaded to Instagram, Facebook, Shopify, or any platform.

5. **Prompt records are saved to assets/prompts/ on every run.**
   Used for cost tracking, audit trail, and compliance review.

6. **Human approval is required before any generated image is used.**
   Generated image → human reviews → approval-checklist → manual publish.

7. **AUTO_PUBLISH remains false at all times.**
   Scripts enforce this and will exit with an error if AUTO_PUBLISH=true.

---

## Script Reference

| Script | Command | Does |
|---|---|---|
| image:check | `node scripts/image/check-env.js` | Verifies env vars. No API call. |
| image:generate:test | `node scripts/image/generate-image-placeholder.js` | Saves placeholder + prompt log. No API call unless RUN_IMAGE_GENERATION=true. |

---

## Output Paths

| Output | Path | Committed to Git? |
|---|---|---|
| Generated images | `assets/generated/` | No — gitignored (add to .gitignore when live) |
| Prompt records (JSON) | `assets/prompts/` | Optional — review before committing |
| Placeholder files | `assets/generated/` | No |

---

## Cost and Limit Reference

| Model | Approx. Cost Per Image | Notes |
|---|---|---|
| Gemini 1.5 Flash | ~$0.00035 (est.) | Check current Google AI pricing |
| Gemini 1.5 Pro | ~$0.0035 (est.) | Check current Google AI pricing |
| Imagen 3 (Vertex AI) | ~$0.02 (est.) | Requires Vertex AI setup |

- Daily image generation limit: 10 (set in config/api-limits.json)
- Monitor usage in Google Cloud Console
- All generation runs logged in assets/prompts/ for cost audit

---

## Compliance Notes for Generated Images

All prompts must direct the model to produce:
- Lifestyle wellness imagery only
- Soft natural light, minimal styling, brand palette
- No clinical or medical settings (no lab coats, syringes, hospitals)
- No before/after health transformation imagery
- No exaggerated product results or outcome promises
- No text in generated images (overlay text added separately in Canva)

All generated images must pass vv-compliance-guardian review before use.

---

## Activation Checklist (when ready to generate)

- [ ] GOOGLE_API_KEY added to .env
- [ ] GEMINI_IMAGE_MODEL added to .env
- [ ] `node scripts/image/check-env.js` passes all checks
- [ ] RUN_IMAGE_GENERATION=true set in .env (for test run only)
- [ ] Daily limit reviewed in config/api-limits.json
- [ ] Prompt reviewed for compliance before running
- [ ] Generated image reviewed and approved by human before use
- [ ] RUN_IMAGE_GENERATION reset to false after test run

---
*No API calls made. No images generated. No keys stored in this file.*
*All image generation requires explicit human enablement and post-generation approval.*
