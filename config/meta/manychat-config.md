# ManyChat Config — Vital Vision Shop

Created: 2026-05-22

---

## Connection

Tool: ManyChat
URL: manychat.com
Access: Manual login only. No API keys. No stored credentials. No connection to this repo.

## Connected Account

Instagram: Vital Vision Shop

## Publishing Mode

AUTO_PUBLISH=false
REQUIRE_HUMAN_APPROVAL=true
API_CONNECTION=false

---

## Active Keyword Automations

| Keyword | Product | Flow name | Status |
|---|---|---|---|
| BLOOM | Inner Bloom | inner-bloom-BLOOM-2026-05-22 | Ready to activate |

---

## Keyword Naming Convention

Flow names follow: product-keyword-date

Example: inner-bloom-BLOOM-2026-05-22

---

## DM Compliance Requirements

Every DM that mentions a product or supplement benefit must include:

Short disclaimer: Wellness support only. Not medical advice. Results may vary.

No forbidden claims in any DM. See config/compliance-rules.md.

---

## Log Directory

logs/meta/

Log file naming: YYYY-MM-DD-product-keyword-manychat-log.md

---

## Workflow File

automations/meta/manychat-dm-automation-workflow.md

---

## Content Source Rule

DM scripts must come from content in content/publishing-queue/ or content/approved/ only.
No DM script may be created or activated without Lucy's approval.
