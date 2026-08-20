# Service Store — Project Architecture

> **Product name:** Service Store (servicestore.lk)
> **Owner:** Kapruka / Digital Marketing
> **Status:** Architecture draft v0.1
> **Primary market:** Sri Lankan SMEs (self-serve, no agency)

---

## 1. Positioning — what this actually is

Not an agency. Not a done-for-you service. A **self-serve marketing coach** that:

1. Understands your business once (URL → brand kit + ICP + industry context).
2. Diagnoses each marketing area on demand (SEO, ads, social, local, etc.).
3. Tells you the **3 things that matter, ranked in rupees**, in plain language.
4. **Walks you through fixing them yourself** inside your own website/tools.
5. **Checks your work** and hands you the next thing — over WhatsApp.

The wedge: agencies cost SMEs a fortune and half the money pays humans to click buttons. Free audit tools stop at a PDF nobody reads. **We close the gap between "here's the problem" and "it's actually fixed."** That loop — diagnose → guide → verify → next — is the product. Everything else is plumbing.

Optional revenue tail: every guided task ends with *"…or tap here and we'll do this one for you (X tokens)."* DIY stays the promise; done-for-you is the upsell for people who won't.

---

## 2. Non-negotiable principles

These are enforced in code and in every agent prompt. If a feature breaks one of these, it doesn't ship.

| # | Principle | What it means in practice |
|---|-----------|---------------------------|
| P1 | **No jargon, ever** | Banned words list (§11). Every finding = plain description + why it costs sales + one action. |
| P2 | **Rupee-ranked, not score-ranked** | Never lead with "SEO score 62." Lead with "fix this → ~X more orders/month." |
| P3 | **Ruthless prioritization** | Show the top 3 for the month, not 200 issues. Value is subtraction. |
| P4 | **DIY-guided, platform-aware** | Steps a shop owner can follow, tailored to their actual platform (WordPress/Shopify/custom). |
| P5 | **WhatsApp-native** | The primary surface is WhatsApp, not a dashboard they log into once. |
| P6 | **Remember the business** | Business context is captured once and reused by every department, forever. |
| P7 | **Close the loop** | Re-scan to confirm a fix is live, show the lift, surface the next task. |

---

## 3. System architecture (high level)

```
                        ┌─────────────────────────────┐
   Sign up  ──▶  Brand URL ──▶  BUSINESS CONTEXT ENGINE │  (Phase 1, one-time)
                        │  brand kit · ICP · industry · │
                        │  platform  →  CONFIRM/EDIT    │
                        └──────────────┬──────────────┘
                                       │  saves Business Profile
                                       ▼
                        ┌─────────────────────────────┐
                        │          MAIN MENU           │
                        │   Marketing "Departments"    │
                        │  each = tokens to run        │
                        └──────────────┬──────────────┘
             ┌───────────┬─────────────┼─────────────┬───────────┐
             ▼           ▼             ▼             ▼           ▼
           SEO        Paid Ads      Social        Local/GBP    Website/CRO ...
             │  each department runs the SAME 8-step pipeline (§5)
             ▼
   AUDIT ▶ PRIORITIZE (rupees) ▶ TRANSLATE (no-jargon) ▶ GUIDE (platform) ▶ DELIVER
             ▲                                                                 │
             └──────────────  VERIFY LOOP (re-scan, WhatsApp)  ◀──────────────┘

   Underneath everything:  TOKEN WALLET  ◀──  RELOAD (payment)
```

Three durable subsystems:
- **A. Business Context Engine** — runs once at signup, produces the Business Profile.
- **B. Department Framework** — a repeatable pipeline every marketing department plugs into.
- **C. Token & Wallet layer** — reload, balance, per-action pricing.

---

## 4. Phase 1 — Business Context Engine (signup)

**Goal:** turn a single URL into a rich, confirmed business profile that every department reads from — so the user never re-explains their business.

