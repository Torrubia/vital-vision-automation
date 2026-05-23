# Meta Scheduling Config — Vital Vision Shop

Created: 2026-05-22

---

## Connection

Tool: Meta Business Suite
URL: business.facebook.com
Access: Manual login only. No API keys. No stored credentials.

## Connected Accounts

Facebook Page: Vital Vision Shop
Instagram Account: Connected via Facebook Page

## Publishing Mode

AUTO_PUBLISH=false
REQUIRE_HUMAN_APPROVAL=true
API_PUBLISHING=false

Direct API publishing is not permitted until a separate API security review is completed.
See: config/publishing/safe-publishing-rules.md

---

## Approved Content Types

| Format | Platform | Scheduling Tool |
|---|---|---|
| Feed Post | Instagram | Meta Business Suite |
| Reel | Instagram | Meta Business Suite |
| Story (base frame) | Instagram | Meta Business Suite |
| Story (interactive stickers) | Instagram | Instagram app only |
| Page Post | Facebook | Meta Business Suite |
| Reel (cross-post) | Facebook | Meta Business Suite |

---

## Scheduling Cadence

| Content Type | Best Days | Best Times (local) |
|---|---|---|
| Instagram Reel | Tuesday, Thursday | 7–9 AM or 6–8 PM |
| Instagram Feed Post | Wednesday, Friday | 8–10 AM or 12–1 PM |
| Instagram Stories | Any day | 8–10 AM or 7–9 PM |
| Facebook Page Post | Wednesday, Thursday | 9–11 AM or 1–3 PM |
| Facebook Reel | Same day as Instagram Reel | Cross-post simultaneously |

---

## Workflow File

automations/meta/meta-business-suite-scheduling-workflow.md

## Log Directory

logs/meta/
logs/publishing/

---

## Image Specs

| Format | Ratio | Notes |
|---|---|---|
| Instagram Feed | 1:1 or 4:5 | Square or portrait |
| Instagram Reel | 9:16 | Portrait, 30–45 sec |
| Instagram Story | 9:16 | Portrait |
| Facebook Post | 1.91:1 or 1:1 | Landscape or square |
| Facebook Reel | 9:16 | Same file as Instagram Reel |

---

## Content Source Rule

Only files from content/publishing-queue/ may be scheduled.
Only files approved by Lucy may be in content/publishing-queue/.
Source file must originate from content/approved/.
