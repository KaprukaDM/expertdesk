# cro-fulfillment (skill)

**Definition:** `.claude/skills/cro-fulfillment/SKILL.md`
**Loaded by:** every specialist agent — this is the shared deliverable-content spec, not one agent's private rulebook

The deliverable scope and content spec each specialist follows, keyed to the CRO package tiers in `src/lib/services.ts`:

- **§1 Funnel Audit** — tool stack check (GA4/GTM/heatmap tool presence, detected via page source), buying-path walkthrough (incl. search/nav/product-page trust elements — this service is e-commerce-only), drop-off ranking, CTA/form fixes, written fix guide; scales 3→6 pages
- **§1a 7 Deadly Sins of CRO** — fast pass/fail scan vs. the 7 most common conversion killers (see `cro-seven-sins` skill); all tiers, cheaper than §2's laws audit
- **§2 UX Review** — mobile/desktop review of key pages, evaluated against ~50 established UI/UX laws (see `ux-laws-audit` skill — no external tool dependency, the guaranteed part) + verification re-scan with lift analysis + heatmap/session-recording as a bonus only if a tool is actually detected; Standard/Premium
- **§3 Tracking Audit** — GA4/conversion-tracking setup check; Premium
- **§4 A/B Test Roadmap** — 6 ready-to-run ideas tied to actual findings; Premium
- **§5 Competitor Benchmark** — vs. 2 named competitors' funnels; Premium
- **Recommended CRO Tool Stack** — what the tool stack check recommends when something's missing (GA4, GTM, Microsoft Clarity as the default free heatmap pick, GrowthBook/PostHog for A/B testing now that Google Optimize is discontinued) — a recommendation list for the fix guide, never installed on the client's behalf outside a Premium hand-off
- **Scope honesty** — every tier gets a written fix guide; "we'll build it for you" only applies when implementation was explicitly requested and delivered

See the roster in the team [README](../../README.md) for which agent owns which section.
