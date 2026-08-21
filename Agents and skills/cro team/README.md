# CRO Team

Plain-language index of the CRO agent team. The working definitions Claude Code actually reads live in `.claude/agents/` and `.claude/skills/` — this folder is a human-readable reference; keep it in sync when those change. Docs are split by **which side of a purchase the agent runs on**: [Free/](Free/) (the pre-purchase brand-study path) and [Paid/](Paid/) (the post-purchase fulfillment path), each with its own `Agents/`/`Skills/` split inside.

Unlike the SEO team's vendored specialist bench, the 6 CRO specialists are project-built — same as the Social Media Growth team. They lean on vendored [marketingskills](https://github.com/coreyhaines31/marketingskills) skills (`cro`, `ab-testing`, `analytics`, `competitor-profiling`, `copywriting`, `popups`) for underlying methodology rather than reinventing it.

## The workflow

```
Brand study request comes in
        │
        ▼
cro-brand-study  (Step 0 business-model filter: DTC/Single-Category,
        │         Multi-Category Catalog, Subscription/Recurring,
        │         Marketplace → walks the actual buying path as a
        │         customer would → SWOT + prioritized fix checklist,
        │         every finding filtered through the conversion lens)
        ▼
cro-brand-study-reporter  (compiles raw findings into 2 documents:
        │                  Internal Report [full] + Client Report
        │                  [diagnosis-only teaser + Conversion
        │                   Opportunity Score])
        ▼
brand-study  (turns the Client Report into 3 tailored Basic/Standard/
        │     Premium package options, in the format the admin
        │     proposal form needs)
        ▼
Customer picks a package
        │
        ▼
cro-orchestrator  (lists the specialist roster, decides which
        │           this tier/request needs, dispatches them,
        │           assembles the final delivered package)
        │
        ├── cro-funnel-auditor       — tracking check, funnel audit, drop-offs, CTA/form fixes (all tiers)
        ├── cro-sins-auditor         — 7 Deadly Sins of CRO, fast pass/fail scan (all tiers)
        ├── cro-ux-reviewer          — mobile+desktop UX vs. ~50 usability/persuasion laws, re-scan w/ lift analysis, heatmap if connected (Std/Prem)
        ├── cro-tracking-auditor     — deep GA4 event/measurability audit (Premium)
        ├── cro-ab-test-strategist   — A/B test roadmap, 6 ideas (Premium)
        └── cro-competitor-benchmark — benchmark vs. 2 competitors (Premium)
```

**Note on the UX swap**: heatmap/session-recording analysis used to be `cro-ux-reviewer`'s headline deliverable, but it silently degrades for any client without Hotjar/Clarity already connected. The agent's UX Review is now evaluated against ~50 established, citable UI/UX laws (Nielsen's heuristics, Laws of UX, Gestalt principles, Cialdini's persuasion principles, WCAG basics — see the `ux-laws-audit` skill) as its core methodology, since that never depends on external tooling. Heatmap analysis still runs, just as a bonus layer when the data happens to exist. (This used to be a separate `cro-ux-laws-auditor` specialist auditing the same pages a second time — folded into `cro-ux-reviewer` since a UX review and a laws audit are the same page-level lens, not two deliverables.)

Every finding, at every stage, is filtered through one question: **does this remove purchase friction, or build the trust needed to complete one?** That's the north star for the whole team, not just the research step.

## Roster

