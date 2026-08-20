# SEO Team — Free (pre-purchase brand study)

This is the free research step that runs **before** any money changes hands — a `ServiceRequest` comes in, this produces a brief + 3 tailored packages, the customer picks one, and only then does [../Paid/README.md](../Paid/README.md) take over.

## Agents in this path

| Agent | Doc | Job |
|---|---|---|
| `seo-brand-study` | [Agents/brand-study-research.md](Agents/brand-study-research.md) | Classifies the site (Step 0 archetype filter), dispatches specialists, produces raw findings |
| `seo-brand-study-reporter` | [Agents/reporter.md](Agents/reporter.md) | Compiles raw findings into the Internal Report + Client Report |
| `brand-study` | *(cross-service — see project root, not part of this team)* | Turns the Client Report into 3 tiered Basic/Standard/Premium package options |

## Skills in this path

| Skill | Doc | Loaded by |
|---|---|---|
| `seo-brand-study` | [Skills/seo-brand-study-skill.md](Skills/seo-brand-study-skill.md) | `seo-brand-study` |
| `seo-brand-study-reporter` | [Skills/seo-brand-study-reporter-skill.md](Skills/seo-brand-study-reporter-skill.md) | `seo-brand-study-reporter` |

## Which specialists actually run here

Not the full 18-agent bench — the archetype-aware subset, each with its own doc now in [Agents/](Agents/) alongside `seo-brand-study` and `seo-brand-study-reporter`:

| Specialist | Doc | When |
|---|---|---|
| `seo-technical` | [Agents/seo-technical.md](Agents/seo-technical.md) | Universal — always |
| `seo-performance` | [Agents/seo-performance.md](Agents/seo-performance.md) | Universal — always |
| `seo-content` | [Agents/seo-content.md](Agents/seo-content.md) | Universal — always |
| `seo-schema` | [Agents/seo-schema.md](Agents/seo-schema.md) | Universal — always |
| `seo-cluster` | [Agents/seo-cluster.md](Agents/seo-cluster.md) | Universal — always |
| `seo-backlinks` | [Agents/seo-backlinks.md](Agents/seo-backlinks.md) | Universal — always |
| `seo-sitemap` | [Agents/seo-sitemap.md](Agents/seo-sitemap.md) | Universal — always |
| `seo-sxo` | [Agents/seo-sxo.md](Agents/seo-sxo.md) | Universal — always |
| `seo-local` | [Agents/seo-local.md](Agents/seo-local.md) | Local/Service archetype |
| `seo-maps` | [Agents/seo-maps.md](Agents/seo-maps.md) | Local/Service archetype |
| `seo-ecommerce` | [Agents/seo-ecommerce.md](Agents/seo-ecommerce.md) | E-commerce archetype |
| `seo-google` | [Agents/seo-google.md](Agents/seo-google.md) | Only if GSC/GA4 access supplied |

Realistically **8-11 of these 12** run for any given free study — never all 18 in the full bench, and the exact set depends on what the site turns out to be. 5 more vendored agents aren't wired into this path at all — see [../Vendored (not used yet)/README.md](../Vendored%20%28not%20used%20yet%29/README.md). Full bench reference: [../specialist-bench.md](../specialist-bench.md).

## Output

Two documents, never one: the **Internal Report** (full detail, admin-only) and the **Client Report** (diagnosis-only teaser with a Ranking Opportunity Score) — see [Skills/seo-brand-study-reporter-skill.md](Skills/seo-brand-study-reporter-skill.md). The Client Report becomes the proposal's `brief` PDF.

## Example output

See [Reports/](Reports/) — [Example - Ceylon Spice Traders Internal Report.pdf](Reports/Example%20-%20Ceylon%20Spice%20Traders%20Internal%20Report.pdf) and [Example - Ceylon Spice Traders Client Report.pdf](Reports/Example%20-%20Ceylon%20Spice%20Traders%20Client%20Report.pdf) — a fictional e-commerce site studied end-to-end through this path.

## Cost

Free to the customer. Nothing here deducts tokens or creates an `Order` — that only happens once a package is picked.