### 4.1 Steps

| Step | What happens | Tool / agent |
|------|--------------|--------------|
| 1. Fetch & render | Crawl homepage + key pages (about, products, contact), take full screenshot | Firecrawl *or* Playwright + Jina Reader |
| 2. Brand kit | Extract logo, colour palette (hex), fonts, imagery style, tone of voice | Vision model (Claude/GPT-4o vision) + `node-vibrant` for colours |
| 3. ICP | Build ideal-customer profile: who they sell to, price tier, buying triggers | LLM (Claude Sonnet) |
| 4. Industry context | Classify vertical; pull seasonality, typical channels, common competitors | LLM + optional web/SERP lookup |
| 5. Platform fingerprint | Detect WordPress/Woo, Shopify, Wix, custom — **critical for later guided fixes** | Wappalyzer lib / header + HTML signatures |
| 6. Assemble & confirm | Show the profile back; user edits anything wrong; save | App UI + Supabase |

### 4.2 Business Profile schema (stored in Supabase, `jsonb`)

```json
{
  "url": "https://example.lk",
  "platform": "woocommerce",
  "brand_kit": {
    "colors": { "primary": "#0A5", "secondary": "#F4B400", "neutrals": ["#111","#FFF"] },
    "fonts": ["Poppins", "Noto Sans Sinhala"],
    "tone": "warm, family-run, value-focused",
    "logo_url": "…"
  },
  "icp": {
    "who": "middle-income SL households buying kids' clothing",
    "price_tier": "value",
    "buying_triggers": ["school season", "avurudu", "gifting"]
  },
  "industry": {
    "vertical": "apparel / kids fashion",
    "seasonality": ["April (Avurudu)", "December", "back-to-school"],
    "primary_channels": ["facebook", "instagram", "whatsapp", "google"],
    "likely_competitors": ["…"]
  },
  "confirmed_by_user": true,
  "updated_at": "…"
}
```

> **Design note:** the confirm/edit step is not optional politeness — a wrong industry or platform poisons every downstream audit. Make editing effortless (tap a field, fix it).

---

## 5. The Department Framework (shared pipeline)

Every marketing department is the **same 8-step pipeline** with department-specific data sources and rules. This mirrors the tiered rule-engine + AI pattern from the fraud workflow: **deterministic checks first, LLM for judgment and translation.**

```
1. LOAD CONTEXT      →  read Business Profile
2. COLLECT DATA      →  APIs / crawl / connected accounts (department-specific)
3. ANALYZE           →  deterministic rule checks  ➜  raise raw findings
4. PRIORITIZE        →  score each finding by estimated £/order impact, keep top N
5. TRANSLATE         →  no-jargon layer (§11): plain + why-it-costs-sales + action
6. GUIDE             →  platform-aware step-by-step fix (from Business Profile.platform)
7. DELIVER           →  app card + WhatsApp message
8. VERIFY LOOP       →  on "done", re-run the specific check, confirm, show lift, next task
```

Steps 3–4 are cheap/deterministic (rules + Haiku/mini). Steps 5–6 use a stronger model (Sonnet) for quality writing. This keeps token cost per audit low.

---

## 6. Departments (the main menu)

Each department below lists: **what it audits · data sources · agents · a sample no-jargon finding.**

### 6.1 SEO Department
- **Audits:** page speed, mobile, indexing, titles/descriptions, site structure, keyword gaps, local relevance.
- **Data sources:** Google PageSpeed Insights API (perf/Core Web Vitals), site crawl (Playwright), DataForSEO *or* SerpAPI (keywords/SERP), optional Google Search Console (if user connects).
- **Agents:** `SEO Technical Checker` (rules), `Keyword Opportunity Agent` (LLM), `Fix-Guide Writer` (LLM, platform-aware).
- **Sample finding:**
  > 🔴 Your website takes 6 seconds to open. Most people leave after 3 — you're losing shoppers before they see anything. **Do this:** shrink these 8 heavy photos (2-min job). **If you fix it:** pages open ~4s faster, more people reach checkout.

