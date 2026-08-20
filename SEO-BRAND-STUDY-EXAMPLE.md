# Brand Study Flow — Worked Example (SEO)

A concrete walkthrough of the new request-first flow, using a fictional client, before we build
it. This previews what's described in the "Package source: tailored per client" /
"charge only when they pick" / "applies to all 10 services" decision. Nothing here is built yet —
this is the spec, in plain English, for you to sanity-check first.

---

## The example business

**Ceylon Spice Co.** — a small Colombo-based exporter selling packaged spices and tea online
(a WooCommerce store, ~40 products). Owner signs up on Service Store and opens the **SEO**
service page.

---

## Step 1 — Customer requests the service (free, no tokens charged)

Instead of today's "Continue — 200 tokens" button that charges immediately, the SEO page now
shows:

> **Request a free brand study**
> We'll research your business and send back a tailored brief with 3 package options —
> no charge until you pick one.
>
> *Anything we should know? (optional)*
> [ Selling packaged Ceylon tea + spices online, mostly to UK/Australia. Traffic has been flat
>   for 6 months. ]
>
> **[ Request brand study ]**

Ceylon Spice Co. clicks submit. **Nothing is charged.** A request is logged and they land on a
status page:

> "Thanks — we're studying your business. You'll get a brief + 3 tailored options within
> [X] days."

---

## Step 2 — Agency runs the brand study

Someone on the Service Store team (or the Research Agent + a human review) looks at
`ceylonspice.lk`: indexation, current rankings, competitor gap, site speed, the note the customer
left. Say the findings are:

- Only 12 of 40 product pages are indexed by Google
- No product schema markup — competitors show star ratings in search, they don't
- Ranks for their brand name only — zero visibility for "buy ceylon tea online" or similar
- 2 competitors (UK-based) outrank them on the exact keywords that matter
- Site loads slowly on mobile (4.2s)

## Step 3 — Agency delivers a brief + 3 tailored options

The customer gets a notification / dashboard update: **"Your brief is ready."** They see:

### 📄 Brief document
A short PDF: what was found (the 5 bullets above), why it's costing them sales, in plain
language — not generic SEO jargon.

### 3 tailored package options
Not the generic catalog copy — priced and scoped for *this* business, based on what the study
actually found:

| | **Basic** | **Standard** | **Premium** |
|---|---|---|---|
| **What it does** | Fix indexation + schema on your 12 live pages | + get the other 28 products indexed and ranking | + take the 2 competitor keywords head-on, ongoing |
| **Scope (tailored)** | 12 pages · product schema · 5 quick technical fixes | 40 pages · schema sitewide · mobile speed fix · 8 keywords mapped | Everything in Standard · competitor keyword campaign · monthly reporting |
| **Why this fits them** | "Get found for what's already live" | "Get your whole catalog working" | "Go after the 2 sellers beating you" |
| **Delivery** | 3 days | 8 days | 30 days, ongoing |
| **Price (tailored)** | **65 tokens** *(vs. catalog default 50 — this store has more pages than the standard Basic scope)* | **220 tokens** | **520 tokens** |

The customer can only pick **one**. Nothing is charged yet — this is still just a proposal.

---

## Step 4 — What happens for each choice

### 🟢 If they pick **Basic** (65 tokens)
1. **65 tokens deducted** from their wallet immediately.
2. A real **Order** is created: "SEO — Basic", 3-day deadline, linked back to this request.
3. It appears in their dashboard under Purchase Activity with a live countdown, same as today.
4. Agency does the scoped work: indexes the 12 live pages properly, adds product schema, fixes
   the 5 technical issues.
5. Report delivered within 3 days → customer downloads it, same flow as today.
6. **What they did *not* get**: the other 28 pages, the mobile speed fix, competitor targeting —
   those were Standard/Premium only. If they want that later, it's a new request.

### 🟡 If they pick **Standard** (220 tokens)
1. **220 tokens deducted**.
2. Order created: "SEO — Standard", 8-day deadline.
3. Agency delivers everything Basic would have, **plus** gets all 40 products indexed, fixes
   mobile speed, and maps 8 keywords per the brief.
4. Same download-on-delivery flow.
5. This is the one the brief likely nudges them toward, since it addresses the *whole* catalog
   problem the study found — not just the live pages.

### 🔴 If they pick **Premium** (520 tokens, ongoing)
1. **520 tokens deducted** up front for this cycle.
2. Order created: "SEO — Premium", 30-day window.
3. Everything in Standard, **plus** the agency actively targets the 2 competitor keywords and
   sends a monthly performance report.
4. At the end of 30 days: no auto-renewal (matches the "no ongoing/monthly" decision from
   earlier) — they'd submit a fresh request (or we could add a "renew" shortcut later) to
   continue.

---

## What's the same no matter which they pick

- The **request itself was free** — the brand study cost them nothing.
- The **brief is theirs to keep** regardless of which tier they choose (or even if they choose
  none — see below).
- Token deduction happens **exactly once**, at the moment of picking, not before.
- From that point on, it's the **existing order flow** you already have: countdown timer, admin
  uploads the report, customer downloads it. Nothing changes after the pick.

## What if they pick nothing?

Worth deciding: does the request just sit as "proposal ready, awaiting your pick" forever, or
does it expire after N days? Fine either way — flag if you want an expiry.

---

## How this maps to what gets built

| Concept in this doc | New system piece |
|---|---|
| "Customer requests, no charge" | New `ServiceRequest` record, status `SUBMITTED` |
| "Agency delivers brief + 3 options" | Admin uploads a brief file + fills in 3 tailored `ProposedPackage` rows → status `PROPOSAL_READY` |
| "Customer picks one, gets charged" | Selecting a proposal deducts tokens and creates the real `Order` you already have today → request status `CONVERTED` |
| Everything after that | **Unchanged** — same Order, same countdown, same admin report upload, same download |

This replaces the current instant "Continue — X tokens" button on all 10 service pages with the
"Request a free brand study" flow above.

---

**Open question before I build this:** should a request **expire** if the customer never picks
one of the 3 options (e.g., auto-decline after 14 days), or should it just sit there indefinitely
until they act?
