# Personal Brand Clone Image Workflow
# Vital Vision Shop

Version: 1.0
Created: 2026-05-22
Agent: agents/vv-personal-brand-clone-agent.md
Config: config/personal-image-clone-rules.md

AUTO_PUBLISH=false
REQUIRE_HUMAN_APPROVAL=true
SAFE_DRAFT_MODE=true

---

## Purpose

This workflow defines how Vital Vision Shop creates, reviews, approves, and uses personal brand lifestyle images of Lucy for organic content.

No image is generated, used, or published automatically. Every step requires human action.

---

## Overview

```
Content brief
     ↓
Agent writes image prompt (draft)
     ↓
Lucy selects reference image
     ↓
Lucy generates image using approved tool
     ↓
Lucy reviews generated image
     ↓
Approved → assets/generated/personal-brand/ or vital-vision-lifestyle/
Rejected → content/rejected/ or deleted
     ↓
Image used in publishing pack (content/publishing-queue/)
     ↓
Published manually
```

---

## Step 0 — Before Starting

Confirm:

- [ ] A content brief exists (from a publishing pack in content/publishing-queue/ or a new content request)
- [ ] At least one approved reference image exists in assets/personal-reference/
- [ ] You have access to an approved image generation tool (Gemini, Canva AI, Nano Banana, or other)
- [ ] config/personal-image-clone-rules.md has been read

If no reference image exists in assets/personal-reference/ yet, stop. Add at least one reference image before proceeding.

---

## Step 1 — Prepare the Content Brief

For each image needed, define:

| Field | Example |
|---|---|
| Platform | Instagram Feed Post |
| Content theme | Morning routine with Inner Bloom |
| Setting | Kitchen, warm morning light |
| Mood | Calm, real, routine |
| Product featured | Inner Bloom (if any) |
| Reference image to use | assets/personal-reference/2026-05-22-reference-01-morning-kitchen.jpg |
| Format/crop | Square 1:1 or portrait 4:5 |
| Special notes | No product centred, natural hold |

---

## Step 2 — Agent Writes the Image Prompt

Invoke the Personal Brand Clone Agent with the content brief.

The agent will produce a complete image generation prompt following config/personal-image-clone-rules.md.

The prompt will be saved as a draft file in:

```
assets/generated/personal-brand/
```

File name example:
```
2026-05-22-morning-routine-instagram-feed-prompt-draft.md
```

Review the prompt before generating:

- [ ] Photography style anchor is present
- [ ] Subject description matches the reference image
- [ ] Setting and light are described clearly
- [ ] Expression and body language are described
- [ ] Product placement is natural (if applicable)
- [ ] Negative prompt block is included
- [ ] No forbidden language (medical, before-and-after, altered appearance)

If the prompt looks correct, proceed. If not, ask the agent to revise.

---

## Step 3 — Select Reference Image

Before generating, confirm which reference image from assets/personal-reference/ will be used.

Note the reference image file name in the prompt draft file.

Reference image must:
- Be a real photo of Lucy approved by Lucy
- Be stored in assets/personal-reference/
- Not be a stock image, a celebrity image, or an AI-generated image

---

## Step 4 — Generate the Image (Human Action)

Open your approved image generation tool. Currently approved tools:

1. **Gemini** (Google AI Studio or Gemini app)
2. **Canva AI** (within Canva)
3. **Nano Banana** (if available and set up)

Do not use any tool that requires API credentials stored in .env or in this repo.

**How to generate:**

1. Open your image generation tool.
2. Upload the reference image from assets/personal-reference/ as the style or subject reference.
3. Copy the full generation prompt from the draft file in assets/generated/personal-brand/.
4. Paste the prompt into the tool.
5. Generate.
6. Review the result before saving.

If the result does not look right on first generation:
- Adjust the prompt — add more detail, change the setting description, or adjust the negative prompt.
- Regenerate.
- Do not use an image that does not look natural and authentic.

---

## Step 5 — Save the Generated Image as Draft

Save the generated image to:

```
assets/generated/personal-brand/        (Lucy lifestyle images)
assets/generated/vital-vision-lifestyle/ (product scenes without Lucy)
```

File naming:
```
YYYY-MM-DD-[theme]-[platform]-v[number]-draft.jpg
```

Example:
```
2026-05-22-morning-routine-instagram-feed-v1-draft.jpg
```

Do not rename it as approved yet. It is a draft until Lucy reviews it.

---

## Step 6 — Lucy Reviews the Generated Image

