---
description: Run SEO fulfillment for a Basic-tier order — dispatches only the Basic-tier specialists
argument-hint: [order/site details]
---

Run the **Basic-tier** SEO fulfillment pipeline. This is a Paid pipeline — the customer has already picked Basic and tokens have been deducted.

Dispatch the `seo-orchestrator` agent, telling it explicitly this order is **Basic** tier so it dispatches exactly this set and nothing more:
- `seo-technical`
- `seo-content`
- `seo-cluster`

Do not let it dispatch `seo-backlinks`, `seo-local`, or any Standard/Premium-only specialist — Basic doesn't pay for those.

Order details: $ARGUMENTS

Reference: `Agents and skills/seo team/Paid/README.md`.
