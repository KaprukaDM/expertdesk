# Development Tracker

Living checklist of what's built vs. what's left on Expert Desk (formerly "Service Store"). Update this as items land — don't let it drift out of sync with the code.

## ✅ Done

**Brand & homepage**
- [x] Kapruka brand colors (purple `#3C096C` / gold) and Inter font applied site-wide
- [x] Homepage rebuilt per wireframe — hero, category pills, popular services, footer
- [x] Hero background video (`hero-video.mp4`) with legible text overlay
- [x] Hero H1: "Get expert marketing without the agency cost."
- [x] "Powered by Kapruka" in header + footer
- [x] Homepage decluttered — packages ladder and duplicate services grid removed, both moved to dedicated `/services`

**Services & gig pages**
- [x] `/services` — all 11 services listed (SEO, CRO, Google Ads, Meta Ads, Content Strategy, Social Media Management, Video Creation, Graphic Design, GEO, Video Editing, Motion Graphics)
- [x] `/services/[slug]` gig page per wireframe — breadcrumb, gallery, description, request-a-brand-study sidebar, Compare/FAQ/Reviews tabs
- [x] Reviews tab is an honest empty state (no fake reviews/personas/trust logos anywhere)
- [x] Uniform token pricing across every service — Basic 50 / Standard 200 / Premium 500 tokens/mo
- [x] Real user-provided package copy for **SEO** (Basic + Standard), **GEO** (Basic + Standard), and **Meta Ads** (all 3 tiers)

