---
name: social-media-team
description: When deploying the Social Media Management delivery team after a customer has picked a package (Basic/Standard/Premium) or requested specific activities. Defines the orchestrator's activity roster, how to map a picked tier or an explicit customer request to which specialist agents run, and how to dispatch and aggregate their output. Use when the user says "deploy the social media team," "run the agents for this order," "what can the social media agents do," or after social-media-brand-study + brand-study have produced a picked package. For the research step before a package is picked, see social-media-brand-study and brand-study. For deliverable scope/content per tier, see social-media-management.
metadata:
  version: 1.0.0
---

# Social Media Team — Orchestration

This is a **team**, not a single agent: one orchestrator plus specialist sub-agents, each owning exactly one deliverable. The orchestrator's job is to list what the team can do, work out which activities this order actually needs, dispatch the right specialists, and hand back an assembled package — not to do the work itself.

## The Roster

| Specialist agent | Deliverable | Tier availability |
|---|---|---|
| `social-media-platform-auditor` | Platform audit (profile setup, cadence, engagement, gaps) | All tiers — scope scales 1 / 2 / up to 5 platforms |
| `social-media-content-calendar` | Content calendar + post/carousel/Reel copywriting | All tiers — scope scales 15+2 / 15+8 / 18+15 (Premium weights toward Reels, not extra posts) |
| `social-media-competitor-research` | Competitor research / benchmark | Standard, Premium (deeper on Premium) |
| `social-media-brand-voice` | Brand voice & style guide | Standard, Premium |
| `social-media-reporting` | 6-month report → monthly action plan → custom growth playbook | All tiers, depth scales |
| `social-media-ads-strategist` | Ads campaign strategy recommendations (not execution) | Premium only |

Every specialist has narrow tools and a single job — that's deliberate. Don't ask a specialist to do another specialist's task; dispatch the right one instead.

## Step 1 — List Activities

Before dispatching anything, list the full roster above to whoever's running the order (admin or, if surfaced, the customer) so activities can be picked explicitly if they don't just want the tier default.

## Step 2 — Decide Which Specialists Run

Two ways an order specifies scope:

**A. Tier default** — the customer picked a package (Basic/Standard/Premium) with no further customization. Use the tier table in the `social-media-management` skill's "Agent capabilities by tier" section to auto-select:

- **Basic** → `social-media-platform-auditor`, `social-media-content-calendar`, `social-media-reporting`
- **Standard** → Basic's set + `social-media-competitor-research`, `social-media-brand-voice`
- **Premium** → Standard's set + `social-media-ads-strategist` (and competitor-research/reporting run at Premium depth — tell the specialist which tier it's operating at)

**B. Explicit customer request** — the customer or admin names specific activities ("just do the content calendar and reporting," "skip the brand voice guide"). Honor that over the tier default, but flag if they're requesting something outside what their tier actually paid for (e.g., Basic tier asking for competitor research) rather than silently either delivering or refusing it.

## Step 3 — Dispatch

Call each selected specialist via the Agent tool. Independent specialists (e.g., platform audit and competitor research) can run in parallel — they don't depend on each other's output. `social-media-content-calendar` benefits from the brand-voice specialist's output if that's also running this order (pass its result along so the calendar's copy matches the established voice); if brand-voice isn't in scope for this tier, the content calendar specialist works from whatever brand basics were gathered directly.

Give each specialist the shared context every deliverable needs: brand basics, platform(s) in scope, goals, and — if supplied by the operator — the access token + Page ID for live-data specialists (`social-media-platform-auditor`, `social-media-reporting`). Never let a specialist request or generate a token itself.

## Step 4 — Assemble

Combine specialist outputs into one coherent package for the client, in this order: platform audit → brand voice/style guide (if run) → competitor research (if run) → content calendar → reporting → ads strategy (if run). Don't just concatenate raw outputs — a one-paragraph intro tying them together as one delivered package reads far better than five disconnected documents.

## Common Mistakes to Avoid

- Running every specialist regardless of tier — Basic doesn't get competitor research or brand voice; check the roster table before dispatching
- One specialist trying to cover another's deliverable — keep them narrow, dispatch the right one instead
- Serializing independent specialists that could run in parallel
- Forgetting to pass brand-voice output into the content-calendar specialist when both are in scope — captions drift off-voice otherwise
- Treating the orchestrator as a place to do deliverable work itself — its job is roster, selection, dispatch, assembly, nothing else

## Related Skills

- **social-media-brand-study** — the research that precedes package selection
- **brand-study** — turns that research into the 3 tiered package options the customer picks from
- **social-media-management** — the tier scope table and deliverable content specs each specialist follows
