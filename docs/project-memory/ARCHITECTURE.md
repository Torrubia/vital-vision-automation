# ARCHITECTURE — Vital Vision Automation
# docs/project-memory/ARCHITECTURE.md
#
# PURPOSE: Document the actual system architecture and data flow.
# UPDATE: Only when architecture changes. Do not update on minor implementation changes.
# RULE: Only document components as active/installed if verified. Note what is planned vs. live.

Last Updated: 2026-09-01
Status: Reflects verified live state as of 2026-09-01

---

## Foundational Principle

```
vital-vision-automation/  =  EXECUTOR   (scripts, agents, Claude commands, workflows)
vital-vision-system/      =  BRAIN      (brand, products, compliance, research, knowledge)
```

These are complementary layers of the same platform. The executor runs. The brain thinks.

---

## Full Pipeline — Data Flow

```
[1] COMPETITOR INTELLIGENCE
    Google Sheets Competitor Research Tracker (Competitors tab)
        ↓  scripts/queue-competitors-from-master.js  (dry-run default, --write to commit)
    n8n_Input tab (queued rows)
        ↓  n8n Organic Batch Orchestrator MVP
    Claude Haiku (AI Insight generation)
        ↓
    Google Sheets (AI Insight + AI Status = Analyzed written back)

[2] REVERSE ENGINEERING
    Competitors tab (AI Status = Analyzed)
        ↓  Manual extraction + Claude Code
    vital-vision-system/reverse-engineering/
        competitor-list.md · hook-patterns.md · content-formats.md
        ugc-patterns.md · canva-card-patterns.md · offer-angles.md
        new-competitor-onboarding.md · swipe-rules.md

[3] CONTENT GENERATION
    Reverse Engineering Intelligence + Brand/Compliance config
        ↓  scripts/generate-organic-content-queue.js (CONTENT_PLAN)
    Organic Content Queue (OCQ) — Google Sheets tab
        23 columns: Batch ID, Source Competitor, Product, Content Type, Funnel Stage,
        Hook, Angle, Script/Caption Draft, On-Screen Text, Shot List,
        Nano Banana Prompt, Canva/Cover Prompt, Visual Direction,
        CTA, Compliance Note, Disclosure Note, Asset Status, Post Status, Metric To Watch

[4] COMPLIANCE GATE
    OCQ rows
        ↓  skills/vv-compliance-guardian.md (AI compliance check)
        ↓  config/compliance-rules.md (rules reference)
    Asset Status = Approved (or flagged back to draft)

[5] PUBLISHING PACK GENERATION
    OCQ rows (Asset Status = Approved)
        ↓  scripts/generate-publishing-packs.js
    Publishing Pack: content/publishing-queue/[date]-[product]-[platform]-row[N]-pack.md
    Canva Brief: automations/drafts/[date]-canva-brief-[product]-row[N].md
        (includes Traceability block: Source Competitor, Hook, Angle, Funnel Stage, Metric To Watch)
    Status → Pack Ready

[6] VISUAL PRODUCTION BRIDGE
    Canva Briefs (Pack Ready)
        +
    vv-creative-brand-system (skills/vv-creative-brand-system.md)
    [Pre-generation checklist completed — real product asset confirmed]
        ↓
    TWO EXECUTION PATHS (both require vv-creative-brand-system first):

    PATH A — AI Generation
        Canva MCP: generate-design (with real product asset_id from Shopify CDN)
        → Creative candidates → Lucy reviews thumbnails
        → Approved: create-design-from-candidate (saves to Canva account)

    PATH B — Template Library Adaptation
        VV TEMPLATE LIBRARY — Supplements — Pack 01 — 35 Templates (Lucy's Canva)
        → Select template using docs/project-memory/TEMPLATE-CATALOG.md (canonical catalog)
        → 17 structural families, product matrix, funnel stage matrix, use-case groups documented there
        → Preserve MASTER (DAHUFEb81CE — never modify); create working copy
        → Replace ALL template copy with approved Vital Vision copy
        → Replace branding with Vital Vision identity
        → Use real Vital Vision product assets (Shopify CDN)
        → Lucy reviews adapted design

    Both paths → compliance check → Status: Creative Ready (after Lucy approval)
    AUTO_PUBLISH=false | REQUIRE_HUMAN_APPROVAL=true

[7] PRE-PUBLISH GATE
    Creative Ready assets
        ↓  config/publishing/vv-meta-publisher-checklist.md (7 sections)
           Section 1: Human Approval (primary gate — Lucy must sign off)
           Section 2: Brand + Product Accuracy
           Section 3: Platform + Format (dimensions, caption length, CTA)
           Section 4: Compliance (final check on published version)
           Section 5: Organic Conversion (hook, CTA, funnel stage, measurable action)
           Section 6: Analytics Readiness Metadata (Batch ID, Source, Hook, Angle, etc.)
           Section 7: Status Gates Confirmation
    Status → Ready to Schedule

[8] SCHEDULING + PUBLISHING  (manual — human operated)
    Ready to Schedule assets
        ↓  Lucy schedules in Meta Business Suite / Metricool / Later / Canva Content Planner
    Status → Scheduled → Published
    Publishing log created: logs/publishing/[date]-[product]-[platform]-row[N]-log.md

[9] ANALYTICS  ← NOT YET BUILT
    Published posts
        ↓  (future) Performance tracking — view-through rate, saves, comments, link clicks
        ↓  (future) Attribution to Source Competitor, Hook, Angle, Funnel Stage
    Winner identification

[10] OPTIMIZATION FEEDBACK LOOP  ← NOT YET BUILT
    Winners
        ↓  Feed back into content strategy (CONTENT_PLAN, OCQ priorities)
        ↓  Update reverse engineering intelligence with what performed
```

