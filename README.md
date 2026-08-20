# Expert Desk

A self-serve marketing coach for Sri Lankan SMEs. Give it your website; a real Claude agent
researches your business, and you spend tokens on marketing experts — SEO, GEO, Google Ads, Meta Ads,
Content Strategist, UI/UX, CRO Optimizer — who audit your business and hand back the 3 things costing
you sales, ranked in rupees, with guided fixes.

See [`sme-marketing-copilot-architecture.md`](./sme-marketing-copilot-architecture.md) for the original
product concept and [`TECH_STACK.md`](./TECH_STACK.md) for what this is built on (including a list of
hard-won platform gotchas worth reading before touching the Claude agent layer or `src/proxy.ts`).

## Prerequisites

- Node.js 22+
- The [Claude Code CLI](https://claude.com/claude-code) installed and logged in on this machine —
  the app shells out to your authenticated `claude` session to run its agents. No API key needed.

## Setup

```bash
npm install
cp .env.example .env      # fill in AUTH_SECRET, see below
npx prisma migrate dev    # creates prisma/dev.db
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) (Next.js will pick a different port if 3000 is
already in use on your machine — check the terminal output).

Generate `AUTH_SECRET` with:

```bash
npx auth secret
```

## How it works

1. **Sign up** — real account, password hashed, session cookie. Every new account starts with 100
   free tokens.
2. **Onboarding** — enter your website URL. A real Claude agent (`src/lib/agents/researchAgent.ts`)
   reads the page and infers your industry, ICP, seasonality, and competitors. A brand kit (colors,
   fonts, tone) is generated instantly and deterministically — no LLM call, by design.
3. **Dashboard** — pick from 7 marketing experts. Each has 3 packages (Quick Check / Full Audit +
   Plan / Growth Partner), priced in tokens, with genuinely different agent prompts per
   expert × package combination — not one shared template with a tier flag (see
   `src/lib/agents/expertAgent.ts`).
4. **Run an audit** — tokens are debited, a real Claude call produces rupee-ranked findings in plain
   language (no marketing jargon — see the banned-words list in `src/lib/agents/noJargon.ts`), and
   you can mark each one done as you fix it. A failed run refunds your tokens automatically.
5. **Wallet** — top up (mock, instant — no real payment gateway) and see your transaction history.

## Useful scripts

```bash
npm run dev          # start the dev server
npm run build         # production build + typecheck
npx prisma studio      # visual database browser
npm run db:export      # dump the local DB to data-export.xlsx for easy viewing
```

## Notes on scope

This is a working prototype, not a production system:

- Step 2 of each expert's audit pipeline ("collect data") is not wired to live data sources — no
  PageSpeed API, no Meta Ads API, no Google Business Profile API. The agent produces realistic,
  plausible findings grounded in the researched business profile, not measurements from your actual
  accounts. That's the natural seam to swap in real APIs later without touching the rest of the
  pipeline.
- Token top-up is a mock instant credit — no real payment processor is wired up.
- No email verification, no password reset flow.
