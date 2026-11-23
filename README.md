<div align="center">

# 🚀 LeadFlow

**The High-Performance CRM for Modern Sales Pipelines**

<p align="center">
  <a href="https://github.com/Mllkmoha/LeadFlow/blob/main/README.md"><b>Documentation</b></a> •
  <a href="https://github.com/Mllkmoha/LeadFlow/issues"><b>Report Bug</b></a> •
  <a href="https://github.com/Mllkmoha/LeadFlow/pulls"><b>Request Feature</b></a>
</p>

[![Next.js 16](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Latest-blue?style=for-the-badge&logo=postgresql)](https://www.postgresql.org/)
[![Prisma](https://img.shields.io/badge/Prisma-7.10-2D3E3E?style=for-the-badge&logo=prisma)](https://www.prisma.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

<br />

**LeadFlow** is a production-grade CRM designed to eliminate the chaos of lead management. Built with a focus on speed, type-safety, and an elite user experience, it transforms the way you track customer journeys from discovery to conversion 10/10.

</div>

---

## 🖼️ Project Preview

### Dashboard

<p align="center">
  <img
    src="./public/leadflow-dashboard.png"
    alt="LeadFlow CRM Dashboard"
    width="100%"
  />
</p>

### Live Demo

<p align="center">
  <img
    src="./public/leadflow-preview.gif"
    alt="LeadFlow CRM Demo"
    width="100%"
  />
</p>

---

## 🎯 The Solution

Most CRMs are either too simple (spreadsheets) or too bloated (Enterprise software). **LeadFlow** hits the sweet spot:

- **Centralized Intelligence**: Stop hunting for emails across threads. Every note and activity is linked to a single contact.
- **Visual Momentum**: The Kanban pipeline makes it immediately obvious where leads are stalling and where the wins are.
- **Zero-Latency UX**: By leveraging Next.js Server Components and TanStack Query, the app feels instantaneous.

## ✨ Professional Feature Set

| Feature | Engineering Implementation | Business Value |
| :--- | :--- | :--- |
| **Sales Pipeline** | Four-stage Kanban board with drag-and-drop using `@dnd-kit/core` | Visualize the sales funnel at a glance. |
| **Contact CRM** | Full CRUD with Zod-validated API route handlers | Maintain a clean, high-integrity lead database. |
| **Interaction Log** | One-to-many relationship: Contacts $\rightarrow$ Activities/Notes | Never forget a detail from a client call. |
| **Secure Auth** | GitHub OAuth $\rightarrow$ JWT Session $\rightarrow$ DB Sync | Enterprise-grade security with zero-friction login. |
| **Adaptive UI** | Tailwind 4 + shadcn/ui + Motion | Professional look that works on mobile and desktop. |

### Dashboard

The dashboard displays key metrics and recent activity:

- **Activity/Contact Statistics**: PostgreSQL raw SQL aggregates count records by stage and type.
- **Pipeline Counts**: Derived in JavaScript from the contact stage aggregates, applying business logic for display.
- **Recent Records**: Fetched with Prisma `findMany` queries, ordered by updated timestamps.

---

## 🏗️ Technical Architecture

### System Design
LeadFlow utilizes a **layered architecture** to ensure scalability and maintainability:

```mermaid
graph TD
    A[Client Browser] -->|Request| B[Next.js App Router]
    B -->|SSR/RSC| C[Server Components]
    B -->|API Call| D[Next.js API Routes]
    C -->|Query| E[Prisma ORM]
    D -->|Query| E
    E -->|SQL| F[(PostgreSQL)]
    B -->|Identity| G[NextAuth.js / GitHub OAuth]
```

### Engineering Decisions
- **Server Components (RSC)**: Used for the majority of the app to reduce the JavaScript bundle sent to the client, resulting in the 96 Performance score.
- **Prisma Projection**: Instead of `findMany()`, I implement `select` blocks to fetch only necessary columns, reducing database I/O.
- **Zod Validation**: Every entry point (API/Form) is guarded by Zod schemas to prevent data corruption.
- **Optimistic Updates**: Leverages TanStack Query to make the UI feel instant even before the database confirms the change.

---

## 📂 Repository Blueprint

```text
src/
├── app/
│   ├── (auth)/login/             # OAuth sign-in page and buttons
│   ├── (dashboard)/               # Authenticated application shell and pages
│   │   ├── dashboard/             # Stats, recent contacts, pipeline overview
│   │   ├── contacts/              # List, create, detail, edit, notes, delete
│   │   ├── pipeline/              # Drag-and-drop stage board
│   │   ├── activities/            # List, create, edit, complete, delete
│   │   └── settings/              # Profile name, theme, CSV export
│   ├── api/                       # Route handlers (JSON and CSV)
│   ├── actions/
│   │   └── auth.ts                # Only server action: sign out
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
├── proxy.ts                       # Next.js 16 proxy: CSP nonce and headers
└── auth.ts                        # OAuth configuration
```

---

## 🚀 Setup & Deployment

### Local Environment
1. **Clone & Install**
   ```bash
   git clone https://github.com/Mllkmoha/LeadFlow.git
   cd LeadFlow/app
   npm install
   ```

2. **Configure `.env`**
   ```env
   DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DB"
   AUTH_SECRET="generate with: npx auth secret"
   AUTH_GITHUB_ID=""
   AUTH_GITHUB_SECRET=""
   AUTH_GOOGLE_ID=""
   AUTH_GOOGLE_SECRET=""
   ```

3. **Sync Database**
   - **Development**: Run `npx prisma migrate dev` to create and apply migrations during local development.
   - **Production**: Run `npx prisma migrate deploy` to apply committed migrations to a production database.
   - The repository contains `prisma/migrations/0001_baseline`.
   - **Warning**: Do not blindly run production migrations on a non-empty database until you have verified its migration history and baseline status.

4. **Launch**
   ```bash
   npm run dev
   ```

---

## 📊 Roadmap

- [ ] **Automated Follow-ups**: System-generated reminders for overdue activities.
- [ ] **Advanced Reporting**: Conversion rate analytics and lead-velocity tracking.
- [ ] **CSV Import**: Bulk import for enterprise data migration.
- [x] **CSV Export**: Contacts and activities export from Settings (notes excluded).

---

## 👨‍💻 The Engineer

**Mohamed Rafik Mellouk**
*Junior Full-Stack Web Developer*

I specialize in building high-performance, type-safe web applications. LeadFlow is a testament to my commitment to **performance engineering**, **accessibility**, and **clean architecture**.

[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github)](https://github.com/Mllkmoha)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/mohamed-mellouk-a9114233a)
[![Portfolio](https://img.shields.io/badge/Portfolio-blue?style=for-the-badge)](https://mohamed-portfolio-b2d.pages.dev/)

