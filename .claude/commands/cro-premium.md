---
description: Run CRO fulfillment for a Premium-tier order — dispatches the full Premium-tier specialist set
argument-hint: [order/store details]
---

Run the **Premium-tier** CRO fulfillment pipeline. This is a Paid pipeline — the customer has already picked Premium and tokens have been deducted.

Dispatch the `cro-orchestrator` agent, telling it explicitly this order is **Premium** tier so it dispatches exactly:
- `cro-funnel-auditor` (Basic's set, up to 6 pages)
- `cro-sins-auditor` (7 Deadly Sins of CRO scan — carried through every tier)
- `cro-ux-reviewer` (Standard's addition — mobile+desktop UX review checked against ~50 usability/persuasion laws, re-scan with lift analysis, + heatmap bonus if connected)
- `cro-tracking-auditor` (deep GA4 event/measurability audit, beyond the Basic-tier presence check)
- `cro-ab-test-strategist` (A/B test roadmap — 6 ready-to-run ideas, tied to the funnel audit's findings)
- `cro-competitor-benchmark` (2 named competitors)

Run `cro-funnel-auditor` first — `cro-ux-reviewer` and `cro-ab-test-strategist` both reference its findings. `cro-sins-auditor`, `cro-tracking-auditor`, and `cro-competitor-benchmark` are independent and can run in parallel.

Order details: $ARGUMENTS

Reference: `Agents and skills/cro team/Paid/README.md`.