| # | Agent | Doc | Path | Role |
|---|---|---|---|---|
| 1 | `cro-brand-study` | [Free/Agents/brand-study-research.md](Free/Agents/brand-study-research.md) | Free | Business-model-aware funnel audit — the research step |
| 2 | `cro-brand-study-reporter` | [Free/Agents/reporter.md](Free/Agents/reporter.md) | Free | Compiles research into Internal + Client reports |
| 3 | `brand-study` | *(cross-service — see project root, not part of this team)* | Free | Turns the Client Report into 3 tiered package options |
| 4 | `cro-orchestrator` | [Paid/Agents/orchestrator.md](Paid/Agents/orchestrator.md) | Paid | Lists roster, decides scope, dispatches, assembles |
| 5 | `cro-funnel-auditor` | [Paid/Agents/funnel-auditor.md](Paid/Agents/funnel-auditor.md) | Paid | Tracking-presence check, funnel audit, drop-off points, CTA/form fixes |
| 6 | `cro-sins-auditor` | [Paid/Agents/sins-auditor.md](Paid/Agents/sins-auditor.md) | Paid | 7 Deadly Sins of CRO — fast pass/fail scan |
| 7 | `cro-ux-reviewer` | [Paid/Agents/ux-reviewer.md](Paid/Agents/ux-reviewer.md) | Paid | Mobile/desktop UX review vs. ~50 usability/persuasion laws, re-scan w/ lift analysis, heatmap bonus if connected |
| 8 | `cro-tracking-auditor` | [Paid/Agents/tracking-auditor.md](Paid/Agents/tracking-auditor.md) | Paid | Deep GA4 event/measurability audit (beyond the presence check every tier gets) |
| 9 | `cro-ab-test-strategist` | [Paid/Agents/ab-test-strategist.md](Paid/Agents/ab-test-strategist.md) | Paid | A/B test roadmap |
| 10 | `cro-competitor-benchmark` | [Paid/Agents/competitor-benchmark.md](Paid/Agents/competitor-benchmark.md) | Paid | Competitor benchmark |

## Skills

| Skill | Doc | Path | Loaded by |
|---|---|---|---|
| `cro-brand-study` | [Free/Skills/cro-brand-study-skill.md](Free/Skills/cro-brand-study-skill.md) | Free | The research agent |
| `cro-brand-study-reporter` | [Free/Skills/cro-brand-study-reporter-skill.md](Free/Skills/cro-brand-study-reporter-skill.md) | Free | The reporter agent |
| `cro-team` | [Paid/Skills/cro-team-skill.md](Paid/Skills/cro-team-skill.md) | Paid | The orchestrator |
| `cro-fulfillment` | [Paid/Skills/cro-fulfillment-skill.md](Paid/Skills/cro-fulfillment-skill.md) | Paid | Every fulfillment specialist (shared deliverable spec) |
| `ux-laws-audit` | [Paid/Skills/ux-laws-audit-skill.md](Paid/Skills/ux-laws-audit-skill.md) | Paid | `cro-ux-reviewer` |
| `cro-seven-sins` | [Paid/Skills/cro-seven-sins-skill.md](Paid/Skills/cro-seven-sins-skill.md) | Paid | `cro-sins-auditor` |

The vendored marketingskills skills each specialist leans on (`cro`, `ab-testing`, `analytics`, `competitor-profiling`, `copywriting`, `popups`) live in `.claude/skills/` but aren't individually catalogued here — read them directly.

## Commands (4 pipelines)

| Pipeline | Command | Dispatches |
|---|---|---|
| Brand Study (Free) | `/cro-brand-study` | `cro-brand-study` → `cro-brand-study-reporter` → `brand-study` |
| Basic (Paid) | `/cro-basic` | `cro-orchestrator`, locked to `cro-funnel-auditor` + `cro-sins-auditor` |
| Standard (Paid) | `/cro-standard` | `cro-orchestrator`, locked to the Standard 3-specialist set |
| Premium (Paid) | `/cro-premium` | `cro-orchestrator`, locked to the full 6-specialist set |

## Pricing

| Tier | Price | Delivery |
|---|---|---|
| Basic | 1,000 tokens (Rs 10,000) | 4 days |
| Standard | 1,800 tokens (Rs 18,000) | 8 days |
| Premium | 2,500 tokens (Rs 25,000) | 14 days |

## Scope honesty

The FAQ already sets the right expectation: "every finding comes with a step-by-step guide... Premium clients can hand off the implementation to us entirely." Every tier gets a written, platform-specific fix guide — but don't imply live changes were made to the client's actual site unless implementation was explicitly requested and delivered as part of a Premium order.
