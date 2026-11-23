# ARCHITECTURE.md — LeadFlow Technical Architecture

**Last verified:** 2026-11-22  
**Source of truth:** the application code in this repository.  
**Companion documents:** `AGENTS.md` (working rules), `PRODUCT.md` (user-facing behavior), `ROADMAP.md` (status and candidate work), `DESIGN.md` (visual specification).

This document describes the system as implemented. It does not describe features that exist only in `README.md` or `DESIGN.md`.

## 1. System overview

LeadFlow is a Next.js App Router application backed by PostgreSQL through Prisma. Users sign in with GitHub or Google through Auth.js. Server Components read data directly from Prisma; interactive client components mutate data through Next.js route handlers and TanStack Query.

```text
Browser
  │
  ├── Public pages: /, /login, /privacy, /terms
  │
  └── Authenticated app: /dashboard, /contacts, /pipeline, /activities, /settings
          │
          ├── Server Components ──► Prisma ──► PostgreSQL
          │        (reads)
          │
          └── Client Components ──► /api/** route handlers ──► Prisma ──► PostgreSQL
                   (mutations and client-side reads)

Auth.js (GitHub / Google OAuth)
  └── sign-in callback ──► User upsert ──► JWT session ──► session.user.id
```

### Stack

| Layer | Technology | Version / note |
|---|---|---|
| Framework | Next.js App Router | `16.4.6` |
| UI runtime | React / React DOM | `19.2.8` |
| Language | TypeScript | `^5`, strict mode |
| Styling | Tailwind CSS 4 | CSS-first, no `tailwind.config.*` |
| UI primitives | Base UI + shadcn-style components | `@base-ui/react ^1.8.0`, `shadcn ^4.21.1` |
| Icons | lucide-react | `^1.51.0` |
| Animation | Motion for React | `motion ^14.0.0` |
| Database | PostgreSQL | Prisma provider `postgresql` |
| ORM | Prisma | `^7.10.0` |
| DB adapter | `@prisma/adapter-pg` + `pg` | Custom CA and SSL verification |
| Auth | Auth.js / NextAuth | `^5.0.0-beta.32` |
| Client data | TanStack Query | `^5.104.1` |
| Drag and drop | dnd-kit | `@dnd-kit/core ^6.3.1` |
| Validation | Zod | `^4.6.5` |
| Tests | Vitest | `^4.1.12`, Node environment |
| Analytics | Vercel Analytics + Speed Insights | Rendered only when `VERCEL === "1"` |

## 2. Rendering and data flow

### 2.1 Server Components

Most pages are async Server Components. They:

1. Call `auth()` from `src/auth.ts`.
2. Read `session.user.id`.
3. Query Prisma directly with `src/lib/prisma.ts`.
4. Render server-side HTML with client components only where interactivity is needed.

Examples:

- `src/app/(dashboard)/dashboard/page.tsx` runs aggregate SQL and recent-record queries.
- `src/app/(dashboard)/contacts/page.tsx` performs server-side search, status filtering, counting, and 12-row pagination.
- `src/app/(dashboard)/contacts/[id]/page.tsx` loads one owned contact with its activities.
- `src/app/(dashboard)/pipeline/page.tsx` loads all contacts and computes pipeline totals in JavaScript.
- `src/app/(dashboard)/activities/page.tsx` loads filtered, searched, sorted activities and counts.

### 2.2 Client components

Client components handle forms, dialogs, the command palette, theme switching, drag-and-drop, and mutations. Most write flows use:

- `useMutation` from TanStack Query for writes; Settings uses a direct async submit handler instead.
- Plain `fetch` to `/api/**`.
- `router.push`, `router.replace`, and `router.refresh` from `next/navigation`.
- `queryClient.invalidateQueries` where a query cache exists.
- Local `useState` for form fields and pending/error state.

Examples:

- `contacts/new/contact-form.tsx`, `contacts/[id]/edit-contact-form.tsx`
- `contacts/[id]/notes-section.tsx`
- `activities/new/activity-form.tsx`, `activities/[id]/edit/activity-edit-form.tsx`
- `activities/activity-completion-button.tsx`, `delete-activity-button.tsx`
- `pipeline/pipeline-board.tsx`
- `settings/settings-form.tsx`
- `components/layout/command-palette.tsx`