---

## System Roles

### Claude Code
- Builds and maintains the system
- Generates content drafts (captions, hooks, scripts, Canva briefs, publishing packs)
- Populates and maintains reverse engineering intelligence
- Runs compliance checks
- Manages project memory
- Does NOT publish, schedule, or trigger live actions automatically

### n8n
- **Production instance: `https://n8n.vitalvision.shop` (VPS).** `localhost:5678` (Docker on the Mac) is a local instance, not production.
- Operates runtime workflows (Organic Batch Orchestrator MVP is live)
- Reads from Google Sheets, calls Claude Haiku API, writes results back
- Does NOT publish content to Meta — orchestration only
- Production workflows: do not modify without explicit approval
- WaveSpeed paid generation (built 2026-09-23, not yet imported): `infrastructure/n8n/wavespeed/` →
  workflow `vv-wavespeed-generation-ledger-guarded.json`, durable ledger = Data Table
  `vv_wavespeed_generation_ledger` (D-036/037/038). Output stops at ASSET_CANDIDATE (never published).

### Google Sheets (`vital_vision_competitor_research_tracker`)
- Source of truth for competitor research (Competitors tab)
- Source of truth for Reverse Engineering Checklist
- Hosts the Organic Content Queue (OCQ) — the content pipeline registry
- n8n_Input tab is the queue for n8n processing
- Do not add/remove/reorder columns without explicit approval

### Agents (`agents/`)
- Specialized reasoning agents for specific task types
- Not orchestrators — Claude Code calls them for specific tasks
- Current: automation-ops, growth-cro, qa-security-devops-guard, vv-organic-content-engine, vv-personal-brand-clone, vv-publishing-ops, vv-qa-card-creative

### Skills (`skills/`, `.claude/skills/`)
- `skills/` (root): legacy format skills, still operational
- `.claude/skills/`: official format skills (invokable as `/skill-name`)
- Standardize reusable capabilities — compliance checks, Canva briefs, hook generation, copy, labels
- Skills do not act autonomously — they are invoked per task

### Canva MCP (`mcp__claude_ai_Canva__*`)
- Available in Claude Code sessions (verified)
- Not yet wired to any automation script or workflow
- Role: Visual Production Bridge — generate actual design files from Canva briefs
- Relevant tools: `generate-design` (supports instagram_post, your_story), `create-design-from-candidate`, `get-design-thumbnail`, `export-design`
- Note: `generate-design-structured` only supports `presentation` type — not applicable for social content

### Shopify MCP (`mcp__claude_ai_Shopify__*`)
- Available in Claude Code sessions (verified)
- Shopify Admin API access via authenticated token
- Role: product management, collection management, analytics, store info

### Superpowers Plugin (`superpowers@claude-plugins-official` v6.3.0)
- Installed at user scope (affects all Claude Code sessions)
- Provides extended skills library (ecommerce, marketing, product, shipping, etc.)
- Native auto-memory system: `.claude/projects/.../memory/MEMORY.md`

### Shopify AI Toolkit Plugin (`shopify-ai-toolkit@claude-plugins-official` v1.7.0)
- Installed at user scope
- Provides Shopify MCP tools in Claude Code sessions

### Nexscope eCommerce Skills
- Not identified as installed or available in this project.

### Meta Business Suite
- Manual scheduling and publishing — human-operated by Lucy
- No API integration currently active (pending separate API security review)
- `AUTO_PUBLISH=false` — direct Meta API publishing is not permitted

### Supliful
- Supplement label creation and management platform
- API: Phase 1 (research only) — no live write calls active
- Module: `vital-vision-system/supliful-label-ops/`

### Shopify (storefront)
- Live store at `vitalvision.shop`
- Products: Inner Bloom, Inner Calm, Inner Balance, Inner Grow
- Quiz funnel: `https://www.vitalvision.shop/#finder-quiz-16047` (organic)
- Paid quiz URL (`finder-quiz-15203`) must never appear in organic content

