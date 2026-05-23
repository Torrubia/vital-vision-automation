# Approval Needed Before Execution — Google/SEO Foundation
# Vital Vision Shop | vitalvision.shop
# Generated: 2026-05-11
# Status: AWAITING APPROVAL — nothing has been changed

---

## Summary

This document defines what is safe to do now, what requires specific access,
and what must not be automated. No live changes have been made.

---

## TIER 1 — Safe to Do Now (No Approval Needed)

These actions are read-only, local, or informational. No live systems affected.

| Action | Where | Safe? |
|---|---|---|
| Run `npm run seo:check-copy` — compliance scan of SEO drafts | Terminal | YES |
| Review `drafts/seo/homepage-title-meta-options.md` | Local file | YES |
| Review `drafts/seo/product-title-meta-options.md` | Local file | YES |
| Review all reports in `reports/google/` | Local files | YES |
| Open https://vitalvision.shop/sitemap.xml in browser | Browser | YES |
| Open https://vitalvision.shop/robots.txt in browser | Browser | YES |
| Run PageSpeed Insights on the homepage | External tool | YES |
| Run Google Rich Results Test on a product URL | External tool | YES |
| Select preferred title/meta options from drafts | Local decision | YES |

---

## TIER 2 — Requires Google Search Console Access (Human Login)

These require logging into GSC as the account owner. No automation.

| Action | Why Manual | Risk |
|---|---|---|
| Verify vitalvision.shop as a Domain property | Requires DNS TXT record or HTML tag | LOW — verification only |
| Submit sitemap.xml | Requires GSC account access | LOW — read-only submission |
| Review Pages / Coverage report | Login required | LOW — no changes |
| Review Core Web Vitals report | Login required | LOW — no changes |
| Check for Manual Actions | Login required | LOW — no changes |
| Inspect individual product URLs | Login required | LOW — no changes |
| Review Performance / Queries data | Login required | LOW — no changes |

**Do not share GSC login credentials with any script or tool.**
**All GSC actions are performed manually by a human.**

---

## TIER 3 — Requires Google Merchant Center Access (Human Login)

These require logging into Merchant Center as the account owner. No automation.

| Action | Why Manual | Risk |
|---|---|---|
| Check account health and suspension status | Login required | LOW — read-only |
| Review product disapprovals and diagnostics | Login required | LOW — read-only |
| Confirm shipping and return policy settings | Login required | LOW — read-only |
| Verify website claim status | Login required | LOW — read-only |
| Check for misrepresentation flags | Login required | MEDIUM — may require copy changes |
| Check for healthcare/restricted product flags | Login required | MEDIUM — may require appeals |
| Review free listings performance | Login required | LOW — read-only |

**If any MC issue requires action (e.g. appeal, copy edit), get explicit approval first.**
**Do NOT submit appeals or edit product listings without review.**

---

## TIER 4 — Requires Shopify Admin Access (Human Login or Approved Script)

These require Shopify admin access. Some can be scripted with approved token + scope.

| Action | Method | Approved? |
|---|---|---|
| Apply homepage SEO title and meta description | Shopify Admin → Online Store → Preferences | PENDING APPROVAL |
| Apply product SEO titles and meta descriptions | Shopify Admin → Products → SEO section | PENDING APPROVAL |
| Confirm product handles are clean | Shopify Admin → Products | Manual review |
| Add alt text to product images | Shopify Admin → Products → Images | PENDING APPROVAL |
| Add/update collection SEO copy | Shopify Admin → Collections | PENDING APPROVAL |
| Update Shopify product titles via API | `npm run shopify:product-seo-apply` | BLOCKED — write_products scope needed |

**The `SHOPIFY_ADMIN_ACCESS_TOKEN` in `.env` currently only has read_products scope.**
**To unblock API writes: update token scope in Shopify Admin → Apps → Develop Apps.**

---

## TIER 5 — Must NOT Be Automated

These actions must never be triggered by a script without explicit per-run human approval.

| Action | Why |
|---|---|
| Submitting Google Search Console appeals | Irreversible — incorrect appeal worsens standing |
| Submitting Merchant Center appeals | Same as above |
| Publishing Shopify theme changes | Affects live storefront immediately |
| Enabling Shopping ads in Merchant Center | Real budget impact |
| Changing product prices or inventory | Financial impact |
| Modifying Shopify policy pages (returns, privacy, terms) | Legal documents |
| Adding/removing products from Google feed | Can affect all product visibility |
| Changing canonical URLs or product handles | Can cause index loss |
| Deleting any backup files | Irreversible data loss |

---

## Final Approval Checklist

Complete this checklist before any TIER 4 or TIER 5 actions are taken:

| Item | Approved? |
|---|---|
| Homepage SEO title selected (choose T# from homepage-title-meta-options.md) | [ ] T___ |
| Homepage meta description selected (choose M#) | [ ] M___ |
| Inner Bloom SEO title selected | [ ] IB-T___ |
| Inner Bloom meta description selected | [ ] IB-M___ |
| Inner Calm SEO title selected | [ ] IC-T___ |
| Inner Calm meta description selected | [ ] IC-M___ |
| Inner Grow SEO title selected | [ ] IG-T___ |
| Inner Grow meta description selected | [ ] IG-M___ |
| Inner Balance SEO title selected | [ ] IB2-T___ |
| Inner Balance meta description selected | [ ] IB2-M___ |
| `npm run seo:check-copy` passed with 0 violations | [ ] |
| Shopify write_products token scope updated | [ ] |
| Human sign-off on all proposed copy | [ ] |

---

*No Google APIs were called. No Shopify content was modified. No credentials were accessed.*
*This document is a planning and approval gate only.*
