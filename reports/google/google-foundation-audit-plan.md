# Google Foundation Audit Plan — Vital Vision Shop
# Generated: 2026-05-11
# Status: AUDIT PLAN ONLY — no changes made to any live system
# Domain: vitalvision.shop

---

## Overview

This plan validates the Google/SEO foundation for vitalvision.shop before any changes are applied.
All items are manual or report-only until explicitly approved.

---

## 1. Domain Validation Checklist

| # | Check | How to Verify | Status |
|---|---|---|---|
| 1.1 | Domain resolves correctly | Visit https://vitalvision.shop in browser | [ ] |
| 1.2 | HTTPS is active (SSL certificate valid) | Look for padlock in browser / check SSL Labs | [ ] |
| 1.3 | www redirects to apex (or vice versa) | Visit https://www.vitalvision.shop — confirm redirect | [ ] |
| 1.4 | No mixed content warnings | Chrome DevTools → Console → check for HTTP resource errors | [ ] |
| 1.5 | robots.txt is accessible | Visit https://vitalvision.shop/robots.txt | [ ] |
| 1.6 | sitemap.xml is accessible | Visit https://vitalvision.shop/sitemap.xml | [ ] |
| 1.7 | Canonical domain is consistent in Shopify | Shopify Admin → Domains → confirm primary domain | [ ] |
| 1.8 | Old domain (if any) redirects to vitalvision.shop | Visit old domain if applicable | [ ] |

---

## 2. Google Search Console Checklist

| # | Check | Status |
|---|---|---|
| 2.1 | Search Console account exists and is accessible | [ ] |
| 2.2 | vitalvision.shop is added as a property | [ ] |
| 2.3 | Property type: Domain property (preferred) or URL prefix | [ ] |
| 2.4 | Domain ownership verified via DNS TXT record | [ ] |
| 2.5 | No manual actions or penalties active | [ ] |
| 2.6 | Coverage report reviewed — no critical errors | [ ] |
| 2.7 | Core Web Vitals report reviewed | [ ] |
| 2.8 | Mobile usability report reviewed | [ ] |
| 2.9 | Rich results / Shopping tab visible | [ ] |

---

## 3. Sitemap Submission Checklist

| # | Check | How | Status |
|---|---|---|---|
| 3.1 | Confirm Shopify sitemap URL: https://vitalvision.shop/sitemap.xml | Browser | [ ] |
| 3.2 | Sitemap contains product URLs | Open sitemap XML | [ ] |
| 3.3 | Sitemap contains collection URLs | Open sitemap XML | [ ] |
| 3.4 | Sitemap contains page URLs | Open sitemap XML | [ ] |
| 3.5 | Sitemap does NOT contain noindex pages | Cross-check with Shopify page settings | [ ] |
| 3.6 | Submit sitemap in Search Console | GSC → Sitemaps → Add sitemap URL | [ ] |
| 3.7 | Confirm GSC shows sitemap as "Success" | GSC → Sitemaps | [ ] |
| 3.8 | Check sitemap last submitted date | GSC → Sitemaps | [ ] |

---

## 4. Indexing Checklist

| # | Check | Priority | Status |
|---|---|---|---|
| 4.1 | Homepage is indexed | GSC → Pages or site:vitalvision.shop | HIGH | [ ] |
| 4.2 | All 4 Inner Line product pages are indexed | GSC → Pages | HIGH | [ ] |
| 4.3 | Collection pages are indexed | GSC → Pages | MEDIUM | [ ] |
| 4.4 | Quiz landing page is indexed (if intended) | GSC → Pages | REVIEW | [ ] |
| 4.5 | Thank you / order pages are NOT indexed | GSC → Pages → check noindex | HIGH | [ ] |
| 4.6 | /cart and /checkout are NOT indexed | robots.txt / GSC | HIGH | [ ] |
| 4.7 | /account pages are NOT indexed | robots.txt / GSC | HIGH | [ ] |
| 4.8 | PageFly draft pages are NOT indexed | Shopify → Pages → check visibility | MEDIUM | [ ] |
| 4.9 | No duplicate content across product variants | Check canonical tags in HTML | MEDIUM | [ ] |

---

## 5. Merchant Center Checklist

