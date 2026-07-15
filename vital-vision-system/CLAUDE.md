# Vital Vision System — Claude Code Operating Guide

## Project Purpose

This project is the operating system for Vital Vision Shop, a wellness e-commerce brand focused on premium, warm, educational, elegant, and softly persuasive content.

The system organizes brand voice, product knowledge, compliance rules, organic content strategy, competitor research, publishing workflows, automations, integrations, analytics, logs, and security rules.

## Brand Voice

Vital Vision Shop should sound:

- Premium
- Warm
- Educational
- Elegant
- Softly persuasive
- Clear and trustworthy
- Ritual-based, not aggressive

Avoid:

- Medical claims
- Miracle promises
- Disease treatment language
- Fear-based copy
- Cheap promotional tone
- Overhyped supplement claims

## Current Product Lines

- Inner Bloom — Advanced Probiotic Formula
- Inner Calm — Magnesium Glycinate
- Inner Balance — Complete Multivitamin
- Inner Grow — Hair, Skin & Nails Support

## Compliance Rules

Claude must use supplement-safe language.

Allowed language examples:

- may support
- helps support
- supports daily wellness
- designed to complement a daily routine
- helps maintain
- part of a balanced self-care ritual

Forbidden language examples:

- cures
- treats
- heals
- fixes
- eliminates bloating
- reverses disease
- guarantees results
- medical transformation
- anxiety treatment
- hormone cure
- gut healing guarantee

All health-related content must be educational and non-medical.

## Claude Code Permissions

Claude may:

- Create and edit markdown files
- Organize folders
- Generate content drafts
- Generate captions, hooks, scripts, carousel outlines, and email drafts
- Summarize competitor insights
- Create safe content calendars
- Create documentation
- Suggest automation steps
- Create non-sensitive template files

Claude must ask before:

- Editing live Shopify theme files
- Running destructive terminal commands
- Deleting files
- Moving large folders
- Installing packages
- Changing Git history
- Creating commits
- Pushing to GitHub
- Touching API keys
- Editing production automations
- Changing anything connected to live publishing

Claude must never:

- Expose API keys
- Store secrets in Git
- Put real tokens inside .env.example
- Make medical claims
- Publish content automatically without approval
- Delete files without explicit confirmation
- Run rm, git reset, git clean, or force push without approval

## Folder Rules

Use these folders for their intended purpose:

- brand/ — brand voice, visual rules, approved language, forbidden language, story
- products/ — product knowledge files
- compliance/ — supplement claim rules and review checklists
- research/ — competitors, customer voice, hooks, trends
- content-pillars/ — evergreen organic strategy pillars
- templates/ — reusable formats for reels, carousels, stories, posts, emails, blog posts
- approved-assets/ — final approved brand/product assets
- automations/ — n8n and workflow documentation
- integrations/ — Shopify, Canva, Meta, Omnisend, n8n, GitHub connection notes
- publishing/ — captions, calendars, reels, stories, carousels, status tracking
- lead-magnets/ — quiz, guides, checklists
- offers/ — bundles, discounts, lead magnet offers, tests
- analytics/ — metrics and growth reports
- logs/ — generated content, published content, errors, Claude actions
- security/ — permissions, API key rules, rollback plan

## Organic Content Strategy

The preferred content formula is:

Pain or desire
↓
Simple education
↓
Daily ritual frame
↓
Product match
↓
Soft CTA

Primary pillars:

- Education
- Routine
- Product angles
- Objections
- Soft sell
- Founder journey
- Trust building
- Competitor insight adaptation

## Automation Safety Mode

All automations should follow:

MVP
↓
Manual validation
↓
Small batch test
↓
Review output
↓
Scale carefully

Never automate publishing before content and compliance review.

## n8n Workflow Notes

Current validated MVP:

Google Sheets
↓
n8n
↓
Anthropic Claude Haiku
↓
Google Sheets AI Insight

The workflow reads competitor rows, filters rows where AI Status is empty, sends them to Claude, then writes AI Insight and AI Status = Analyzed back to Google Sheets.

## Git Rules

Before making Git changes:

1. Run git status.
2. Explain what changed.
3. Ask for approval before git add, commit, or push.

Do not push automatically.

## Default Output Style

When helping Lucy, use:

1. Next step: 1–3 actions
2. Step-by-step instructions
3. Validation checklist
4. Risks and limits
5. Plan B

---

## Supliful Label Ops Module

All Supliful label work — reviewing migrated labels, creating new labels, validating compliance, planning API integration, and syncing with Shopify — must use:

```
vital-vision-system/supliful-label-ops/
```

### When Lucy mentions Supliful labels, direct her to:

- **Review a migrated label:** `workflows/01-review-migrated-label.md`
- **Create a new label:** `workflows/02-create-new-label-from-product.md`
- **Save a label (approval gate):** `workflows/03-supliful-label-save-approval.md`
- **Sync with Shopify:** `workflows/04-shopify-product-sync-review.md`
- **API planning:** `workflows/05-api-safe-mode-workflow.md`
- **Review all 4 products:** `workflows/06-label-batch-review.md`
- **Something went wrong:** `workflows/07-rollback-and-incident-response.md`

### Quick review prompt:

Use `supliful-label-ops/prompts/master-label-orchestrator-prompt.md` to review any label screenshot.

### Safety rules specific to label ops:

- Never click Save in Supliful without completing `checklists/save-label-approval-checklist.md`.
- Never make API write calls without a completed `templates/api-action-request-template.md` and Lucy's explicit approval.
- Never use forbidden claims: "cures," "treats," "prevents disease," "heals," "diagnoses," "guarantees results."
- Always use safe language: "supports," "helps support," "may help support," "helps maintain."
- All label save actions must be logged in `supliful-label-ops/logs/`.

---

## Premium Label Architecture and Design System

All label design, analysis, and redesign work uses the design system inside `supliful-label-ops/`.

### When Lucy asks about label design, direct her to:

- **Analyze an existing label:** `prompts/current-label-analysis-prompt.md` → Workflow 08
- **Create a new premium label:** `prompts/new-premium-label-creation-prompt.md` → Workflow 09
- **Build the Master Label Standard:** `prompts/master-label-standard-prompt.md` → Workflow 10
- **Compare Inner Bloom vs Inner Grow (or any two labels):** `prompts/product-line-comparison-prompt.md` → Workflow 11
- **Build a label inside Supliful:** `prompts/supliful-dashboard-build-prompt.md` → Workflow 12
- **Get premium feel direction:** `prompts/luxury-packaging-director-prompt.md`

### Use the skill for all design tasks:

```
/vv-premium-label-architect [product] [action]
```

### Design system agents (new):

- `premium-label-architect.md` — layout specification
- `luxury-packaging-director.md` — creative direction
- `label-design-system-manager.md` — Master Label Standard
- `label-consistency-reviewer.md` — family consistency
- `supliful-dashboard-design-operator.md` — Supliful build guide
- `premium-label-qa-reviewer.md` — final READY / REVISE / ESCALATE

### Design policy:

Before any redesign: `DESIGN_PRESERVATION_AND_REDESIGN_POLICY.md`
Preserve what works. Never redesign randomly. Human approval always required for save actions.