There is no shared API client, no generated API types, and no form library.

### 2.3 Mutation patterns

| Flow | Pattern |
|---|---|
| Create/update contact | `useMutation` → `fetch` → API route → `router.push` + `router.refresh` |
| Delete contact | `DeleteContactButton` wrapper around shared `DeleteButton` → `fetch DELETE` → `router.push("/contacts")` + `router.refresh` |
| Create/update/delete note | `useMutation` → `fetch` → invalidate `["notes", contactId]` |
| Create/update activity | `useMutation` → `fetch` → `router.push` / `router.replace` + `router.refresh` |
| Complete/reopen activity | `fetch PATCH` → local state update → `router.refresh` |
| Delete activity | `DeleteActivityButton` wrapper around shared `DeleteButton` → `fetch DELETE` → `router.refresh` |
| Move pipeline card | `useMutation` with optimistic status update and rollback on error |
| Update profile name | `fetch PATCH /api/settings` → local success message |
| Change theme | `next-themes` `setTheme` |
| Export CSV | Plain link to `/api/export` with `download` |

Only the pipeline uses an optimistic update. Other mutations wait for the server and then refresh or invalidate.

## 3. Authentication and authorization

### 3.1 Auth configuration

`src/auth.ts` exports `handlers`, `signIn`, `signOut`, and `auth` from `NextAuth`.

| Setting | Value |
|---|---|
| Providers | GitHub, Google |
| Session strategy | JWT |
| Session max age | 7 days |
| `trustHost` | `true` |
| Adapter | None |
| Database session/account tables | None in `prisma/schema.prisma` |

The absence of `Account`, `Session`, and `VerificationToken` models is consistent with the JWT strategy.

### 3.2 Sign-in callback

The `signIn` callback:

1. Rejects missing email or account.
2. Lowercases the email.
3. For Google:
   - Requires `profile.email_verified === true`.
   - Requires a string `profile.email`.
   - Requires the profile email to match the user email case-insensitively.
4. For GitHub:
   - Requires an access token.
   - Calls `https://api.github.com/user/emails` with the token.
   - Requires a verified email entry matching the user email.
5. Rejects any other provider.
6. Upserts a `User` row by email, updating the display name and creating the user if absent.

Because users are keyed by verified email, signing in with Google and GitHub using the same verified email resolves to the same `User` row. There is no explicit linked-accounts UI.

### 3.3 JWT and session callbacks

- `jwt`: on sign-in, looks up the database user by lowercased email and stores `token.userId`.
- `session`: copies `token.userId` to `session.user.id`.

Application code relies on `session.user.id`; it should never trust a user ID supplied by the client.

### 3.4 Route protection

| Surface | Protection |
|---|---|
| `(dashboard)` layout | `auth()`; redirects to `/login` when there is no session |
| Most dashboard pages | Also guard `session?.user?.id` and return `null` when absent |
| Contact detail/edit pages | `auth()`; `notFound()` when the user or owned record is absent |
| API routes | `auth()`; `401` when there is no `session.user.id` |
| Contact/note/activity queries | Scoped by `userId` or `contact.userId` |
| Settings/export/search | Scoped by `session.user.id` |

There are no roles, permissions, teams, or organization boundaries. Every record belongs to exactly one user.

### 3.5 Sign-out

`src/app/actions/auth.ts` is the only server action:

```ts
"use server";
export async function signOutAction() {
  await signOut({ redirectTo: "/login" });
}
```

The header account menu submits this action.

## 4. Route map

### 4.1 Pages

| Route | Rendering | Purpose |
|---|---|---|
| `/` | Public | Marketing landing page, static product preview, theme toggle |
| `/login` | Public, `force-dynamic` | GitHub/Google sign-in |
| `/privacy` | Public | Privacy policy |
| `/terms` | Public | Terms of service |
| `/dashboard` | Authenticated | Greeting, contact/activity stats, recent contacts, pipeline overview |
| `/contacts` | Authenticated | Contact list, search, status filter, 12-per-page pagination |
| `/contacts/new` | Authenticated | Create contact form |
| `/contacts/[id]` | Authenticated | Contact record, notes, activities, edit/delete actions |
| `/contacts/[id]/edit` | Authenticated | Edit contact form |
| `/pipeline` | Authenticated | Four-column drag-and-drop stage board |
| `/activities` | Authenticated | Activity list, filters, search, sort, completion, edit/delete |
| `/activities/new` | Authenticated | Create activity form |
| `/activities/[id]/edit` | Authenticated | Edit activity form |
| `/settings` | Authenticated | Profile name, theme, CSV export |

