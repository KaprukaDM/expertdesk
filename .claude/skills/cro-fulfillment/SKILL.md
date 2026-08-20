---
name: cro-fulfillment
description: When fulfilling a client's CRO order (funnel audit, drop-off analysis, CTA/form fixes, UX Laws Audit, mobile/desktop UX review, GA4 tracking audit, A/B test roadmap, or competitor benchmark). Also use when the user mentions "CRO deliverable," "funnel audit," "drop-off points," "UX laws audit," "A/B test roadmap," "conversion fix guide," or asks to draft deliverables for the CRO service defined in src/lib/services.ts. Shared deliverable-content spec loaded by every CRO fulfillment specialist. For the pre-purchase research step, see cro-brand-study. For dispatch/orchestration, see cro-team.
metadata:
  version: 1.0.0
---

# CRO Fulfillment — Deliverable Specs

The deliverable scope and content spec each CRO specialist follows, keyed to the CRO package tiers in `src/lib/services.ts`. Every deliverable stays inside the conversion lens established in `cro-brand-study`: it exists because it removes purchase friction or builds the trust needed to complete one.

## §1 Funnel Audit (all tiers)

Walk the actual buying path (landing → product/category → cart → checkout → confirmation) and produce: the audit of the in-scope pages (3 pages Basic, up to 6 pages Standard+), the top drop-off points ranked by impact (top 5 Basic, expanded Standard+), CTA + form quick fixes, and a written step-by-step fix guide for the client's actual platform (not generic advice — name the actual field, the actual button).

Lean on the vendored `cro` skill for the underlying methodology, and `copywriting`/`popups` for CTA and micro-copy fixes specifically.

## §2 UX Review (Standard, Premium)

A mobile + desktop UX review, since most traffic for most stores is mobile and a desktop-only review misses the majority of real friction. Includes 1 verification re-scan after fixes are implemented (Standard) to confirm the drop-off points actually improved. Heatmap/session-recording analysis is a bonus layer only — analyzed if the client already has a tool like Hotjar/Clarity connected, never promised as a guaranteed part of the deliverable (see the scope note below on why this replaced its former headline-feature status).

## §2a UX Laws Audit (Standard, Premium)

Cross-checks the funnel's key pages against established, citable UI/UX laws and principles — see the `ux-laws-audit` skill for the full corpus (Nielsen's heuristics, Laws of UX, Gestalt principles, Shneiderman's Golden Rules, Cialdini's persuasion principles, WCAG accessibility basics) and the judgment-based application process (not every law fits every page). **This is the reliable, always-available core UX check for Standard+** — unlike heatmap analysis, it has no external tool dependency, which is exactly why it replaced heatmap/session-recording as the tier's headline UX deliverable.

## §3 Tracking Audit (Premium)

GA4 + conversion-tracking setup audit — is tracking even installed, are the right events firing, can conversion actually be measured. Lean on the vendored `analytics` skill.

## §4 A/B Test Roadmap (Premium)

6 ready-to-run test ideas, each tied to a specific finding from the funnel audit (never generic "test your headline" ideas) — hypothesis, what changes, what to measure, rough effort. Lean on the vendored `ab-testing` skill for test design and prioritization (ICE scoring).

## §5 Competitor Benchmark (Premium)

Benchmark against 2 named competitors' funnels specifically — where they remove friction or build trust that this store doesn't yet. Lean on the vendored `competitor-profiling` skill.

## Scope honesty

"Do you build the changes, or just tell me what to fix?" is answered in the service FAQ as "both — every finding comes with a step-by-step guide... Premium clients can hand off the implementation entirely." Match that: every tier gets a written, platform-specific fix guide (not just a diagnosis); only frame anything as "we'll build it for you" when the order is explicitly Premium and implementation was requested — don't imply live changes were made if only guidance was delivered.

## Related Skills

- **cro-brand-study** — the research that precedes package selection
- **cro-team** — the orchestrator's roster, tier mapping, and dispatch rules
