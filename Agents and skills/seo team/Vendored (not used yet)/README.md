# Vendored, but not wired into Free or Paid

These 5 agents came with the claude-seo vendor drop (see project root `THIRD-PARTY-NOTICES.md`) but nothing in `seo-brand-study` (Free) or `seo-team` (Paid) currently dispatches them. That's why you won't find them under either `../Free/Agents/` or `../Paid/Agents/` — they exist in `.claude/agents/` and are callable directly, just not part of either automated flow yet.

| Agent | Why it's not wired in |
|---|---|
| `seo-drift` | Needs a prior baseline snapshot to compare against — nothing in either flow creates one yet |
| `seo-flow` | Optional structuring aid (FLOW framework prompts) — no package feature maps to it |
| `seo-image-gen` | Image generation — arguably belongs as a Graphic Design upsell, not SEO, never scoped in |
| `seo-dataforseo` | Needs a DataForSEO API key configured — infra dependency, not decided on yet |
| `seo-geo` | AI-search visibility — deliberately excluded, that's the separate GEO service, not SEO |

If any of these should become part of the SEO package, that's a `src/lib/services.ts` + `seo-team`/`seo-brand-study` skill change, not just a doc move.
