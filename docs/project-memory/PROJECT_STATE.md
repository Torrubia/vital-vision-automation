# PROJECT STATE — Vital Vision Automation
# docs/project-memory/PROJECT_STATE.md
#
# PURPOSE: Authoritative current state of the Vital Vision content production system.
# UPDATE: After every meaningful implementation session.
# RULE: Trust this file. Do not re-audit VERIFIED components without a specific reason.

Last Updated: 2026-09-23
Updated By: Claude Code (Session — WaveSpeed ledger hardened; production n8n location corrected to https://n8n.vitalvision.shop; production deployment plan prepared, NOT executed)

---

## VERIFIED / WORKING

These components are confirmed operational. Do not re-audit without cause.

### Google Sheets Competitor Research Tracker
- **Sheet name:** `vital_vision_competitor_research_tracker`
- **Env var:** `GOOGLE_SHEETS_ID`
- **Auth:** Service account JSON (`GOOGLE_SERVICE_ACCOUNT_KEY_PATH`)
- **Tabs:** Competitors, Reverse Engineering Checklist, n8n_Input, OCQ (Organic Content Queue)
- **Competitors tab columns:** Priority, Brand, Instagram URL, Category/Angle, Why Study, Product Match, Status
- **Competitors tab status values:** To Research, Ready, Analyzed, Needs Review, Approved, Used, Rejected
- **3 competitors fully analyzed:** Ritual (→ Inner Balance), Seed (→ Inner Bloom), Love Wellness (→ Inner Bloom + Inner Calm)
- **Status:** Operational. Do not add new columns. Do not clear or reorder existing columns.

### n8n Organic Batch Orchestrator MVP
- **Flow:** Google Sheets (Competitors tab, AI Status = Analyzed) → n8n → Claude Haiku → Google Sheets (writes AI Insight + AI Status = Analyzed)
- **Status:** Validated MVP. Operational.
- **Safety:** Never modify n8n production workflow without explicit approval.

### scripts/queue-competitors-from-master.js
- **Function:** Queues eligible Competitors rows → n8n_Input tab
- **Safety:** Dry-run default. Requires `--write` flag to commit.
- **npm alias:** `competitors:queue-dry-run` / `competitors:queue-write`
- **Status:** Verified working.

### scripts/generate-organic-content-queue.js
- **Function:** Reads Competitors (AI Status = Analyzed) → generates OCQ rows (23-column structure)
- **CONTENT_PLAN:** Hardcoded in this script — 3 competitors × 3 asset types (ugcVideo, carousel, storyCTA) = 9 strategies
- **Status:** Verified working.

### scripts/generate-publishing-packs.js
- **Function:** Reads OCQ rows → generates publishing packs (`content/publishing-queue/`) + Canva briefs (`automations/drafts/`)
- **Traceability block:** Added 2026-09-01 — `## Traceability` section now included in all generated Canva briefs, using existing row fields (Batch ID, Source Competitor, Hook, Angle, Funnel Stage, Metric To Watch, Platform, Placement, CTA)
- **Status:** Verified working. Syntax clean.

### 5 Pack Ready Publishing Packs (rows 6–10)
- **Location:** `content/publishing-queue/`
- **Files:**
  - `2026-08-30-inner-bloom-meta-row6-pack.md` (Seed → Inner Bloom, Carousel, TOFU)
  - `2026-08-30-inner-bloom-meta-row7-pack.md` (Seed → Inner Bloom, Story CTA, BOFU)
  - `2026-08-30-inner-bloom-inner-calm-meta-row8-pack.md` (Love Wellness → Inner Bloom + Inner Calm, UGC Video, MOFU)
  - `2026-08-30-inner-bloom-inner-calm-meta-row9-pack.md` (Love Wellness → Inner Bloom + Inner Calm, Carousel, MOFU)
  - `2026-08-30-inner-bloom-inner-calm-meta-row10-pack.md` (Love Wellness → Inner Bloom + Inner Calm, Story CTA, BOFU)
- **Status:** Pack Ready. Verified intact 2026-09-01. DO NOT regenerate without explicit reason.

### 5 Canva Briefs (rows 6–10)
- **Location:** `automations/drafts/`
- **Files:**
  - `2026-08-30-canva-brief-inner-bloom-row6.md`
  - `2026-08-30-canva-brief-inner-bloom-row7.md`
  - `2026-08-30-canva-brief-inner-bloom-inner-calm-row8.md`
  - `2026-08-30-canva-brief-inner-bloom-inner-calm-row9.md`
  - `2026-08-30-canva-brief-inner-bloom-inner-calm-row10.md`
- **Status:** Pack Ready. Verified intact 2026-09-01. Contain complete design briefs for rows 6–10.
- **Note:** These pre-date the Traceability block addition. New briefs generated after 2026-09-01 will include the Traceability block automatically.

### config/publishing/vv-meta-publisher-checklist.md
- **Created:** 2026-09-01
- **Function:** 7-section pre-publish gate (Human Approval → Brand Accuracy → Platform/Format → Compliance → Organic Conversion → Analytics Readiness Metadata → Status Gates)
- **Position in pipeline:** Between Creative Ready and Ready to Schedule
- **Status:** Verified. Referenced in all 5 Canva briefs.

### Reverse Engineering Intelligence Files (vital-vision-system/reverse-engineering/)
All 6 intelligence files populated 2026-09-01 from CONTENT_PLAN in generate-organic-content-queue.js:
- `competitor-list.md` — Ritual, Seed, Love Wellness full entries
- `hook-patterns.md` — HOOK-001 through HOOK-009 (3 per competitor), 6 structural hook templates
- `content-formats.md` — FORMAT-001 (UGC Video 9:16), FORMAT-002 (Educational Carousel), FORMAT-003 (Story CTA 9:16)
- `ugc-patterns.md` — UGC-001 through UGC-003 + script template + compliance checklist
- `canva-card-patterns.md` — CARD-001 through CARD-003 + design invariants table
- `offer-angles.md` — ANGLE-001 through ANGLE-007 + angle-to-content mapping table
- **Status:** Verified populated. Do not re-extract from CONTENT_PLAN — already done.

### vital-vision-system/reverse-engineering/new-competitor-onboarding.md
- **Created:** 2026-09-01
- **Function:** 6-step playbook for adding new competitors without code changes
- **Status:** Verified created.

### skills/vv-canva-brief-builder.md
- **Updated:** 2026-09-01 — Traceability section added to output template
- **Status:** Verified updated.

### vital-vision-system/CLAUDE.md
- **Status:** Verified intact. Not modified. Contains full brand/product/compliance/label ops operating guide.

### Config Files (verified present)
- `config/safety-rules.md` — AUTO_PUBLISH=false, REQUIRE_HUMAN_APPROVAL=true
- `config/compliance-rules.md` — supplement claim rules — **updated 2026-09-10:** `designed to complement` added to Preferred Safe Language (see below)
- `config/brand-voice.md` — brand voice reference
- `config/product-library.json` / `config/product-library.md` — product knowledge
- `config/publishing/safe-publishing-rules.md` — master publishing safety rules
- `config/supercmo-vv-production-brief-template.md` — created 2026-09-10; mandatory SuperCMO input wrapper

### Agents (verified present)
- `agents/automation-ops-agent.md`
- `agents/growth-cro-agent.md`
- `agents/qa-security-devops-guard.md`
- `agents/vv-organic-content-engine-agent.md`
- `agents/vv-personal-brand-clone-agent.md`
- `agents/vv-publishing-ops-agent.md`
- `agents/vv-qa-card-creative-agent.md`

### Skills (verified present)
- `skills/` (root): vv-canva-brief-builder.md, vv-compliance-guardian.md, vv-meta-publisher-checklist.md, vv-organic-content-skill.md, vv-nano-banana-prompts.md, vv-quiz-funnel.md, content-multiplier/, customer-language-research/, hook-multiplier/
- `.claude/skills/`: vv-copy-engine, vv-customer-language, vv-hook-multiplier, vv-organic-content, vv-premium-label-architect

### skills/vv-creative-brand-system.md (created 2026-09-02)
- **Purpose:** Single reusable brand reference consumed before every Canva generation call
- **Contains:** 7-level creative source hierarchy, verified brand identity, homepage taglines/brand promise, per-product creative reference (all 4 products), real Shopify CDN image URLs, approved CTAs, avoid language, compliance flags, Canva scope rules, REAL PRODUCT ASSET REQUIRED stop rule, pre-generation checklist
- **Sources verified from:** Live vitalvision.shop storefront (5 pages fetched 2026-09-02), live Shopify product records, config/brand-voice.md, config/product-library.md
- **Status:** Verified created. Load before any Canva generation call.

### docs/project-memory/TEMPLATE-CATALOG.md (created 2026-09-02)
- **Purpose:** Permanent canonical catalog of all 35 purchased Etsy templates in Lucy's Canva account
- **Location:** `docs/project-memory/TEMPLATE-CATALOG.md`
- **Contents:** Visual analysis of all 35 templates (17 structural families), use-case groups (14 categories), product selection matrix (Inner Bloom/Calm/Balance/Grow), funnel stage matrix (TOFU/MOFU/BOFU), platform matrix, pipeline integration notes, Row 6 template recommendation (T06 primary, T18 Slide 1 alternative), full Row 6 content mapping
- **Governance:** All 35 templates are approved reusable structural assets (D-031). Structure only — never copy content. MASTER (DAHUFEb81CE) must never be modified. Always work from a copy.
- **Row 6 status:** T06 recommended — STOPPED, awaiting Lucy's approval before creating working copy
- **Status:** Verified created 2026-09-02. This is the canonical reference for template selection.

### Canva Etsy Template Library — VV TEMPLATE LIBRARY — Supplements — Pack 01 — 35 Templates (added 2026-09-02)
- **Location:** Lucy's Canva account
- **Source:** Purchased Etsy template pack — NOT Vital Vision content
- **Role:** Structure / visual template only — layout, composition, animation, timing, transitions, text hierarchy, framing, visual storytelling structure, reusable design patterns
- **NOT a source of truth for:** copy, claims, product information, benefits, CTAs, brand identity
- **MASTER rule:** Original MASTER must never be modified; always work from a copy
- **Transformation flow:** Documented in `skills/vv-creative-brand-system.md` → Design Execution Resources section
- **Status:** Confirmed present in Lucy's Canva account. 35 templates available.

### Creative Source of Truth — Hierarchy Established (2026-09-02)
1. Public Vital Vision Storefront (vitalvision.shop) — customer-facing copy, positioning, benefits
2. Live Shopify product data — identity, price, handle, official CDN image URLs
3. Vital Vision project files — brand voice, product library, compliance rules
4. Approved Publishing Pack / Canva Brief — post-specific locked copy
5. Compliance rules — mandatory gate; storefront wording does not override compliance
6. Reverse-engineering intelligence — structure and inspiration only
7. Canva — execution layer only; layout/composition; no copy/product invention
- **Storefront pages verified:** Homepage, Inner Bloom, Inner Calm, Inner Balance, Inner Grow
- **Key storefront finding:** Primary tagline "Small Rituals. Lasting Balance." / Brand promise "Wellness isn't a trend to chase — it's a ritual to return to" / Product line name "The Inner System"
- **Lifestyle photography:** NOT VERIFIED — no approved lifestyle assets in project; real Supliful bottle renders confirmed as official product images
- **Visual Production Bridge update:** Row 6 candidates from prior session REJECTED/UNSAVED; regeneration in progress with real product asset (Path A — Shopify CDN bottle render)

### Claude-Mem (installed 2026-09-02)
- **Scope:** User scope — available across all of Lucy's Claude Code projects
- **Role:** Auxiliary persistent-memory layer (cross-session context, observations, memory search)
- **Does NOT replace:** Root `CLAUDE.md` + `docs/project-memory/` remain the authoritative source of truth for Vital Vision
- **Security rules:** Added `## SECURITY / MEMORY RULES` to root `CLAUDE.md` (verified present exactly once)
  - Never store secrets, API keys, tokens, .env contents, OAuth credentials, customer data, or payment data in Claude-Mem
  - External memory providers / remote embeddings require Lucy's explicit approval
  - Claude-Mem must never override safety gates, human approval requirements, or AUTO_PUBLISH=false
- **Status:** Installed and activated. No production systems were changed during installation.

### .claude/skills/vv-orchestrator/SKILL.md (created 2026-09-06)
- **Purpose:** Planning-time strategic control plane for complex or multi-capability VV work
- **Name rationale:** `vv-orchestrator` (not `vv-campaign-orchestrator`) — scope is all complex VV work, not campaigns only; broader name is correct and avoids a future duplicate
- **Three orchestration levels:**
  - Level 1 (Simple): direct routing to minimum capability chain — no DAG
  - Level 2 (Complex): strategic alignment + DAG + gates + human approval boundaries
  - Level 3 (High Impact/Irreversible): deeper evaluation + mandatory human approval before any protected action
- **Capability Registry:** 5-tier classification (Canonical Skills · Domain Context Docs · System Tools · Knowledge Sources · Future/Not Active); SuperCMO and analytics layer classified as FUTURE/NOT YET BUILT
- **Non-Negotiable Gates:** Product Truth · Compliance · Human Approval — structural stops; cannot be overridden by any capability including future SuperCMO
- **DAG Node Schema:** lightweight (id · task · capability · required_sources · inputs_from · parallel_group · product_truth_required · compliance_required · approval_gate · output · status)
- **Controlled Learning States:** Hypothesis → Experiment → Observation → Validated Learning → Approved Business Knowledge (Lucy approval required for promotion)
- **Measurement Reality:** Analytics layer NOT YET BUILT; fabrication prohibited
- **n8n Boundary:** Orchestrator = planning-time only; n8n = operational runtime; no n8n modifications
- **Strategic Core integration:** loads from `vital-vision-system/strategic-core.md`; does not hardcode business facts
- **CLAUDE.md update:** Orchestrator Routing Rule added to Automatic Capability Routing — L1 routes directly, L2/L3 invoke orchestrator first
- **No duplicate created:** no existing orchestrator existed; no new agents/scripts/plugins installed
- **Safety:** AUTO_PUBLISH=false · REQUIRE_HUMAN_APPROVAL=true · all outputs are draft · approval of one piece ≠ approval of others
- **Status:** Verified created 2026-09-06.

### vital-vision-system/strategic-core.md (created 2026-09-06)
- **Purpose:** Canonical single source for the six-component Vital Vision Strategic Core (business knowledge layer)
- **Location:** `vital-vision-system/strategic-core.md` — knowledge layer (D-010: "vital-vision-system/ is the brain")
- **Components:** Core Purpose · Core Values (7) · Core Strategy · Core Offer · Core System · Core Competencies (6)
- **Key content:**
  - Core Purpose: help people build intentional wellness relationships through simple, trustworthy daily rituals
  - Core Values 1–7: Customer Trust Before Conversion · Truth Before Persuasion · Clarity Before Complexity · Customer Understanding Before Volume · Evidence Before Assumption · Compounding Before Disposable Work · Responsible Automation
  - Core Strategy: organic-first compounding growth loop (Customer Intelligence → Content → Distribution → Conversion → Learning ↺)
  - Core Offer: simple daily wellness rituals + thoughtful products + clear education + trustworthy customer experience
  - Core System: 13-stage operating loop (Signal → Intelligence → … → Human Approval → Distribution → Measurement → Learning ↺)
  - Core Competencies: Customer Intelligence · Organic Growth Intelligence · Conversion Intelligence · Creative Intelligence · Product & Brand Integrity · Learning & Automation
- **Governance (explicit in file):** Does NOT replace Product Truth, Compliance, Safety, Permissions, Human Approval, or Publishing safeguards — these remain independent gates
- **Measurement status:** PARTIAL (content output tracked via OCQ/Batch IDs) / FUTURE (analytics feedback loop, revenue-level metrics, offer-level conversion not yet instrumented)
- **Content provided by:** Lucy (business owner) — not invented
- **CLAUDE.md update:** One line added to ENGINEERING/ARCHITECTURE routing chain
- **Status:** Verified created 2026-09-06. ONE canonical source — not duplicated elsewhere.

### .claude/skills/vv-content-multiplier/SKILL.md (created 2026-09-04)
- **Purpose:** One core idea → 7 fully developed formats for a full weekly content batch
- **Formats generated:** Email · Story Post · Contrarian Post · List Post · Mistake Post · Manifesto Post · Reel Script · Lead Magnet Concept · 3 Podcast/YouTube Titles
- **Intelligence integrations:** Product-Aware Operation (vv-creative-brand-system + product-library) · Direct Response Foundation (Schwartz/Halbert/Bencivenga/Sugarman) · 5-level Awareness Intelligence · TOFU/MOFU/BOFU funnel logic · Customer Language (product-library + vv-customer-language) · Hook Multiplier Integration (upstream; no duplication) · Product Truth Gate (STOP rule) · Compliance Gate · Reverse Engineering (optional)
- **The Throughline:** Defined first — one sentence naming the emotional truth; all 7 formats express it from different angles
- **Content Evaluation:** 12-dimension; compliance and product truth are gates
- **Safety:** AUTO_PUBLISH=false · REQUIRE_HUMAN_APPROVAL=true · draft only · Lucy approves each format individually
- **CLAUDE.md update:** One line added to Organic Content routing chain referencing vv-content-multiplier
- **No duplicate created:** `skills/content-multiplier/SKILL.md` is an empty stub and was left as-is; `vv-organic-content` is a different capability (one format per invocation)
- **Status:** Verified created 2026-09-04.

### vv-hook-multiplier skill strengthened (2026-09-04)
- **File:** `.claude/skills/vv-hook-multiplier/SKILL.md`
- **What changed (additive only — no existing content removed):**
  - `## Product-Aware Operation` — references existing product sources; names 4 VV products; prohibits hardcoded/invented product facts
  - `## Input Resolution` — required vs. optional inputs; explicit-overrides-inferred rule; no invented context
  - `## Direct Response Foundation` — Schwartz · Halbert · Bencivenga · Sugarman tradition named
  - `## Customer Language` — references `config/product-library.md` audience language + `vv-customer-language` skill
  - `## Awareness Level Intelligence` — 5 levels (Unaware → Most Aware) with hook orientation per level
  - `## Funnel + Format Intelligence` — TOFU/MOFU/BOFU + format examples; context-specific optimization rule
  - `## Product Truth and Number Integrity` — never invent dosages, percentages, timeframes, study results
  - `## Reverse Engineering (Optional)` — pattern intelligence only; not product truth; optional
  - `## Hook Evaluation` — 10-dimension scoring; compliance and product truth are gates
  - `## Format Rules` — added "Are you struggling with..." to avoid list
  - `## Output Format` — added RECOMMENDED WINNER block below TOP 3 WINNERS
- **No new files created. No duplicate created. CLAUDE.md routing already covered.**
- **Status:** Verified implemented 2026-09-04.

### Automatic Capability Routing (implemented 2026-09-03)
- **Doctrine:** `## Automatic Capability Routing` section added to root `CLAUDE.md`
- **Decision:** D-032 added to `docs/project-memory/DECISIONS.md`
- **What it does:** Before any meaningful task, Claude Code classifies task type and routes to the smallest relevant combination of existing agents, skills, intelligence, plugins, and tools. Lucy does not need to specify capabilities per task.
- **Task types covered:** Organic Content, Creative/Visual, Copy/Landing Page, Publishing, Competitor/Research, Shopify/Store, Engineering/Architecture, Analytics/Optimization
- **Files modified:** `CLAUDE.md` (additive section), `DECISIONS.md` (D-032), `PROJECT_STATE.md` (this entry)
- **Nothing created:** No new agents, skills, workflows, scripts, or memory systems
- **Status:** Verified implemented 2026-09-03.

### MCP Tools (verified available in Claude Code sessions)
- Canva MCP — available (`mcp__claude_ai_Canva__*`) — not yet wired to any automation
- Shopify MCP — available (`mcp__claude_ai_Shopify__*`)
- Google Drive MCP — available
- Google Calendar MCP — available
- Notion MCP — available

### Agent Layer Stabilization (completed 2026-09-06)
All 7 agents verified. Three confirmed P1 issues resolved. AGENT LAYER — STABLE.

**Resolved issues:**
- `agents/vv-organic-content-engine-agent.md` — stale skill paths corrected to `.claude/skills/vv-hook-multiplier/`, `.claude/skills/vv-customer-language/`, `.claude/skills/vv-content-multiplier/`
- `agents/vv-organic-content-engine-agent.md` — skill delegation clarified; unique agent expertise (Q&A Content, Reels Scripts, Stories Pack, Feed Captions, Carousel Ideas, DM Automation, Compliance Report) preserved intact
- `agents/qa-security-devops-guard.md` — VQB LEGACY scope marker added; auto-invocation scoped to VQB operations only; universal security rules (secrets management, prohibited copy, Shopify theme protection, safety gate integrity) separated from VQB-specific checklist items
- `agents/vv-publishing-ops-agent.md` — `config/publishing/vv-meta-publisher-checklist.md` added to Config References and Approval Gate; no checklist contents duplicated
- `agents/vv-qa-card-creative-agent.md` — Step 5 clarified to acknowledge Canva MCP as available execution path alongside human/manual creation; manual path preserved; Human Approval not replaced

**Confirmed non-issues (rejected findings):**
- `config/approval-rules.md`, `config/personal-image-clone-rules.md`, `config/qa-card-style-rules.md`, `assets/personal-reference/` — all confirmed to exist; no action required

**Architecture unchanged:** vv-orchestrator, Strategic Core, n8n, Shopify, Canva not modified. No new agents, skills, configs, or plugins created. VQB = LEGACY/INACTIVE.

**Safety:** AUTO_PUBLISH=false · REQUIRE_HUMAN_APPROVAL=true · Product Truth gate intact · Compliance gate intact · SuperCMO = FUTURE/NOT ACTIVE · Analytics layer = NOT YET BUILT

### SuperCMO Integration Governance (documented 2026-09-10)
- **What exists:** The governance layer only. Scope, boundaries, and the mandatory input wrapper are documented and committed. SuperCMO itself is NOT installed — see NOT YET BUILT.
- **Classification:** CONDITIONAL GO — approved for creative production only, pending installation.
- **Position in pipeline:** `Approved Creative Brief → SuperCMO Production → VV QA → Human Approval`. Downstream of VV strategy, content intelligence, Product Truth, and compliance. NOT a strategic control plane — `vv-orchestrator` remains the sole control plane.
- **Decisions added:** D-033 (downstream tool; permitted/excluded capability scope) · D-034 (Product Truth boundary) · D-035 (brief template mandatory; compliance is a pre-generation gate)
- **PERMITTED capabilities (9):** `generating-ugc-videos` · `generating-ad-videos` · `generating-product-photos` · `generating-ai-actors` · `generating-audio` · `generating-images` · `generating-storyboards` · `generating-videos` · `adapting-formats`
- **EXCLUDED capabilities (6):** `planning-campaigns` · `onboarding-user` (duplicate existing capabilities — D-008) · `analyzing-brand` (inference risk) · `analyzing-products` on VV products (Product Truth — D-034) · `writing-ad-copy` (organic-first — D-002) · `writing-video-scripts` (use VV-generated compliance-reviewed scripts)
- **Product Truth boundary:** `analyzing-products` is competitor-only. It must NEVER run against Inner Bloom, Inner Calm, Inner Balance, or Inner Grow, and its output must never feed a VV production brief. Canonical sources (`config/product-library.md` + `skills/vv-creative-brand-system.md`) are the sole authority.
- **Mandatory wrapper:** `config/supercmo-vv-production-brief-template.md` — 10 sections (Brief Identity · Product Truth · Approved Language · Forbidden Language + Forbidden Visual Concepts · UGC/FTC Testimonial Compliance · Brand Voice · Creative Brief · Spend Checkpoint · Compliance Pre-Check · Post-Generation QA Record). Must be completed from canonical sources before any SuperCMO skill is invoked.
- **Compliance position:** Pre-generation gate. Scripts, copy, and audio pass `config/compliance-rules.md` BEFORE video or audio generation begins — not as post-production cleanup.
- **Language lists:** Template Sections 3 and 4 mirror `config/compliance-rules.md` verbatim (Preferred Safe Language · Forbidden Claims · Forbidden Phrases). `config/compliance-rules.md` governs; the template is updated to match it, never the reverse. Verified byte-identical 2026-09-10.
- **Credentials:** SuperCMO keys live in `~/.supercmo/.env`, separate from the VV project `.env`. Never committed (D-022). Telemetry disabled at install (`SUPERCMO_TELEMETRY=false`).
- **Files changed:** `docs/project-memory/ARCHITECTURE.md` (additive SuperCMO section) · `docs/project-memory/DECISIONS.md` (D-033/034/035) · `config/supercmo-vv-production-brief-template.md` (new) · `config/compliance-rules.md` (+1 line)
- **Nothing installed, nothing executable changed.** Documentation only. Zero runtime effect.
- **Status:** Verified documented 2026-09-10. Commits `c83281e` and `7e864c7`, pushed to `origin/main`.

### config/compliance-rules.md — Preferred Safe Language completed (2026-09-10)
- **Change:** `designed to complement` added to the Preferred Safe Language list (+1 line, no deletions).
- **Why:** The phrase was absent from `config/compliance-rules.md` while being formally approved in two registries — `vital-vision-system/brand/positioning-and-compliance.md` (Approved Product Phrases) and `vital-vision-system/supliful-label-ops/checklists/compliance-claims-checklist.md` ("acceptable") — and cited as approved safe language in D-006, `config/publishing/vv-meta-publisher-checklist.md`, `.claude/skills/vv-orchestrator/SKILL.md`, `vital-vision-system/CLAUDE.md`, and two supliful label-ops prompts. It is also load-bearing in live positioning copy for all four products.
- **Resolution direction:** Completed the canonical list rather than narrowing the eight aligned files to match an incomplete one. No claim weakened; no forbidden term introduced; no approved phrase removed.
- **Approved by:** Lucy, 2026-09-10 (compliance-gate change — required explicit sign-off per D-006).
- **Status:** Verified applied 2026-09-10.

---

## PARTIALLY COMPLETE

### WaveSpeed Generation Ledger — n8n Data Tables (built 2026-09-23)
- **What exists:** `infrastructure/n8n/wavespeed/` (ledger core, generator, schema, validator, import script, tests) and the generated workflow `infrastructure/n8n/workflows/vv-wavespeed-generation-ledger-guarded.json` (34 nodes, Manual Trigger only).
- **Durable store:** n8n Data Table `vv_wavespeed_generation_ledger` (one row per attempt, full `state_history`). Workflow static data is NOT used (D-036).
- **Guards:** model allowlist (`wavespeed-ai/minimax-h3/text-to-video` only) · batch ≤ 1 · duplicate `generation_job_id` block · concurrency 1 (write-then-verify, NOT atomic) · $0.25 per generation · $10.00 per day · SUBMITTING persisted and verified before the single paid POST · paid POST never retried · uncertain → PAYMENT_STATE_UNKNOWN · success → ASSET_CANDIDATE, approved=false, published=false, requires_human_approval=true.
- **Arming switch:** `confirm_paid` defaults to `NOT-APPROVED`; `APPROVED-BY-LUCY` only for the first paid test.
- **Verified (offline, 2026-09-23):** 15/15 unit tests · structural validator 10/10 (A–J) and it catches 6/6 injected unsafe mutations · import script tested against a scratch n8n 2.23.2 (created table + INACTIVE workflow; refused to overwrite) · 15/15 end-to-end scenarios on scratch n8n + local WaveSpeed mock (dry run, success + polling, duplicate, HTTP 500 → UNKNOWN with no retry, concurrency, price ceiling, allowlist, 401, daily cap, 3-way race → 1 POST) · ledger unchanged across an n8n restart.
- **Production target:** `https://n8n.vitalvision.shop` (VPS) — NOT `localhost:5678`. Credential to reference (never modify): `WaveSpeed API - Vital Vision`.
- **NOT yet done (each step needs Lucy's explicit approval):** production import (`import-to-n8n.js --apply`; binds the credential by name) · one production dry run (`confirm_paid=NOT-APPROVED`; free price check only) · `verify-dry-run.js` report · first paid test.
- **Production rehearsal (scratch n8n 2.23.2, 2026-09-23):** plan → apply → one dry run → `verify-dry-run.js` = all production-relevant checks pass (2 URL checks fail by design on the mock variant). Credential bound by name; stand-in connection-test workflow unchanged.
- **Production unknowns:** VPS n8n version (Data Tables + public data-table API required; built against 2.23.2) · VPS database backend (the concurrency guard is only guaranteed on SQLite) · the `WaveSpeed API - Vital Vision` credential type (import supports header/bearer/query/custom generic auth).
- **Access from Claude Code cloud sessions:** `n8n.vitalvision.shop` is currently denied by the environment network policy, and no API key is configured.
- **Unverified assumptions:** WaveSpeed response shapes (pricing `data.discounted_price/unit_price`, submit `data.id`, result `data.status/outputs`) come from the public API docs and the earlier price check; the mock mirrors them. A shape mismatch fails closed (FAILED_CLEAN before the POST, PAYMENT_STATE_UNKNOWN after it).
- **Existing connection-test workflow:** untouched; delete only after this workflow is validated in production.

### Status Gate Architecture (Pack Ready → Creative Ready → Ready to Schedule → Scheduled → Published)
- **Pack Ready:** 5 rows confirmed at this stage ✓
- **Creative Ready:** No rows here yet — requires actual Canva design files (not just briefs)
- **Ready to Schedule:** Empty
- **Scheduled / Published:** Empty
- **Gap:** Visual Production Bridge — the mechanism to create actual Canva designs from briefs — has not been built.

### Supliful Label Ops
- **Module location:** `vital-vision-system/supliful-label-ops/`
- **Status:** Infrastructure built. Workflows 01–12 exist. Design system agents created.
- **Gap:** Actual label reviews and saves are pending Lucy's initiation of each product.

---

## NOT YET BUILT

### Visual Production Bridge
- **What it is:** The connection between Canva briefs (which exist for rows 6–10) and actual Canva design files.
- **What's needed:** Use Canva MCP tools to generate design candidates from the brief specs, produce thumbnails for Lucy's review, and advance rows from Pack Ready → Creative Ready.
- **Why blocked:** Lucy rejected Canva MCP tool calls in a prior session when this was first attempted. Requires explicit approval before proceeding.

### Analytics Layer
- **Status:** Section 6 of `vv-meta-publisher-checklist.md` captures metadata fields (Batch ID, Source Competitor, Hook, Funnel Stage, Metric To Watch) for future attribution. No analytics infrastructure exists yet.
- **What's missing:** Post-performance tracking, winner identification, feedback loop back into content strategy.

### Meta Business Suite Integration / Scheduling Automation
- **Status:** Manual only. Scheduling is performed by Lucy directly in Meta Business Suite (or Metricool / Later / Canva Content Planner).
- **What's missing:** Systematic scheduling workflow, calendar cadence tracking.

### Optimization Feedback Loop
- **Status:** Not built. Depends on analytics layer being built first.

### SuperCMO Installation
- **Status:** NOT INSTALLED. Governance and scope are documented and committed (see VERIFIED / WORKING), but zero runtime capability exists. No SuperCMO skill has ever been invoked for Vital Vision.
- **What's missing:**
  1. Plugin install — `/plugin marketplace add SupercmoHQ/superCMO-skills`
  2. WaveSpeed API key (minimum requirement) in `~/.supercmo/.env`; optional ElevenLabs key for voiceover
  3. `SUPERCMO_TELEMETRY=false` set at install
  4. Lucy-approved spend ceiling before any generation call (Section 8 of the brief template)
- **Blocked on:** Lucy's decision to install and fund it. Not blocked technically.
- **When installed, update:** this section → VERIFIED / WORKING, and reclassify SuperCMO in the `vv-orchestrator` Capability Registry, which currently lists it under FUTURE / NOT ACTIVE (accurate while uninstalled).
- **Does not affect the current bottleneck.** The Visual Production Bridge is a Canva MCP task and does not depend on SuperCMO.

---

## CURRENT BOTTLENECK

**Visual Production Bridge**

Rows 6–10 have complete publishing packs and Canva briefs. The pipeline is blocked at the transition from Pack Ready → Creative Ready because no actual Canva design files exist yet. Lucy cannot review and approve visuals that haven't been created.

The Canva MCP tools are available in Claude Code sessions. Infrastructure and memory setup is complete. This is the single remaining action that unblocks the next phase of publishing.

---

## NEXT ACTION

Build the Visual Production Bridge using the existing Canva briefs for rows 6–10 and the available Canva MCP capabilities:
1. Use `mcp__claude_ai_Canva__generate-design` or `create-design-from-candidate` per brief spec
2. Produce thumbnails for Lucy's review
3. Lucy reviews and approves visuals
4. Advance approved rows: Pack Ready → Creative Ready
5. Run `vv-meta-publisher-checklist` for each approved piece
6. Lucy schedules manually in Meta Business Suite

**Do NOT regenerate the 5 existing Pack Ready assets. Do NOT redo competitor research. Do NOT publish or schedule anything. Human approval mandatory.**
