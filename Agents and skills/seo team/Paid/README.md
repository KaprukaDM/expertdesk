# SEO Team — Paid (fulfillment)

This is the fulfillment step that runs **after** the customer has picked a package and tokens have been deducted. Picks up where [../Free/README.md](../Free/README.md) leaves off.

## Agent in this path

| Agent | Doc | Job |
|---|---|---|
| `seo-orchestrator` | [Agents/orchestrator.md](Agents/orchestrator.md) | Reads the picked tier's feature list, decides which specialists run, dispatches them, assembles one delivered package |

## Skill in this path

| Skill | Doc | Loaded by |
|---|---|---|
| `seo-team` | [Skills/seo-team-skill.md](Skills/seo-team-skill.md) | `seo-orchestrator` |

## Which specialists actually run here — scoped by tier, not all 18

Each dispatched specialist now has its own doc in [Agents/](Agents/) alongside `seo-orchestrator`:

| Tier | Specialists dispatched | Doc | Count |
|---|---|---|---|
| **Basic** | `seo-technical`, `seo-content`, `seo-cluster` | [Agents/seo-technical.md](Agents/seo-technical.md), [Agents/seo-content.md](Agents/seo-content.md), [Agents/seo-cluster.md](Agents/seo-cluster.md) | 3 |
| **Standard** | Basic's set + `seo-backlinks`, `seo-local` | + [Agents/seo-backlinks.md](Agents/seo-backlinks.md), [Agents/seo-local.md](Agents/seo-local.md) | 5 |
| **Premium** | Standard's set + `seo-performance`, `seo-schema`, `seo-sitemap`, `seo-sxo`, `seo-visual` | + [Agents/seo-performance.md](Agents/seo-performance.md), [Agents/seo-schema.md](Agents/seo-schema.md), [Agents/seo-sitemap.md](Agents/seo-sitemap.md), [Agents/seo-sxo.md](Agents/seo-sxo.md), [Agents/seo-visual.md](Agents/seo-visual.md) | 10 |

Plus, at any tier: [Agents/seo-ecommerce.md](Agents/seo-ecommerce.md) if the site has a cart/checkout, [Agents/seo-google.md](Agents/seo-google.md) if GSC/GA4 access was supplied. **Even Premium — the largest tier — dispatches around 10-12 of the 18 vendored agents, never the full bench.** `seo-drift`, `seo-flow`, and `seo-image-gen` never run automatically in this path — see [../Vendored (not used yet)/README.md](../Vendored%20%28not%20used%20yet%29/README.md). `seo-maps` doesn't either — it's currently Free-path only (Step 0 local-archetype research, see [../Free/Agents/seo-maps.md](../Free/Agents/seo-maps.md)); worth deciding whether Standard/Premium should pick it up too for ongoing geo-grid tracking.

See [../specialist-bench.md](../specialist-bench.md) for the full bench and [Skills/seo-team-skill.md](Skills/seo-team-skill.md) for the exact dispatch rules.

## Who does what

Single-page "Who Does What" sheets per tier, for the customer — see [Responsibility/](Responsibility/): [SEO Basic](Responsibility/SEO%20Basic%20-%20Who%20Does%20What.pdf), [SEO Standard](Responsibility/SEO%20Standard%20-%20Who%20Does%20What.pdf), [SEO Premium](Responsibility/SEO%20Premium%20-%20Who%20Does%20What.pdf). Every feature is marked AI Agent, Human, or Agent + Human, so nobody assumes an agent-drafted fix means it was already applied to their live site.

## Scope honesty

Two features are delivered as **ready-to-apply guidance, not live changes**:

- **"Links from trusted sites"** — `seo-backlinks` produces a gap analysis + target list, doesn't place links
- **"Google Business Profile setup"** — `seo-local` audits and guides, has no write access to create/edit the listing

## Pricing

| Tier | Price | Delivery |
|---|---|---|
| Basic | 500 tokens (Rs 5,000) | 3 days |
| Standard | 1,500 tokens (Rs 15,000) | 7 days |
| Premium | 2,500 tokens (Rs 25,000) | 14 days |
