# DECISIONS — Vital Vision Automation
# docs/project-memory/DECISIONS.md
#
# PURPOSE: Record durable decisions that should NOT be repeatedly reconsidered.
# UPDATE: Only when a new durable decision is made, or an existing one is explicitly changed by Lucy.
# RULE: These decisions stand until Lucy explicitly changes them. Do not re-open them without cause.

Last Updated: 2026-09-10

---

## Business Direction

### D-001: Business Target
The long-term business target is to support growth toward $100K/month in organic-driven revenue.
This is a directional target, not a guarantee. It informs prioritization, not promises.

### D-002: Organic-First Strategy
Vital Vision Shop operates an organic-first content strategy on Meta (Instagram + Facebook).
Paid traffic is separate and uses different infrastructure (different quiz URL, different assets).
Organic and paid must never be mixed in the same asset or URL.

---

## Safety and Publishing

### D-003: AUTO_PUBLISH = false — Always
No content is ever published automatically by any script, agent, workflow, or Claude Code action.
This is a permanent invariant. It cannot be overridden by any automation.

### D-004: Human Approval Mandatory Before Publishing
Lucy must review and approve every content piece — visual AND caption — before it goes live.
Approval of one piece does not constitute approval of similar pieces.
Approval of a piece at one stage does not carry forward to later stages — re-approval is required
if any change is made after sign-off.

### D-005: Pre-Publish Gate Is Required
All content must pass through `config/publishing/vv-meta-publisher-checklist.md` before
advancing to Ready to Schedule. No exceptions.

### D-006: Compliance Controls Are Preserved
Supplement claim compliance rules (`config/compliance-rules.md`) must be enforced at every stage.
No one — not Claude, not a script, not an agent — may weaken or bypass compliance checks.
Safe language: "may support," "helps support," "designed to complement," "supports daily wellness"
Forbidden: cures, treats, heals, fixes, eliminates, reverses disease, guarantees results

---

## System Architecture

### D-007: Do Not Rebuild Working Systems
If a system is VERIFIED in `PROJECT_STATE.md`, do not rebuild it.
Extend working systems. Do not replace them without demonstrating necessity and getting approval.

### D-008: Do Not Create Duplicates
Before creating any new agent, skill, script, workflow, config, or documentation file,
verify that one does not already exist for the same purpose. If it exists, extend or reference it.

### D-009: Role Separation Is Fixed
| Role | System |
|---|---|
| Build / Maintain | Claude Code |
| Orchestrate / Operate runtime | n8n |
| Research / Reason / Generate | Agents + Claude Code |
| Standardize reusable output | Skills |
| Approve | Lucy (human) |
| Measure | Analytics (future) |
| Optimize | Optimization feedback loop (future) |
These roles do not overlap. Claude Code does not operate runtime workflows. n8n does not approve.

### D-010: Two-Layer Repository Structure
`vital-vision-automation/` is the executor (scripts, agents, workflows, config, content).
`vital-vision-system/` is the brain (brand, products, compliance, research, knowledge).
They are complementary. Do not merge, collapse, or reorganize this structure without explicit approval.

---

## Competitor Research

### D-011: Google Sheets Is the Source of Truth for Competitor Intelligence
The `vital_vision_competitor_research_tracker` Google Sheet (Competitors tab + Reverse Engineering
Checklist tab) is the source of truth for competitor research status.
Do not create a parallel tracking system. Do not add columns without approval.

### D-012: Do Not Repeat Completed Competitor Research
Competitor research for Ritual, Seed, and Love Wellness is complete and extracted.
Do not re-run analysis on these competitors merely because a new Claude session lacks context.
Load existing intelligence from `vital-vision-system/reverse-engineering/` instead.

### D-013: Reverse Engineering Is Pattern Intelligence Only
Competitor intelligence is inspiration and structure extraction only.
Never copy: exact captions, hooks word-for-word, scripts, designs, layouts, testimonials,
product claims, medical claims, or competitor brand visual systems.
Swipe rules are defined in `vital-vision-system/reverse-engineering/swipe-rules.md`.

---

## Content and Production

### D-014: Do Not Regenerate Pack Ready Assets Without a Specific Reason
The 5 Pack Ready publishing packs (rows 6–10) and their Canva briefs are verified and intact.
They must not be regenerated, overwritten, or modified without a documented specific reason
and Lucy's explicit approval.

### D-015: Source Traceability Is Required in All Content
Every content piece must maintain traceability from source competitor/pattern through to
published post (Batch ID, Source Competitor, Hook, Angle, Funnel Stage, CTA, Metric to Watch).
This enables the future analytics/optimization feedback loop.

---

## Infrastructure and Tooling

### D-016: Postiz Is Not a Current Priority
Postiz or additional publishing infrastructure beyond Meta Business Suite is not a current
priority. Do not propose, install, or configure Postiz unless Lucy explicitly requests it.

