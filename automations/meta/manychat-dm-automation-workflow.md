# ManyChat DM Automation Workflow
# Vital Vision Shop

Version: 1.0
Created: 2026-05-22
Platform: Instagram (via ManyChat)
Tool: ManyChat (manychat.com) — manual setup only

AUTO_PUBLISH=false
REQUIRE_HUMAN_APPROVAL=true
API_PUBLISHING=false

---

## Purpose

This workflow defines how Vital Vision Shop sets up and manages Instagram DM keyword automations in ManyChat manually.

ManyChat automations are configured by a human operator. No API keys, credentials, or .env files are used by this system. No automation is created or triggered automatically.

This workflow covers:
- Keyword trigger setup (e.g. BLOOM)
- DM auto-reply message configuration
- Compliance requirements for DM content
- Testing the automation before going live
- Logging and deactivating automations

---

## Active Keywords

| Keyword | Product | Status | Trigger post |
|---|---|---|---|
| BLOOM | Inner Bloom | Ready to activate | Phase 4A Reel + Story 3 |

---

## Safety Rules — Never Violate

- Never connect ManyChat to this system via API.
- Never store ManyChat credentials, tokens, or API keys in any file in this repo.
- Never read or reference .env files.
- Never auto-activate an automation without human review.
- Never send a DM that contains forbidden claims, disease language, cure or treatment language, or guaranteed outcomes.
- All DM copy must follow config/compliance-rules.md and config/brand-voice.md.
- All DM automations must be reviewed and activated manually by Lucy.

---

## Prerequisites

Before setting up a keyword automation, confirm:

- [ ] ManyChat account is active at manychat.com
- [ ] Instagram account is connected to ManyChat
- [ ] The trigger post is published or scheduled on Instagram
- [ ] The DM auto-reply script is from a file in content/publishing-queue/ or content/approved/
- [ ] The product URL is live and has been inserted into the DM script (no [INSERT] placeholder remaining)
- [ ] DM copy has been compliance-checked (no forbidden claims, disclaimer present)
- [ ] Lucy has reviewed and approved the DM script

---

## Step 1 — Log In to ManyChat

1. Go to manychat.com in your browser.
2. Log in with your Vital Vision Shop account credentials.
3. Select your Instagram account from the dashboard.

---

## Step 2 — Create a New Flow

1. In the ManyChat left sidebar, click **Automation** → **Flows**.
2. Click **+ New Flow**.
3. Name the flow clearly.

Naming convention:

```
product-keyword-date
```

Example:

```
inner-bloom-BLOOM-2026-05-22
```

4. Click **Create**.

---

## Step 3 — Set the Keyword Trigger

1. Inside the flow, click **+ Add Trigger**.
2. Select **Instagram** → **Comment on a Post**.
3. Under "Keyword", select **Contains** and type the keyword exactly.

Current keyword: **BLOOM**

4. Under "Post", either:
   - Select **Specific Post** and choose the published Reel or caption post that contains the CTA.
   - Or select **Any Post** if you want the keyword to work across all posts (use with caution — only if content is consistent).

5. Enable the trigger.

**Note:** ManyChat can also trigger from a Story reply or DM message. For this workflow, the trigger is a comment on a specific post containing the keyword BLOOM.

---

## Step 4 — Build the Auto-Reply Message

After the keyword trigger, the flow sends two messages:

**Message 1 — Public comment reply (optional)**

A brief public reply to the comment to show the account responded. Keep this short and warm.

Suggested public reply — copy/paste ready:

```
Sending it to you now!
```

**Message 2 — Private DM auto-reply**

The full DM is sent privately to anyone who comments the keyword.

DM script for BLOOM — copy/paste ready:

```
Hi! Thank you for commenting BLOOM.

Here is the Inner Bloom daily gut-support ritual I mentioned:

Morning — take Inner Bloom as part of your morning routine.
Keep it simple. Keep it consistent.

Inner Bloom is designed to support daily digestive wellness and gut balance as part of a self-care routine you can actually repeat.

You can explore Inner Bloom here:
[INSERT LIVE PRODUCT URL]

Wellness support only. Not medical advice. Results may vary.
```

**Before activating:** Replace [INSERT LIVE PRODUCT URL] with the full live product URL.

