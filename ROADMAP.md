# ROADMAP.md — LeadFlow Status and Candidate Work

**Last verified:** 2026-11-22  
**Source of truth:** the application code in this repository.  
**Related documents:** `PRODUCT.md` (shipped behavior), `ARCHITECTURE.md` (implementation), `DESIGN.md` (visual specification), `AGENTS.md` (working rules).

## 1. How to read this roadmap

This is a status document, not a promise of dates. Items are labeled:

| Label | Meaning |
|---|---|
| **Shipped** | Present in the code and reachable by users |
| **Partial** | Some implementation exists, but the full capability does not |
| **Planned** | Described in `README.md` or `DESIGN.md`, but not implemented |
| **Candidate** | A reasonable next step suggested by the current code; not committed |
| **Decision needed** | Requires a product or technical choice before work starts |
| **Not planned** | Explicitly outside the current product boundary |

There are no committed delivery dates, owners, or version numbers in the repository. Do not add dates to this document unless the user provides them.

## 2. Current snapshot

LeadFlow is a working single-user CRM with:

- GitHub and Google OAuth.
- A dashboard with contact and activity counts.
- Contact CRUD with search, status filtering, and 12-per-page pagination.
- Contact notes with create, edit, and delete.
- Activity CRUD with filters, search, sort, completion, and deletion.
- A four-stage drag-and-drop pipeline.
- A command palette for navigation and search.
- Profile name editing, light/dark/system theme, and CSV export.
- Public landing, login, privacy, and terms pages.
- A Deal Ledger token and font foundation.
- Unit tests for CSV handling, pagination, and activity-search URL building.
- CI for install, Prisma generation, typecheck, lint, tests, dependency audit, and build.

The app is not a team CRM, does not send reminders, does not import CSV, and does not include the full Deal Ledger page redesign.

## 3. Shipped

### 3.1 Core CRM

| Item | Evidence |
|---|---|
| GitHub/Google OAuth with verified-email checks | `src/auth.ts` |
| JWT sessions, 7-day max age | `src/auth.ts` |
| User upsert by verified email | `src/auth.ts` |
| Dashboard counts and recent records | `src/app/(dashboard)/dashboard/page.tsx` |
| Contact create, read, update, delete | `src/app/api/contacts/**`, contact pages |
| Contact search by name, email, company | `src/app/(dashboard)/contacts/page.tsx` |
| Contact status filter | `src/app/(dashboard)/contacts/contacts-filters.tsx` |
| Contact pagination, 12 per page | `src/lib/pagination.ts`, `contacts-pagination.tsx` |
| Contact detail with notes and activities | `src/app/(dashboard)/contacts/[id]/page.tsx` |
| Note create, edit, delete | `src/app/api/contacts/[id]/notes/**`, `notes-section.tsx` |
| Activity create, edit, complete, delete | `src/app/api/activities/**`, activity pages |
| Activity filters, search, sort | `src/app/(dashboard)/activities/**` |
| Pipeline drag-and-drop and select fallback | `src/app/(dashboard)/pipeline/pipeline-board.tsx` |
| Command palette with Ctrl/Cmd+K | `src/components/layout/command-palette.tsx` |
| Profile name editing | `src/app/api/settings/route.ts`, `settings-form.tsx` |
| Light/dark/system theme | `src/components/providers.tsx`, `theme-toggle.tsx` |
| CSV export of contacts and activities | `src/app/api/export/route.ts`, `src/lib/csv.ts` |
| Public landing, login, privacy, terms | `src/app/page.tsx`, `src/app/(auth)/login`, `src/app/privacy`, `src/app/terms` |
| Responsive sidebar/bottom navigation | `src/components/layout/**` |
| Security headers and CSP nonce | `src/proxy.ts`, `next.config.ts` |
| Ownership checks on API routes | `src/app/api/**` |
| CSV formula-injection protection | `src/lib/csv.ts` |

### 3.2 Design foundation