### D-017: Meta API Direct Publishing Requires a Separate Review
Direct Meta API publishing is not permitted until a separate API security review is completed.
All scheduling is manual, performed by Lucy in Meta Business Suite or an approved scheduling tool.

### D-018: No-Unnecessary-Re-Audit Rule
VERIFIED components in `PROJECT_STATE.md` must not be re-audited without a reason.
Justified reasons for a new audit:
- Contradictory evidence that the component is broken or incorrect
- An actual failure or regression
- An architectural change affecting that component
- An explicit request from Lucy
A new Claude Code session starting without context is NOT a justified reason for re-auditing.

---

## Project Memory

### D-019: Project Memory Is the Authoritative Context
`docs/project-memory/PROJECT_STATE.md` is the authoritative record of what is VERIFIED.
Future Claude Code sessions must load it before making assumptions about project state.
If PROJECT_STATE.md and direct file inspection contradict each other, investigate — do not assume.

### D-020: Project Memory Must Be Updated After Every Meaningful Implementation
Do not mark a task complete until PROJECT_STATE.md reflects the new state.
Architecture changes → update ARCHITECTURE.md.
New durable decisions → update DECISIONS.md.
NOW/NEXT changes → update ROADMAP.md.

---

## Creative Production

### D-024: Creative Source of Truth — 7-Level Hierarchy Is Mandatory
All Vital Vision creative production must follow the approved source hierarchy (established 2026-09-02):
1. Public Vital Vision Storefront (vitalvision.shop) — primary customer-facing content source
2. Live Shopify product data — structural/catalog and official product asset source
3. Vital Vision project files (brand voice, product library, compliance rules)
4. Approved Publishing Pack / Canva Brief — post-specific locked copy
5. Compliance rules — mandatory gate; storefront language does not override compliance
6. Reverse-engineering intelligence — structure and inspiration only; never copy competitor identity
7. Canva — execution layer only (layout, composition, visual balance); no copy/product invention
Reference: `skills/vv-creative-brand-system.md`

### D-025: Real Product Assets Are Mandatory — No AI-Generated Substitution
Never hallucinate, recreate, approximate, or AI-generate a Vital Vision product bottle or label.
Use the real Shopify CDN product image for the relevant product.
If the appropriate real product asset cannot be located: STOP and report REAL PRODUCT ASSET REQUIRED.
Real product image URLs for all 4 products are recorded in `skills/vv-creative-brand-system.md`.

### D-026: Storefront Is the Primary Creative/Content Source; Shopify Is Structural
The public vitalvision.shop storefront pages contain richer approved customer-facing copy than
Shopify's short product descriptions. For creative purposes, storefront pages take priority.
Shopify product records provide: identity, title, price, handle, status, official CDN image URLs.
Neither overrides the other — they serve different roles.

### D-027: Canva Is the Execution Layer — Not the Brand Strategist or Copywriter
Canva decides: layout, composition, hierarchy, spacing, visual balance, approved decorative elements.
Canva does NOT decide: product claims, headlines, body copy, CTAs, ingredients, brand identity,
product appearance, or product packaging. All copy comes from approved Vital Vision sources.

### D-028: Row 6 Prior Candidates Rejected — Regeneration Under New Rules
Canva candidates generated in the first Visual Production Bridge attempt (2026-09-02, before the
Creative Source of Truth was established) were rejected and not saved. Row 6 is being regenerated
under the new 7-level hierarchy using the real Inner Bloom Shopify CDN asset (Path A).

### D-029: vv-creative-brand-system Skill Is Required Before Every Generation Call
`skills/vv-creative-brand-system.md` must be loaded and its pre-generation checklist completed
before any Canva generation call for Vital Vision creative. Do not duplicate this skill.

### D-031: All 35 Purchased Templates Are Approved Reusable Structural Assets
ALL 35 templates in "VV TEMPLATE LIBRARY — Supplements — Pack 01 — 35 Templates" are approved
as reusable structural assets for the Vital Vision creative library. They are not disposable
candidates from which only a few are selected. Every template represents a reusable visual
structure (layout, composition, animation, timing, text hierarchy, framing) that can be adapted
for any Vital Vision product, funnel stage, or platform as needed.
The MASTER (design ID: DAHUFEb81CE) must never be modified. Always work from a copy.
A full catalog of all 35 templates is recorded in `docs/project-memory/TEMPLATE-CATALOG.md`.