### 6.2 Paid Ads Department
- **Audits:** existing Meta/Google account health (if connected), wasted spend, targeting, creative fatigue; or a **launch plan** for those with no ads yet.
- **Data sources:** **Meta MCP** (already available — insights, benchmarks, ad library for competitor ads), Google Ads API.
- **Agents:** `Ad Account Auditor`, `Competitor Ad Spy` (Meta Ad Library), `Budget & Creative Advisor`.
- **Sample finding:**
  > 🟠 You're spending on ads shown to the whole country, but you only deliver in Colombo & Gampaha. Roughly 40% of your budget is reaching people who can't buy. **Do this:** limit your ad area (we'll show the 3 clicks). **If you fix it:** same budget, ~40% more useful clicks.

### 6.3 Social Media Department
- **Audits:** posting consistency, profile completeness, content mix, engagement, bio/link.
- **Data sources:** Instagram/Facebook Graph API (own pages), brand kit for on-brand suggestions.
- **Agents:** `Profile Auditor`, `Content Calendar Generator` (uses brand kit + industry seasonality), `Caption Writer` (OpenAI).
- **Sample finding:**
  > 🟡 You posted 3 times in 30 days. Your customers forget shops that go quiet. **Do this:** here's a ready 2-week calendar built for your brand — copy, tweak, schedule. **If you fix it:** staying visible keeps you top-of-mind at buying time.

### 6.4 Local / Google Business Profile Department
- **Audits:** GBP completeness, categories, photos, reviews, map-pack visibility, NAP consistency.
- **Data sources:** Google Business Profile API, Google Places.
- **Agents:** `Local Presence Auditor`, `Review Response Coach`.
- **Sample finding:**
  > 🔴 When people search your type of shop "near me", you don't appear on the map. Your Google listing is half-empty. **Do this:** add these 5 details + 6 photos (guided). **If you fix it:** you start showing up to people ready to walk in or order.

### 6.5 Website / Conversion (CRO) Department
- **Audits:** checkout friction, trust signals, mobile UX, product page clarity, load-to-buy path.
- **Data sources:** Playwright screenshots + vision analysis, Lighthouse, heuristic rules.
- **Agents:** `Conversion Heuristics Checker`, `Trust & Checkout Auditor` (vision).
- **Sample finding:**
  > 🟠 On mobile, your "Buy" button is below three screens of scrolling. Many give up before reaching it. **Do this:** move it up (guided for your theme). **If you fix it:** fewer people drop off before buying.

### 6.6 Email / Retention Department
- **Audits:** whether repeat-purchase basics exist (welcome, abandoned cart, win-back).
- **Data sources:** connected email tool (if any) or gap analysis.
- **Agents:** `Retention Gap Finder`, `Flow Copy Writer`.

> Departments are modular — add **Content**, **Marketplace (Daraz)**, **WhatsApp Marketing** later using the same framework.

---

## 7. Package / Tier model

**One consistent 3-tier ladder, applied inside every department.** Users learn it once and it works everywhere.

| Tier | Name | For | One-line promise |
|------|------|-----|------------------|
| **T1** | **Quick Check** | first-timers, low commitment | "The 3 biggest problems + fix the top one." |
| **T2** | **Full Audit + Plan** | the core product | "Everything that's wrong, ranked, with guided fixes + coaching." |
| **T3** | **Growth Partner** | ongoing, serious SMEs | "Monthly re-audit, competitor tracking, and priority done-for-you help." |

### 7.1 What actually differs (feature matrix)

| Feature | T1 Quick Check | T2 Full Audit | T3 Growth Partner |
|--------|:---:|:---:|:---:|
| Pages scanned | Homepage + 1 | Whole site | Whole site |
| Issues surfaced | Top 3 | All, prioritized | All, prioritized |
| Guided fixes | Top 1 | All | All |
| Plain-language translation | ✅ | ✅ | ✅ |
| WhatsApp coaching / nudges | — | ✅ | ✅ (proactive) |
| Verification re-scan | — | 1 | Ongoing |
| Competitor benchmark | — | — | ✅ |
| "Do-it-for-me" token credits | — | — | ✅ (monthly) |
| Cadence | One-shot | One-shot | Monthly auto |

This matrix is **identical across departments** — only the underlying checks change. That keeps the product legible and the codebase DRY.

---

## 8. Token & wallet economics

### 8.1 Model
- User **reloads** (tops up) → receives **tokens** into a wallet.
- Running any department at any tier **debits tokens**.
- One fungible wallet across all departments — *this is the reason tokens exist* (a broad catalog with one currency). If this were SEO-only, we'd skip tokens and price in rupees.

### 8.2 Pricing logic (not arbitrary)
Package token cost is derived from **underlying cost of goods** (API calls + LLM tokens + compute) **× margin**, then rounded to a clean number. Illustrative only — tune against real COGS:

| | Illustrative COGS | Token price (illustrative) |
|---|---|---|
| T1 Quick Check | ~data + 1 cheap LLM pass | **50 tokens** |
| T2 Full Audit | full crawl + several LLM passes | **200 tokens** |
| T3 Growth Partner (monthly) | recurring + priority | **500 tokens / mo** |

Illustrative anchor: **1 token ≈ LKR 10** → Quick Check ≈ LKR 500, Full Audit ≈ LKR 2,000. (Confirm against real costs before launch.)

### 8.3 Policy decisions to lock before launch
- **Expiry:** do tokens expire? (recommend: long expiry, e.g. 12 months, clearly stated.)
- **Refunds:** define upfront to avoid disputes.
- **Accounting:** unused token balance is a **liability** — coordinate with finance on how prepaid credit is booked (matters because KPHL is listed).
- **Value legibility:** always show "X tokens = LKR Y = this outcome." Never let a user hold tokens they can't value.

---

## 9. AI tool & agent stack (consolidated)

### 9.1 Model routing (cost discipline)
| Job | Model | Why |
|-----|-------|-----|
| Classification, rule-ish checks, cheap parsing | **GPT-4.1-mini / nano** or **Claude Haiku** | high volume, low cost |
| Prioritization, ICP/industry synthesis, fix-guide writing, no-jargon translation | **Claude Sonnet** | quality reasoning + writing |
| Vision (brand kit, screenshot/UX audit) | **Claude / GPT-4o vision** | image understanding |

### 9.2 Full stack

| Layer | Choice | Notes |
|-------|--------|-------|
| **Orchestration / agents** | **n8n** (primary) + code-node agents for complex depts | leverages existing fluency; each department = a workflow |
| **LLMs** | Claude (Sonnet/Haiku) + OpenAI (4.1-mini/nano) | route per §9.1 |
| **Web scraping / render** | Firecrawl or Jina Reader + Playwright | Playwright also for screenshots |
| **Performance data** | Google PageSpeed Insights API | free, Core Web Vitals |
| **SERP / keywords** | DataForSEO (recommended) or SerpAPI | DataForSEO = better cost at scale |
| **Paid ads data** | **Meta MCP** (already connected) + Google Ads API | Ad Library for competitor spying |
| **Social** | Instagram/Facebook Graph API | own-page audits |
| **Local** | Google Business Profile + Places API | map-pack + listing checks |
| **Platform detection** | Wappalyzer lib / BuiltWith | drives guided-fix accuracy |
| **Database / auth / storage** | **Supabase (Postgres)** | already in stack |
| **Frontend** | **Cloudflare Pages** (+ React) | already in stack |
| **Messaging** | **WhatsApp Business Cloud API** ("Moorthi Eagle Dash") | primary delivery surface |
| **Payments / reload** | PayHere / KokoPay / bank / mobile reload | local SME-friendly rails |

---

## 10. Data model (Supabase — core tables)

```
users(id, phone, name, created_at)
business_profiles(id, user_id, url, platform, brand_kit jsonb, icp jsonb,
                  industry jsonb, confirmed, updated_at)
wallets(id, user_id, balance)
token_transactions(id, wallet_id, delta, reason, ref_id, created_at)
reloads(id, user_id, amount_lkr, tokens_credited, gateway, status, created_at)
audits(id, business_id, department, tier, status, token_cost, created_at)
findings(id, audit_id, priority, plain_title, why_it_costs, impact_est_lkr,
         fix_guide jsonb, status)   -- status: open | done | verified
verification_runs(id, finding_id, result, checked_at, lift_note)
whatsapp_threads(id, user_id, finding_id, last_msg, state)
```

---

## 11. The no-jargon translation layer (shared)

A single system instruction wraps every finding produced by any department:

> Write every finding as three parts: **(1)** what's happening, in words a shop owner uses; **(2)** how it's costing them customers or orders; **(3)** the single next action. Never show a number without translating it into orders or rupees.
>
> **Banned words:** meta description, H1, schema, canonical, crawl, index, backlink, domain authority, CTR, bounce rate, SERP, impressions, alt text, sitemap.

**Finding output template (every department, every tier):**
```
🔴/🟠/🟡  <plain problem title>
<one line: why it's costing you customers/sales>
Do this: <single action>  [+ guided steps]
If you fix it: <expected result in orders/rupees/visibility>
Done? Reply ✅ and I'll re-check for you.
```

---

## 12. Verification loop (the differentiator)

1. Each finding stores a **check fingerprint** (the exact test that raised it).
2. When the user marks a fix **done** (app tap or WhatsApp ✅), re-run *only that check*.
3. If it now passes → mark **verified**, show a short "here's the improvement" note, surface the **next** priority.
4. If it still fails → gentle "looks like it's not live yet — want the steps again, or shall we do it for you (X tokens)?"

This is what converts a one-shot audit into a habit and recurring token spend.

---

## 13. Build roadmap

**Recommendation: go deep on ONE department first, prove the full loop, then widen.** A broad-but-shallow catalog on day one spreads effort thin and never proves the loop works. SEO is the best first vertical (universal need, rich free data, clear fixes).

| Phase | Scope | Goal |
|-------|-------|------|
| **0 — Foundations** | Auth, wallet, reload, Business Context Engine, WhatsApp channel | A user can sign up, get a profile, hold tokens |
| **1 — SEO department, all 3 tiers, full loop** | audit → rupee-rank → no-jargon → guided fix → verify | Prove people *complete* fixes and *come back* |
| **2 — Add Paid Ads (Meta MCP)** | reuse framework | Second department at low marginal effort |
| **3 — Social + Local** | reuse framework | Broaden the wallet's usefulness |
| **4 — Done-for-me upsell + Growth Partner cadence** | recurring revenue | Compound the token spend |

---

## 14. Open decisions (confirm before/while building)

1. **Product name** and brand.
2. **Scraping vendor:** Firecrawl (managed, easy) vs self-hosted Playwright (cheaper, more work).
3. **SERP/keyword vendor:** DataForSEO (recommended) vs SerpAPI — depends on SL keyword coverage + budget.
4. **Agent framework:** pure n8n workflows vs n8n + a code agent layer (CrewAI/LangGraph) for the heavier departments.
5. **Token price + 1 token = LKR X**, tied to measured COGS.
6. **Token expiry & refund policy** (and finance sign-off on prepaid-credit accounting).
7. **Connected vs unconnected mode** for SEO/Ads — how much value can we deliver *without* the user connecting GSC/GA4/ad accounts (most SMEs won't at first).

---

*End of architecture draft v0.1.*
