# Social Media Team

Plain-language index of the Social Media Management agent team. The working definitions Claude Code actually reads live in `.claude/agents/` and `.claude/skills/` — this folder is a human-readable reference; keep it in sync when those change. Docs are split by **which side of a purchase the agent runs on**: [Free/](Free/) (the pre-purchase brand-study path — agents, skills, and example reports) and [Paid/](Paid/) (the post-purchase fulfillment path — agents and skills). Each has its own `Agents/`/`Skills/` split inside.

## The workflow

```
Brand study request comes in
        │
        ▼
social-media-brand-study  (deep research: page, industry, competitor,
        │                  content, gap, 6mo performance, missing-functions
        │                  audits → SWOT → prioritized fix checklist)
        ▼
social-media-brand-study-reporter  (compiles raw findings into 2 docs:
        │                           Internal Report [full] + Client Report
        │                           [diagnosis-only teaser + Opportunity Score])
        ▼
brand-study  (turns the Client Report into 3 tailored Basic/Standard/Premium
        │     package options, in the format the admin proposal form needs)
        ▼
Customer picks a package
        │
        ▼
social-media-orchestrator  (lists the team's activities, decides which
        │                    specialists this tier/request needs, dispatches
        │                    them, assembles the final delivered package)
        │
        ├── social-media-platform-auditor     — platform audit
        ├── social-media-content-calendar     — calendar + post/Reel copy
        ├── social-media-competitor-research  — competitor benchmark (Std/Prem)
        ├── social-media-brand-voice          — brand voice & style guide (Std/Prem)
        ├── social-media-reporting            — 6mo report → action plan → playbook
        └── social-media-ads-strategist       — ads strategy recs (Premium only)
```

This is a **team**, not a single agent — each specialist owns exactly one deliverable, narrow tools, single job. The orchestrator never produces content itself; it lists, decides, dispatches, and assembles.

## Roster

| # | Agent | Doc | Path | Role |
|---|---|---|---|---|
| 1 | `social-media-brand-study` | [Free/Agents/brand-study-research.md](Free/Agents/brand-study-research.md) | Free | Deep onboarding audit — the research step |
| 2 | `social-media-brand-study-reporter` | [Free/Agents/reporter.md](Free/Agents/reporter.md) | Free | Compiles research into Internal + Client reports |
| 3 | `brand-study` | *(cross-service — see project root, not part of this team)* | Free | Turns the Client Report into 3 tiered package options |
| 4 | `social-media-orchestrator` | [Paid/Agents/orchestrator.md](Paid/Agents/orchestrator.md) | Paid | Lists roster, decides scope, dispatches, assembles |
| 5 | `social-media-platform-auditor` | [Paid/Agents/platform-auditor.md](Paid/Agents/platform-auditor.md) | Paid | Platform audit |
| 6 | `social-media-content-calendar` | [Paid/Agents/content-calendar.md](Paid/Agents/content-calendar.md) | Paid | Content calendar + copywriting |
| 7 | `social-media-competitor-research` | [Paid/Agents/competitor-research.md](Paid/Agents/competitor-research.md) | Paid | Competitor benchmark |
| 8 | `social-media-brand-voice` | [Paid/Agents/brand-voice.md](Paid/Agents/brand-voice.md) | Paid | Brand voice & style guide |
| 9 | `social-media-reporting` | [Paid/Agents/reporting.md](Paid/Agents/reporting.md) | Paid | Report → action plan → growth playbook |
| 10 | `social-media-ads-strategist` | [Paid/Agents/ads-strategist.md](Paid/Agents/ads-strategist.md) | Paid | Ads strategy recommendations only |

## Skills

| Skill | Doc | Path | Loaded by |
|---|---|---|---|
| `social-media-brand-study` | [Free/Skills/social-media-brand-study-skill.md](Free/Skills/social-media-brand-study-skill.md) | Free | The research agent |
| `social-media-brand-study-reporter` | [Free/Skills/social-media-brand-study-reporter-skill.md](Free/Skills/social-media-brand-study-reporter-skill.md) | Free | The reporter agent |
| `social-media-team` | [Paid/Skills/social-media-team-skill.md](Paid/Skills/social-media-team-skill.md) | Paid | The orchestrator |
| `social-media-management` | [Paid/Skills/social-media-management-skill.md](Paid/Skills/social-media-management-skill.md) | Paid | Every fulfillment specialist (shared deliverable spec) |

## Example output

See [Free/Reports/](Free/Reports/) — `Example - Ceylon Bites Internal Report.pdf`, `Example - Ceylon Bites Client Report.pdf`, and `Brand Study Journey.pdf`.

## Commands (4 pipelines)

Each of the 4 pipelines below is now a real slash-command in `.claude/commands/`, not just documentation — run the matching one for whichever stage this order is at:

| Pipeline | Command | Dispatches |
|---|---|---|
| Brand Study (Free) | `/social-media-brand-study` | `social-media-brand-study` → `social-media-brand-study-reporter` → `brand-study` |
| Basic (Paid) | `/social-media-basic` | `social-media-orchestrator`, locked to the 3-specialist Basic set |
| Standard (Paid) | `/social-media-standard` | `social-media-orchestrator`, locked to the 5-specialist Standard set |
| Premium (Paid) | `/social-media-premium` | `social-media-orchestrator`, locked to the 6-specialist Premium set |

## Live data

Real Page/IG Insights (used by the platform-auditor and reporting specialists) require an access token + Page ID the **operator** has already generated via the Meta Business Portfolio / System User flow (see `social-media-management` skill for that architecture) and supplied directly. No agent in this team ever generates a token itself or asks the client for one — opt-in, operator-supplied only, and delivery never blocks on it.

## Legacy

`social-media-manager` — the original single-agent design that did everything itself — still exists as a fallback for a small one-off ask, but is deprecated in favor of the team above for real orders.
