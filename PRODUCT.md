# PRODUCT.md — LeadFlow Product Guide

**Last verified:** 2026-11-22  
**Source of truth:** the application code in this repository.  
**Related documents:** `MY-BRIEF.md` (product intent), `DESIGN.md` (visual specification), `ARCHITECTURE.md` (technical implementation), `ROADMAP.md` (status and candidate work).

This document separates what users can do **today** from what is only **planned or specified**.

## 1. What LeadFlow is

LeadFlow is a CRM for managing contacts, tracking sales opportunities, and organizing customer interactions in one place.

It is built for freelancers, independent professionals, and small businesses that need a practical way to manage customer relationships and a sales pipeline without enterprise complexity.

The product is designed to feel professional, trustworthy, focused, and intuitive: a polished productivity tool rather than a dashboard demo.

## 2. Who it is for

| Audience | Need LeadFlow addresses |
|---|---|
| Freelancers | Keep client contacts, notes, and follow-up activities together |
| Independent professionals | Track where each relationship stands without a spreadsheet |
| Small businesses | Give a small team member a clear, single-user CRM workspace |

The current data model is **single-user**. Each contact, note, and activity belongs to one user. There is no shared team workspace, organization, role, or permission model.

## 3. Product model

LeadFlow is organized around four objects:

| Object | What it represents |
|---|---|
| Contact | A person or lead, with company, position, source, and pipeline stage |
| Note | Free-text context attached to a contact |
| Activity | A call, email, meeting, or task attached to a contact, optionally with a due date and completion state |
| Pipeline stage | The contact's current sales status: New, Contacted, Interested, or Converted |

The pipeline stage is a single current value on the contact. There is no stage history, probability, deal value, forecast, or expected-close date.

## 4. Shipped capabilities

Everything in this section is implemented and reachable in the application.

### 4.1 Authentication and account

- Sign in with GitHub or Google OAuth.
- Google sign-in requires a provider-verified email.
- GitHub sign-in requires a verified email returned by the GitHub email API.
- Users are upserted by verified email; the database user is linked to the JWT session.
- Sessions last 7 days.
- Sign out from the header account menu.
- Profile display name can be edited in Settings.
- Email is read-only and comes from the sign-in provider.
- No email/password sign-in, password reset, magic link, passkey, or account-linking UI.

### 4.2 Dashboard

The dashboard shows:

- A time-of-day greeting using the user's first name.
- A prompt about overdue or due-today activities, or an “all caught up” message.
- Total contacts.
- New leads added this month.
- Interested contacts.
- Converted contacts.
- Overdue, due-today, and upcoming activity counts, with links to the matching activity filters.
- Five most recent contacts.
- Pipeline overview bars for the four stages.
- Five most recent activities with completion state and contact links.

The dashboard is read-only except for navigation links.

### 4.3 Contacts

- Create a contact with first name, last name, email, phone, company, position, source, and status.
- Status defaults to New.
- List contacts newest first.
- Search contacts by first name, last name, email, or company.
- Search supports multiple terms and requires all terms to match somewhere in those fields.
- Filter by status: All, New, Contacted, Interested, Converted.
- Paginate at 12 contacts per page.
- Open a contact record.
- Edit all contact fields, including status.
- Delete a contact with a confirmation dialog.
- Deleting a contact also deletes its notes and activities.
- Contact email is not unique; duplicate emails are allowed.

### 4.4 Contact record

The contact detail page shows:

- Name, position, company, and current status.
- Email and phone links.
- First name, last name, company, position, source, and created date.
- Edit and delete actions.
- A notes section.
- An activities section for that contact, including type, title, description, due date, completion toggle, and delete action.
- An add-activity link in the empty state.

### 4.5 Notes

- Add a note to a contact.
- Notes are listed newest first.
- Edit a note inline.
- Delete a note with confirmation.
- Notes are included in the contact detail page but are **not** included in CSV export.
- Notes have no pagination and no maximum length in the server schema.

### 4.6 Pipeline

- Four fixed columns: New, Contacted, Interested, Converted.
- Drag a contact card between columns to change its stage.
- A per-card “Move to” select provides a keyboard-accessible alternative.
- Status changes are optimistic in the UI and roll back if the API request fails.
- Each card shows name, email, company, current stage, and age since creation.
- Cards link to the contact record.
- Pipeline totals show total contacts, in-progress count, and conversion rate (converted ÷ total).

The board is not a deal-value forecast. It is a stage view of contacts.

### 4.7 Activities