Many dashboard routes include `loading.tsx` files. There are no custom `error.tsx` or `not-found.tsx` files in the inspected source.

### 4.2 API route handlers

All routes are internal JSON endpoints unless noted. They authenticate, validate, and scope by owner.

| Method and path | Behavior |
|---|---|
| `GET /api/contacts` | All contacts for the session user, newest first. No pagination. Used by activity forms. |
| `POST /api/contacts` | Validate with `contactSchema`; create with `userId` from session; `201`. |
| `GET /api/contacts/[id]` | One owned contact or `404`. |
| `PATCH /api/contacts/[id]` | Partial update with `updateContactSchema`; ownership check; returns updated contact. |
| `DELETE /api/contacts/[id]` | Delete owned contact; cascade removes notes and activities. |
| `GET /api/contacts/[id]/notes` | Notes for an owned contact, newest first. |
| `POST /api/contacts/[id]/notes` | Validate local note schema; create note for an owned contact; `201`. |
| `PATCH /api/contacts/[id]/notes/[noteId]` | Update a note scoped to the contact and user. |
| `DELETE /api/contacts/[id]/notes/[noteId]` | Delete a note scoped to the contact and user. |
| `POST /api/activities` | Validate with `activitySchema`; verify contact ownership; create activity; `201`. |
| `GET /api/activities/[id]` | One activity whose contact belongs to the user. |
| `PATCH /api/activities/[id]` | Partial update including `completed`; verify new contact ownership if changed. |
| `DELETE /api/activities/[id]` | Delete an activity whose contact belongs to the user. |
| `GET /api/search?q=` | Up to 5 owned contacts and 5 owned activities; fewer than 2 characters returns empty results, more than 100 returns `400`. |
| `GET /api/settings` | Current user's `name`, `email`, `createdAt`. |
| `PATCH /api/settings` | Update display name; trimmed length 2–80. |
| `GET /api/export` | CSV download containing contacts and activities; no notes. |
| `GET` / `POST /api/auth/[...nextauth]` | Auth.js handlers. |

Error shape is generally `{ "error": "..." }`, with Zod field details on some `400` responses. There is no formal API schema or versioning.

## 5. Data model

`prisma/schema.prisma` defines four models and two enums.

### 5.1 Enums

```prisma
enum ContactStatus {
  NEW
  CONTACTED
  INTERESTED
  CONVERTED
}

enum ActivityType {
  CALL
  EMAIL
  MEETING
  TASK
}
```

These values are the complete pipeline and activity vocabulary. There are no probabilities, deal values, stage-history records, or additional stages.

### 5.2 Models

#### User

| Field | Type | Notes |
|---|---|---|
| `id` | `String` | `cuid()` primary key |
| `email` | `String` | Unique |
| `name` | `String?` | Optional display name |
| `createdAt` | `DateTime` | Defaults to now |
| `updatedAt` | `DateTime` | Auto-updated |
| `contacts` | `Contact[]` | One-to-many |

#### Contact

| Field | Type | Notes |
|---|---|---|
| `id` | `String` | `cuid()` primary key |
| `firstName` | `String` | Required |
| `lastName` | `String` | Required |
| `email` | `String` | Required, indexed, **not unique** |
| `phone` | `String?` | Optional |
| `company` | `String?` | Optional |
| `position` | `String?` | Optional |
| `status` | `ContactStatus` | Defaults to `NEW` |
| `source` | `String?` | Optional free text |
| `createdAt` | `DateTime` | Defaults to now |
| `updatedAt` | `DateTime` | Auto-updated |
| `userId` | `String` | Owner; cascades on user delete |
| `notes` | `Note[]` | One-to-many |
| `activities` | `Activity[]` | One-to-many |

Indexes: `userId`, `status`, `email`, `(userId, createdAt)`, `(userId, status)`.

#### Note

