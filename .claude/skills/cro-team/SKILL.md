---
name: cro-team
description: When deploying the CRO delivery team after a customer has picked a package (Basic/Standard/Premium) or requested specific activities. Defines the orchestrator's specialist roster, how to map a picked tier to which specialists run, and how to dispatch and assemble their output. Use when the user says "deploy the CRO team," "run the agents for this CRO order," "what can the CRO agents do," or after cro-brand-study + brand-study have produced a picked package. For the research step before a package is picked, see cro-brand-study and brand-study. For deliverable content specs, see cro-fulfillment.
metadata:
  version: 1.0.0
---

# CRO Team — Orchestration

Same pattern as the Social Media Growth and SEO teams: one orchestrator, specialist sub-agents, each owning a narrow deliverable. Unlike SEO, these 6 specialists are project-built (not vendored) — they lean on vendored marketingskills skills (`cro`, `ab-testing`, `analytics`, `competitor-profiling`, `copywriting`, `popups`) for methodology, the same way the SEO team leans on the claude-seo bench.

## The Roster

| Specialist agent | Deliverable | Tier availability |
|---|---|---|
| `cro-funnel-auditor` | Tracking-presence check, funnel audit (incl. search/nav/product-page trust checks), drop-off points, CTA/form fixes, written fix guide | All tiers — scope scales 3 → 6 pages |
| `cro-sins-auditor` | 7 Deadly Sins of CRO — fast pass/fail scorecard vs. the 7 most common conversion killers | All tiers |
| `cro-ux-reviewer` | Mobile+desktop UX review evaluated against ~50 usability/persuasion laws (no external tool dependency), verification re-scan with lift analysis, + heatmap/session-recording analysis if a tool is already connected (bonus, not guaranteed) | Standard, Premium |
| `cro-tracking-auditor` | Deep GA4 event/measurability audit (beyond the presence check every tier gets) | Premium only |
| `cro-ab-test-strategist` | A/B test roadmap — 6 ready-to-run ideas | Premium only |
| `cro-competitor-benchmark` | Competitor benchmark (2 competitors) | Premium only |

**Why `cro-sins-auditor` is separate from `cro-ux-reviewer`'s laws-based review**: the 7 Sins overlap some of the same underlying failure modes as the 55-law corpus (that's expected — they're naming the same problems, just at different depths), but they're scored independently as a fast, cheap, client-readable checklist rather than folded into the deeper review. This is what makes a real UX-quality check affordable at Basic, where the full laws audit wouldn't fit the price or timeline.

**Why heatmap is a bonus, not the headline**: heatmap/session-recording analysis used to be `cro-ux-reviewer`'s headline deliverable, but it silently degrades to "we flagged that you should install a tool" for any client without Hotjar/Clarity already connected — an unreliable thing to sell as a guaranteed Standard-tier feature. The laws-based review (Nielsen's heuristics, Laws of UX, Gestalt principles, Shneiderman's Golden Rules, Cialdini's persuasion principles, WCAG basics — see the `ux-laws-audit` skill) is the core of `cro-ux-reviewer`'s deliverable now, because it never depends on anything outside the agent's own page access; heatmap analysis still runs as a bonus layer whenever the data happens to be available.

## Step 1 — List Activities

List the roster above before dispatching, so activities can be picked explicitly if the order wants something other than the tier default.

## Step 2 — Decide Which Specialists Run

**A. Tier default** — read the CRO package's feature list in `src/lib/services.ts` and map:

- **Basic** → `cro-funnel-auditor`, `cro-sins-auditor`
- **Standard** → Basic's set + `cro-ux-reviewer`
- **Premium** → Standard's set + `cro-tracking-auditor`, `cro-ab-test-strategist`, `cro-competitor-benchmark`

**B. Explicit request** — honor a named subset over the tier default, but flag (don't silently deliver or refuse) anything outside what the tier paid for.

## Step 3 — Dispatch

Call each selected specialist via the Agent tool. `cro-funnel-auditor` runs first among dependent specialists — `cro-ux-reviewer`'s verification re-scan and `cro-ab-test-strategist`'s roadmap both reference its findings, so don't run those in true parallel with it. `cro-sins-auditor`, `cro-tracking-auditor`, and `cro-competitor-benchmark` are independent and can run in parallel with everything.

## Step 4 — Assemble

Combine specialist outputs into one coherent package, in this order: funnel audit → 7 Deadly Sins scan (if run) → UX review (if run) → tracking audit (if run) → A/B test roadmap (if run) → competitor benchmark (if run). Write a short connecting intro rather than concatenating raw specialist output.

## Common Mistakes to Avoid

- Running every specialist regardless of tier — Basic only gets the funnel audit + 7 Sins scan
- Running `cro-ux-reviewer`'s verification re-scan before `cro-funnel-auditor`'s fixes have actually been described
- Treating the A/B test roadmap as generic test ideas instead of ones tied to actual findings
- Presenting a re-scan or A/B roadmap as already-executed work rather than a deliverable to act on
- Promising heatmap/session-recording analysis up front — it's a bonus inside `cro-ux-reviewer` only if the client already has a tool connected, never a guaranteed line item
- Reporting a re-scan's lift analysis as a measured number when no real analytics data backs it — label estimates as estimates

## Related Skills

- **cro-brand-study** — the research that precedes package selection
- **cro-brand-study-reporter** — compiles that research into the Internal Report + Client Report
- **brand-study** — turns the Client Report into the 3 tiered package options the customer picks from
- **cro-fulfillment** — the deliverable content specs each specialist follows
