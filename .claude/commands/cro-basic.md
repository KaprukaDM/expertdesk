---
description: Run CRO fulfillment for a Basic-tier order — dispatches only the Basic-tier specialist
argument-hint: [order/store details]
---

Run the **Basic-tier** CRO fulfillment pipeline. This is a Paid pipeline — the customer has already picked Basic and tokens have been deducted.

Dispatch the `cro-orchestrator` agent, telling it explicitly this order is **Basic** tier so it dispatches exactly:
- `cro-funnel-auditor` (tracking check, 3 pages, top 5 drop-off points, CTA/form fixes, written fix guide)
- `cro-sins-auditor` (7 Deadly Sins of CRO — fast pass/fail scan on the same 3 pages)

Do not let it dispatch `cro-ux-reviewer`, `cro-tracking-auditor`, `cro-ab-test-strategist`, or `cro-competitor-benchmark` — Basic doesn't pay for those.

Order details: $ARGUMENTS

Reference: `Agents and skills/cro team/Paid/README.md`.