| Field | Type | Notes |
|---|---|---|
| `id` | `String` | `cuid()` primary key |
| `content` | `String` | Required |
| `createdAt` | `DateTime` | Defaults to now |
| `updatedAt` | `DateTime` | Auto-updated |
| `contactId` | `String` | Cascades on contact delete |

Index: `contactId`.

#### Activity

| Field | Type | Notes |
|---|---|---|
| `id` | `String` | `cuid()` primary key |
| `type` | `ActivityType` | Required |
| `title` | `String` | Required |
| `content` | `String?` | Optional description |
| `dueDate` | `DateTime?` | Optional |
| `completed` | `Boolean` | Defaults to `false` |
| `createdAt` | `DateTime` | Defaults to now |
| `updatedAt` | `DateTime` | Auto-updated |
| `contactId` | `String` | Cascades on contact delete |

Indexes: `contactId`, `dueDate`, `(contactId, completed, dueDate)`, `(contactId, createdAt)`.

### 5.3 Data constraints and implications

- Deleting a contact permanently deletes its notes and activities.
- Deleting a user cascades to contacts, then to notes and activities.
- Contact emails can repeat.
- There is no soft delete, audit trail, stage history, or `completedAt` timestamp.
- There is no team, organization, role, or sharing model.
- There are no attachments or file storage fields.
- The baseline migration is `prisma/migrations/0001_baseline/migration.sql`; later schema changes require a new migration.

## 6. Database access and operations

### 6.1 Prisma client

`src/lib/prisma.ts`:

- Imports `dotenv/config`.
- Reads `process.env.DATABASE_URL` at module load.
- Parses it as a URL and removes `sslmode`, `sslrootcert`, `sslcert`, and `sslkey` query parameters.
- Reads `certs/supabase-prod-ca.crt` from `process.cwd()`.
- Creates a `PrismaPg` adapter with:
  - `max: 3` on Vercel, `5` otherwise.
  - `idleTimeoutMillis: 10_000` on Vercel, `300_000` otherwise.
  - `connectionTimeoutMillis: 10_000`.
  - `ssl: { ca, rejectUnauthorized: true }`.
- Caches the client on `globalThis` outside production.

The CA file is a hard runtime dependency. If it is missing, importing the Prisma module throws.

### 6.2 Prisma CLI

`prisma.config.ts`:

```ts
export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: { path: "prisma/migrations" },
  datasource: { url: env("DIRECT_URL") },
});
```

The generator is `prisma-client` with output `../generated/prisma`. The app imports from the generated client; `generated/` is gitignored.

### 6.3 Environment mismatch

- The app uses `DATABASE_URL`.
- The Prisma CLI uses `DIRECT_URL`.
- `.env.example` documents both `DATABASE_URL` with `sslmode=require` and `DIRECT_URL`, with a comment explaining that `DIRECT_URL` is the Prisma CLI datasource.
- `npm run db:status` rewrites `DATABASE_URL` and runs `npx prisma migrate status`, but the Prisma config reads `DIRECT_URL`.

This is a real configuration inconsistency. Confirm both URLs before migrations, especially on hosted PostgreSQL providers that require a direct connection for migrations.

### 6.4 Migration and seed status

- One baseline migration exists.
- No seed script exists.
- No `prisma migrate` wrapper scripts exist in `package.json`.
- `README.md` recommends `npx prisma db push`, but the repository tracks migrations. Prefer `prisma migrate` unless the user explicitly chooses otherwise.

## 7. Security controls

### 7.1 CSP and proxy

`src/proxy.ts` is the Next.js 16 proxy (not `middleware.ts`). It:

- Generates a nonce from `crypto.randomUUID()` encoded as base64.
- Builds a CSP with:
  - `default-src 'self'`
  - `script-src 'self' 'nonce-...' 'strict-dynamic'` plus `'unsafe-eval'` in development
  - `script-src-attr 'none'`
  - `style-src 'self' 'unsafe-inline'`
  - `img-src 'self' data: blob: https://avatars.githubusercontent.com https://lh3.googleusercontent.com`
  - `font-src 'self'`
  - `connect-src 'self' https://vitals.vercel-insights.com`
  - `object-src 'none'`
  - `base-uri 'self'`
  - `form-action 'self'`
  - `frame-ancestors 'none'`
