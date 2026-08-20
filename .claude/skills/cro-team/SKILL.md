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
| `cro-funnel-auditor` | Funnel audit, drop-off points, CTA/form fixes, written fix guide | All tiers — scope scales 3 → 6 pages |
| `cro-ux-laws-auditor` | UX Laws Audit — key pages cross-checked against ~50 usability/persuasion principles | Standard, Premium — no external tool dependency |
| `cro-ux-reviewer` | Mobile+desktop UX review, verification re-scan, + heatmap/session-recording analysis if a tool is already connected (bonus, not guaranteed) | Standard, Premium |
| `cro-tracking-auditor` | GA4 + tracking-setup audit | Premium only |
| `cro-ab-test-strategist` | A/B test roadmap — 6 ready-to-run ideas | Premium only |
| `cro-competitor-benchmark` | Competitor benchmark (2 competitors) | Premium only |

**Why the swap**: heatmap/session-recording analysis used to be `cro-ux-reviewer`'s headline deliverable, but it silently degrades to "we flagged that you should install a tool" for any client without Hotjar/Clarity already connected — an unreliable thing to sell as a guaranteed Standard-tier feature. `cro-ux-laws-auditor` is now the core UX deliverable for Standard+ because it never depends on anything outside the agent's own page access; heatmap analysis still runs as a bonus layer inside `cro-ux-reviewer` whenever the data happens to be available.

## Step 1 — List Activities

List the roster above before dispatching, so activities can be picked explicitly if the order wants something other than the tier default.

## Step 2 — Decide Which Specialists Run

**A. Tier default** — read the CRO package's feature list in `src/lib/services.ts` and map:

- **Basic** → `cro-funnel-auditor` only
- **Standard** → Basic's set + `cro-ux-laws-auditor`, `cro-ux-reviewer`
- **Premium** → Standard's set + `cro-tracking-auditor`, `cro-ab-test-strategist`, `cro-competitor-benchmark`

**B. Explicit request** — honor a named subset over the tier default, but flag (don't silently deliver or refuse) anything outside what the tier paid for.

## Step 3 — Dispatch

Call each selected specialist via the Agent tool. `cro-funnel-auditor` runs first among dependent specialists — `cro-ux-reviewer`'s verification re-scan and `cro-ab-test-strategist`'s roadmap both reference its findings, so don't run those in true parallel with it. `cro-ux-laws-auditor` is independent of the funnel audit (it audits pages against laws, not against drop-off findings) and can run in parallel with everything; so can `cro-tracking-auditor` and `cro-competitor-benchmark`.

## Step 4 — Assemble

Combine specialist outputs into one coherent package, in this order: funnel audit → UX Laws Audit (if run) → UX review (if run) → tracking audit (if run) → A/B test roadmap (if run) → competitor benchmark (if run). Write a short connecting intro rather than concatenating raw specialist output.

## Common Mistakes to Avoid

- Running every specialist regardless of tier — Basic only gets the funnel audit
- Running `cro-ux-reviewer`'s verification re-scan before `cro-funnel-auditor`'s fixes have actually been described
- Treating the A/B test roadmap as generic test ideas instead of ones tied to actual findings
- Presenting a re-scan or A/B roadmap as already-executed work rather than a deliverable to act on
- Promising heatmap/session-recording analysis up front — it's a bonus inside `cro-ux-reviewer` only if the client already has a tool connected, never a guaranteed line item

## Related Skills

- **cro-brand-study** — the research that precedes package selection
- **cro-brand-study-reporter** — compiles that research into the Internal Report + Client Report
- **brand-study** — turns the Client Report into the 3 tiered package options the customer picks from
- **cro-fulfillment** — the deliverable content specs each specialist follows
