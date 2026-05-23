# Meta Business Suite Scheduling Workflow
# Vital Vision Shop

Version: 1.0
Created: 2026-05-22
Applies to: Instagram and Facebook content scheduling
Tool: Meta Business Suite (business.facebook.com)

AUTO_PUBLISH=false
REQUIRE_HUMAN_APPROVAL=true
SAFE_DRAFT_MODE=true

---

## Purpose

This workflow defines how Vital Vision Shop manually schedules approved content through Meta Business Suite.

This workflow covers:
- Instagram Feed posts
- Instagram Reels
- Instagram Stories (partial — interactive stickers must be added in-app)
- Facebook Page posts
- Facebook Reels (cross-post from Instagram)

This workflow does not cover:
- Automated publishing via API
- Any connection to Meta API credentials
- Any access to .env files or API keys

All publishing remains manual. A human operator completes every step.

---

## Prerequisites

Before using this workflow, confirm:

- [ ] Meta Business Suite account is active at business.facebook.com
- [ ] Vital Vision Shop Facebook Page is connected
- [ ] Vital Vision Shop Instagram account is connected to the Facebook Page
- [ ] You are logged in as an authorised user on the Page
- [ ] Content pack is in content/publishing-queue/ and is from an approved file in content/approved/
- [ ] All required visual assets (images or videos) are downloaded and ready

---

## Step 0 — Before You Schedule Anything

Open the publishing pack from content/publishing-queue/.

Confirm all of the following before proceeding:

- [ ] File is in content/publishing-queue/ (not content/drafts/)
- [ ] Source file is from content/approved/
- [ ] Approved by field shows Lucy and an approval date
- [ ] Caption is copy/paste ready (no placeholders, no brackets, no [INSERT] fields remaining)
- [ ] Visual asset is ready and matches the visual direction in the pack
- [ ] Product URL is live and has been inserted where required
- [ ] Disclaimer is present in the caption

If any item above is not confirmed, stop. Do not schedule. Resolve the open item first.

---

## Step 1 — Open Meta Business Suite

1. Go to business.facebook.com in your browser.
   Or open the Meta Business Suite mobile app.
2. Select the Vital Vision Shop account.
3. Click on your Facebook Page or Instagram account in the left panel.

---

## Step 2 — Schedule an Instagram Feed Post

1. In Meta Business Suite, click **Create Post** in the left sidebar or top menu.
2. Under "Post to", select **Instagram**.
3. Click **Add Photo/Video** and upload your image.
   - Use a 1:1 (square) or 4:5 (portrait) image for best Instagram display.
   - Warm tones, editorial feel, no before/after imagery, no medical imagery.
4. In the caption field, paste the **Instagram Feed Caption** from the publishing pack exactly as written.
5. Do not edit the caption. Do not remove the disclaimer line.
6. Check the preview on the right to confirm formatting looks correct.
7. Click **Schedule** (not Publish Now).
8. Select your publish date and time.
   - Recommended: Wednesday or Friday, 8:00–10:00 AM or 12:00–1:00 PM local time.
9. Click **Schedule**.
10. Confirm the scheduled post appears in your Content Calendar.

**Log action:** Mark Feed Post as Scheduled in logs/publishing/ with date, time, and your name.

---

## Step 3 — Schedule an Instagram Reel

1. In Meta Business Suite, click **Create Post** → **Reel**.
2. Under "Post to", select **Instagram**.
3. Click **Add Video** and upload your recorded Reel video.
   - Video must be in portrait format (9:16).
   - Recommended length: 30–45 seconds.
   - Ensure hook text appears on-screen in the first 1–2 seconds.
4. Add a cover frame — select a warm, clear still from the video.
5. In the caption field, paste the **Reel Caption** from the publishing pack exactly as written.
   - Caption includes hashtag block. Do not remove.
   - Caption includes disclaimer. Do not remove.
6. Click **Schedule**.
7. Select your publish date and time.
   - Recommended: Tuesday or Thursday, 7:00–9:00 AM or 6:00–8:00 PM local time.
8. Click **Schedule**.
9. Confirm the Reel appears in your Content Calendar.

**Log action:** Mark Reel as Scheduled in logs/publishing/ with date, time, and your name.

---

## Step 4 — Schedule a Facebook Page Post

1. In Meta Business Suite, click **Create Post**.
2. Under "Post to", select **Facebook Page**.
3. Click **Add Photo/Video** and upload your image.
   - Use a landscape (1.91:1) or square (1:1) image for Facebook.
4. In the caption field, paste the **Facebook Caption** from the publishing pack exactly as written.
5. Add the product URL in the post body or plan to add it as the first comment after publishing.
6. Do not remove the disclaimer line.
7. Click **Schedule**.
8. Select your publish date and time.
   - Recommended: Wednesday or Thursday, 9:00–11:00 AM or 1:00–3:00 PM local time.
9. Click **Schedule**.
10. Confirm the post appears in your Content Calendar.

**Log action:** Mark Facebook Post as Scheduled in logs/publishing/ with date, time, and your name.

---

## Step 5 — Cross-Post Instagram Reel to Facebook

**Option A — During Instagram Reel scheduling in Meta Business Suite:**
1. When scheduling the Instagram Reel (Step 3), look for the **"Also share to Facebook"** toggle.
2. Enable it.
3. The Reel will post to both Instagram and your Facebook Page at the same scheduled time.

