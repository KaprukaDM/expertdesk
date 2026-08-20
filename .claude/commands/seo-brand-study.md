---
description: Run the free SEO brand-study pipeline — research a site and produce 3 tailored packages
argument-hint: [site URL or ServiceRequest details]
---

Run the **Brand Study** pipeline for the SEO service. This is the free, pre-purchase pipeline — it never deducts tokens or creates an `Order`.

1. Dispatch the `seo-brand-study` agent to research the site below (it classifies the site archetype via Step 0, then dispatches the relevant specialist agents, then produces raw findings).
2. Hand its raw findings to the `seo-brand-study-reporter` agent to compile the Internal Report (full detail) and the Client Report (diagnosis-only teaser with a Ranking Opportunity Score).
3. Hand the Client Report to the `brand-study` agent to produce the 3 tailored Basic/Standard/Premium package options in the format `proposal-builder-form.tsx` expects.

Request details: $ARGUMENTS

Reference: `Agents and skills/seo team/Free/README.md`.
