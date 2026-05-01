# Skill: vv-meta-publisher-checklist
# Vital Vision Shop — Meta Pre-Publishing Checklist
# For: Instagram Feed · Instagram Stories · Facebook Page · Reels

---

## Purpose
Run a structured pre-publishing review on any Vital Vision content before it goes live
on Meta platforms (Instagram or Facebook). This skill does not publish anything.
It produces a completed checklist that a human uses to make the final publish decision.
AUTO_PUBLISH=false at all times.

---

## When to Use
- After a draft has passed vv-compliance-guardian
- Immediately before a human manually publishes to Instagram or Facebook
- When reviewing a batch of scheduled posts before a content week goes live
- As the final checkpoint in the workflow:
  draft → compliance review → canva visual → this checklist → human publishes manually

---

## Inputs
- Draft file path or pasted content
- Platform: Instagram feed / Instagram story / Facebook post / Reel
- Visual file name or Canva link (if applicable)
- Quiz or product destination URL

---

## Outputs
- Completed checklist (all boxes checked or flagged)
- READY TO PUBLISH or HOLD — DO NOT PUBLISH verdict
- Notes on any items that need fixing before publish
- Saved to: automations/approved/[date]-pre-publish-checklist-[slug].md (only if READY)
- If HOLD: saved to automations/rejected/[date]-checklist-hold-[slug].md

---

## Vital Vision Context

### Quiz URLs
- Organic (use for all non-paid content): https://www.vitalvision.shop/#finder-quiz-16047
- Paid traffic only: https://www.vitalvision.shop/#finder-quiz-15203

### Core Products
- Inner Calm · Inner Bloom · Inner Grow · Inner Balance

### Brand Voice
Premium, calm, modern, trustworthy. No hype. No medical promises.

---

## Safety and Compliance Rules

- Never publish content with unresolved compliance flags
- Never use the paid quiz URL (finder-quiz-15203) in organic posts
- Never publish if the visual has not been reviewed alongside the caption
- Never publish automatically — this checklist outputs a verdict, a human acts on it
- Content moved to automations/approved/ only when all boxes pass

---

## Full Pre-Publishing Checklist

### 1. Content Compliance
- [ ] No disease claims (cure, treat, prevent, diagnose, heals)
- [ ] No guaranteed outcome language ("guaranteed," "you will feel," "proven")
- [ ] No before/after health transformation framing
- [ ] No named medical conditions used as treatment targets
- [ ] Uses only structure/function benefit language
- [ ] "Results may vary" present wherever a benefit is stated
- [ ] FDA disclaimer present (required for feed posts and Facebook with benefit claims)

### 2. Brand
- [ ] Tone matches brand voice: premium, calm, modern, trustworthy
- [ ] Product name is spelled correctly
- [ ] No off-brand language (hype, aggression, fear-based copy)
- [ ] CTA is clear and soft (not pushy or misleading)

### 3. Links and Destination
- [ ] Quiz link is correct for organic content: finder-quiz-16047
- [ ] Paid quiz URL (finder-quiz-15203) is NOT used in this post
- [ ] All links tested and working
- [ ] Link in bio is up to date (if caption references "link in bio")

### 4. Visual Review
- [ ] Visual dimensions are correct for platform
- [ ] Brand colors used (#1F3D2B / #F9F8F6 / #FFFFFF)
- [ ] No disease claims or restricted health language in image text
- [ ] No before/after imagery
- [ ] "Results may vary" on image if benefit claim is present
- [ ] Logo is visible and correctly placed
- [ ] Image quality is high resolution (no pixelation)

### 5. Platform-Specific
#### Instagram Feed
- [ ] Caption length is appropriate (under 2,200 characters)
- [ ] Hashtags are relevant and not restricted
- [ ] First line works as standalone hook (truncated view)

#### Instagram Stories
- [ ] Text is readable on mobile (minimum 24pt equivalent)
- [ ] Link sticker destination confirmed correct
- [ ] Story sequence order is correct (if multi-frame)

#### Facebook Post
- [ ] Caption works without hashtag reliance
- [ ] External link preview image is correct (if link post)
- [ ] Post targets correct Facebook page (not personal profile)

#### Reels
- [ ] Reel cover image is on-brand
- [ ] Audio/music is rights-cleared or original
- [ ] Captions/subtitles match spoken word
- [ ] No restricted health claims in text overlays

### 6. Final Gate
- [ ] Draft passed vv-compliance-guardian
- [ ] Visual approved by human
- [ ] Caption approved by human
- [ ] This checklist completed in full
- [ ] No boxes left unchecked or flagged

---

## Verdict

**READY TO PUBLISH** — All boxes checked. Human may publish manually.
**HOLD — DO NOT PUBLISH** — One or more boxes failed. Fix before proceeding.

---

## Example Prompt

> Use vv-meta-publisher-checklist. Platform: Instagram feed. File: automations/drafts/2026-04-30-instagram-caption-inner-calm.md. Visual: inner-calm-feed-post-v1.png.

---

## Validation Checklist (for this skill itself)

- [ ] Checklist completed in full — no skipped sections
- [ ] Verdict is clearly stated: READY or HOLD
- [ ] If READY: saved to automations/approved/
- [ ] If HOLD: saved to automations/rejected/ with notes
- [ ] No automatic publishing triggered
- [ ] Human is the final actor — this skill only outputs a verdict
