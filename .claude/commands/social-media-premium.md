---
description: Run Social Media Growth fulfillment for a Premium-tier order — dispatches the full Premium-tier specialist set
argument-hint: [order/brand details]
---

Run the **Premium-tier** Social Media Growth fulfillment pipeline. This is a Paid pipeline — the customer has already picked Premium and tokens have been deducted.

Dispatch the `social-media-orchestrator` agent, telling it explicitly this order is **Premium** tier so it dispatches exactly this set:
- `social-media-platform-auditor` (up to 5 platforms), `social-media-content-calendar` (18 posts + 15 Reels/Stories), `social-media-reporting` (Basic's set, at greater depth)
- `social-media-competitor-research` (deeper benchmark), `social-media-brand-voice` (Standard's additions)
- `social-media-ads-strategist`

Pass the brand-voice specialist's output into the content-calendar specialist so captions stay on-voice.

Order details: $ARGUMENTS

Reference: `Agents and skills/social media team/Paid/README.md`.
