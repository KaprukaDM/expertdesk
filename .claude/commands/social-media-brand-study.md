---
description: Run the free Social Media Growth brand-study pipeline — research a brand and produce 3 tailored packages
argument-hint: [brand/business details]
---

Run the **Brand Study** pipeline for the Social Media Growth service. This is the free, pre-purchase pipeline — it never deducts tokens or creates an `Order`.

1. Dispatch the `social-media-brand-study` agent to research the brand below (it classifies the industry archetype via Step 0, runs the 9 audits — Page, Industry, Competitor, Content, Gap, 6-Month Performance, Missing Functions, plus SWOT synthesis — and produces raw findings).
2. Hand its raw findings to the `social-media-brand-study-reporter` agent to compile the Internal Report (full detail, can include draft fix content) and the Client Report (diagnosis-only teaser with an Opportunity Score).
3. Hand the Client Report to the `brand-study` agent to produce the 3 tailored Basic/Standard/Premium package options in the format `proposal-builder-form.tsx` expects.

No literal fix content (no rewritten bio, no ready captions, no built calendar) should reach the client at this stage.

Request details: $ARGUMENTS

Reference: `Agents and skills/social media team/Free/README.md`.