| Item | Evidence |
|---|---|
| Paper/ink/oxblood/success/brass tokens | `src/app/globals.css` |
| Stage tokens for four statuses | `src/app/globals.css` |
| Light and dark themes | `src/app/globals.css` |
| Type scale, radii, elevation, focus, selection | `src/app/globals.css` |
| Fraunces, IBM Plex Sans, IBM Plex Mono | `src/app/layout.tsx` |
| Tailwind 4 CSS-first configuration | `src/app/globals.css`; no `tailwind.config.*` |
| Reduced-motion handling | `src/app/globals.css` |
| Dark-theme destructive-text bridge | `src/app/globals.css` |

### 3.3 Quality and operations

| Item | Evidence |
|---|---|
| Vitest unit tests | 3 files, 20 tests; `npm test` passes |
| CSV tests | `src/lib/csv.test.ts` |
| Pagination tests | `src/lib/pagination.test.ts` |
| Activity-search URL tests | `src/app/(dashboard)/activities/activity-search.test.ts` |
| CI install, Prisma generate, typecheck, lint, tests, dependency audit, build | `.github/workflows/ci.yml` |
| Prisma baseline migration | `prisma/migrations/0001_baseline/migration.sql` |
| Database connection pooling and custom CA | `src/lib/prisma.ts` |

## 4. Partial

| Item | What exists | What is missing |
|---|---|---|
| **Deal Ledger rollout** | Tokens, fonts, light/dark themes, base typography | Component/page redesigns and the Deal Stage Stamp |
| **CSV portability** | Export of contacts and activities | Import, notes export, and a documented import format |
| **Testing** | Pure-helper unit tests | API route tests, component tests, E2E tests, coverage thresholds |
| **CI quality gates** | Typecheck, lint, tests, dependency audit, build | Audit currently passes (4 moderate, 0 high/critical); no coverage threshold, SAST, or secret scanning |
| **Documentation** | `AGENTS.md`, `ARCHITECTURE.md`, `PRODUCT.md`, `ROADMAP.md` | `README.md` reconciliation, privacy-policy correction, env documentation |
| **Design consistency** | Stage tokens exist | Pages still use duplicated sky/amber/violet/emerald classes |
| **Accessibility** | Focus styles, reduced motion, labels, dialog roles | Formal audit, automated checks, skip link, keyboard drag-and-drop |
| **Observability** | `console.log` and `console.error` | Structured logging, tracing, error monitoring, health check |
| **Account lifecycle** | Sign-in, sign-out, profile name | Self-serve account deletion and data-request workflow |
| **Activity planning** | Due dates and filters | Reminders, notifications, recurring activities |

## 5. Planned or specified but not implemented

### 5.1 From `README.md`

These are backlog statements in the public README. They are not committed work.

| Item | Current status |
|---|---|
| Automated follow-ups / reminders for overdue activities | Not implemented |
| Advanced reporting / conversion analytics / lead velocity | Not implemented; only counts and a pipeline summary exist |
| CSV engine with bulk import and export | Export only; import is not implemented |

### 5.2 From `DESIGN.md`

The Deal Ledger specification describes a full visual system. Only the foundation is implemented.

| Design item | Status |
|---|---|
| Deal Stage Stamp | Planned |
| Landing page redesign | Planned |
| Login redesign | Planned |
| Dashboard redesign | Planned |
| Contacts list redesign | Planned |
| Contact detail redesign | Planned |
| Pipeline redesign | Planned |
| Activities redesign | Planned |
| Settings redesign | Planned |
| Shared stage-color map | Planned |
| Removal of violet/blue gradients | Planned |
| Full component specification | Planned |

`DESIGN.md` is the authority for visual details. Do not implement a page plan from memory; read the specification.

## 6. Candidate next work

These are ordered suggestions, not commitments. Reassess before starting.

### 6.1 Documentation and configuration correctness (highest leverage)

1. **Add `DIRECT_URL` to `.env.example` and setup documentation.**
   - Why: `prisma.config.ts` reads `DIRECT_URL`, but the example file only documents `DATABASE_URL`.
   - Done when: a new contributor can run Prisma CLI commands without guessing.

