# Vital Vision Safe Publishing Rules

## Default Mode

AUTO_PUBLISH=false
REQUIRE_HUMAN_APPROVAL=true
SAFE_DRAFT_MODE=true

## Allowed

The system may:
- generate content drafts
- generate compliance reports
- prepare copy/paste publishing packs
- prepare scheduling files
- move approved content into content/publishing-queue/
- create publishing logs

## Not Allowed Without Explicit Approval

The system must not:
- post directly to Instagram
- post directly to Facebook
- post directly to TikTok
- publish to Pinterest
- update Shopify
- send emails
- call Meta API
- call Shopify API
- call Omnisend API
- call ManyChat API
- use API keys
- read .env
- publish ads

## Approval Gate

Only content in content/approved/ may move to content/publishing-queue/.

Before moving content to publishing queue, verify:
- brand voice approved
- compliance report approved
- no forbidden claims
- disclaimer added when needed
- final caption is copy/paste ready
- human approval is documented

## Publishing Channels

Phase 4 approved publishing tools:
1. Manual publishing
2. Meta Business Suite
3. Metricool
4. Later
5. Canva Content Planner

Direct API publishing is not allowed until a separate API security review is completed.

## Logs

Every publishing action must create a log in:

logs/publishing/

Log must include:
- date
- product
- platform
- file used
- approval status
- who approved
- publish status
- notes
