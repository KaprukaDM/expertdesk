---
description: Run Social Media Growth fulfillment for a Basic-tier order — dispatches only the Basic-tier specialists
argument-hint: [order/brand details]
---

Run the **Basic-tier** Social Media Growth fulfillment pipeline. This is a Paid pipeline — the customer has already picked Basic and tokens have been deducted.

Dispatch the `social-media-orchestrator` agent, telling it explicitly this order is **Basic** tier so it dispatches exactly this set and nothing more:
- `social-media-platform-auditor` (1 platform)
- `social-media-content-calendar` (15 posts + 2 Reels)
- `social-media-reporting`

Do not let it dispatch `social-media-competitor-research`, `social-media-brand-voice`, or `social-media-ads-strategist` — Basic doesn't pay for those.

Order details: $ARGUMENTS

Reference: `Agents and skills/social media team/Paid/README.md`.