2. **Reconcile `README.md` with the implementation.**
   - Remove or correct claims about server actions, `services/`, `components/contacts`, `components/pipeline`, Prisma `groupBy`, and CSV import.
   - Mark performance numbers as unverified or remove them.
   - Align the setup instructions with the migration workflow.

3. **Correct the privacy policy's export statement.**
   - Why: the policy says there is no data export feature, but CSV export exists.
   - Done when: the policy accurately describes the export and its limits (contacts and activities, not notes).

4. **Update `DESIGN.md` status only if the user asks.**
   - The document currently says “Not implemented,” which is stale for tokens/fonts.
   - Do not edit `DESIGN.md` without explicit permission.

### 6.2 Test and CI hardening

5. **Add API route tests for authentication, ownership, validation, and cascade behavior.**
   - Start with contacts and activities.
   - Use a test database or a mocked Prisma layer; no harness exists today.

6. **Add a coverage threshold to the CI test step.**
   - Tests now run in CI, but there is no coverage gate.

7. **Add a `typecheck` script.**
   - CI calls `npx tsc --noEmit` directly; a package script would keep local and CI invocation consistent.

8. **Add component tests for forms, notes, pipeline moves, and the command palette.**
   - Requires a DOM test environment and React Testing Library; neither is configured.

9. **Add an end-to-end smoke test.**
   - Cover sign-in (mocked provider), contact creation, note creation, activity completion, and pipeline move.

### 6.3 Security and operations

10. **Add rate limiting to search and mutation endpoints.**
    - No rate limiting exists today.

11. **Add structured logging and error monitoring.**
    - Replace ad hoc `console.error` with a deliberate logging strategy.

12. **Add a health check endpoint.**
    - Useful for deployment monitoring; none exists.

13. **Document the production deployment topology.**
    - Vercel signals exist, but there is no deployment workflow or infrastructure description.

14. **Add SAST and secret scanning to CI.**
    - `npm audit` covers dependency advisories; there is no static analysis or secret scanning.

### 6.4 Data and scale

15. **Paginate activities.**
    - The activities page currently loads all matching records.

16. **Paginate or search the contact picker in activity forms.**
    - `GET /api/contacts` returns all contacts and is used to populate a select.

17. **Paginate notes.**
    - All notes for a contact load at once.

18. **Consider a full-text or trigram index for search.**
    - Current search uses `contains`/insensitive matching with no full-text index.

19. **Decide whether contact email should be unique per user.**
    - Duplicate contact emails are currently allowed.

### 6.5 Product capabilities

20. **CSV import.**
    - Define the column contract, validation, duplicate handling, and error reporting.

21. **Reminders or notifications for due activities.**
    - Decide between in-app, email, and browser notifications.
    - Requires a delivery mechanism that does not exist today.

22. **Reporting beyond counts.**
    - Decide whether to add deal values, stage history, conversion cohorts, or lead velocity.

23. **Self-serve account deletion.**
    - Currently a manual email process described in the privacy policy and terms.

24. **Add notes to CSV export.**
    - Decide whether notes belong in the same file or a separate export.

25. **Add error boundaries and a toast system.**
    - Current feedback is inline or uses `window.alert`.

### 6.6 Design rollout

26. **Create a shared stage-color and stage-label module.**
    - Replace duplicated status maps in contacts, contact detail, pipeline, dashboard, and stat cards.

27. **Build the Deal Stage Stamp.**
    - Follow `DESIGN.md` §7 exactly.
    - It reads the existing `ContactStatus`; it does not add a data field.

28. **Redesign the application shell and primitives.**
    - Sidebar, header, mobile navigation, buttons, forms, cards, tables, dialogs, empty states, and focus states.

29. **Redesign pages in a deliberate order.**
    - Suggested: contacts list → contact detail → pipeline → activities → dashboard → settings → login → landing.
    - This is a suggestion, not a committed sequence.

30. **Remove the old violet/blue visual language from landing and login.**
    - Keep the brand icon asset; `DESIGN.md` says not to recolour it in the foundation phase.

