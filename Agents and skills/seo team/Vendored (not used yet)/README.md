# Vendored, but not wired into Free or Paid

These 5 agents came with the claude-seo vendor drop (see project root `THIRD-PARTY-NOTICES.md`) but nothing in `seo-brand-study` (Free) or `seo-team` (Paid) currently dispatches them. That's why you won't find them under either `../Free/Agents/` or `../Paid/Agents/` — they exist in `.claude/agents/` and are callable directly, just not part of either automated flow yet.

| Agent | Why it's not wired in |
|---|---|
| `seo-drift` | Needs a prior baseline snapshot to compare against — nothing in either flow creates one yet |
| `seo-flow` | Optional structuring aid (FLOW framework prompts) — no package feature maps to it |
| `seo-image-gen` | Image generation — arguably belongs as a Graphic Design upsell, not SEO, never scoped in |
| `seo-dataforseo` | Needs a DataForSEO API key configured — infra dependency, not decided on yet |
| `seo-geo` | AI-search visibility — deliberately excluded, that's the separate GEO service, not SEO |

## Skill-only extras (no matching agent at all)

claude-seo also shipped 14 skills with no dedicated agent — callable directly via the Skill tool, never dispatched by any pipeline:

| Skill | What it is |
|---|---|
| `seo` | The general/comprehensive audit skill the plugin's own bundled workflow uses |
| `seo-full-audit` | claude-seo's own full-site-audit skill (installed under this name — the project's pre-existing `seo-audit` skill is unrelated and kept as-is) |
| `seo-competitor-pages` | Generates "X vs Y" / "alternatives to X" comparison pages |
| `seo-content-brief` | Competitive content briefs with word counts and competitor scoring |
| `seo-dataforseo` | Live SERP/keyword data via the DataForSEO MCP — needs an API key |
| `seo-drift` | Regression tracking against a saved baseline |
| `seo-flow` | FLOW-framework (Find→Leverage→Optimize→Win) stage prompts |
| `seo-geo` | AI Overviews / ChatGPT / Perplexity visibility — the separate GEO service |
| `seo-hreflang` | International SEO / hreflang validation |
| `seo-image-gen` | OG/social preview image generation |
| `seo-images` | Image optimization audit (alt text, formats, CLS) |
| `seo-page` | Deep single-page SEO analysis |
| `seo-plan` | Strategic SEO planning / roadmap generation |
| `seo-programmatic` | Template-driven pages-at-scale planning |

If any of these — agents or skills — should become part of the SEO package, that's a `src/lib/services.ts` + `seo-team`/`seo-brand-study` skill change (and a new/updated command in `.claude/commands/`), not just a doc move.
