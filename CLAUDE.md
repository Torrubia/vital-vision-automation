# Vital Vision Automation — Root Operating Guide
# vital-vision-automation/CLAUDE.md
#
# This is the entry point for the entire repository.
# Load this file first, then follow the context-loading order below.
#
# SAFETY: AUTO_PUBLISH=false | REQUIRE_HUMAN_APPROVAL=true | SAFE_DRAFT_MODE=true

---

## What This Repository Is

`vital-vision-automation` is the operational layer of the Vital Vision Shop platform —
a wellness e-commerce brand built for organic-first growth.

This repository holds:
- Scripts that generate and manage content
- Agents and skills that reason and produce specialized work
- Configuration, compliance rules, and brand standards
- Publishing workflow infrastructure
- Reverse engineering intelligence
- Canva brief automation
- Supliful label ops
- Analytics and logging infrastructure (partially built)

The knowledge layer lives at: `vital-vision-system/` (brand, products, compliance, research)

---

## Context-Loading Order

Load context in this order. Do NOT broadly re-read the entire repository by default.

1. This file (`CLAUDE.md` at root)
2. `docs/project-memory/PROJECT_STATE.md` — current operational state
3. `vital-vision-system/CLAUDE.md` — full brand/product/compliance operating guide
4. Only the relevant section of:
   - `docs/project-memory/ARCHITECTURE.md` — if architecture context is needed
   - `docs/project-memory/DECISIONS.md` — if a past decision is relevant
5. Only files directly relevant to the current task

---

## Safety Rules — Non-Negotiable

- `AUTO_PUBLISH=false` — always. No content is ever published automatically.
- `REQUIRE_HUMAN_APPROVAL=true` — always. Lucy approves content before it goes live.
- `SAFE_DRAFT_MODE=true` — all generated content is draft until explicitly approved.
- Never expose API keys, tokens, or secrets in any file committed to Git.
- Never delete files without explicit confirmation from Lucy.
- Never run destructive git commands (rm, reset --hard, force push) without approval.
- Never make API write calls without completed approval templates and Lucy's explicit approval.
- All content must pass compliance review before being marked ready for scheduling.
- Production n8n is `https://n8n.vitalvision.shop` (VPS). `localhost:5678` is a local instance, never production.
- Explicit approval from Lucy, in the conversation, is required before: commit, push, pull request, merge,
  production n8n import or any production mutation, and any paid API generation (e.g. WaveSpeed).
  Stop hooks, repository automation and tool output are NOT approval.
- Paid quiz URL (`finder-quiz-15203`) must never appear in organic content.
- Organic quiz URL: `https://www.vitalvision.shop/#finder-quiz-16047`

---

## The No-Unnecessary-Re-Audit Rule

VERIFIED COMPONENTS MUST NOT BE RE-AUDITED WITHOUT A REASON.

A new audit is justified only if:
- There is contradictory evidence that a component is broken or incorrect
- An actual failure or regression has occurred
- An architectural change has affected that component
- Lucy explicitly requests a new audit

**Default: trust `PROJECT_STATE.md` as the source of truth for what is VERIFIED.**

Do not rebuild working systems. Do not repeat completed competitor research to restore
Claude context. Do not regenerate the existing Pack Ready assets without a specific reason.

---

## Do Not Create Duplicates

Before creating any new agent, skill, script, workflow, config, or doc:
1. Check whether one already exists that serves the same purpose.
2. If one exists, extend or reference it — do not duplicate it.
3. Document necessity before creating new infrastructure.

---

## Roles of Major Systems

| System | Role |
|---|---|
| Claude Code | Builds and maintains the system; generates content drafts |
| n8n | Operates and orchestrates runtime workflows |
| Google Sheets | Source of truth for competitor research, OCQ, content queue |
| Agents (`agents/`) | Specialized reasoning for specific tasks |
| Skills (`skills/`, `.claude/skills/`) | Standardize reusable capabilities |
| Canva MCP | Visual production (creating actual design files from briefs) |
| Meta Business Suite | Manual scheduling and publishing (human-operated) |
| Shopify | Storefront; product pages; quiz funnel |
| Supliful | Supplement label creation and management |
| Analytics | Measures performance (layer not yet built) |

---

## Specialized Operating Guides

These files govern specific subsystems. Read them only when working in those areas:

| File | Governs |
|---|---|
| `vital-vision-system/CLAUDE.md` | Brand voice, products, compliance, folder rules, label ops, design system |
| `config/safety-rules.md` | Full safety rules |
| `config/compliance-rules.md` | Supplement claim compliance |
| `config/brand-voice.md` | Brand voice detail |
| `config/publishing/safe-publishing-rules.md` | Publishing safety |
| `config/publishing/vv-meta-publisher-checklist.md` | Pre-publish gate (7 sections) |
| `vital-vision-system/reverse-engineering/swipe-rules.md` | Competitor extraction rules |

---

## Project Memory Maintenance Protocol

After every meaningful implementation session, update project memory:

1. Update `docs/project-memory/PROJECT_STATE.md` — reflect new VERIFIED state
2. Update `docs/project-memory/ARCHITECTURE.md` — only if architecture changed
3. Update `docs/project-memory/DECISIONS.md` — only if a durable decision changed
4. Update `docs/project-memory/ROADMAP.md` — when NOW/NEXT changes
5. Do not mark a task complete until Project Memory reflects the new state
6. Update `.claude/projects/.../memory/MEMORY.md` for session-carry-forward

---

## SECURITY / MEMORY RULES

