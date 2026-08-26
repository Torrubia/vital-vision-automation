# Approval Needed Before Live — Quiz Result Pages
# Vital Vision Shop
# Generated: 2026-05-11
# Status: APPROVAL GATE — nothing has been published

---

## TIER 1 — Safe to Do Now (No Approval Needed)

Read-only, local, or planning actions. No live system affected.

| Action | Where | Safe? |
|---|---|---|
| Run `npm run result:check-copy` | Terminal | YES |
| Review all drafts in `drafts/pagefly/` | Local files | YES |
| Review `reports/vqb/result-page-strategy.md` | Local file | YES |
| Review result page routing plan | Local file | YES |
| Review `drafts/pagefly/result-page-layout-template.md` | Local file | YES |
| Run PageSpeed Insights on existing pages | External tool | YES |
| Review current VQB result cards (read-only) | VQB dashboard | YES |
| Screenshot current VQB result card state | Browser | YES |

---

## TIER 2 — Requires Shopify Admin + PageFly Access (Human Action)

No script can do this. Requires human login to Shopify and PageFly.

| Action | Path | Risk |
|---|---|---|
| Create new page in Shopify: `/pages/inner-bloom-result` | Shopify Admin → Pages → Add page | LOW — creates draft page, not published |
| Build Inner Bloom result page in PageFly | Shopify Admin → Apps → PageFly → create new page | LOW — draft only |
| Set page handle to `inner-bloom-result` | Shopify page settings | LOW |
| Set page to noindex (hidden from Google) | Shopify page → SEO → check "Hide from search" | LOW |
| Preview the page in PageFly before publishing | PageFly preview mode | ZERO RISK |
| Publish the Inner Bloom result page | PageFly → Publish | MEDIUM — goes live on store |
| Duplicate PageFly page for other products | PageFly dashboard | LOW — copies draft |

**Publish one page at a time. Test before the next.**

---

## TIER 3 — Requires Shopify Quiz Routing (Human Action)

No script can do this. Requires human access to the native Shopify quiz configuration.

| Action | Where | Risk |
|---|---|---|
| Verify quiz answer → product result page routing | Shopify quiz page settings | ZERO — read-only |
| Screenshot current quiz routing configuration | Browser | ZERO |
| Update quiz answer routing to point to result page | Shopify quiz settings | MEDIUM — changes quiz flow |
| Test full quiz flow after routing update | Take quiz → answer → confirm redirect | ZERO RISK |
| Publish updated quiz routing | Shopify admin → Save | HIGH — goes live for all quiz users |

**Do not update quiz routing until the result page is confirmed live and tested.**
**Do not publish quiz routing change until human sign-off is complete.**

---

## TIER 4 — Requires Code/API Access (Blocked)

These require Shopify API write scope which is not yet enabled.

| Action | Blocked by | Unblock path |
|---|---|---|
| Update product titles via API | Missing write_products scope | Shopify Admin → Develop Apps → add write_products → reinstall → update .env |
| Update product SEO meta via API | Same | Same |
| Create Shopify pages via API | Missing write_content scope | Same process — add write_content scope |

**Not required for PageFly result page strategy — PageFly is built manually.**

---

## TIER 5 — Must Never Be Automated

| Action | Why |
|---|---|
| Publishing a PageFly page | Goes live immediately — requires human review first |
| Publishing quiz routing changes | Updates live quiz for all users — irreversible without manual rollback |
| Changing quiz answer → result page mappings | Changes which product customers see — financial + compliance impact |
| Deleting any result page after routing is active | Breaks quiz flow — sends customers to 404 |
| Changing product prices or variants | Financial impact |
| Modifying Shopify policy pages | Legal documents |
| Enabling Shopping ads or any paid traffic to result pages | Budget impact — requires full page QA first |

---

## Final Approval Checklist

Complete before publishing any result page or changing VQB routing.

### Inner Bloom (Build First)

| Item | Status |
|---|---|
| `npm run result:check-copy` — 0 violations | [ ] |
| Copy draft reviewed and approved by human | [ ] |
| PageFly page built (draft) | [ ] |
| Mobile QA checklist passed (all 8 sections) | [ ] |
| Tested on real iPhone | [ ] |
| CTA links to correct Shopify product page | [ ] |
| FDA disclaimer confirmed on page | [ ] |
| Noindex setting confirmed | [ ] |
| Human sign-off to publish PageFly page | [ ] YES / NO |
| PageFly page published and verified live | [ ] |
| Quiz routing screenshot taken (before change) | [ ] |
| Quiz routing updated to point to result page | [ ] |
| Full quiz flow tested end-to-end | [ ] |
| Human sign-off to publish quiz routing change | [ ] YES / NO |

**Do not proceed to Inner Calm until Inner Bloom is complete and stable.**

---

### Remaining Pages (complete one at a time after Inner Bloom)

| Page | PageFly built | QA passed | Human approved | Published |
|---|---|---|---|---|
| Inner Calm (/pages/inner-calm-result) | [ ] | [ ] | [ ] | [ ] |
| Inner Grow (/pages/inner-grow-result) | [ ] | [ ] | [ ] | [ ] |
| Inner Balance (/pages/inner-balance-result) | [ ] | [ ] | [ ] | [ ] |

---

*No Shopify result pages have been published.*
*No quiz routing has been changed.*
*This is a planning and approval gate document only.*
