# Social Media Team — Paid (fulfillment)

The fulfillment step that runs **after** the customer has picked a package and tokens have been deducted. Picks up where [../Free/README.md](../Free/README.md) leaves off.

## Agent in this path

| Agent | Doc | Job |
|---|---|---|
| `social-media-orchestrator` | [Agents/orchestrator.md](Agents/orchestrator.md) | Reads the picked tier's feature list, decides which specialists run, dispatches them, assembles one delivered package |

## Skills in this path

| Skill | Doc | Loaded by |
|---|---|---|
| `social-media-team` | [Skills/social-media-team-skill.md](Skills/social-media-team-skill.md) | `social-media-orchestrator` |
| `social-media-management` | [Skills/social-media-management-skill.md](Skills/social-media-management-skill.md) | Every fulfillment specialist (shared deliverable spec) |

## Which specialists actually run here — scoped by tier

| Tier | Specialists dispatched |
|---|---|
| **Basic** | `social-media-platform-auditor`, `social-media-content-calendar`, `social-media-reporting` |
| **Standard** | Basic's set + `social-media-competitor-research`, `social-media-brand-voice` |
| **Premium** | Standard's set + `social-media-ads-strategist` (competitor-research/reporting also run at greater depth) |

All 6 specialists are project-built (not vendored) — see [Agents/](Agents/) for each one's doc. `social-media-content-calendar` uses `social-media-brand-voice`'s output when both are in scope for the same order, so captions stay on-voice.

## Scope honesty

The "fixes implemented" count (5/10/15 per tier) is delivered as **ready-to-apply artifacts, not live platform changes** — there's no write access to the client's actual social pages, only an operator-supplied read-only access token for real Page/IG Insights (used by the platform-auditor and reporting specialists).

## Pricing

| Tier | Price | Delivery |
|---|---|---|
| Basic | 800 tokens (Rs 8,000) | 14-day management |
| Standard | 1,750 tokens (Rs 17,500) | 30-day management |
| Premium | 2,500 tokens (Rs 25,000) | 30-day management |
