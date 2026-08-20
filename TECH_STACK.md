# Tech Stack

Reference for what this app is built on and why. Kept up to date as the build progresses —
see `sme-marketing-copilot-architecture.md` for product concept and `.claude/plans/` for the
implementation plan this was built from.

## Framework & language

| Layer | Choice | Notes |
|---|---|---|
| Framework | **Next.js 16** (App Router, `src/` dir, Turbopack) | `npx create-next-app` scaffold |
| Language | **TypeScript** | strict mode, `@/*` import alias |
| Runtime | **Node.js 22** | required — the Claude CLI agent layer uses `child_process`, which cannot run on the Edge runtime |

## UI

| Layer | Choice | Notes |
|---|---|---|
| Styling | **Tailwind CSS v4** | |
| Components | **shadcn/ui** (Base UI primitives, not Radix) | note: this generation of shadcn uses Base UI's `render` prop for polymorphic components, not Radix's `asChild` |
| Design direction | `frontend-design` + `ui-styling` Claude Code skills, informed by a distilled UI/UX reference (`UI-UX-MASTER-BOOK.md`) for concrete spacing/type/contrast/CRO rules | applied during the signup/onboarding/dashboard build pass |

## Data

| Layer | Choice | Notes |
|---|---|---|
| Database | **SQLite** (file-based, local, zero external services) | `prisma/dev.db` |
| ORM | **Prisma 7** | Prisma 7 removed schema-level `datasource.url` — connection is via a driver adapter passed to `PrismaClient`, not the schema file |
| Driver adapter | `@prisma/adapter-better-sqlite3` + `better-sqlite3` | native binding, prebuilt binary on Windows x64/Node 22 |
| CLI-time config | `prisma.config.ts` (Prisma 7's replacement for schema-level env wiring) | |

## Auth

| Layer | Choice | Notes |
|---|---|---|
| Library | **Auth.js / NextAuth v5** (beta), Credentials provider, JWT sessions | manual signup route creates the `User` row + bcrypt hash — no adapter (Credentials + PrismaAdapter auto-provisioning is unsupported) |
| Password hashing | **bcryptjs** | |
| Route protection | `src/proxy.ts` | see "Windows/Next.js 16 gotchas" below — **not** `middleware.ts` |

## AI agents

| Layer | Choice | Notes |
|---|---|---|
| Primary engine | **Claude Code CLI, headless (`-p`/`--print`) mode** | shelled out to from Node route handlers via `child_process.execFile`; rides the CLI's own authenticated session — no `ANTHROPIC_API_KEY` needed |
| Structured output | `--output-format json --json-schema <schema>` | schema generated from the same **Zod v4** schema via `z.toJSONSchema()` — single source of truth, response is validated with `.safeParse()` before use |
| Agent roster | One Claude Code CLI call per (expert × package) combination — see `src/lib/agents/` | Research Agent (business/industry/ICP research), and one audit agent per expert per package tier, each with its own tailored system prompt (depth/focus varies by package, not just a shared template) |
| Brand kit | **Deterministic, no LLM call** | colors/fonts/tone picked from a small curated set via a hash of the business name — instant, by design |
| Validation | **Zod v4** | also used for API route input validation (signup, etc.) |

## Economics

Token wallet, pay-per-run (not a monthly subscription) — a `Wallet` balance debited per audit run,
priced per expert × package. Mirrors the original architecture doc's §8 token model rather than the
web app's earlier subscription-per-department draft.

## Dev tooling

- `tsx` — run standalone TypeScript scripts (smoke tests, one-off DB scripts) without a build step
- `npx prisma studio` — visual DB inspection during development
- ESLint (`eslint-config-next`)

## Windows / Next.js 16 gotchas (verified in this project, not assumed)

These cost real debugging time — recorded so they don't get re-discovered:

1. **Next.js 16 renamed the `middleware.ts` file convention to `proxy.ts`.** Same default-export
   function + `config.matcher` shape, but `middleware.ts` was observed to silently never invoke at
   all in dev (no error, no log — just a full pass-through) rather than just warning. Use
   `src/proxy.ts`.
2. **With `--src-dir`, `proxy.ts` (and previously `middleware.ts`) must live inside `src/`**, not the
   project root — a root-level file compiles into the middleware manifest (matchers and all) but is
   never actually invoked at request time.
3. **`export { auth as middleware }` (the documented NextAuth v5 one-liner) can silently no-op** on
   some Next.js/next-auth-beta combinations due to an `instanceof Request` realm mismatch inside
   next-auth's edge dispatcher. The more robust pattern — `export default auth((req) => { ... })`,
   passing an explicit handler function — sidesteps it, since `isReqWrapper()` (a `typeof === "function"`
   check) doesn't care which module realm `Request` came from.
4. **Prisma 7:** `datasource.url` in `schema.prisma` throws a hard validation error now (`P1012`).
   The datasource URL moves to `prisma.config.ts`, and `PrismaClient` needs a driver adapter
   (`new PrismaClient({ adapter })`) — there's no more implicit engine connection from the schema file.
5. **Claude CLI on Windows:** spawn `claude.exe` directly (found at
   `<node install dir>/node_modules/@anthropic-ai/claude-code/bin/claude.exe`) with `shell: false`.
   Spawning `claude.cmd` needs `shell: true` to avoid `EINVAL`, but `shell: true` lets `cmd.exe`
   re-quote arguments and corrupts the `--json-schema` JSON string.
6. **shadcn/ui on Base UI** (this generation) uses a `render` prop for polymorphic rendering
   (`<Button render={<Link href="/x">...</Link>} />`), not Radix's `asChild` boolean — passing
   `asChild` is a TypeScript error here, not a silent no-op.
7. **Claude CLI `--json-schema` enforcement silently breaks on two specific things, verified by
   isolating each independently:** a top-level `$schema` key, and `additionalProperties: false`
   anywhere in the schema (which `z.toJSONSchema()` adds by default on every `z.object()`). With
   either present, the CLI doesn't error — it just never populates `structured_output`, and the
   model free-forms an unrelated JSON shape (different field names, different nesting) into
   `result` instead, wrapped in a ```json fence. `runClaudeAgent()` strips both recursively before
   passing the schema to `--json-schema` (`sanitizeSchemaForCli()`), and also strips markdown
   fences as a second line of defense before parsing `result` as a fallback. Skipping this
   sanitization doesn't fail loudly — it produces a schema-validation error against a completely
   different (but superficially plausible) JSON payload, which is easy to misdiagnose as a prompt
   problem rather than a CLI serialization bug.
8. **The dev server's `PrismaClient` singleton goes stale after `npx prisma generate` regenerates
   the client for a schema change.** `lib/prisma.ts` caches the client on `globalThis` specifically
   so it survives Fast Refresh — but that means after editing `schema.prisma` + regenerating, the
   already-running dev server process keeps using the *old* client (symptom: `prisma.<newModel>` is
   `undefined` at runtime, no build-time error since types come from the regenerated `.d.ts` files
   which module resolution does pick up fresh). Fix: fully restart the dev server process (editing
   `next.config.ts` forces a real process restart, not just an HMR reload — see gotcha #1's
   restart mechanism) any time the schema changes, not just after `middleware`/`proxy` edits.