Lucy opens the draft image and checks every item on the review checklist.

### Image Review Checklist

- [ ] Image looks natural and authentic — not stock, not fake, not AI-obvious
- [ ] Appearance is accurate — no alteration of body shape, age, ethnicity, or identity
- [ ] Skin texture is real and natural — not airbrushed or porcelain
- [ ] Expression is natural — candid, not commercial
- [ ] No medical or before-and-after implication in the scene
- [ ] Product placement is natural (if applicable) — not centred, not held up like an ad
- [ ] Warm wellness aesthetic matches brand voice
- [ ] Light is warm and natural — not cold or studio
- [ ] Background is clean and uncluttered
- [ ] Appropriate for the platform and content format
- [ ] Lucy is comfortable with this image being used publicly

**If approved:**
- Rename the file: replace `-draft` with `-approved`
  ```
  2026-05-22-morning-routine-instagram-feed-v1-approved.jpg
  ```
- Note approval in the image log (logs/images/personal-clone/)
- Image may now be used in a publishing pack

**If rejected:**
- Note the rejection reason in the image log
- Delete or move to content/rejected/
- Revise the prompt and regenerate if needed

---

## Step 7 — Log the Image

Create or update the log file in:

```
logs/images/personal-clone/
```

Log file name:
```
YYYY-MM-DD-[theme]-[platform]-image-log.md
```

Log template:

```
Date: YYYY-MM-DD
Platform: [Instagram Feed / Reel cover / Story / etc.]
Theme: [morning routine / coffee shop / product-in-hand / etc.]
Product featured: [Inner Bloom / none / etc.]
Reference image used: [file name]
Prompt file: [file name in assets/generated/personal-brand/]
Generated image file: [file name]
Tool used: [Gemini / Canva AI / Nano Banana / etc.]
Generation version: v[number]

Review checklist: Passed / Failed
Approved by: Lucy
Approval date: YYYY-MM-DD
Final file name: [approved file name]

Rejection reason (if applicable):
Notes:
```

---

## Step 8 — Use in Publishing Pack

Once the image is approved:

1. Reference the approved image file in the relevant publishing pack in content/publishing-queue/.
2. When scheduling in Meta Business Suite, Later, Metricool, or Canva Content Planner — upload the approved image from assets/generated/personal-brand/ or assets/generated/vital-vision-lifestyle/.
3. Do not use draft images in any published content.

---

## Approved Image Generation Tools

| Tool | Access | Notes |
|---|---|---|
| Gemini | Google AI Studio (browser) | Upload reference image + prompt |
| Canva AI | Canva (browser or app) | Use with Canva templates for on-brand output |
| Nano Banana | If set up — browser | Check workflow for current status |

No tool in this list requires API credentials stored in .env or in this repo. All tools are accessed manually via browser or app login.

---

## Reference Image Management

Lucy adds reference images manually to assets/personal-reference/.

Guidelines for reference images:
- Real photos of Lucy taken in natural settings
- Good lighting — warm, natural
- Clear face and natural expression
- Varied settings (home, outdoors, coffee shop, etc.)
- Not heavily filtered or edited
- Taken by Lucy or someone she trusts

Minimum recommended reference images:
- 1 close-up, warm indoor light
- 1 medium shot, outdoor or coffee shop
- 1 lifestyle scene with product

The more varied and high-quality the reference images, the better the generated output will match Lucy's real appearance.

---

## Troubleshooting

**Generated image looks too AI / too perfect:**
Add to prompt: "candid, imperfect, real skin texture, slight natural movement, organic feel, not retouched, not AI-generated looking"

**Lucy's appearance is altered:**
Add to prompt: "do not alter facial structure, do not change body proportions, do not change ethnicity or skin tone, match the reference image closely"

**Product looks like an ad:**
Add to prompt: "product is incidental, not the focus, natural placement, not held up to camera, not centred, lifestyle setting"

**Background is too clean / too staged:**
Add to prompt: "lived-in space, real home, slight imperfections, depth of field, not a set, not a studio"

**Light is too cold / too harsh:**
Add to prompt: "warm golden morning light, soft window light, warm colour temperature, no flash, no studio lighting"

---

## What This Workflow Never Does

- Does not generate images automatically
- Does not call any image API
- Does not read .env files
- Does not publish images
- Does not schedule images
- Does not move images to content/approved/ or content/publishing-queue/ without Lucy's approval
- Does not alter Lucy's identity, body, or appearance
- Does not create medical or disease-treatment visuals
