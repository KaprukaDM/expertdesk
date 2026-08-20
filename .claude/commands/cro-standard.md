---
description: Run CRO fulfillment for a Standard-tier order — dispatches the Standard-tier specialist set
argument-hint: [order/store details]
---

Run the **Standard-tier** CRO fulfillment pipeline. This is a Paid pipeline — the customer has already picked Standard and tokens have been deducted.

Dispatch the `cro-orchestrator` agent, telling it explicitly this order is **Standard** tier so it dispatches exactly:
- `cro-funnel-auditor` (up to 6 pages — Basic's set, expanded)
- `cro-ux-laws-auditor` (UX Laws Audit — key pages checked against ~50 usability/persuasion principles, no external tool needed)
- `cro-ux-reviewer` (mobile+desktop UX review, 1 verification re-scan after fixes, + heatmap/session-recording analysis only as a bonus if the client already has a tool connected)

Run `cro-funnel-auditor` first — `cro-ux-reviewer`'s re-scan references its findings. `cro-ux-laws-auditor` is independent and can run in parallel. Do not let it dispatch Premium-only specialists (`cro-tracking-auditor`, `cro-ab-test-strategist`, `cro-competitor-benchmark`) — Standard doesn't pay for those. Do not promise heatmap analysis as guaranteed — it depends on the client's own tooling.

Order details: $ARGUMENTS

Reference: `Agents and skills/cro team/Paid/README.md`.
