---
description: Run the free CRO brand-study pipeline — research a store and produce 3 tailored packages
argument-hint: [store URL or ServiceRequest details]
---

Run the **Brand Study** pipeline for the CRO service. This is the free, pre-purchase pipeline — it never deducts tokens or creates an `Order`.

1. Dispatch the `cro-brand-study` agent to research the store below (it classifies the business model via Step 0, walks the actual buying path as a customer would, then produces raw findings).
2. Hand its raw findings to the `cro-brand-study-reporter` agent to compile the Internal Report (full detail) and the Client Report (diagnosis-only teaser with a Conversion Opportunity Score).
3. Hand the Client Report to the `brand-study` agent to produce the 3 tailored Basic/Standard/Premium package options in the format `proposal-builder-form.tsx` expects.

If the store has no online checkout, flag this instead of forcing a study — CRO isn't the right service.

Request details: $ARGUMENTS

Reference: `Agents and skills/cro team/Free/README.md`.
