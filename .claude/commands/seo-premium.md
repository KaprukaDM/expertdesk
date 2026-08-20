---
description: Run SEO fulfillment for a Premium-tier order — dispatches the full Premium-tier specialist set
argument-hint: [order/site details]
---

Run the **Premium-tier** SEO fulfillment pipeline. This is a Paid pipeline — the customer has already picked Premium and tokens have been deducted.

Dispatch the `seo-orchestrator` agent, telling it explicitly this order is **Premium** tier so it dispatches exactly this set:
- `seo-technical`, `seo-content`, `seo-cluster` (Basic's set)
- `seo-backlinks`, `seo-local` (Standard's additions)
- `seo-performance`, `seo-schema`, `seo-sitemap`, `seo-sxo`, `seo-visual` (the "full site audit report")

Plus, only if applicable: `seo-ecommerce` if the site has a cart/checkout, `seo-google` if GSC/GA4 access was supplied.

Even at Premium — the largest tier — this is ~10-12 of the 18 vendored agents, never the full bench. Don't dispatch `seo-drift`, `seo-flow`, `seo-image-gen`, `seo-dataforseo`, or `seo-geo` — none of them map to a package feature.

Order details: $ARGUMENTS

Reference: `Agents and skills/seo team/Paid/README.md`.