**Option B — After Instagram Reel is published:**
1. In Meta Business Suite, go to **Content** → **Posts**.
2. Find the published Instagram Reel.
3. Click the three-dot menu → **Share to Facebook Page**.
4. Add the Facebook Reel caption from the publishing pack if prompted.
5. Publish or schedule.

**Log action:** Mark Facebook Reel cross-post as Scheduled or Published in logs/publishing/.

---

## Step 6 — Stories (Partial Scheduling)

Meta Business Suite allows scheduling the base Story frame. However, interactive stickers (Poll, Link, Question) must be added natively in the Instagram app after the story goes live, or immediately before publishing from the app.

**Scheduling the base Story frame in Meta Business Suite:**
1. Click **Create Post** → **Story**.
2. Select **Instagram**.
3. Upload your Story frame image.
4. Add any non-interactive text overlays if needed.
5. Click **Schedule** and set time.
   - Recommended: 8:00–10:00 AM or 7:00–9:00 PM any day.
6. Click **Schedule**.

**Completing interactive stickers in-app (must be done manually):**

Story 1 — Poll sticker:
- Open Instagram app at scheduled publish time.
- Open the Story and add a **Poll sticker** before posting.
- Poll options: "Yes, constantly" | "Sometimes"

Story 2 — Link sticker:
- Open Instagram app.
- Add a **Link sticker** pointing to the product URL.
- Add disclaimer text at the bottom of the frame if not already in the image.

Story 3 — DM Prompt:
- No interactive sticker required.
- Publish as scheduled.

**Log action:** Mark each Story frame as Scheduled or Published in logs/publishing/.

---

## Step 7 — Review Content Calendar

After scheduling all content:

1. In Meta Business Suite, click **Planner** or **Content Calendar** in the left sidebar.
2. Confirm all posts appear on the correct dates and times.
3. Check previews for each post:
   - Caption is correct and complete
   - Disclaimer is visible
   - Image or video looks correct
   - No placeholder text remaining

If any post looks incorrect, click **Edit** and correct it before the scheduled time.

---

## Step 8 — Update the Publishing Log

After scheduling, open the relevant log file in logs/publishing/ and complete the publish confirmation section.

Log fields to fill in:
- Content piece name
- Scheduled date and time
- Published by (your name)
- Any notes

Example log entry:

```
Reel scheduled: [x] Yes  Date/time: 2026-05-27 07:00 AM  Scheduled by: Lucy
Feed post scheduled: [x] Yes  Date/time: 2026-05-28 08:30 AM  Scheduled by: Lucy
Stories scheduled: [x] Yes (base frames)  Date/time: 2026-05-26 08:00 AM  Scheduled by: Lucy
Interactive stickers: [ ] To be added in-app at publish time
```

---

## Step 9 — After Content Goes Live

Once content is published:

1. Check that the post published correctly on Instagram and Facebook.
2. If the BLOOM DM keyword is active in ManyChat, confirm the automation is responding correctly by testing with a comment.
3. Update the publishing log — change Scheduled to Published and add the live date and time.
4. Move or copy the publishing pack from content/publishing-queue/ to content/published/ after all pieces in the pack are live.

---

## Scheduling Cadence Reference

| Content Type | Best Days | Best Times (local) |
|---|---|---|
| Instagram Reel | Tuesday, Thursday | 7–9 AM or 6–8 PM |
| Instagram Feed Post | Wednesday, Friday | 8–10 AM or 12–1 PM |
| Instagram Stories | Any day | 8–10 AM or 7–9 PM |
| Facebook Page Post | Wednesday, Thursday | 9–11 AM or 1–3 PM |
| Facebook Reel | Same day as Instagram Reel | Cross-post simultaneously |

These are recommendations based on general wellness audience behaviour. Adjust based on your own account analytics over time.

---

## What This Workflow Does Not Do

- Does not call the Meta API
- Does not use API keys or tokens
- Does not read .env files
- Does not auto-publish or trigger automated posting
- Does not connect to ManyChat, Omnisend, Shopify, or any external service
- Does not move content between folders automatically

All folder management and log updates are completed manually by the human operator.

---

## Troubleshooting

**Post did not publish at scheduled time:**
- Check that Meta Business Suite was connected and the account was not logged out.
- Check for any Meta platform errors or scheduled post failures in the Content Calendar.
- Re-schedule manually if needed.

**Caption was cut off:**
- Instagram captions longer than ~125 characters show a "more" link.
- The full caption is still saved. No action needed unless the key message is hidden above the fold.
- Consider moving the disclaimer and hashtags to the end (they are already structured this way in the packs).

**Video rejected by Meta:**
- Check video format: MP4 recommended, H.264 codec, portrait 9:16 for Reels.
- Check file size: under 4GB for Reels.
- Re-export and re-upload.

**Stories interactive stickers not available:**
- Link stickers require either a verified account or 10,000+ followers.
- If not eligible, direct followers to the link in bio instead.
- Update Story 2 text to say "Link in bio to explore" rather than "Tap to explore."

---

## Log File Location

All Meta scheduling logs are saved in:

logs/publishing/

File naming: YYYY-MM-DD-product-platform-log.md

---

## Safety Reminder

AUTO_PUBLISH=false
REQUIRE_HUMAN_APPROVAL=true

Every post scheduled through Meta Business Suite is reviewed and scheduled manually by a human operator. No automated or API-based publishing is active.