- Sets `x-nonce` and `Content-Security-Policy` on request headers and the response.
- Matches `/`, `/login`, `/dashboard/:path*`, `/contacts/:path*`, `/activities/:path*`, `/pipeline/:path*`, and `/settings/:path*`.

The matcher does **not** cover `/api/**`, `/privacy`, or `/terms`. `next.config.ts` headers apply to all paths.

`src/app/layout.tsx` reads `x-nonce` and passes it to `Providers`, which forwards it to `next-themes` so the theme script can satisfy the nonce policy.

### 7.2 Global headers

`next.config.ts` sets:

| Header | Value |
|---|---|
| `X-Frame-Options` | `DENY` |
| `X-Content-Type-Options` | `nosniff` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=()` |

No `Strict-Transport-Security` header is set in `next.config.ts`; whether the hosting platform adds one is deployment-dependent.

### 7.3 Ownership enforcement

- Contact routes scope by `userId`.
- Note routes scope by `contactId` plus `contact.userId`.
- Activity routes scope by `contact.userId`.
- Settings, search, and export scope by `session.user.id`.
- Updates and deletes use `updateMany` / `deleteMany` with ownership predicates, then check `count`.

### 7.4 Validation and input handling

- `src/lib/validations/contact.ts` defines `contactSchema` and `updateContactSchema`.
- `src/lib/validations/activity.ts` defines `activitySchema` and `updateActivitySchema`.
- Note routes define a local `content` schema.
- Settings validates `name` manually.
- Search returns empty results below 2 characters and rejects queries over 100 characters with `400`.
- CSV export neutralizes formula injection in `src/lib/csv.ts`.
- Activity title has a client-side `maxLength={200}` but no matching server-side maximum in `activitySchema`. Contact fields have no server-side maximum lengths.

### 7.5 Security gaps

The inspected code has no:

- Custom rate limiting.
- API-specific CSRF token layer.
- Audit logging.
- Structured security monitoring.
- Role-based access control.
- Account lockout or session revocation UI.
- Broader security scanning (SAST, secret scanning) beyond the `npm audit` dependency check.

Auth.js provides its own sign-in flow protections, but do not describe the application as having controls that are not in the repository.

## 8. UI architecture

### 8.1 Root layout

`src/app/layout.tsx`:

- Imports Vercel Analytics and Speed Insights.
- Loads Fraunces, IBM Plex Sans, and IBM Plex Mono through `next/font/google` with CSS variables.
- Sets metadata (`LeadFlow`, “Customer relationship management, simplified.”) and viewport settings.
- Reads the CSP nonce.
- Wraps children in `Providers`.
- Renders analytics only when `process.env.VERCEL === "1"`.

### 8.2 Providers

`src/components/providers.tsx`:

- Creates a `QueryClient` once with `staleTime: 30_000`.
- Wraps the app in `QueryClientProvider`.
- Wraps everything in `ThemeProvider` with `attribute="class"`, `defaultTheme="system"`, `enableSystem`, and the nonce.

### 8.3 Dashboard shell

`src/app/(dashboard)/layout.tsx`:

- Calls `auth()` and redirects to `/login` when absent.
- Renders `Sidebar`, `Header`, a scrollable `main` with a max-width `1600px` container, `BottomNav`, and `CommandPalette`.
- Uses `h-dvh` and overflow management for a fixed application shell.

`Sidebar` is hidden below `md`; `BottomNav` is hidden at `md` and above. Both use the same five navigation items from `nav-items.ts`: Dashboard, Contacts, Pipeline, Activities, Settings.

`Header` shows a breadcrumb, page title/description, a search trigger that dispatches `open-command-palette`, and an account menu with Settings and Sign out.

`CommandPalette`:

- Opens with Ctrl/Cmd+K or the header button.
- Closes on Escape, backdrop click, or navigation.
- Debounces search by 200 ms.
- Requires at least 2 characters.
- Calls `/api/search?q=...`.
- Shows up to 5 contacts and 5 activities plus navigation, create, and theme commands.
- Supports arrow keys and Enter.

### 8.4 Page patterns

- Pages are wrapped in `PageTransition` (`animate-in fade-in slide-in-from-bottom-2`).
- Cards use `rounded-xl border bg-card`.
- Forms use controlled inputs, inline errors, disabled pending buttons, and a cancel action.
- Delete actions use the shared `DeleteButton` with a modal `role="alertdialog"`.
- Loading states use route-level `loading.tsx` files and inline skeletons.
- Success and error feedback is inline; there is no toast system.
- Some delete failures use `window.alert`.

### 8.5 UI primitives

`src/components/ui/button.tsx` wraps Base UI's button with `class-variance-authority`.
`src/components/ui/card.tsx` provides Card, CardHeader, CardTitle, CardDescription, CardAction, CardContent, and CardFooter.

`cn` is imported from the `cn` package, not a local utility.

## 9. Design system implementation

The Deal Ledger design foundation is partially implemented.

### 9.1 Implemented

- `src/app/globals.css` imports Tailwind 4, `tw-animate-css`, and the shadcn Tailwind CSS.
- `@theme inline` maps typography, type scale, ledger surfaces, brand colors, semantic states, stage colors, radii, elevation, and shadcn compatibility tokens.
- Light theme uses paper `#F7F3EA`, ink `#1B1A17`, oxblood `#7A2E2E`, success `#2F5D50`, and brass `#B08D57`.
- Dark theme uses a warm charcoal palette.
- Stage tokens exist for `NEW`, `CONTACTED`, `INTERESTED`, and `CONVERTED`.
- Base styles set the sans font, editorial headings in Fraunces, tabular numerals for mono, focus-visible outlines, selection color, and reduced-motion handling.
- Fonts are loaded in `layout.tsx`.
- A scoped dark bridge changes legacy `bg-destructive text-white` text to paper for contrast.
- There is no `tailwind.config.*`; Tailwind 4 is CSS-first.

