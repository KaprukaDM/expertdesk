---
description: Run CRO fulfillment for a Standard-tier order — dispatches the Standard-tier specialist set
argument-hint: [order/store details]
---

Run the **Standard-tier** CRO fulfillment pipeline. This is a Paid pipeline — the customer has already picked Standard and tokens have been deducted.

Dispatch the `cro-orchestrator` agent, telling it explicitly this order is **Standard** tier so it dispatches exactly:
- `cro-funnel-auditor` (up to 6 pages — Basic's set, expanded)
- `cro-sins-auditor` (7 Deadly Sins of CRO scan — Basic's addition, carried through every tier)
- `cro-ux-reviewer` (mobile+desktop UX review checked against ~50 usability/persuasion laws — no external tool needed, 1 verification re-scan with lift analysis, + heatmap/session-recording analysis only as a bonus if the client already has a tool connected)

Run `cro-funnel-auditor` first — `cro-ux-reviewer`'s re-scan references its findings. Do not let it dispatch Premium-only specialists (`cro-tracking-auditor`, `cro-ab-test-strategist`, `cro-competitor-benchmark`) — Standard doesn't pay for those. Do not promise heatmap analysis as guaranteed — it depends on the client's own tooling.

Order details: $ARGUMENTS

Reference: `Agents and skills/cro team/Paid/README.md`.