### Analytics
- Not yet built as an infrastructure layer
- Analytics Readiness Metadata is captured in Section 6 of vv-meta-publisher-checklist.md
- No performance tracking, attribution, or feedback loop exists yet

### SuperCMO (CONDITIONAL GO — pending installation)
- **Role:** Specialized production tool. Operates DOWNSTREAM of VV strategy, content intelligence, Product Truth, and compliance. NOT the strategic control plane.
- **Position in pipeline:** Approved Creative Brief → SuperCMO Production → VV QA → Human Approval
- **Installation method:** Claude Code plugin (`/plugin marketplace add SupercmoHQ/superCMO-skills`)
- **Key requirement:** WaveSpeed API key (minimum) + optional ElevenLabs for voiceover. Keys stored in `~/.supercmo/.env` — separate from VV project `.env`.
- **Telemetry:** Anonymous, opt-out. Set `SUPERCMO_TELEMETRY=false` at install.

#### PERMITTED SuperCMO capabilities in VV routing:
```
generating-ugc-videos      ← Reel/UGC production (primary value)
generating-ad-videos       ← Cinematic product ad video
generating-product-photos  ← Commercial product photography
generating-ai-actors       ← Consistent AI actor for UGC
generating-audio           ← Voiceover (ElevenLabs)
generating-images          ← Multi-model image routing
generating-storyboards     ← Pre-video visual approval
generating-videos          ← Multi-model video routing
adapting-formats           ← Multi-ratio format adaptation
```

#### EXCLUDED SuperCMO capabilities (must NOT be routed through VV):
```
planning-campaigns         ← Duplicates VV Orchestrator strategic function
onboarding-user            ← Duplicates vv-creative-brand-system.md
analyzing-brand            ← VV has verified creative-brand-system; inference risk
analyzing-products         ← ON VV PRODUCTS: Product Truth contamination risk (see below)
writing-ad-copy            ← VV is organic-first; paid ad copy not active
writing-video-scripts      ← Use VV-generated, compliance-reviewed scripts instead
```

#### PRODUCT TRUTH BOUNDARY (non-negotiable):
```
VERIFIED VV PRODUCT TRUTH
(config/product-library.md + vv-creative-brand-system.md)
  ↓
Human-authored production brief
(config/supercmo-vv-production-brief-template.md)
  ↓
SuperCMO production generation

NEVER:
SuperCMO analyzing-products on VV product URLs/photos
  → used as input to production brief
```

`analyzing-products` is permitted ONLY for competitor product analysis. It must never run against Inner Bloom, Inner Calm, Inner Balance, or Inner Grow to establish or infer product facts. VV's canonical product sources are the sole authority.

#### COMPLIANCE REQUIREMENT:
All SuperCMO-generated scripts, copy, and audio must pass `config/compliance-rules.md` review BEFORE video or audio generation begins. Use `config/supercmo-vv-production-brief-template.md` as the mandatory input wrapper for every SuperCMO brief — it embeds the compliance constraints.

---

## Repository Structure (Key Paths)

```
vital-vision-automation/
├── CLAUDE.md                          ← ROOT OPERATING GUIDE (entry point)
├── docs/
│   ├── project-memory/
│   │   ├── PROJECT_STATE.md           ← Current operational state
│   │   ├── ARCHITECTURE.md            ← This file
│   │   ├── DECISIONS.md               ← Durable decisions
│   │   └── ROADMAP.md                 ← NOW / NEXT / LATER
│   ├── architecture-audit-v1.md
│   └── MASTER_ARCHITECTURE.md
├── vital-vision-system/
│   ├── CLAUDE.md                      ← Brand/product/compliance/label ops guide
│   └── reverse-engineering/           ← Competitor intelligence (all 8 files populated)
├── scripts/
│   ├── generate-organic-content-queue.js   (CONTENT_PLAN inside)
│   ├── generate-publishing-packs.js        (generates packs + briefs, includes Traceability)
│   ├── queue-competitors-from-master.js    (queues to n8n_Input)
│   └── [other scripts]
├── agents/                            ← 7 specialized agents
├── skills/                            ← Legacy format skills
├── .claude/skills/                    ← Official format skills
├── config/
│   ├── compliance-rules.md
│   ├── brand-voice.md
│   ├── safety-rules.md
│   └── publishing/
│       ├── vv-meta-publisher-checklist.md  ← Pre-publish gate
│       └── safe-publishing-rules.md
├── content/
│   └── publishing-queue/              ← 5 Pack Ready packs (rows 6–10)
├── automations/
│   └── drafts/                        ← 5 Pack Ready Canva briefs (rows 6–10)
└── logs/publishing/                   ← Publishing logs (created after each post)
```
