---
description: Run CRO fulfillment for a Premium-tier order — dispatches the full Premium-tier specialist set
argument-hint: [order/store details]
---

Run the **Premium-tier** CRO fulfillment pipeline. This is a Paid pipeline — the customer has already picked Premium and tokens have been deducted.

Dispatch the `cro-orchestrator` agent, telling it explicitly this order is **Premium** tier so it dispatches exactly:
- `cro-funnel-auditor` (Basic's set, up to 6 pages)
- `cro-ux-laws-auditor` (Standard's addition — UX Laws Audit, no external tool needed)
- `cro-ux-reviewer` (Standard's addition — mobile+desktop UX review, re-scan, + heatmap bonus if connected)
- `cro-tracking-auditor` (GA4 + tracking-setup audit)
- `cro-ab-test-strategist` (A/B test roadmap — 6 ready-to-run ideas, tied to the funnel audit's findings)
- `cro-competitor-benchmark` (2 named competitors)

Run `cro-funnel-auditor` first — `cro-ux-reviewer` and `cro-ab-test-strategist` both reference its findings. `cro-ux-laws-auditor`, `cro-tracking-auditor`, and `cro-competitor-benchmark` are independent and can run in parallel.

Order details: $ARGUMENTS

Reference: `Agents and skills/cro team/Paid/README.md`.