### 9.2 Not implemented

- The Deal Stage Stamp.
- Page-level Deal Ledger redesigns for the landing page, login, dashboard, contacts, contact details, pipeline, activities, and settings.
- A single shared stage token map replacing duplicated Tailwind status classes.
- Removal of violet/blue gradients and blurred blobs from the landing and login pages.
- The full component specification in `DESIGN.md` (buttons, tables, dialogs, empty states, etc.).

### 9.3 Current duplication

Status colors are defined in several places:

- `src/app/(dashboard)/contacts/page.tsx`
- `src/app/(dashboard)/contacts/[id]/page.tsx`
- `src/app/(dashboard)/pipeline/pipeline-board.tsx`
- `src/components/dashboard/pipeline-overview.tsx`
- `src/components/dashboard/stat-card.tsx`

Avatar gradients are duplicated in the contacts page and contact detail page, while `src/lib/avatar.ts` also defines the same palette. `src/lib/avatar.ts` is used by the dashboard and pipeline.

This duplication is technical debt, not a shipped unified design system.

## 10. Testing and CI

### 10.1 Test setup

`vitest.config.ts` sets `environment: "node"`. There is no jsdom setup, no React Testing Library, and no database test harness.

Current tests:

| File | Coverage |
|---|---|
| `src/lib/csv.test.ts` | CSV quoting, CRLF, formula neutralization, null handling, German characters |
| `src/lib/pagination.test.ts` | Page clamping, total pages, zero items, exact multiples, partial pages |
| `src/app/(dashboard)/activities/activity-search.test.ts` | URL building for activity search while preserving filters/sort/page |
| `src/lib/validations/activity.test.ts` | Activity schema validation |
| `src/lib/validations/contact.test.ts` | Contact schema validation |

As verified on 2026-11-22: 5 test files, 104 tests, all passing.

### 10.2 CI

`.github/workflows/ci.yml` runs on pushes to `main` and on pull requests. It uses Node 22 with npm caching, installs with `npm ci`, and generates the Prisma client. It then runs three independent jobs:

| Job | Checks |
|---|---|
| `quality` | `npx tsc --noEmit`, `npm run lint`, `npm test` |
| `build` | `npm run build` |
| `security` | `npm audit --audit-level=high` |

The workflow sets dummy `DATABASE_URL` and `DIRECT_URL` values so Prisma and Next.js can run without a live database or production credentials:

```env
DATABASE_URL: "postgresql://user:pass@localhost:5432/db"
DIRECT_URL: "postgresql://user:pass@localhost:5432/db"
```

It requests only `contents: read` and cancels superseded runs on the same ref. CI does not start PostgreSQL, run SAST or secret scanning, or deploy.

