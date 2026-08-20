# CRO Team — Paid (fulfillment)

The fulfillment step that runs **after** the customer has picked a package and tokens have been deducted. Picks up where [../Free/README.md](../Free/README.md) leaves off.

## Agent in this path

| Agent | Doc | Job |
|---|---|---|
| `cro-orchestrator` | [Agents/orchestrator.md](Agents/orchestrator.md) | Reads the picked tier's feature list, decides which specialists run, dispatches them, assembles one delivered package |

## Skills in this path

| Skill | Doc | Loaded by |
|---|---|---|
| `cro-team` | [Skills/cro-team-skill.md](Skills/cro-team-skill.md) | `cro-orchestrator` |
| `cro-fulfillment` | [Skills/cro-fulfillment-skill.md](Skills/cro-fulfillment-skill.md) | Every fulfillment specialist (shared deliverable spec) |
| `ux-laws-audit` | [Skills/ux-laws-audit-skill.md](Skills/ux-laws-audit-skill.md) | `cro-ux-laws-auditor` |

## Which specialists actually run here — scoped by tier

| Tier | Specialists dispatched | Doc | Count |
|---|---|---|---|
| **Basic** | `cro-funnel-auditor` | [Agents/funnel-auditor.md](Agents/funnel-auditor.md) | 1 |
| **Standard** | Basic's set + `cro-ux-laws-auditor`, `cro-ux-reviewer` | + [Agents/ux-laws-auditor.md](Agents/ux-laws-auditor.md), [Agents/ux-reviewer.md](Agents/ux-reviewer.md) | 3 |
| **Premium** | Standard's set + `cro-tracking-auditor`, `cro-ab-test-strategist`, `cro-competitor-benchmark` | + [Agents/tracking-auditor.md](Agents/tracking-auditor.md), [Agents/ab-test-strategist.md](Agents/ab-test-strategist.md), [Agents/competitor-benchmark.md](Agents/competitor-benchmark.md) | 6 |

All 6 specialists are project-built (not vendored) — each leans on a vendored marketingskills skill for methodology (see each doc). `cro-funnel-auditor` runs first among dependent specialists; `cro-ux-reviewer`'s re-scan and `cro-ab-test-strategist`'s roadmap both reference its findings. `cro-ux-laws-auditor` is independent — it audits pages against fixed laws, not against the funnel audit's findings.

**Why `cro-ux-laws-auditor` exists**: heatmap/session-recording analysis used to be the headline Standard-tier UX deliverable, but it silently degrades to "install a tool" for any client without Hotjar/Clarity already connected. The UX Laws Audit (cross-checking key pages against ~50 established, citable UI/UX laws) never depends on external tooling, so it's now the guaranteed part — heatmap analysis still runs, just as a bonus inside `cro-ux-reviewer` when the data exists.

## Who does what

Single-page "Who Does What" sheets per tier, for the customer — see [Responsibility/](Responsibility/): [CRO Basic](Responsibility/CRO%20Basic%20-%20Who%20Does%20What.pdf), [CRO Standard](Responsibility/CRO%20Standard%20-%20Who%20Does%20What.pdf), [CRO Premium](Responsibility/CRO%20Premium%20-%20Who%20Does%20What.pdf). Every feature is marked AI Agent, Human, or Agent + Human, so nobody assumes an agent-drafted fix means it was already applied to their live site.

## Scope honesty

Every tier gets a written, platform-specific fix guide (not just a diagnosis) — matching the FAQ's "every finding comes with a step-by-step guide." Only frame anything as "we built it for you" when implementation was explicitly requested and delivered — don't imply live changes were made to the client's actual site by default.

## Pricing

| Tier | Price | Delivery |
|---|---|---|
| Basic | 1,000 tokens (Rs 10,000) | 4 days |
| Standard | 1,800 tokens (Rs 18,000) | 8 days |
| Premium | 2,500 tokens (Rs 25,000) | 14 days |
