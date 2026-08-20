# cro-fulfillment (skill)

**Definition:** `.claude/skills/cro-fulfillment/SKILL.md`
**Loaded by:** every specialist agent — this is the shared deliverable-content spec, not one agent's private rulebook

The deliverable scope and content spec each specialist follows, keyed to the CRO package tiers in `src/lib/services.ts`:

- **§1 Funnel Audit** — buying-path walkthrough, drop-off ranking, CTA/form fixes, written fix guide; scales 3→6 pages
- **§2 UX Review** — mobile/desktop review + verification re-scan + heatmap/session-recording as a bonus only if connected; Standard/Premium
- **§2a UX Laws Audit** — key pages cross-checked against ~50 established UI/UX laws, no external tool dependency; the guaranteed Standard+ UX check (see `ux-laws-audit` skill)
- **§3 Tracking Audit** — GA4/conversion-tracking setup check; Premium
- **§4 A/B Test Roadmap** — 6 ready-to-run ideas tied to actual findings; Premium
- **§5 Competitor Benchmark** — vs. 2 named competitors' funnels; Premium
- **Scope honesty** — every tier gets a written fix guide; "we'll build it for you" only applies when implementation was explicitly requested and delivered

See the roster in the team [README](../../README.md) for which agent owns which section.