| # | Check | Priority | Status |
|---|---|---|---|
| 5.1 | Merchant Center account exists | [ ] | HIGH | [ ] |
| 5.2 | vitalvision.shop is claimed and verified | MC → Business info | HIGH | [ ] |
| 5.3 | No active account-level suspension | MC → Diagnostics | CRITICAL | [ ] |
| 5.4 | No misrepresentation policy violation | MC → Diagnostics | CRITICAL | [ ] |
| 5.5 | Products are not disapproved en masse | MC → Products → Diagnostics | HIGH | [ ] |
| 5.6 | Shipping settings configured | MC → Shipping and returns | HIGH | [ ] |
| 5.7 | Return policy set | MC → Shipping and returns | HIGH | [ ] |
| 5.8 | Business info complete (address, phone) | MC → Business info | MEDIUM | [ ] |
| 5.9 | Feed source is Shopify (automatic sync) | MC → Products → Feeds | MEDIUM | [ ] |
| 5.10 | Products tagged as health/wellness — not pharmaceuticals | MC → Products | HIGH | [ ] |
| 5.11 | No restricted healthcare product flags | MC → Diagnostics → Item issues | HIGH | [ ] |
| 5.12 | GTIN/barcode present on products (or exemption applied) | MC → Products → Diagnostics | MEDIUM | [ ] |
| 5.13 | Price in feed matches live Shopify price | Compare MC vs store | HIGH | [ ] |
| 5.14 | Free Listings active (not just Shopping ads) | MC → Performance → Free listings | MEDIUM | [ ] |

---

## 6. Shopify SEO Checklist

| # | Check | Where | Status |
|---|---|---|---|
| 6.1 | Homepage title tag set | Shopify → Online Store → Preferences → Title | [ ] |
| 6.2 | Homepage meta description set | Shopify → Online Store → Preferences → Meta description | [ ] |
| 6.3 | All 4 product SEO titles reviewed | Shopify → Products → each product → SEO section | [ ] |
| 6.4 | All 4 product meta descriptions reviewed | Same as above | [ ] |
| 6.5 | Product handles are clean/descriptive | Shopify → Products → URL handle | [ ] |
| 6.6 | Collection pages have SEO titles and descriptions | Shopify → Collections | [ ] |
| 6.7 | Alt text on product images | Shopify → Products → Images → Alt text | [ ] |
| 6.8 | Page speed checked (Core Web Vitals) | PageSpeed Insights | [ ] |
| 6.9 | Structured data (product schema) confirmed | Google Rich Results Test | [ ] |
| 6.10 | No broken links on key pages | Manual or Ahrefs / Screaming Frog | [ ] |

---

## 7. Compliance Risk Checklist

| # | Risk | Check | Status |
|---|---|---|---|
| 7.1 | No disease claims in product titles or meta descriptions | Run npm run seo:check-copy | [ ] |
| 7.2 | No cure/treat/prevent/diagnose/reverse/heal language | Run npm run seo:check-copy | [ ] |
| 7.3 | No "FDA approved" claims | Run npm run seo:check-copy | [ ] |
| 7.4 | No guaranteed results claims | Run npm run seo:check-copy | [ ] |
| 7.5 | No anxiety/depression/insomnia claims | Run npm run seo:check-copy | [ ] |
| 7.6 | Merchant Center: supplement products not flagged as drugs | MC → Products → Diagnostics | [ ] |
| 7.7 | "Results may vary" present where outcome language appears | Review all SEO drafts | [ ] |
| 7.8 | No testimonials implying guaranteed outcomes | Review all pages | [ ] |

---

## Files in This Audit

| File | Purpose |
|---|---|
| `reports/google/google-foundation-audit-plan.md` | This file — master checklist |
| `reports/google/search-console-manual-checklist.md` | GSC step-by-step manual paths |
| `reports/google/merchant-center-manual-checklist.md` | MC step-by-step manual paths |
| `reports/google/approval-needed-before-execution.md` | What requires approval before action |
| `drafts/seo/homepage-title-meta-options.md` | Draft SEO copy for homepage |
| `drafts/seo/product-title-meta-options.md` | Draft SEO copy for all 4 products |
| `scripts/seo/check-seo-copy-compliance.js` | Automated compliance scan |

---

*No changes were made to any live system by generating this plan.*
*All actions require human review and explicit approval before execution.*