Product URL: /products/advanced-probiotic-formula
Replace with the full Shopify store URL, e.g.: https://vitalvisionshop.com/products/advanced-probiotic-formula

---

## Step 5 — Add a Button (Optional)

Inside the DM, you can add a button to make the product link clickable directly in the DM.

1. In the ManyChat message builder, click **Add Button**.
2. Button label: **Explore Inner Bloom**
3. Button type: **URL**
4. URL: [your live product URL]
5. Save.

This makes it easier for the customer to tap through to the product without copying a link.

---

## Step 6 — Compliance Check Before Activating

Before activating the automation, verify the DM message against these rules:

- [ ] No disease claims
- [ ] No cure, treat, heal, fix, prevent, or diagnose language
- [ ] No hard promises or guaranteed outcomes
- [ ] No shame-based body language
- [ ] Product positioned as "designed to support" or "helps support" only
- [ ] Disclaimer present: "Wellness support only. Not medical advice. Results may vary."
- [ ] Product URL is live (not a placeholder)
- [ ] Brand voice is warm, educational, and softly persuasive — not salesy or pressured

If any item fails, do not activate. Fix the issue first.

---

## Step 7 — Test the Automation

Before going live, test the full flow:

1. In ManyChat, click **Test Flow** (or use the preview mode).
2. Confirm the DM message appears correctly.
3. Confirm all text is as expected — no [INSERT] placeholders, no broken formatting.
4. Confirm the button URL opens the correct product page.
5. After the post is live, have a team member or test account comment the keyword BLOOM on the post.
6. Confirm the public reply fires correctly.
7. Confirm the private DM arrives with the correct message and working button.
8. If anything is wrong, return to the flow and fix before leaving the automation active.

---

## Step 8 — Activate the Automation

1. Once tested and confirmed, toggle the flow to **Active** in ManyChat.
2. The keyword trigger is now live on the specified post.
3. Note the activation date and time.

---

## Step 9 — Log the Automation

Create or update the log entry in logs/meta/.

Log file naming: YYYY-MM-DD-product-keyword-manychat-log.md

Example: 2026-05-22-inner-bloom-bloom-manychat-log.md

Log must include:

```
Date activated: YYYY-MM-DD
Product: Inner Bloom
Keyword: BLOOM
Trigger post: [URL or post description]
DM script version: Phase 4A
Product URL used: [live URL]
Compliance check: Passed
Activated by: Lucy
Status: Active
Notes:
```

---

## Step 10 — Monitor and Maintain

After the automation goes live:

- Check ManyChat analytics weekly to see how many DMs were triggered.
- Check for any failed sends or delivery errors in ManyChat.
- If the product URL changes, update the DM flow immediately and re-test.
- If the post is deleted or archived, deactivate the keyword trigger to avoid broken flows.
- Review DM content any time the product or compliance rules change.

---

## Deactivating an Automation

When a campaign ends or content is retired:

1. Open ManyChat → Automation → Flows.
2. Find the flow by name (e.g. inner-bloom-BLOOM-2026-05-22).
3. Toggle the flow to **Inactive**.
4. Update the log file in logs/meta/ — change Status to Inactive and add the deactivation date.

Do not delete flows. Keep them inactive for reference.

---

## Keyword Library

As new keywords are created, record them here.

| Keyword | Product | Flow name | Status | Activated | Deactivated |
|---|---|---|---|---|---|
| BLOOM | Inner Bloom | inner-bloom-BLOOM-2026-05-22 | Ready to activate | — | — |

---

## DM Compliance Standards

All DM content must follow config/compliance-rules.md.

Quick reference for DM copy:

**Safe language:**
- designed to support
- helps support
- may support
- supports daily digestive wellness
- supports gut balance
- part of a consistent self-care routine
- results may vary

**Never use in DMs:**
- stops bloating
- fixes digestion
- heals your gut
- cures anything
- treats anything
- guaranteed results
- no more bloating
- eliminates discomfort

**Required disclaimer in every DM that mentions a supplement benefit:**
Wellness support only. Not medical advice. Results may vary.

---

## What This Workflow Does Not Do

- Does not connect ManyChat to this repo via API
- Does not store ManyChat credentials or tokens anywhere in this system
- Does not auto-activate any automation
- Does not read or reference .env files
- Does not post to social media
- Does not update Shopify

All steps are completed manually by Lucy inside the ManyChat dashboard.
