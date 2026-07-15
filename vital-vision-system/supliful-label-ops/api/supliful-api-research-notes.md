# Supliful API Research Notes

## Status: Phase 1 — Research Only

No live API calls have been made. These notes are based on public documentation review and will be updated as research progresses.

---

## What is Supliful?

Supliful is a white-label supplement fulfillment platform. It connects to Shopify via an app and allows brands to:
- Design and save product labels in a web-based label editor
- Sell products through their Shopify store
- Have Supliful fulfill orders directly to customers

---

## Supliful API — Current Knowledge

### Public API Availability

As of the time this document was created, Supliful does not appear to offer a widely documented public REST API for label management. The primary integration method is through:

1. **Shopify App** — Supliful installs as a Shopify app. Order fulfillment is routed through the app automatically.
2. **Web-based label editor** — Label design and saving is done through the Supliful web dashboard at app.supliful.com.

### Recommended First Research Step

Before building any integration:

1. Log in to your Supliful account at app.supliful.com.
2. Check Settings → API or Developer settings for any API key or webhook options.
3. Review the Supliful Help Center or contact Supliful support to ask: "Do you offer a REST API for product and label management?"
4. Document the answer here.

### What to Ask Supliful Support

> "I manage multiple supplement products through Supliful and would like to automate label review and product data reading using your API. Do you offer:
> 1. A REST API for reading product data?
> 2. A REST API for reading label status or metadata?
> 3. Webhook notifications when a label is saved or an order is placed?
> 4. Any developer documentation or partner API access?"

---

## Known Supliful-Shopify Integration Points

Even without a direct Supliful API, there are integration points via Shopify:

| Integration | Method | Notes |
|---|---|---|
| Product catalog | Supliful syncs products to Shopify | Products appear in Shopify Admin after connection |
| Order fulfillment | Automatic via Supliful app | Orders placed in Shopify are fulfilled by Supliful |
| Product metadata | Available via Shopify Admin API | Product title, description, variants, images |
| Inventory | May be manageable via Shopify API | Depends on Supliful's inventory settings |

---

## Research Tasks Still Needed

- [ ] Check Supliful dashboard for any API settings
- [ ] Contact Supliful support about API availability
- [ ] Review Supliful's Shopify app documentation for webhook support
- [ ] Identify if label metadata (label version, last saved date) is exposed anywhere
- [ ] Check if Supliful exposes a product feed or catalog export

---

## Update Log

| Date | Finding |
|---|---|
| [date] | Initial research notes created |
| | |
