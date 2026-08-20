# Social Media Team — Free (pre-purchase brand study)

The free research step that runs **before** any money changes hands — a `ServiceRequest` comes in, this produces a brief + 3 tailored packages, the customer picks one, and only then does [../Paid/README.md](../Paid/README.md) take over.

## Agents in this path

| Agent | Doc | Job |
|---|---|---|
| `social-media-brand-study` | [Agents/brand-study-research.md](Agents/brand-study-research.md) | Step 0 industry-archetype filter, runs the 9 audits (Page, Industry, Competitor, Content, Gap, 6-Month Performance, Missing Functions, plus SWOT synthesis), produces raw findings |
| `social-media-brand-study-reporter` | [Agents/reporter.md](Agents/reporter.md) | Compiles raw findings into the Internal Report + Client Report |
| `brand-study` | *(cross-service — see project root, not part of this team)* | Turns the Client Report into 3 tiered Basic/Standard/Premium package options |

## Skills in this path

| Skill | Doc | Loaded by |
|---|---|---|
| `social-media-brand-study` | [Skills/social-media-brand-study-skill.md](Skills/social-media-brand-study-skill.md) | `social-media-brand-study` |
| `social-media-brand-study-reporter` | [Skills/social-media-brand-study-reporter-skill.md](Skills/social-media-brand-study-reporter-skill.md) | `social-media-brand-study-reporter` |

Unlike the SEO team, there's no external specialist bench here — all 9 audits are project-built and run as part of `social-media-brand-study` itself, not dispatched as separate agents.

## Output

Two documents, never one: the **Internal Report** (full detail, admin-only, can include draft fix content for continuity) and the **Client Report** (diagnosis-only teaser with an Opportunity Score) — see [Skills/social-media-brand-study-reporter-skill.md](Skills/social-media-brand-study-reporter-skill.md). The Client Report becomes the proposal's `brief` PDF. No literal fix content (no rewritten bio, no ready captions, no built calendar) ever reaches the client at this stage — that's what the paid package delivers.

## Example output

See [Reports/](Reports/) — `Example - Ceylon Bites Internal Report.pdf` and `Example - Ceylon Bites Client Report.pdf`, plus `Brand Study Journey.pdf` for the end-to-end walkthrough.

## Cost

Free to the customer. Nothing here deducts tokens or creates an `Order` — that only happens once a package is picked.
