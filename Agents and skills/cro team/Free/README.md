# CRO Team — Free (pre-purchase brand study)

The free research step that runs **before** any money changes hands — a `ServiceRequest` comes in, this produces a brief + 3 tailored packages, the customer picks one, and only then does [../Paid/README.md](../Paid/README.md) take over.

## Agents in this path

| Agent | Doc | Job |
|---|---|---|
| `cro-brand-study` | [Agents/brand-study-research.md](Agents/brand-study-research.md) | Classifies the business model (Step 0), walks the buying path, produces raw findings |
| `cro-brand-study-reporter` | [Agents/reporter.md](Agents/reporter.md) | Compiles raw findings into the Internal Report + Client Report |
| `brand-study` | *(cross-service — see project root, not part of this team)* | Turns the Client Report into 3 tiered Basic/Standard/Premium package options |

## Skills in this path

| Skill | Doc | Loaded by |
|---|---|---|
| `cro-brand-study` | [Skills/cro-brand-study-skill.md](Skills/cro-brand-study-skill.md) | `cro-brand-study` |
| `cro-brand-study-reporter` | [Skills/cro-brand-study-reporter-skill.md](Skills/cro-brand-study-reporter-skill.md) | `cro-brand-study-reporter` |

Unlike the SEO team, there's no external specialist bench here — `cro-brand-study` walks the funnel itself, leaning on the vendored `cro` marketingskills skill for methodology rather than dispatching separate agents.

## Output

Two documents, never one: the **Internal Report** (full detail, admin-only, can include draft fix content for continuity) and the **Client Report** (diagnosis-only teaser with a Conversion Opportunity Score) — see [Skills/cro-brand-study-reporter-skill.md](Skills/cro-brand-study-reporter-skill.md). The Client Report becomes the proposal's `brief` PDF. No literal fix content (no rewritten CTA copy, no built A/B test, no finished tracking setup) ever reaches the client at this stage — that's what the paid package delivers.

## Cost

Free to the customer. Nothing here deducts tokens or creates an `Order` — that only happens once a package is picked. If the business has no online checkout, this pipeline flags it instead of forcing a study — CRO isn't the right service for lead-gen or brick-and-mortar sites.
