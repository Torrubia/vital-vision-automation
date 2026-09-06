# ROADMAP — Vital Vision Automation
# docs/project-memory/ROADMAP.md
#
# PURPOSE: Directional roadmap organized by NOW / NEXT / LATER.
# UPDATE: When NOW or NEXT changes. Not a backlog — stay lean.
# RULE: Do not add items here that are speculative or far future. Keep it focused.

Last Updated: 2026-09-02

---

## NOW — In Progress

### Infrastructure + Memory Setup
**Status: COMPLETE as of 2026-09-02**

Completed across two sessions (2026-09-01 → 2026-09-02):
- `CLAUDE.md` (root) — repository entry point and operating guide
- `docs/project-memory/` — PROJECT_STATE, ARCHITECTURE, DECISIONS, ROADMAP
- All 6 reverse-engineering intelligence files populated from CONTENT_PLAN
- `new-competitor-onboarding.md` created
- Traceability block added to `generate-publishing-packs.js` and `skills/vv-canva-brief-builder.md`
- `config/publishing/vv-meta-publisher-checklist.md` created (7-section pre-publish gate)
- Claude-Mem installed (user scope) as auxiliary memory layer
- `## SECURITY / MEMORY RULES` added to root `CLAUDE.md` and verified

**Infrastructure and memory setup is COMPLETE. Moving to NEXT.**

---

## NEXT — Approved and Ready to Execute

### Visual Production Bridge
**Status: APPROVED — ready to begin**

**What this is:**
Generate actual Canva design files (creative candidates) for the 5 existing Pack Ready rows (6–10).
These rows have complete publishing packs and Canva briefs. The only missing piece is actual visuals.

**How it works:**
1. Use Canva MCP tools (`mcp__claude_ai_Canva__generate-design` or `create-design-from-candidate`)
2. Brief each design using the existing Canva briefs for rows 6–10
3. Generate thumbnails for Lucy's review
4. Lucy reviews and approves visuals
5. Approved rows advance: Pack Ready → Creative Ready
6. Run `vv-meta-publisher-checklist` for each approved piece
7. Lucy schedules manually in Meta Business Suite

**After Visual Production Bridge:**

### First Publishing Cycle (rows 6–10)
- Run pre-publish checklist for each approved piece
- Lucy schedules in Meta Business Suite
- Log each published post in `logs/publishing/`
- Update Google Sheet: Post Status → Published

---

## LATER — Planned But Not Immediate

### Analytics Layer
Build performance tracking for published posts.
- Post-performance data collection (views, saves, comments, link clicks, story TTR)
- Attribution of performance to: Source Competitor, Hook, Angle, Funnel Stage, Content Type
- Dashboard or reporting structure (format TBD)
**Depends on:** First publishing cycle being live with real data to measure.

### Optimization Feedback Loop
Use analytics winners to inform future content.
- Identify top-performing hooks, angles, formats, funnel stages
- Feed winning patterns back into CONTENT_PLAN and reverse engineering intelligence
- Update content priorities in OCQ based on performance
**Depends on:** Analytics layer being built and populated.

### Scaling
- Additional competitors onboarded via `new-competitor-onboarding.md` playbook
- Additional products added to content pipeline (Inner Balance, Inner Grow content batches)
- Content cadence increase based on what performs
**Depends on:** First cycle complete, analytics informing what to scale.

---

## Explicitly Out of Scope (Do Not Add)

- Postiz or additional publishing infrastructure — not a current priority (see DECISIONS.md D-016)
- Direct Meta API publishing — requires separate security review (see DECISIONS.md D-017)
- Paid traffic content — separate infrastructure, separate URLs, separate workflow
- New Google Sheet tabs or columns — do not create without explicit approval
