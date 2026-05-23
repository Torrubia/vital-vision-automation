# Google Search Console — Manual Checklist
# Vital Vision Shop | vitalvision.shop
# Generated: 2026-05-11
# Status: MANUAL ACTIONS ONLY — no automation without explicit approval

---

## Access

URL: https://search.google.com/search-console
Log in with the Google account that owns vitalvision.shop.

---

## SECTION 1 — Add / Verify Property

**Menu path:** Search Console → + Add property (top-left dropdown)

| Step | Action | Notes |
|---|---|---|
| 1.1 | Click the property selector dropdown (top left) | Shows all verified properties |
| 1.2 | Click "Add property" | Opens property type selector |
| 1.3 | Choose **Domain** property (recommended) | Covers all subdomains + http/https |
| 1.4 | Enter: `vitalvision.shop` (no www, no https) | Domain format only |
| 1.5 | Copy the DNS TXT record shown | E.g. `google-site-verification=xxxxx` |
| 1.6 | Go to Shopify → Online Store → Domains → DNS settings | Add TXT record there |
| 1.7 | Return to GSC → click Verify | May take up to 72 hours to propagate |
| 1.8 | Confirm "Ownership verified" status | Green checkmark |

**Alternate (URL prefix):**
- Choose URL prefix → enter `https://vitalvision.shop`
- Verify via HTML tag in Shopify theme (Shopify Admin → Online Store → Themes → Edit code → `theme.liquid`)
- Or verify via Google Analytics if GA4 is already connected

---

## SECTION 2 — Sitemaps

**Menu path:** Search Console → [select property] → left sidebar → **Sitemaps**

| Step | Action | Notes |
|---|---|---|
| 2.1 | Click "Sitemaps" in the left sidebar | Under "Indexing" group |
| 2.2 | In "Add a new sitemap" field, enter: `sitemap.xml` | GSC prepends your domain |
| 2.3 | Click Submit | Status should update to "Success" |
| 2.4 | Check "Submitted sitemaps" table | Confirm status = Success, URLs discovered count |
| 2.5 | If error: open https://vitalvision.shop/sitemap.xml in browser | Confirm it loads valid XML |
| 2.6 | Shopify auto-generates this sitemap — no manual creation needed | Do not create a custom sitemap file |

**Sitemap sections Shopify generates:**
- `/sitemap.xml` — index sitemap, links to sub-sitemaps
- `/sitemap_products_1.xml` — all products
- `/sitemap_collections_1.xml` — all collections
- `/sitemap_pages_1.xml` — all published pages
- `/sitemap_blogs_1.xml` — blog posts (if applicable)

---

## SECTION 3 — Pages / Indexing

**Menu path:** Search Console → [property] → left sidebar → **Pages**

| Step | Action | Notes |
|---|---|---|
| 3.1 | Click "Pages" in left sidebar | Under "Indexing" group |
| 3.2 | Review "Why pages aren't indexed" section | Expand each reason |
| 3.3 | Check for "Crawled — currently not indexed" | Medium concern — add internal links |
| 3.4 | Check for "Duplicate, Google chose different canonical" | Review canonical tags |
| 3.5 | Check for "Excluded by noindex tag" | Confirm these are intentional |
| 3.6 | Check for "Blocked by robots.txt" | Confirm /cart, /checkout, /account are here |
| 3.7 | Click "View data about indexed pages" | Confirm product pages appear |
| 3.8 | Use URL Inspection (top search bar) | Enter a product URL to check its index status |

**URL Inspection — key URLs to check:**

| URL to inspect | Expected result |
|---|---|
| `https://vitalvision.shop` | Indexed |
| `https://vitalvision.shop/products/inner-bloom` (or handle) | Indexed |
| `https://vitalvision.shop/products/inner-calm-magnesium-glycinate` | Indexed |
| `https://vitalvision.shop/products/inner-grow-hair-skin-and-nails-support` | Indexed |
| `https://vitalvision.shop/products/inner-balance-complete-multivitamin` | Indexed |
| `https://vitalvision.shop/cart` | NOT indexed (blocked) |
| `https://vitalvision.shop/checkout` | NOT indexed (blocked) |

---

## SECTION 4 — Performance

**Menu path:** Search Console → [property] → left sidebar → **Search results**

| Step | Action | Notes |
|---|---|---|
| 4.1 | Click "Search results" in left sidebar | Under "Performance" group |
| 4.2 | Set date range to last 3 months | Top right filter |
| 4.3 | Check Total clicks, Impressions, CTR, Position | High-level health |
| 4.4 | Click "Queries" tab | See what keywords drive traffic |
| 4.5 | Click "Pages" tab | See which pages get impressions |
| 4.6 | Click "Countries" tab | Confirm US traffic dominant |
| 4.7 | Click "Devices" tab | Check mobile vs desktop split |
| 4.8 | Filter by a product name (e.g. "inner bloom") | Check branded search volume |
| 4.9 | Look for any queries with impressions but 0 clicks | Opportunity: improve title/meta |

---

## SECTION 5 — Shopping / Merchant Listings

**Menu path:** Search Console → [property] → left sidebar → **Shopping** (if visible)

> Note: This section only appears if your Merchant Center account is linked to Search Console.

| Step | Action | Notes |
|---|---|---|
| 5.1 | Look for "Shopping" in left sidebar | May appear under "Experience" or "Enhancements" |
| 5.2 | If visible: click "Merchant listings" | Shows product rich result status |
| 5.3 | Check for any product schema errors | Merchant listings → Issues |
| 5.4 | Link Merchant Center to Search Console | MC → Settings → Linked accounts → Search Console |

---

## SECTION 6 — Core Web Vitals

**Menu path:** Search Console → [property] → left sidebar → **Core Web Vitals**

| Step | Action | Notes |
|---|---|---|
| 6.1 | Click "Core Web Vitals" in left sidebar | Under "Experience" group |
| 6.2 | Review Mobile tab first (most critical) | Green = Good, Orange = Needs improvement, Red = Poor |
| 6.3 | Click into any "Poor URLs" group | See which pages are slow |
| 6.4 | Run PageSpeed Insights separately | https://pagespeed.web.dev — test homepage + 1 product page |
| 6.5 | Note LCP, INP, CLS scores | Targets: LCP < 2.5s, INP < 200ms, CLS < 0.1 |

---

## SECTION 7 — Manual Actions

**Menu path:** Search Console → [property] → left sidebar → **Manual actions**

| Step | Action |
|---|---|
| 7.1 | Click "Manual actions" in left sidebar | Under "Security & Manual Actions" |
| 7.2 | Confirm: "No issues detected" | This is the expected/desired state |
| 7.3 | If any manual action exists: read the reason and do NOT make changes without legal/compliance review |

---

*No Google Search Console actions were taken by generating this checklist.*
*All steps above are manual — performed by a human logged into GSC.*
