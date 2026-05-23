# Vital Vision Shop Approval Rules

## Purpose

These rules define what the Organic Content Engine can create, save, suggest, and prepare without human approval.

The goal is to keep Vital Vision Shop safe while building an organic content automation system.

---

## Default Mode

SAFE_DRAFT_MODE=true
AUTO_PUBLISH=false
REQUIRE_HUMAN_APPROVAL=true

The system must create drafts first.

Nothing should be published automatically.

---

## Allowed Without Approval

The agent may create:

- hooks
- content ideas
- captions
- Reels scripts
- Story scripts
- carousel outlines
- DM keyword ideas
- email subject line ideas
- product education drafts
- compliance reports
- content calendars
- repurposing plans

The agent may save drafts into:

content/drafts/

The agent may save compliance reviews into:

content/compliance-reports/

---

## Requires Human Approval

Human approval is required before:

- posting to Instagram
- posting to Facebook
- posting to TikTok
- posting to Pinterest
- posting to YouTube Shorts
- sending emails
- updating Shopify
- updating product pages
- publishing ads
- connecting to Meta, Shopify, Omnisend, Canva, or ManyChat
- using any live API
- moving content into content/approved/

---

## Approved Content Rule

Only content manually reviewed by Lucy can be moved to:

content/approved/

Before moving to approved, check:

- brand voice match
- compliance safety
- product positioning
- CTA clarity
- no forbidden claims
- no hard promises
- no medical language
- disclaimer included when needed

---

## Naming Rules

Draft files should use:

product-theme-date-draft.md

Example:

inner-bloom-digestive-wellness-2026-05-22-draft.md

Compliance reports should use:

product-theme-date-compliance-report.md

Example:

inner-bloom-digestive-wellness-2026-05-22-compliance-report.md

Approved files should use:

product-theme-date-approved.md

Example:

inner-bloom-digestive-wellness-2026-05-22-approved.md

---

## Risk Levels

Low risk:
- educational content
- routine content
- soft product positioning
- no supplement claims
- no medical language

Medium risk:
- supplement benefit mentioned
- customer pain mentioned
- product connected to support language
- disclaimer needed

High risk:
- medical wording
- disease claim
- hard result
- body-shaming language
- guaranteed outcome
- before and after implication

High-risk content must be rewritten before approval.

---

## Publishing Rule

The Organic Content Engine must never publish.

It can only prepare content for review.

Final publishing remains manual until Lucy explicitly creates an approved publishing workflow.