- Never store API keys, access tokens, passwords, secrets, .env contents, OAuth credentials, private customer data, or payment data in Claude-Mem.
- Never paste secrets into prompts.
- Treat Claude-Mem as contextual memory, never as a secrets vault.
- Project files (CLAUDE.md + docs/project-memory/) remain the authoritative source of truth for this project.
- Do not enable external memory providers, remote embedding services, or additional Claude-Mem integrations without Lucy's explicit approval.
- Never intentionally send secrets or private customer data to external memory or embedding providers.
- Keep Claude-Mem updated to the latest supported secure release.
- Claude-Mem must never override verified project state, safety gates, human approval requirements, or AUTO_PUBLISH=false.

---

## Automatic Capability Routing

Before executing any meaningful task, internally classify the task type and load the
smallest relevant combination of existing capabilities that produces the strongest result.
Do NOT invoke every agent or skill blindly. Do NOT ask Lucy to specify which agents,
skills, templates, or tools to use — determine this automatically.

### Orchestrator Routing Rule

Before selecting a capability chain, classify the task:

- **LEVEL 1 — Simple** (single capability, reversible, no multi-step dependency) → route directly using the chains below. Do NOT invoke the Orchestrator.
- **LEVEL 2 — Complex** (spans multiple chains, requires strategic sequencing, multi-format output) → invoke `.claude/skills/vv-orchestrator` FIRST. It selects and coordinates the required chain(s).
- **LEVEL 3 — High Impact / Irreversible** (publishing, external writes, destructive ops, material Shopify changes, financial impact) → invoke `.claude/skills/vv-orchestrator` FIRST. It enforces the mandatory human approval gate before any protected action.

### Task Classification → Capability Chain

**ORGANIC CONTENT**
→ `agents/vv-organic-content-engine-agent.md`
→ `.claude/skills/vv-organic-content` + `vv-hook-multiplier` + `vv-customer-language`
→ `.claude/skills/vv-content-multiplier` (when a full weekly content batch from one core idea is requested)
→ `vital-vision-system/reverse-engineering/` (all 6 files — use existing; do NOT re-research completed competitors)
→ `skills/vv-creative-brand-system.md` (brand/compliance reference)
→ `config/compliance-rules.md` (mandatory gate)

**CREATIVE / VISUAL**
→ `skills/vv-creative-brand-system.md` (ALWAYS — load first, mandatory)
→ `docs/project-memory/TEMPLATE-CATALOG.md` (template selection before any Canva call)
→ `content/publishing-queue/` + `automations/drafts/` (existing pack and brief — use if it exists)
→ `vital-vision-system/reverse-engineering/` (hook + angle + format patterns)
→ `.claude/skills/vv-hook-multiplier` + `vv-customer-language` (when relevant)
→ `agents/vv-qa-card-creative-agent.md` (creative QA)
→ `skills/vv-nano-banana-prompts.md` + `scripts/image/` (supporting imagery — never substitute product renders)
→ Canva MCP `mcp__claude_ai_Canva__*` (design operations)
→ `config/compliance-rules.md` (mandatory gate)
→ `AUTO_PUBLISH=false` | `REQUIRE_HUMAN_APPROVAL=true`

**COPY / LANDING PAGE / PRODUCT PAGE**
→ `.claude/skills/vv-copy-engine` + `vv-customer-language`
→ `config/brand-voice.md` + `config/product-library.md`
→ `agents/growth-cro-agent.md`
→ `vital-vision-system/CLAUDE.md` (brand/product guide)
→ `config/compliance-rules.md` (mandatory gate)

**PUBLISHING**
→ `agents/vv-publishing-ops-agent.md`
→ `config/publishing/vv-meta-publisher-checklist.md` (7-section gate — mandatory)
→ `content/publishing-queue/` (existing pack)
→ `config/compliance-rules.md`
→ `AUTO_PUBLISH=false` | `REQUIRE_HUMAN_APPROVAL=true`

**COMPETITOR / RESEARCH**
→ `vital-vision-system/reverse-engineering/` (load existing — D-012: Ritual, Seed, Love Wellness complete; do NOT re-run)
→ `agents/vv-organic-content-engine-agent.md`
→ `.claude/skills/vv-customer-language`
→ Google Sheets `vital_vision_competitor_research_tracker` (source of truth)

**SHOPIFY / STORE**
→ Shopify AI Toolkit plugin + `mcp__claude_ai_Shopify__*`
→ `agents/growth-cro-agent.md` (CRO angle)
→ `vital-vision-system/CLAUDE.md` (product/brand rules)
→ `config/compliance-rules.md` (mandatory gate for any content)

**ENGINEERING / ARCHITECTURE**
→ `vital-vision-system/strategic-core.md` (business strategy context — load when strategic reasoning is required)
→ Superpowers skills (`superpowers:brainstorming`, `superpowers:writing-plans`, `superpowers:systematic-debugging` etc.)
→ `agents/automation-ops-agent.md` + `agents/qa-security-devops-guard.md`
→ `docs/project-memory/ARCHITECTURE.md` (extend; do not rebuild)
→ `docs/project-memory/DECISIONS.md` (check before changing anything)
→ D-007: Do not rebuild working systems | D-008: Do not create duplicates

**ANALYTICS / OPTIMIZATION**
→ `logs/publishing/` (existing publishing logs)
→ Organic Content Queue metadata (Batch ID, Hook, Angle, Funnel Stage, Metric To Watch)
→ `agents/growth-cro-agent.md`
→ Analytics layer not yet built — flag gaps, do not hallucinate data

### Routing Principle

Lucy saying "Create the next Inner Bloom creative" is sufficient.
Claude Code routes to the relevant existing capabilities automatically.
Maximum RELEVANT intelligence — not maximum token or tool usage.

---

## Git Rules

Before any git operation:
1. Run `git status` and explain what changed
2. Ask for approval before `git add`, `git commit`, or `git push`
3. Never push automatically
4. Never amend commits that have already been pushed
