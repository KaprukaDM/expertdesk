# cro-funnel-auditor

**Definition:** `.claude/agents/cro-funnel-auditor.md`

Produces the **Funnel Audit** deliverable — the core deliverable every tier gets. Walks the actual buying path (landing → product/category → cart → checkout → confirmation) for the in-scope page count: 3 pages (Basic), up to 6 (Standard/Premium). Ranks drop-off points by impact, produces CTA + form quick fixes, and a written platform-specific fix guide (names the actual page/field/button, never generic advice).

Leans on the vendored `cro` marketingskills skill for methodology, `copywriting`/`popups` for CTA and micro-copy fixes. Always explicitly checks for surprise shipping costs at checkout and mobile-specific breakage.

Tools: `Read, Grep, Glob, Write, WebSearch, WebFetch`
