# SEO Team

Plain-language index of the SEO agent team. The working definitions Claude Code actually reads live in `.claude/agents/` and `.claude/skills/` — this folder is a human-readable reference; keep it in sync when those change. Docs are split by **which side of a purchase the agent runs on**: [Free/](Free/) (the pre-purchase brand-study path) and [Paid/](Paid/) (the post-purchase fulfillment path) — they never dispatch the same set of specialists, and neither runs the full 18-agent bench. The vendored specialist bench itself (shared by both paths, at different subsets) stays at this level, in [specialist-bench.md](specialist-bench.md).

Unlike the Social Media Growth team, the specialists here aren't project-built — they're vendored from [AgricIDaniel/claude-seo](https://github.com/AgricIDaniel/claude-seo) (MIT, 18 specialists deep) directly into `.claude/agents/` and `.claude/skills/`, so the repo is self-contained. Our job was to add the two pieces that were missing: the research/reporting pair that produces a brand study, and the orchestrator that dispatches the bench once a package is picked.

## The workflow

```
Brand study request comes in
        │
        ▼
seo-brand-study  (Step 0 site-type filter: Local/Service, E-commerce,
        │         Content/Publisher, Programmatic/Directory → dispatches
        │         claude-seo specialists → SWOT + prioritized fix checklist,
        │         every finding filtered through the ranking-improvement lens)
        ▼
seo-brand-study-reporter  (compiles raw findings into 2 documents:
        │                  Internal Report [full] + Client Report
        │                  [diagnosis-only teaser + Ranking Opportunity Score])
        ▼
brand-study  (turns the Client Report into 3 tailored Basic/Standard/Premium
        │     package options, in the format the admin proposal form needs)
        ▼
Customer picks a package
        │
        ▼
seo-orchestrator  (lists the specialist bench, decides which specialists
        │           this tier/request needs, dispatches them, assembles
        │           the final delivered package)
        │
        ├── seo-technical    — crawlability, indexability, mobile/JS
        ├── seo-performance  — Core Web Vitals / speed
        ├── seo-content      — on-page content quality, E-E-A-T
        ├── seo-cluster      — keyword expansion + mapping
        ├── seo-schema       — structured data
        ├── seo-sitemap      — sitemap/indexation
        ├── seo-backlinks    — backlink gap analysis + target list
        ├── seo-sxo          — SERP-backwards intent match
        ├── seo-local        — GBP/NAP signals (Local/Service sites)
        ├── seo-maps         — geo-grid rank position (Local/Service)
        ├── seo-ecommerce    — product schema, Shopping feed (e-commerce sites)
        └── seo-google       — real GSC/GA4/CrUX data (only if access supplied)

3 more vendored agents (seo-drift, seo-flow, seo-image-gen) aren't in the default
dispatch — see specialist-bench.md (this folder) for the full 18 plus 9 skill-only extras.
```

Every finding, at every stage, is filtered through one question: **does this move the needle on organic ranking — directly, or by removing a blocker to it?** That's the north star for the whole team, not just the research step.

## Roster

| # | Agent | Doc | Path | Role |
|---|---|---|---|---|
| 1 | `seo-brand-study` | [Free/Agents/brand-study-research.md](Free/Agents/brand-study-research.md) | Free | Archetype-aware audit — the research step |
| 2 | `seo-brand-study-reporter` | [Free/Agents/reporter.md](Free/Agents/reporter.md) | Free | Compiles research into Internal + Client reports |
| 3 | `brand-study` | *(cross-service — see project root, not part of this team)* | Free | Turns the Client Report into 3 tiered package options |
| 4 | `seo-orchestrator` | [Paid/Agents/orchestrator.md](Paid/Agents/orchestrator.md) | Paid | Lists specialist bench, decides scope, dispatches, assembles |
| 5-22 | `seo-*` (18 vendored agents; 15 wired into tier dispatch, 3 available but not dispatched by default) | [specialist-bench.md](specialist-bench.md) | Both (different subsets) | The actual audit/fix work — vendored from claude-seo, not project-built |

## Skills

| Skill | Doc | Path | Loaded by |
|---|---|---|---|
| `seo-brand-study` | [Free/Skills/seo-brand-study-skill.md](Free/Skills/seo-brand-study-skill.md) | Free | The research agent |
| `seo-brand-study-reporter` | [Free/Skills/seo-brand-study-reporter-skill.md](Free/Skills/seo-brand-study-reporter-skill.md) | Free | The reporter agent |
| `seo-team` | [Paid/Skills/seo-team-skill.md](Paid/Skills/seo-team-skill.md) | Paid | The orchestrator |

The 24 skills that ship alongside claude-seo's 18 agents (`seo-technical`, `seo-backlinks`, etc., plus 9 skill-only extras — see [specialist-bench.md](specialist-bench.md)) live in `.claude/skills/` but aren't individually catalogued here — read them directly, or ask and I'll add doc stubs.

## Commands (4 pipelines)

Each of the 4 pipelines below is now a real slash-command in `.claude/commands/`, not just documentation — run the matching one for whichever stage this order is at:

| Pipeline | Command | Dispatches |
|---|---|---|
| Brand Study (Free) | `/seo-brand-study` | `seo-brand-study` → `seo-brand-study-reporter` → `brand-study` |
| Basic (Paid) | `/seo-basic` | `seo-orchestrator`, locked to the 3-specialist Basic set |
| Standard (Paid) | `/seo-standard` | `seo-orchestrator`, locked to the 5-specialist Standard set |
| Premium (Paid) | `/seo-premium` | `seo-orchestrator`, locked to the 10-specialist Premium set |

## Pricing

| Tier | Price | Delivery |
|---|---|---|
| Basic | 500 tokens (Rs 5,000) | 3 days |
| Standard | 1,500 tokens (Rs 15,000) | 7 days |
| Premium | 2,500 tokens (Rs 25,000) | 14 days |

## Scope honesty

Two package features are delivered as **ready-to-apply guidance, not live changes** — same "not built yet" honesty as Social Media Growth's fixes-implemented count:

- **"Links from trusted sites"** — `seo-backlinks` profiles the backlink gap and produces a prioritized target list; it doesn't place links. Say so plainly in the delivered package.
- **"Google Business Profile setup"** — `seo-local` audits GBP signals and gives setup guidance; there's no write-access flow to actually create/edit the listing (same gap as social media's no-live-write-access).

## Example output

[Free/Reports/Example - Ceylon Spice Traders Internal Report.pdf](Free/Reports/Example%20-%20Ceylon%20Spice%20Traders%20Internal%20Report.pdf) and [Free/Reports/Example - Ceylon Spice Traders Client Report.pdf](Free/Reports/Example%20-%20Ceylon%20Spice%20Traders%20Client%20Report.pdf) show what `seo-brand-study-reporter` actually produces for a fictional e-commerce site — full audit detail vs. the diagnosis-only teaser with a Ranking Opportunity Score of 36/100.

## Live data

Real GSC/GA4/CrUX data (used by `seo-google`) requires access the **operator** has already been granted and supplies directly — same opt-in, operator-supplied-only rule as the rest of this project. No agent ever generates or requests it from the client, and delivery never blocks on it being present.