31. **Run the design review checklist.**
    - Use `DESIGN.md` §13 and verify light/dark contrast, responsive behavior, typography, component consistency, and reduced motion.

## 7. Technical debt register

| Debt | Impact | Candidate action |
|---|---|---|
| `DIRECT_URL` missing from `.env.example` | Prisma CLI setup can fail | **Done** - Added `DIRECT_URL` with comment explaining purpose |
| `.env.example` and `README.md` setup drift | New contributors hit avoidable errors | Reconcile setup docs |
| Privacy policy says no export | User-facing inaccuracy | Update policy |
| `README.md` overstates architecture | Misleads contributors and reviewers | Rewrite technical claims |
| `DESIGN.md` status stale | Confusion about what is shipped | Update only with permission |
| No API/component/E2E tests | Regressions in auth and ownership can ship | Add test harness and CI step |
| No coverage threshold | Regressions can pass without tests | Add a coverage gate |
| No standalone typecheck script | Local verification is inconsistent | Add `typecheck` script |
| Unbounded activities, notes, pipeline, contact picker | Scale and performance risk | Paginate or search |
| Duplicated status/avatar maps | Visual inconsistency and maintenance cost | Shared token map |
| No rate limiting | Abuse risk on search and mutations | Add rate limiting |
| No structured logging/monitoring | Production diagnosis is weak | Add logging and error tracking |
| No error boundaries | A render error can take out a route | Add `error.tsx` |
| No toast system | Inconsistent feedback | Add a small notification primitive |
| Pointer-only drag sensor | Keyboard users rely on the select fallback | Add keyboard sensor or keep select prominent |
| Activity title max length only on client | Server accepts longer titles | Mirror limits in Zod |
| Contact fields have no max lengths | Oversized input possible | Add reasonable server limits |
| No account deletion | Manual operational burden | Add self-serve flow |
| No health check | Deployment monitoring is harder | Add `/api/health` if appropriate |
| Auth.js v5 beta | API may change | Track upgrades deliberately |
| Next.js 16 proxy convention | `proxy.ts` replaces older middleware expectations | Keep documentation current |

## 8. Decisions needed

| Decision | Why it matters |
|---|---|
| Should CSV import be supported? | Requires a column contract, validation, duplicate policy, and error UX |
| Should reminders be in-app, email, or both? | Determines whether an email provider, job runner, or notification table is needed |
| Should reporting include deal values? | Would change the data model and the meaning of the pipeline |
| Should teams be supported? | Would require organizations, membership, roles, and ownership changes |
| Should account deletion be self-serve? | Affects privacy operations, cascade behavior, and confirmation UX |
| Should contact email be unique per user? | Affects duplicate handling and import behavior |
| Should notes be exported? | Affects CSV format and privacy expectations |
| Should the Deal Ledger redesign replace all pages at once? | Affects scope, review load, and visual consistency during rollout |
| Should `DESIGN.md` be updated to reflect the implemented foundation? | The current status line is stale; editing it requires permission |
| Should the app keep the current Vercel-oriented deployment? | Determines analytics, pooling, and certificate assumptions |

## 9. Definition of done for roadmap items

Use this checklist for any item promoted from candidate to active work:

- The behavior is implemented in the actual application, not only described.
- Server-side validation and ownership checks are present for new writes.
- Loading, empty, error, and success states are handled.
- Keyboard and screen-reader behavior is considered.
- Light and dark themes are checked.
- Relevant tests are added or updated.
- `npm run lint`, `npm test`, `npx tsc --noEmit`, and `npm run build` pass.
- `ARCHITECTURE.md`, `PRODUCT.md`, and `ROADMAP.md` are updated if behavior or status changed.
- No planned feature is described as shipped.

## 10. Explicitly out of scope for now

Unless the user changes the product direction, these are not part of the current roadmap:

- Multi-tenant team workspaces.
- Billing or subscription management.
- A native mobile app.
- A public API or partner integrations.
- Marketing automation or email campaigns.
- Telephony or calendar sync.
- File storage and attachments.
- Internationalization.
- Enterprise audit and compliance features.
