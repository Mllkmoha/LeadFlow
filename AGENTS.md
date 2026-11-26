# AGENTS.md — Working Agreement for LeadFlow

**Last verified:** 2026-11-22  
**Scope:** the Next.js application in this repository (`LeadFlow/app`).  
**Rule of precedence:** the code is the source of truth. If this document, `README.md`, or `DESIGN.md` disagrees with the code, trust the code and update the documentation deliberately.

## 1. Read before changing anything

Read these in order:

1. `AGENTS.md` (this file) — working rules and guardrails.
2. `MY-BRIEF.md` — product intent and audience. **Do not modify.**
3. `DESIGN.md` — approved Deal Ledger visual specification. **Do not modify.**
4. `ARCHITECTURE.md` — how the system is actually built.
5. `PRODUCT.md` — what users can do today and what is only planned.
6. `ROADMAP.md` — completed, partial, and candidate work.

`README.md` is public-facing marketing and setup material. It contains claims that do not match the implementation. Do not treat it as an engineering specification.

## 2. Project snapshot

LeadFlow is a single-user CRM for freelancers, independent professionals, and small businesses. It manages contacts, notes, activities, and a four-stage sales pipeline.

| Area | Actual implementation |
|---|---|
| Framework | Next.js `16.4.6`, App Router, React `19.2.8` |
| Language | TypeScript, `strict: true`, path alias `@/*` → `src/*` |
| Database | PostgreSQL via Prisma `7.10` and `@prisma/adapter-pg` |
| Auth | Auth.js / NextAuth `5.0.0-beta.32`, GitHub + Google OAuth, JWT sessions |
| Styling | Tailwind CSS 4 (CSS-first), shadcn-style primitives, Base UI, lucide-react |
| Client data | TanStack Query 5, plain `fetch`, React state |
| Drag and drop | `@dnd-kit/core` for the pipeline board |
| Animation | `motion` (Motion for React), CSS animations |
| Tests | Vitest 4, Node environment, pure-helper unit tests only |
| CI | GitHub Actions: `npm ci`, `prisma generate`, typecheck, lint, tests, dependency audit, and build on Node 22 |

There is **no** `src/services` layer, **no** `components/contacts` directory, **no** `components/pipeline` directory, and **no** server-action CRUD layer. Those appear in `README.md` but do not exist in the code.

## 3. Commands that actually exist

| Command | Purpose | Notes |
|---|---|---|
| `npm install` | Install dependencies | `postinstall` runs `prisma generate` |
| `npm run dev` | Start the development server | Next.js dev server |
| `npm run lint` | Run ESLint | `eslint` with no file arguments |
| `npm test` | Run Vitest once | `vitest run` |
| `npx tsc --noEmit` | Type-check without emitting | No package script exists for this |
| `npm run build` | Generate Prisma client and build | `prisma generate && next build` |
| `npm run start` | Start the production server | Requires a prior build |
| `npm run db:status` | Check Prisma migration status | `tsx` one-liner; rewrites `DATABASE_URL` to port `5432` and `sslmode=require`, but the Prisma CLI still reads `DIRECT_URL` |
| `npx prisma generate` | Regenerate the Prisma client | Output goes to `generated/prisma` |
| `npx prisma migrate status` | Check migrations with the Prisma CLI | `prisma.config.ts` reads `DIRECT_URL` |
| `npx prisma migrate deploy` | Apply committed migrations | Confirm the target database first |
| `npx prisma migrate dev` | Create/apply a local migration | Ask before changing the schema |

CI uses Node 22. There is no `.nvmrc` and no `typecheck` script; CI runs `npx tsc --noEmit`, `npm run lint`, `npm test`, `npm audit --audit-level=high`, and `npm run build`.

## 4. Environment and local setup