- Create a call, email, meeting, or task for a contact.
- Add a title, optional description, and optional due date.
- List activities across all contacts.
- Filter by All, Pending, Overdue, Due Today, Upcoming, or Completed.
- Search by activity title, description, contact first name, contact last name, or contact company.
- Sort by Newest, Oldest, Due date, or A–Z (title).
- Mark an activity complete or reopen it.
- Edit an activity, including its contact, type, title, description, and due date.
- Delete an activity with confirmation.
- Activity type is a label only; LeadFlow does not send email, place calls, or sync calendars.
- There are no reminders, notifications, or recurring activities.

### 4.8 Search and command palette

- Open the command palette with Ctrl/Cmd+K or the header search button.
- Search owned contacts and activities after typing at least two characters.
- Show up to five contacts and five activities.
- Navigate to Dashboard, Contacts, Pipeline, Activities, or Settings.
- Create a new contact or activity.
- Switch between light and dark themes.
- Use arrow keys and Enter to select results.

The palette matches contact first name, last name, email, and company, plus activity titles only. It does not search notes, activity descriptions, phone numbers, positions, sources, or activity types.

### 4.9 Settings

- View and edit the profile display name (2–80 characters).
- View the sign-in email as read-only.
- View the member-since date.
- Choose Light, Dark, or System theme.
- Export contacts and activities as a CSV file.

CSV export details:

- Includes contacts and activities.
- Does **not** include notes.
- Uses UTF-8 with a BOM.
- Escapes quotes and line breaks.
- Neutralizes spreadsheet formula injection.
- Downloads as `leadflow-export-YYYY-MM-DD.csv`.
- Is available from `/api/export` and the Settings page.

### 4.10 Public pages

- Landing page at `/`.
- Login page at `/login`.
- Privacy policy at `/privacy`.
- Terms of service at `/terms`.

The landing page includes a static dashboard preview with illustrative numbers. It is not connected to real data.

### 4.11 Responsive and accessibility behavior

- Desktop/tablet sidebar at `md` and above.
- Bottom navigation below `md`.
- Responsive grids and a horizontally scrollable pipeline on small screens.
- Safe-area padding for mobile navigation.
- Visible keyboard focus styles.
- Reduced-motion support.
- Accessible labels on icon-only controls, dialogs, filters, and the command palette.
- Confirmation dialogs use `role="alertdialog"`.
- Loading skeletons and `loading.tsx` route states.

There is no formal WCAG audit recorded in the repository. `README.md` claims a perfect accessibility score, but that claim is not reproducible from the code alone.

### 4.12 Theme

- Light and dark themes are supported.
- System theme is the default.
- Theme choice is managed by `next-themes` and stored client-side.
- The Deal Ledger palette and fonts are implemented as a foundation.
- The landing and login pages still use the earlier violet/blue visual language.

## 5. Core user workflows

### 5.1 First use

1. Open `/`.
2. Choose “Get started” or “Sign in.”
3. Sign in with GitHub or Google.
4. Land on `/dashboard`.
5. Add a contact from `/contacts/new`.
6. Open the contact and add notes or an activity.
7. Move the contact through the pipeline as the relationship progresses.

### 5.2 Daily follow-up

1. Open the dashboard.
2. Review overdue, due-today, and upcoming counts.
3. Follow the link to `/activities?filter=...`.
4. Complete, edit, or delete activities.
5. Open the related contact for context and notes.

### 5.3 Pipeline review

1. Open `/pipeline`.
2. Review each stage column.
3. Drag a contact to a new stage, or use the “Move to” select.
4. Open the contact to add notes or activities.
5. Check the conversion summary at the top.

### 5.4 Data export

1. Open `/settings`.
2. Use “Export my data (CSV).”
3. Open the downloaded file in Excel or Google Sheets.
4. Note that notes are not included.

### 5.5 Account cleanup

- Delete individual contacts, notes, and activities in the app.
- Deleting a contact removes its notes and activities.
- There is no self-serve account deletion. The privacy policy says account deletion requests are handled manually by email.

## 6. What is not shipped

The following are **not** implemented in the codebase:

| Capability | Status |
|---|---|
| CSV import / bulk contact migration | Not implemented |
| Automated follow-ups or reminder emails | Not implemented |
| Browser or push notifications | Not implemented |
| Email sending, calendar sync, or telephony | Not implemented |
| Advanced reporting, forecasting, or lead-velocity analytics | Not implemented |
| Deal values, probabilities, expected close dates, or revenue forecasts | Not implemented |
| Stage-change history or audit trail | Not implemented |
| Teams, organizations, roles, permissions, or shared ownership | Not implemented |
| Account linking UI | Not implemented; users are matched implicitly by verified email |
| Email/password login or password reset | Not implemented |
| Self-serve account deletion | Not implemented; manual email process |
| File attachments or document storage | Not implemented |
| Public API, webhooks, or integrations | Not implemented |
| Mobile app or PWA | Not implemented; responsive web only |
| Internationalization | Not implemented; English UI |
| Toast notification system | Not implemented; inline messages and occasional `window.alert` |
| Custom error boundaries | Not implemented |
| Self-serve data import | Not implemented |
| Notes in CSV export | Not implemented |

