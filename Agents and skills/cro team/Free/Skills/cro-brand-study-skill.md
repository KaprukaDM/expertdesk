# cro-brand-study (skill)

**Definition:** `.claude/skills/cro-brand-study/SKILL.md`
**Loaded by:** `cro-brand-study` agent

Defines the business-model-aware conversion audit run on every incoming CRO brand-study request:

- **North star — the conversion lens**: every finding must answer "does fixing this remove purchase friction, or build the trust needed to complete one" — no generic UX commentary
- **Step 0 — Business-Model Filter**: DTC/Single-Category, Multi-Category Catalog, Subscription/Recurring, Marketplace — determines which friction points get weighted more heavily
- **The audit**: actually walks the buying path as a customer would (landing → product/category → cart → checkout → confirmation), always explicitly checking for surprise shipping costs and mobile-specific breakage
- Leans on the vendored `cro` marketingskills skill for underlying methodology
- Hands off raw findings to `cro-brand-study-reporter` rather than writing the final documents itself

See [Agents/brand-study-research.md](../Agents/brand-study-research.md) for the agent that loads this skill.