**Accounts & ordering**
- [x] Signup/login required before ordering (Credentials auth via NextAuth v5)
- [x] Thank-you page with live countdown timer to delivery deadline
- [x] "Purchase activity" in customer dashboard — order list + download once delivered
- [x] Customer dashboard redesign — persistent sidebar app shell (`DashboardShell`) shared across Overview/Requests/Orders/Wallet, replacing each page's own back-link header; desktop sidebar nav with active state + badge counts (open requests, in-progress orders), mobile bottom tab bar; branded gradient hero with overlapping stat cards on Overview; fixed a pre-existing bug where `ORDER_PLACED`/`ORDER_REFUND` wallet transactions showed the raw enum instead of a label
- [x] Customer request-tracking improvements — self-service **withdraw** for a still-`SUBMITTED` request (new `WITHDRAWN` status, `cancelServiceRequest`, `/api/requests/[id]/cancel`, confirm dialog), in-app **expiry countdown** ("expires in Nd") on `PROPOSAL_READY` requests via `getProposalExpiry`, and `/dashboard/requests` now sorts brief-ready requests to the top (mirrors the admin console's SUBMITTED-bubbling). Admin list/detail pages updated to show "Withdrawn by customer" instead of breaking on the new status.

**Brand study request flow (replaces instant checkout)**
Service pages no longer sell fixed Basic/Standard/Premium tiers directly — every service now
goes through a free request → brand study → tailored proposal → pick-and-pay flow. Verified
end-to-end with a 20-point Playwright script (request → no charge → admin proposal → tailored
pricing shown → pick → exact token deduction → order → existing report/download flow, all
passing) before being deleted (scratch test, not checked in).
- [x] `ServiceRequest` + `ProposedPackage` Prisma models (`RequestStatus`: SUBMITTED → PROPOSAL_READY → CONVERTED/DECLINED), `Order.sourceRequestId` linking a converted request to its real order
- [x] Service pages: "Request a free brand study" form (optional message) replaces the old instant "Continue — X tokens" buttons — **requesting is free, no tokens move**
- [x] Admin `/admin/requests` — list (SUBMITTED bubbled to top), detail page with the customer's message
- [x] Admin proposal builder — upload a brief document + write 3 **tailored** packages (custom name/tagline/tokens/delivery/features per client, not the generic catalog copy) → sends to customer
- [x] Customer `/requests/[id]` — status-aware: in-progress / brief + 3 tailored options to pick from / expired
- [x] Picking a proposal deducts tokens **at that moment only** (atomic `$transaction`, balance-checked) and creates a real `Order` — from there it's the existing unchanged flow (countdown, admin report upload, customer download)
- [x] Unpicked proposals **auto-decline after 30 days** (lazy-checked on read, no cron needed)
- [x] Dashboard: proposal-ready banner + "Brand study requests" list + dedicated `/dashboard/requests` history page
- [x] Guards: one active request/order per service at a time (same rule as the old instant-checkout flow had)
- [x] `/services/[slug]` "Compare packages" tab kept as **illustrative reference only** — clearly labelled "a starting point," real pricing comes from the tailored proposal

**Admin backend**
- [x] Role-based admin access (`role` column, not hardcoded emails)
- [x] `/admin` — all businesses' orders, services, deadlines, statuses
- [x] Per-order detail page + file-upload delivery (`POST /api/admin/orders/[id]/report`)
- [x] Customer download endpoint, gated to owner or admin, only after delivery
- [x] Separate admin login credentials created
- [x] Fixed bug: admin login was falling into customer onboarding/"client view" — role check now short-circuits in `dashboard/layout.tsx` and `onboarding/page.tsx`
- [x] **Agency ↔ client fully separated (same domain, two doors)**: dedicated `/admin/login`, admin pages moved under `admin/(protected)/` route group (gate → `/admin/login`, not the client login), admin area no longer links into `/dashboard` (agency logout returns to `/admin/login`), each login page rejects the wrong role, and `proxy.ts` guards each area to its own door. Subdomain split (`admin.` vs `app.`) left as a deploy-time option.

**Cleanup**
- [x] Legacy `/dashboard/[expert]` audit-tool system removed entirely (routes, API, components, libs)
- [x] `PRODUCT-BRIEF.md` written for copywriters

## 🔲 Pending

**Reference package copy — confirm real numbers per service**
Now illustrative-only (see "Compare packages" tab, not live checkout — real pricing comes from
the tailored proposal an admin writes per client). Still worth keeping accurate since it's the
first pricing impression a visitor sees. Benchmarked against Fiverr competitor research
(`Fiverr Research - Sheet1.pdf`, covers Video Editing / Graphic Design / Google Ads). These 3
still have placeholder features/delivery days/revisions I inferred and you haven't confirmed:
- [ ] CRO
- [ ] Content Strategy
- [ ] Video Creation
- [ ] GEO — Premium tier specifically (Basic/Standard are real, Premium is still my placeholder)

_Real copy landed: SEO, GEO (Basic/Standard), Meta Ads (all 3 tiers), **Video Editing** (footage-based, one-off Premium 5-video pack), **Motion Graphics** (new service — script-based, no footage), **Graphic Design** (volume-based, one-off Premium 25-design pack), **Google Ads** (audit + one-off build, keywords 8/15/30, takeaway guides, tokens 150/400/750)._

- [ ] SEO / CRO / Content Strategy / Video Creation / GEO reference copy still says "Ongoing, monthly" / "500 tokens/mo" on the illustrative Compare tab — sweep to one-off wording to match Video Editing / Graphic Design / Google Ads (low priority now that this isn't live checkout, but inconsistent to leave)

**Brand study flow — follow-ups**
- [ ] No email/notification when a brief is ready — customer only finds out by returning to the dashboard or `/requests/[id]` (ties into the existing "no email notifications" gap below)
- [ ] No **email/push** reminder before a proposal's 30-day auto-decline — an in-app countdown now shows on `/dashboard/requests` and `/requests/[id]` (see above), but nothing proactively notifies the customer
- [ ] No "renew" shortcut for a Premium option after its delivery window ends — customer has to submit a fresh request
- [ ] No admin badge/count showing how many requests are `SUBMITTED` (needs-action) outside of opening `/admin/requests`

**Payments**
- [ ] Token top-up (`/dashboard/wallet`) currently just credits tokens instantly with no real payment step — needs a real payment gateway before this can go live with real money
- [ ] Refund handling beyond the `ORDER_REFUND` transaction reason that already exists in the schema (no UI/flow triggers it yet)

**Order lifecycle gaps**
- [ ] No email notifications (request submitted, brief ready, order placed, report delivered, deadline approaching)
- [ ] No auto-resume: if a guest is sent through signup mid-request, they land back at dashboard, not back at the service page they were requesting from — they have to re-click Request
- [ ] No cancellation flow for a pending order

**Account**
- [ ] No password-reset flow

**Open questions from you, unresolved**
- [ ] "remove analyzing brand kit" — confirm whether the admin-routing fix fully covers this, or whether it also means changing/removing the "Putting together your brand kit" loading-stage copy customers see during the real onboarding research flow (`onboarding-flow.tsx`)
- [ ] "two of them have mixed create separate lines" — no screenshot/context ever came through; need more detail to act on this

**Polish / housekeeping**
- [ ] Legacy `Audit`/`Finding`/`Expert`/`Package` models still sit unused in `prisma/schema.prisma` — fine to leave, candidate for a future cleanup migration
- [ ] No automated tests (unit or e2e) checked in — all QA so far was manual Playwright scripts run once and discarded
- [ ] Mobile viewport not explicitly re-verified since the countdown/order-flow work landed
- [ ] No privacy policy / terms / refund policy pages yet — likely wanted before real payments go live