## 7. Planned and specified work

This section is deliberately separate from shipped behavior. Nothing here should be presented as available.

### 7.1 Product backlog from `README.md`

`README.md` lists these as roadmap items:

- **Automated Follow-ups** — system-generated reminders for overdue activities.
- **Advanced Reporting** — conversion-rate analytics and lead-velocity tracking.
- **CSV Engine** — bulk import/export for data migration.

Current reality:

- Reminders do not exist.
- Reporting is limited to dashboard counts and a pipeline summary.
- CSV export exists; CSV import does not.

These are backlog ideas, not commitments with dates.

### 7.2 Deal Ledger design rollout

`DESIGN.md` specifies a full visual direction called “The Deal Ledger.” The current status is:

| Design work | Status |
|---|---|
| Paper/ink/oxblood/success/brass tokens | Implemented in `globals.css` |
| Light and dark themes | Implemented |
| Fraunces, IBM Plex Sans, IBM Plex Mono | Implemented in `layout.tsx` |
| Type scale, radii, elevation, focus tokens | Implemented |
| Deal Stage Stamp | Specified, not implemented |
| Landing page redesign | Specified, not implemented |
| Login redesign | Specified, not implemented |
| Dashboard redesign | Specified, not implemented |
| Contacts list redesign | Specified, not implemented |
| Contact detail redesign | Specified, not implemented |
| Pipeline redesign | Specified, not implemented |
| Activities redesign | Specified, not implemented |
| Settings redesign | Specified, not implemented |
| Unified stage-color component map | Not implemented; colors are duplicated |
| Removal of violet/blue gradients | Not implemented on landing and login |

`DESIGN.md` still says “Not implemented” at the top. That statement is now accurate for the page/component redesign, but not for the token/font foundation.

### 7.3 Candidate improvements

These are technical or product improvements suggested by the current implementation. They are candidates, not commitments:

- Add CSV import.
- Add activity pagination.
- Add a searchable, paginated contact picker for activity forms.
- Add reminders or a notification channel for due activities.
- Add reporting beyond counts.
- Add self-serve account deletion.
- Add API route tests and component tests.
- Add a standalone typecheck script (tests now run in CI).
- Unify status colors and avatar gradients.
- Add error boundaries and a toast system.
- Add rate limiting for API and search endpoints.
- Add structured logging and error monitoring.
- Reconcile the privacy policy with CSV export.
- Add `DIRECT_URL` to `.env.example` and document the migration workflow.

## 8. Product principles reflected in the code

| Principle | How it appears today |
|---|---|
| Focus on relationships, not dashboards | Contacts, notes, and activities are first-class; the dashboard summarizes them |
| Keep the pipeline simple | Exactly four stages; no deal values or probabilities |
| Make the next action visible | Due dates, overdue/today/upcoming filters, completion toggles |
| Keep data portable | CSV export of contacts and activities |
| Respect user context | Responsive layout, keyboard focus, reduced motion, light/dark/system theme |
| Keep ownership clear | Every record is scoped to one authenticated user |
| Avoid enterprise complexity | No teams, roles, billing, or integrations |

## 9. Product boundaries and assumptions

- The app is designed for individual use.
- The pipeline stage is a contact attribute, not a deal record.
- Activities are planning and history labels; they do not execute communication.
- The landing page preview is illustrative, not live data.
- The app does not promise data recovery or backups; the terms say users should keep separate copies.
- The app does not currently provide self-serve account deletion.
- The privacy policy’s statement that there is no data export feature is outdated; CSV export exists.

## 10. Open product questions

These require an explicit decision before implementation:

1. Should CSV import be added, and what validation/deduplication rules should it use?
2. Should reminders be in-app only, email-based, or both?
3. Should reporting remain count-based or introduce deal values and forecasting?
4. Should account deletion become self-serve?
5. Should teams or shared workspaces ever be supported?
6. Should the Deal Ledger redesign replace the landing/login violet branding in one pass or page by page?
7. Should the privacy policy be updated immediately to mention CSV export?
8. Should notes be added to CSV export?
9. Should contact email become unique per user?
10. Should activities be paginated before or after adding more activity volume?
