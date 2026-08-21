---
name: cro-fulfillment
description: When fulfilling a client's CRO order (funnel audit, drop-off analysis, CTA/form fixes, mobile/desktop UX review evaluated against UX laws, GA4 tracking audit, A/B test roadmap, or competitor benchmark). Also use when the user mentions "CRO deliverable," "funnel audit," "drop-off points," "UX laws audit," "A/B test roadmap," "conversion fix guide," or asks to draft deliverables for the CRO service defined in src/lib/services.ts. Shared deliverable-content spec loaded by every CRO fulfillment specialist. For the pre-purchase research step, see cro-brand-study. For dispatch/orchestration, see cro-team.
metadata:
  version: 1.0.0
---

# CRO Fulfillment — Deliverable Specs

The deliverable scope and content spec each CRO specialist follows, keyed to the CRO package tiers in `src/lib/services.ts`. Every deliverable stays inside the conversion lens established in `cro-brand-study`: it exists because it removes purchase friction or builds the trust needed to complete one.

## §1 Funnel Audit (all tiers)

Starts with a **tool stack check** — confirm what's actually installed by scanning the page source for known script/ID signatures: GA4 (gtag.js / measurement ID), Google Tag Manager, and a heatmap/session-recording tool (Microsoft Clarity, Hotjar). This is the starting point every tier needs: without GA4, "drop-off points ranked by impact" is expert judgment, not measured data, and that's the headline finding if tracking is missing. It's a presence check only, never an install — the fix guide names exactly what's missing and recommends what to install (see **Recommended CRO Tool Stack** below), we don't install it ourselves outside a Premium hand-off. (The deeper GA4 event/measurability audit — which events fire, do they map to funnel steps — is Premium-only, see §3 / `cro-tracking-auditor`.)

Then walk the actual buying path (landing → product/category → delivery/shipping → cart → checkout → account/login → payment → confirmation) and produce: the audit of the in-scope pages (3 pages Basic, up to 6 pages Standard+), the top drop-off points ranked by impact (top 5 Basic, expanded Standard+), CTA + form quick fixes, and a written step-by-step fix guide for the client's actual platform (not generic advice — name the actual field, the actual button). Since this service is e-commerce-only (`applicability` in `src/lib/services.ts`), "walk the buying path" specifically means checking:

- **Search & navigation** — can visitors actually find what they came for (search relevance, category structure, filters)
- **Product page trust elements** — real product photography (not stock/placeholder), a clear and specific product name, legible descriptions, visible reviews/ratings, and copy that favors clarity over cleverness (a visitor should understand what the product does in one read, not decode a pun)
- **Delivery/shipping, checkout, account/login, payment** — see the `ux-laws-audit` skill's Page-Type Playbooks for the concrete, law-grounded checks per page. **Guest checkout is always explicitly checked** on checkout and account/login — forcing registration before purchase is one of the most common, most fixable abandonment causes.

These aren't a separate deliverable — they're what "walk the buying path" actually means in the page walk above, for every tier.

## §1a 7 Deadly Sins of CRO (all tiers)

A fast, cheap pass/fail scorecard against the 7 most common conversion killers — too much text, poor layout, bad eye flow, weak/buried CTA, missing social proof, slow load (checked objectively via `scripts/check-page-speed.ts`), too many choices/distractions. See the `cro-seven-sins` skill for the scoring process. This is deliberately simpler than §2's UX Laws Audit, which is why it's affordable at Basic — it overlaps some of the same underlying failure modes, but scored independently as its own quick-read checklist, not a substitute for the deeper audit at Standard+.

Lean on the vendored `cro` skill for the underlying methodology, and `copywriting`/`popups` for CTA and micro-copy fixes specifically.

## §2 UX Review (Standard, Premium)