### D-030: Etsy Template Library — Permanent Usage Rule
The purchased Etsy template pack "VV TEMPLATE LIBRARY — Supplements — Pack 01 — 35 Templates"
(stored in Lucy's Canva account) is a DIRECT ADAPTATION RESOURCE. Preserve each template's
layout and composition exactly while replacing all original brand, product, copy, and
unsupported claims with verified Vital Vision content. Never use as loose structural
inspiration for a different generated design — adapt the actual template.
It must NEVER be treated as a source of truth for:
copy · claims · product information · benefits · CTAs · brand identity.
The original template MASTER must never be modified. Always work from a copy.
Preferred execution: MASTER → copy-design (working copy) → direct edit in Canva.
Full transformation flow and usage rules: `skills/vv-creative-brand-system.md` → Design Execution Resources section.

### D-032: Automatic Capability Routing Is Mandatory
Before executing any meaningful task, Claude Code must internally classify the task type
and load the smallest relevant combination of existing agents, skills, project intelligence,
plugins, and tools that produces the strongest result.
Lucy must not need to specify agents, skills, the template catalog, reverse-engineering
intelligence, customer language systems, or creative systems for each task.
The routing doctrine is codified in `## Automatic Capability Routing` in root `CLAUDE.md`.
This supplements — does not replace — D-007 (no rebuild), D-008 (no duplicates),
D-018 (no unnecessary re-audit), and D-019 (project memory is authoritative).

---

## External Production Tooling — SuperCMO

### D-033: SuperCMO Is a Downstream Production Tool — Not the Strategic Control Plane
SuperCMO is approved as CONDITIONAL GO (2026-09-10) for creative production only. It operates
DOWNSTREAM of VV strategy, content intelligence, Product Truth, and compliance:
`Approved Creative Brief → SuperCMO Production → VV QA → Human Approval`
The VV Orchestrator (`.claude/skills/vv-orchestrator`) remains the sole strategic control plane.

PERMITTED capabilities: `generating-ugc-videos`, `generating-ad-videos`, `generating-product-photos`,
`generating-ai-actors`, `generating-audio`, `generating-images`, `generating-storyboards`,
`generating-videos`, `adapting-formats`.

EXCLUDED capabilities — must NOT be routed through VV: `planning-campaigns` and `onboarding-user`
(duplicate VV Orchestrator and `skills/vv-creative-brand-system.md` — D-008), `analyzing-brand`
(inference risk against a verified brand system), `analyzing-products` on VV products (see D-034),
`writing-ad-copy` (VV is organic-first — D-002), `writing-video-scripts` (use VV-generated,
compliance-reviewed scripts instead).

SuperCMO credentials live in `~/.supercmo/.env`, separate from the VV project `.env`, and are never
committed (D-022). Telemetry is disabled at install (`SUPERCMO_TELEMETRY=false`).
Full routing detail: `docs/project-memory/ARCHITECTURE.md` → SuperCMO section.

### D-034: Product Truth Boundary — SuperCMO Must Never Infer VV Product Facts
`analyzing-products` is permitted ONLY for competitor product analysis. It must never run against
Inner Bloom, Inner Calm, Inner Balance, or Inner Grow to establish or infer product facts, and its
output must never become input to a VV production brief.
VV's canonical product sources (`config/product-library.md` + `skills/vv-creative-brand-system.md`,
under the D-024 7-level hierarchy) are the sole authority on VV product truth.
This extends D-025: no AI-generated or AI-inferred substitution for real product truth or assets.

### D-035: Every SuperCMO Call Requires the Production Brief Template and Pre-Generation Compliance
`config/supercmo-vv-production-brief-template.md` is the mandatory input wrapper for every SuperCMO
production call. It must be completed from VV canonical sources before any SuperCMO skill is invoked.
All scripts, copy, and audio must pass `config/compliance-rules.md` review BEFORE video or audio
generation begins — compliance is a pre-generation gate, not a post-production cleanup step (D-006).
SuperCMO output is draft only: `AUTO_PUBLISH=false`, `REQUIRE_HUMAN_APPROVAL=true` (D-003, D-004),
and it still passes the pre-publish gate in `config/publishing/vv-meta-publisher-checklist.md` (D-005).

---

## Claude-Mem

### D-021: Claude-Mem Is an Auxiliary Layer, Not the Source of Truth
Claude-Mem (installed 2026-09-02, user scope) is an auxiliary persistent-memory layer available
across Claude Code projects. It does NOT replace the Vital Vision project memory system.
Root `CLAUDE.md` + `docs/project-memory/` remain the authoritative source of truth for this project.
Claude-Mem must never override verified project state, safety gates, human approval requirements,
or AUTO_PUBLISH=false.

### D-022: Claude-Mem Security Boundaries Are Non-Negotiable
Never store in Claude-Mem: API keys, access tokens, passwords, .env contents, OAuth credentials,
private customer data, payment data, or any other secrets.
Never paste secrets into prompts.
Treat Claude-Mem as contextual memory only — never as a secrets vault.
These rules are codified in `## SECURITY / MEMORY RULES` in root `CLAUDE.md`.

### D-023: External Memory Integrations Require Lucy's Explicit Approval
Do not enable external memory providers, remote embedding services, or additional Claude-Mem
integrations without Lucy's explicit approval. The default configuration only.