The application expects these variables (see `.env.example`):

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DB"
AUTH_SECRET="generate with: npx auth secret"
AUTH_GITHUB_ID=""
AUTH_GITHUB_SECRET=""
AUTH_GOOGLE_ID=""
AUTH_GOOGLE_SECRET=""
```

Important environment facts:

- `src/lib/prisma.ts` reads `DATABASE_URL` at import time and requires the CA file `certs/supabase-prod-ca.crt`. Do not delete or move that file.
- `prisma.config.ts` reads **`DIRECT_URL`** for Prisma CLI operations. `.env.example` now lists `DIRECT_URL` with a comment explaining its purpose.
- `.env*` files are gitignored except `.env.example`. Never commit secrets or print their values.
- `DATABASE_URL` must be PostgreSQL. The dashboard uses PostgreSQL-specific `COUNT(*) FILTER (...)` SQL.
- The Prisma client is generated into `generated/prisma` and is gitignored. Do not edit generated files.
- The database has one baseline migration at `prisma/migrations/0001_baseline`. There is no seed script.

## 5. Repository map

```text
src/
├── app/
│   ├── (auth)/login/              # OAuth sign-in page and buttons
│   ├── (dashboard)/               # Authenticated application shell and pages
│   │   ├── dashboard/             # Stats, recent contacts, pipeline overview
│   │   ├── contacts/              # List, create, detail, edit, notes, delete
│   │   ├── pipeline/              # Drag-and-drop stage board
│   │   ├── activities/            # List, create, edit, complete, delete
│   │   └── settings/              # Profile name, theme, CSV export
│   ├── api/                       # Route handlers (JSON and CSV)
│   ├── actions/auth.ts            # Only server action: sign out
│   ├── privacy/                   # Public privacy policy
│   ├── terms/                     # Public terms of service
│   ├── page.tsx                   # Public landing page
│   ├── layout.tsx                 # Fonts, providers, analytics
│   └── globals.css                # Tailwind 4 import + Deal Ledger tokens
├── components/
│   ├── dashboard/                 # StatCard, RecentContacts, PipelineOverview
│   ├── layout/                    # Sidebar, Header, BottomNav, CommandPalette
│   ├── legal/                     # LegalPageLayout
│   ├── ui/                        # Button, Card primitives
│   ├── delete-button.tsx          # Shared confirmation dialog
│   ├── providers.tsx              # Theme + React Query providers
│   ├── reveal.tsx                 # Motion reveal wrapper
│   └── theme-toggle.tsx           # Light/dark toggle
├── lib/
│   ├── prisma.ts                  # Prisma client + pg adapter + SSL
│   ├── validations/               # Zod schemas for contacts and activities
│   ├── csv.ts                     # CSV escaping and formula neutralization
│   ├── pagination.ts              # Page clamping helper
│   └── avatar.ts                  # Deterministic gradient selection
└── proxy.ts                       # Next.js 16 proxy: CSP nonce and headers
```

Other important paths:

- `prisma/schema.prisma` — data model and enums.
- `prisma.config.ts` — Prisma CLI configuration.
- `certs/supabase-prod-ca.crt` — required runtime CA certificate.
- `.github/workflows/ci.yml` — CI pipeline.
- `vitest.config.ts` — Node test environment.
- `next.config.ts` — global security headers.

## 6. Architecture rules to preserve

1. **Server Components by default.** Add `"use client"` only when the component needs state, effects, browser APIs, event handlers, or client libraries.
2. **Reads happen in Server Components.** Pages query Prisma directly with `auth()` and `session.user.id`. Do not add an unnecessary service layer.
3. **Writes happen through route handlers.** Contact, note, activity, and pipeline mutations use `src/app/api/**`. The only server action is `signOutAction` in `src/app/actions/auth.ts`.
4. **Client mutations use React Query.** Forms, notes, and the pipeline use `useMutation`, `fetch`, inline error state, disabled pending states, and either `router.refresh()` or `queryClient.invalidateQueries`. Settings uses a direct async submit handler instead.
5. **Every API route must authenticate and scope by owner.** Check `session?.user?.id`, return `401` when absent, and scope reads/writes by `userId` or `contact.userId`. Prefer `findFirst`, `updateMany`, or `deleteMany` with ownership predicates.
6. **Validate on the server.** Contacts and activities use Zod schemas in `src/lib/validations/`. Notes define a local Zod schema. Settings uses manual validation. Do not rely on HTML `required` alone.
7. **Use the existing UI primitives and tokens.** Prefer `src/components/ui/*`, `lucide-react`, and the CSS variables in `globals.css`. Do not introduce a second design system.
8. **Keep the four statuses and four activity types exact.** `ContactStatus`: `NEW`, `CONTACTED`, `INTERESTED`, `CONVERTED`. `ActivityType`: `CALL`, `EMAIL`, `MEETING`, `TASK`. Do not add stages, probabilities, deal values, or stage-history fields without an explicit product decision.
9. **Preserve cascade behavior.** Deleting a contact deletes its notes and activities through database foreign keys.
10. **Do not assume contact email is unique.** Only `User.email` is unique; `Contact.email` is indexed but not unique.

## 7. Security invariants

- Keep the CSP and security headers intact unless the task explicitly requires changing them. `src/proxy.ts` generates a nonce and sets `Content-Security-Policy`; `next.config.ts` sets `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, and `Permissions-Policy`.
- The CSP currently allows `style-src 'unsafe-inline'`, `script-src` with a nonce and `strict-dynamic`, and `connect-src` only to self plus `https://vitals.vercel-insights.com`. If you add an external service, update the CSP deliberately.
- Do not weaken auth checks, ownership predicates, or input validation to make a test pass.
- Do not log secrets, tokens, database URLs, or full request bodies.
- Keep CSV formula-injection protection in `src/lib/csv.ts`. Export cells beginning with `=`, `+`, `-`, or `@` (including leading whitespace) are prefixed with an apostrophe.
- The search endpoint caps queries at 100 characters and returns empty results below 2 characters. Preserve those limits.
- There is no custom rate limiting, API CSRF token layer, audit log, or security monitoring in the inspected code. Do not claim those exist.

## 8. Design rules

The Deal Ledger design foundation is implemented; the full visual redesign is not.

- `src/app/globals.css` defines the paper/ink/oxblood/success/brass palette, stage tokens, type scale, radii, elevation, focus, selection, light/dark themes, and the shadcn compatibility layer.
- `src/app/layout.tsx` loads Fraunces, IBM Plex Sans, and IBM Plex Mono through `next/font/google`.
- There is no `tailwind.config.*`; Tailwind 4 is configured CSS-first through `@theme inline`.
- The dark theme uses a readable `#D08A7E` primary with paper foreground rather than a solid oxblood button. A scoped bridge handles legacy `bg-destructive text-white`.
- The landing page and login page still contain violet/blue gradients and blurred blobs. They were intentionally not redesigned in the foundation phase.
- The Deal Stage Stamp is specified in `DESIGN.md` but **not implemented**. Current pages use pills, dots, and Tailwind palette colors.
- Status colors and avatar gradients are duplicated across pages. Prefer the stage tokens and `src/lib/avatar.ts` when touching those areas, but do not claim a full unification that has not happened.

When doing design work, read `DESIGN.md` completely and implement only what the task asks for. Do not present a page plan or the stamp as shipped.

## 9. Change workflow

1. Run `git status` before editing. Preserve all existing modified and untracked files; they may be user work.
2. Do not run destructive Git commands: no `git reset --hard`, `git checkout --`, `git clean -fd`, `git stash`, or force push unless the user explicitly asks.
3. Do not stage, commit, or push unless asked.
4. Do not install or remove dependencies unless asked. If a dependency is genuinely required, explain why first.
5. Do not modify `MY-BRIEF.md` or `DESIGN.md`.
6. Ask before schema changes, migrations against a shared database, auth changes, CSP changes, or dependency upgrades.
7. Keep changes consistent with the surrounding code: route-handler shape, Zod schemas, React Query patterns, Tailwind classes, and naming.
8. Update `ARCHITECTURE.md`, `PRODUCT.md`, or `ROADMAP.md` when behavior or status changes. Do not leave documentation claiming a planned feature is shipped.
9. Add or update tests for pure helpers when changing them. There is no established route-handler or component test harness yet; do not pretend one exists.

## 10. Verification checklist

Run the checks that apply to the change:

```bash
npm run lint
npm test
npx tsc --noEmit
npm run build
```

Also verify manually:

- Sign-in redirects to `/dashboard`; unauthenticated dashboard access redirects to `/login`.
- API routes return `401` without a session and `404` for another user's records.
- Contact create/edit/delete, note create/edit/delete, activity create/edit/complete/delete, and pipeline moves still work.
- CSV export downloads a file and neutralizes formula-like cells.
- Light and dark themes render with readable contrast.
- Keyboard focus is visible; dialogs and the command palette are reachable and dismissible.

`npm audit --audit-level=high` is also a CI gate. It currently passes (4 moderate, 0 high/critical); do not silence it or lower the threshold.

`npm run build` requires a parseable `DATABASE_URL` because `src/lib/prisma.ts` reads it at import time. CI supplies dummy database URLs; a live database is not expected for the CI build.

## 11. Known gotchas and documentation conflicts

- `README.md` claims “Zod-validated server actions,” a `services/` layer, `components/contacts`, `components/pipeline`, and Prisma `groupBy`. The code uses route handlers, direct Prisma calls in Server Components, raw SQL for dashboard aggregates, and no service layer.
- `README.md` lists “CSV Engine: Bulk import/export.” Only CSV **export** exists; there is no import.
- `README.md` reports Lighthouse scores and Core Web Vitals. Those numbers are not reproducible from the repository and should not be repeated as verified facts.
- `README.md` recommends `npx prisma db push`, but the repository tracks a baseline migration. Prefer the migration workflow unless the user explicitly chooses `db push`.
- `DESIGN.md` says “Not implemented” at the top. The token/font foundation is implemented; the page/component redesign and Deal Stage Stamp are not.
- `DESIGN.md` says fonts are not installed. They are now installed in `layout.tsx`.
- The privacy policy accurately describes CSV export availability from Settings.
- `.env.example` documents both `DATABASE_URL` and `DIRECT_URL` for database setup.
- CI runs tests and a standalone typecheck. The dependency audit is blocking but currently passes (4 moderate, 0 high/critical); do not weaken the threshold.
- Activities, notes, pipeline, and `GET /api/contacts` are not paginated. Do not describe them as paginated.
- There are no `error.tsx`, custom `not-found.tsx`, error boundaries, or toast system. Loading states use `loading.tsx` and inline skeletons; failures use inline messages or `window.alert`.
- There is no self-serve account deletion, no email/password login, no teams, no reminders, no notifications, no reporting suite, no file attachments, and no third-party integrations.

## 12. Do not do these

- Do not invent features, integrations, tests, benchmarks, or capabilities.
- Do not add pipeline stages or deal-value fields because a design mock suggests them.
- Do not replace the existing auth providers or session strategy without an explicit decision.
- Do not remove the CA certificate requirement, SSL verification, CSP, or ownership checks to simplify local work.
- Do not commit `.env` files, generated Prisma output, build output, or secrets.
- Do not rewrite `MY-BRIEF.md` or `DESIGN.md`.
- Do not claim the Deal Ledger redesign is complete when only tokens and fonts are implemented.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
