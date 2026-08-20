---
description: Run Social Media Growth fulfillment for a Standard-tier order — dispatches the Standard-tier specialist set
argument-hint: [order/brand details]
---

Run the **Standard-tier** Social Media Growth fulfillment pipeline. This is a Paid pipeline — the customer has already picked Standard and tokens have been deducted.

Dispatch the `social-media-orchestrator` agent, telling it explicitly this order is **Standard** tier so it dispatches exactly this set:
- `social-media-platform-auditor` (2 platforms), `social-media-content-calendar` (15 posts + 8 Reels/Stories), `social-media-reporting` (Basic's set)
- `social-media-competitor-research`, `social-media-brand-voice`

Pass the brand-voice specialist's output into the content-calendar specialist so captions stay on-voice. Do not let it dispatch `social-media-ads-strategist` — Standard doesn't pay for that.

Order details: $ARGUMENTS

Reference: `Agents and skills/social media team/Paid/README.md`.
