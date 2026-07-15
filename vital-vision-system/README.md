# Vital Vision System

Vital Vision System is the operating system for Vital Vision Shop.

It organizes brand rules, product knowledge, compliance, organic content strategy, competitor research, automation workflows, publishing systems, analytics, logs, and security.

## Current Business Focus

Vital Vision Shop is a wellness e-commerce brand focused on premium, warm, educational, elegant, and softly persuasive organic content.

The current growth priority is:

1. Organic content
2. Competitor research
3. Content automation
4. Canva asset production
5. Safe publishing workflows
6. Analytics and optimization

## Main Products

- Inner Bloom — Advanced Probiotic Formula
- Inner Calm — Magnesium Glycinate
- Inner Balance — Complete Multivitamin
- Inner Grow — Hair, Skin & Nails Support

## Main Strategy

The organic content strategy follows this formula:

Pain or desire
↓
Simple education
↓
Daily ritual frame
↓
Product match
↓
Soft CTA

## Project Structure

- brand/ — brand voice, visual rules, approved language, forbidden language, founder story
- products/ — product information and comparison
- compliance/ — supplement-safe claims, FDA disclaimer, claim review checklist
- research/ — competitors, customer voice, hooks, trends
- content-pillars/ — education, routine, product angles, objections, soft sell
- templates/ — reels, carousels, story cards, static posts, emails, blog posts
- approved-assets/ — logos, bottles, lifestyle, backgrounds, Canva exports
- automations/ — organic, Canva, Shopify, email, reporting pipelines
- integrations/ — Shopify, Canva, Meta, Omnisend, n8n, GitHub
- publishing/ — calendar, captions, reels, carousels, stories, Pinterest, YouTube Shorts
- lead-magnets/ — gut wellness guide, daily ritual checklist, quiz
- offers/ — core offers, bundles, lead magnets, discount rules, testing log
- analytics/ — organic, product page, email, quiz, weekly growth reports
- logs/ — generated content, published content, errors, Claude actions
- security/ — API rules, permissions, rollback plan

## Current Validated MVP

Google Sheets
↓
n8n
↓
Anthropic Claude Haiku
↓
Google Sheets AI Insight

The current workflow reads competitor rows, filters rows where AI Status is empty, sends them to Claude, and writes AI Insight plus AI Status = Analyzed back to Google Sheets.

## Safety Rules

Do not store real API keys in this project.

Use `.env.example` only for placeholder values.

Do not publish content automatically before review.

Do not make medical claims.

Do not run destructive terminal commands without explicit approval.

## Git Rules

Before committing:

1. Run `git status`
2. Review changed files
3. Confirm no secrets are included
4. Commit with a clear message
5. Push only after review

## Next Build Phases

### Phase 1 — Research Intelligence

Competitor research, customer voice, hook patterns, and trend tracking.

### Phase 2 — Content Generation

Transform insights into hooks, captions, Reels scripts, carousel outlines, and content calendar drafts.

### Phase 3 — Visual Production

Connect content with Canva templates and approved assets.

### Phase 4 — Publishing System

Prepare content for Meta Business Suite, Pinterest, TikTok, YouTube Shorts, and Shopify.

### Phase 5 — Growth Optimization

Track performance, update content strategy, improve offers, and build repeatable organic growth loops.

---

## Supliful Label Ops

Label management for Vital Vision Shop's Supliful supplement products is handled by a dedicated module:

```
vital-vision-system/supliful-label-ops/
```

This module provides workflows, checklists, prompts, templates, and API planning for:

- Reviewing migrated Supliful labels before saving
- Creating new product labels with compliance review
- Human approval gates before any label save action
- Shopify product sync review
- Safe, phased API integration planning
- Batch review of all four products
- Rollback and incident response

Products covered: Inner Balance, Inner Bloom, Inner Calm, Inner Grow.

Start here for any label work: `supliful-label-ops/README.md`
