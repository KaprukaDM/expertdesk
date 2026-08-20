---
description: Run SEO fulfillment for a Standard-tier order — dispatches the Standard-tier specialist set
argument-hint: [order/site details]
---

Run the **Standard-tier** SEO fulfillment pipeline. This is a Paid pipeline — the customer has already picked Standard and tokens have been deducted.

Dispatch the `seo-orchestrator` agent, telling it explicitly this order is **Standard** tier so it dispatches exactly this set:
- `seo-technical`, `seo-content`, `seo-cluster` (Basic's set)
- `seo-backlinks`, `seo-local`

Plus, only if applicable: `seo-ecommerce` if the site has a cart/checkout, `seo-google` if GSC/GA4 access was supplied.

Do not let it dispatch Premium-only specialists (`seo-performance`, `seo-schema`, `seo-sitemap`, `seo-sxo`, `seo-visual`) — Standard doesn't pay for those.

Order details: $ARGUMENTS

Reference: `Agents and skills/seo team/Paid/README.md`.