As of 2026-11-23, `npm audit --audit-level=high` reports 4 moderate and 0 high/critical advisories, so the `security` job passes.

## 11. Deployment and runtime assumptions

The repository is Vercel-oriented:

- `@vercel/analytics` and `@vercel/speed-insights` are dependencies.
- Analytics components render only when `VERCEL === "1"`.
- `.vercel` exists locally and is gitignored.
- The Prisma adapter reduces pool size on Vercel.

However, there is no `Dockerfile`, no infrastructure-as-code, no deployment workflow, and no explicit hosting configuration in the repository. Treat the exact production topology as **unconfirmed** beyond these signals.

Runtime requirements:

- PostgreSQL reachable from the app.
- `DATABASE_URL` set and parseable.
- `AUTH_SECRET` set.
- GitHub and Google OAuth credentials set.
- `certs/supabase-prod-ca.crt` present.
- For migrations, `DIRECT_URL` set.
- Network access to the OAuth providers and (on Vercel) Vercel Analytics endpoints allowed by the CSP.

## 12. Known limitations and technical debt

### Data and scale

- `GET /api/contacts` returns all contacts with no pagination.
- Activities list and pipeline board load all matching records with no pagination.
- Notes for a contact load all notes with no pagination.
- Search uses `contains` / `ILIKE`-style matching with no full-text index.
- Contact email is not unique; duplicate contacts are possible.
- No soft delete or restore.
- No stage history, `completedAt`, or audit trail.
- No transactions around multi-step workflows; most writes are single operations.

### Testing and quality

- No API route tests, component tests, or end-to-end tests.
- No coverage threshold.
- No standalone `typecheck` script; CI calls `npx tsc --noEmit` directly.
- No visual regression or accessibility automation.
- No load testing.

### Security and operations

- No rate limiting.
- No custom CSRF layer for API routes.
- No structured logging; the code uses `console.log` and `console.error`.
- No error monitoring or tracing.
- No health check endpoint.
- No background jobs, queues, cron, email delivery, or notifications.
- No feature flags.
- No account deletion workflow; the privacy policy says requests are handled manually by email.

### UI and design

- No `error.tsx` boundaries.
- No custom `not-found.tsx`.
- No toast system.
- No shared status component or Deal Stage Stamp.
- Duplicated status/avatar maps.
- Landing and login still use the pre-Deal-Ledger violet/blue visual language.
- Pipeline drag-and-drop uses `PointerSensor` only; the per-card “Move to” select is the keyboard-accessible fallback.
- Some client validation limits (for example, activity title `maxLength={200}`) are not mirrored in server Zod schemas.

### Documentation

- `README.md` overstates architecture and features (see §13).
- `DESIGN.md` still says “Not implemented” even though the token/font foundation is implemented.
- The privacy policy accurately describes CSV export availability in the application.
- `.env.example` documents both `DATABASE_URL` and `DIRECT_URL` for database setup.

## 13. Documentation conflicts

| Document | Claim | Actual code |
|---|---|---|
| `README.md` | “Zod-validated server actions” for contact CRUD | CRUD uses route handlers; only sign-out is a server action |
| `README.md` | `services/` business-logic layer | No `src/services` directory |
| `README.md` | `components/contacts/` and `components/pipeline/` | Components live under `src/app/(dashboard)/**` and `src/components/dashboard` |
| `README.md` | Pipeline uses Prisma `groupBy` | Dashboard uses raw SQL with `FILTER`; pipeline page counts in JavaScript |
| `README.md` | “CSV Engine: Bulk import/export” | CSV export exists; CSV import does not |
| `README.md` | Lighthouse 96/100/100/100 and Core Web Vitals | Not reproducible from the repository; unverified |
| `README.md` | Setup uses `npx prisma db push` | Repository tracks `prisma/migrations/0001_baseline` |
| `DESIGN.md` | “Not implemented” | Tokens and fonts are implemented; pages and stamp are not |
| `DESIGN.md` | Fonts not installed | Fonts are loaded in `src/app/layout.tsx` |
| `.env.example` | Only `DATABASE_URL` for database setup | Both `DATABASE_URL` and `DIRECT_URL` are documented |

When these conflict with code, fix the documentation or explicitly record the decision. Do not silently repeat the outdated claim.