A mobile + desktop UX review of the funnel's key pages, evaluated against established, citable UI/UX laws and principles — see the `ux-laws-audit` skill for the full corpus (Nielsen's heuristics, Laws of UX, Gestalt principles, Shneiderman's Golden Rules, Cialdini's persuasion principles, WCAG accessibility basics) and the judgment-based application process (not every law fits every page). Built on real browser automation, not HTML inference: `scripts/capture-ux-screenshots.ts` (Playwright/Chromium) captures an actual desktop + mobile screenshot of each key page, plus an objective horizontal-scroll check, so findings come from what a visitor actually sees. Most traffic for most stores is mobile, so weight findings accordingly rather than defaulting to a desktop-first review. Includes 1 verification re-scan after fixes are implemented (Standard) to confirm the drop-off points actually improved — a before/after comparison, not a fresh audit. Heatmap/session-recording analysis is a bonus layer only — analyzed if the client already has a tool like Hotjar/Clarity connected, never promised as a guaranteed part of the deliverable. **The laws-based, screenshot-grounded review is what makes this deliverable reliable without external tooling** — that's exactly why it replaced heatmap/session-recording as the tier's headline UX check.

## §3 Tracking Audit (Premium)

The deep GA4 + conversion-tracking audit — beyond §1's presence check, this covers which events fire, whether they map to actual funnel steps, and whether conversion can actually be measured well enough to support the A/B test roadmap. Lean on the vendored `analytics` skill.

## §4 A/B Test Roadmap (Premium)

6 ready-to-run test ideas, each tied to a specific finding from the funnel audit (never generic "test your headline" ideas) — hypothesis, what changes, what to measure, rough effort. Lean on the vendored `ab-testing` skill for test design and prioritization (ICE scoring).

## §5 Competitor Benchmark (Premium)

Benchmark against 2 named competitors' funnels specifically — where they remove friction or build trust that this store doesn't yet. Lean on the vendored `competitor-profiling` skill.

## Recommended CRO Tool Stack

What the tool stack check (§1) recommends when something's missing — current as of this skill's last update, always verify a tool is still active before recommending it (tools get sunset — Google Optimize, formerly the standard free A/B testing tool, was shut down by Google in September 2023 and must never be recommended).

| Category | Recommendation | Why |
|---|---|---|
| Analytics | **Google Analytics 4 (GA4)** | Free, industry standard, the foundation everything else (drop-off ranking, A/B measurement) depends on |
| Tag management | **Google Tag Manager (GTM)** | Free; lets the client add/manage other tags without a developer each time |
| Heatmaps / session recording | **Microsoft Clarity** | Free, unlimited traffic, no cap — the default recommendation for any tier since cost is never a blocker |
| Heatmaps / session recording (alternative) | **Hotjar** | More mature feature set (surveys, feedback widgets) if the client has budget and wants more than Clarity offers |
| A/B testing | **GrowthBook** (open source) or **PostHog** (bundles analytics + session replay + A/B testing + feature flags) | Free/generous free-tier options now that Google Optimize is gone; PostHog is the pick if the client wants to consolidate multiple tools into one |
| A/B testing (paid alternative) | **VWO**, **Convert**, or **AB Tasty** | Mature managed platforms for clients with budget who want more hand-holding than a self-serve tool |

This is a recommendation list for the fix guide, not something we install for the client — same scope-honesty rule as everything else: audit and recommend at every tier, only implement as part of an explicit Premium hand-off.

## Scope honesty

"Do you build the changes, or just tell me what to fix?" is answered in the service FAQ as "both — every finding comes with a step-by-step guide... Premium clients can hand off the implementation entirely." Match that: every tier gets a written, platform-specific fix guide (not just a diagnosis); only frame anything as "we'll build it for you" when the order is explicitly Premium and implementation was requested — don't imply live changes were made if only guidance was delivered.

## Related Skills

- **cro-brand-study** — the research that precedes package selection
- **cro-team** — the orchestrator's roster, tier mapping, and dispatch rules
