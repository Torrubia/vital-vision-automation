# Shopify API Safe Mode Notes

## Status: Phase 1 — Research and Planning Only

These notes document how the Shopify Admin API can be used safely for label-adjacent product operations at Vital Vision Shop. No live API calls have been made from this module.

---

## Relevant Shopify Admin API Areas

### Products API

The Shopify Admin API's Products endpoint allows reading and updating product data.

**Relevant for Vital Vision label operations:**
- Reading product title, description, tags
- Reading product images (to confirm label images are current)
- Reading variant details (quantity, size — to match label net quantity)
- Updating product description (for Shopify sync after label change)
- Updating product images (if label image needs to be updated)

**Key endpoint (REST):** `GET /admin/api/[version]/products.json`
**Key endpoint (GraphQL):** `query { products(first: 10) { edges { node { id title descriptionHtml } } } }`

---

## Authentication

Shopify Admin API requires:
- A private app API key and password (for single-store access), OR
- An OAuth access token (for public app access)

For Vital Vision's single-store use:
- Use a **Custom App** in Shopify Admin → Settings → Apps and sales channels → Develop apps
- Generate an API key with only the required scopes
- Store the access token in `.env` only — never in any tracked file

---

## Required API Scopes by Operation

| Operation | Scope Required | Risk Level |
|---|---|---|
| Read products | `read_products` | Low |
| Read product images | `read_products` | Low |
| Update product description | `write_products` | Medium |
| Update product images | `write_products` | Medium |
| Publish/unpublish product | `write_products` | High |
| Delete product | `write_products` | Critical |
| Read inventory | `read_inventory` | Low |
| Update inventory | `write_inventory` | High |
| Read orders | `read_orders` | Low |

**Principle:** Request only the scopes you actually need. Start with `read_products` only.

---

## Rate Limits

Shopify Admin API rate limits (as of 2024):
- REST API: 2 requests per second (leaky bucket algorithm, bucket size 40)
- GraphQL API: Points-based cost system — 1000 points per 10 seconds
- For label ops, rate limits are unlikely to be a concern (reviewing 4 products)

---

## Safe Testing Approach

Before making any live API calls to real products:

1. **Create a test product in Shopify** — a dummy product not connected to Supliful, not visible to customers (status: Draft), used only for API testing.
2. **Test all read operations** on the test product first.
3. **Test all write operations** on the test product first.
4. **Review the result visually** in Shopify Admin after each test write.
5. Only after successful, verified test writes proceed to real products — one at a time, with Lucy's approval.

---

## Shopify Product Fields Relevant to Label Sync

| Field | API name | Notes |
|---|---|---|
| Product title | `title` | Must match label product name |
| Product description | `body_html` or `descriptionHtml` | Checked against label claims |
| Variant title | `title` (variant) | Should match net quantity |
| Product images | `images` | Should show current label version |
| Product status | `status` | active / draft / archived |
| Product tags | `tags` | Not on label, but useful for categorization |

---

## GraphQL Example — Read Product (Safe, Read-Only)

```graphql
query GetProductForLabelSync($id: ID!) {
  product(id: $id) {
    id
    title
    descriptionHtml
    status
    variants(first: 5) {
      edges {
        node {
          id
          title
          sku
        }
      }
    }
    images(first: 5) {
      edges {
        node {
          id
          src
          altText
        }
      }
    }
  }
}
```

**Note:** This is a read-only query. It does not modify any data.

---

## Research Tasks Still Needed

- [ ] Create a Shopify Custom App for label ops (read_products scope only for Phase 2)
- [ ] Identify the Shopify Product GIDs for Inner Balance, Inner Bloom, Inner Calm, Inner Grow
- [ ] Test read query on one product and log the response
- [ ] Document the exact fields returned for each product

---

## Update Log

| Date | Finding |
|---|---|
| [date] | Initial research notes created |
| | |
