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

**LeadFlow** is a production-grade CRM designed to eliminate the chaos of lead management. Built with a focus on speed, type-safety, and an elite user experience, it transforms the way you track customer journeys from discovery to conversion.

</div>

---

## 📈 Performance Benchmarks

Unlike most portfolio projects, LeadFlow is engineered for speed. Verified via **Google Lighthouse** on a production build:

| Metric | Score | Status |
| :--- | :---: | :--- |
| **Performance** | **96** | 🟢 Elite |
| **Accessibility** | **100** | 🟢 Perfect |
| **Best Practices** | **100** | 🟢 Perfect |
| **SEO** | **100** | 🟢 Perfect |

**Core Web Vitals:**
- **LCP**: 0.6s (Fastest possible feel)
- **TBT**: 90ms (Zero lag interactions)
- **CLS**: 0 (Pixel-perfect stability)

---

## 🖼️ Project Preview

<!-- 
  👉 ACTION: Replace these with actual screenshots for maximum impact
-->
<div align="center">
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
    <div style="border: 1px solid #ddd; border-radius: 10px; padding: 10px; text-align: center;">
      <p><i>Dashboard & Analytics</i></p>
      <code><!-- Add Dashboard Screenshot Here --></code>
    </div>
    <div style="border: 1px solid #ddd; border-radius: 10px; padding: 10px; text-align: center;">
      <p><i>Visual Sales Pipeline</i></p>
      <code><!-- Add Pipeline Screenshot Here --></code>
    </div>
  </div>
</div>

---

## 🎯 The Solution

Most CRMs are either too simple (spreadsheets) or too bloated (Enterprise software). **LeadFlow** hits the sweet spot:

- **Centralized Intelligence**: Stop hunting for emails across threads. Every note and activity is linked to a single contact.
- **Visual Momentum**: The Kanban pipeline makes it immediately obvious where leads are stalling and where the wins are.
- **Zero-Latency UX**: By leveraging Next.js Server Components and TanStack Query, the app feels instantaneous.

## ✨ Professional Feature Set

| Feature | Engineering Implementation | Business Value |
| :--- | :--- | :--- |
| **Sales Pipeline** | Relational status tracking with Prisma `groupBy` | Visualize the sales funnel at a glance. |
| **Contact CRM** | Full CRUD with Zod-validated server actions | Maintain a clean, high-integrity lead database. |
| **Interaction Log** | One-to-many relationship: Contacts $\rightarrow$ Activities/Notes | Never forget a detail from a client call. |
| **Secure Auth** | GitHub OAuth $\rightarrow$ JWT Session $\rightarrow$ DB Sync | Enterprise-grade security with zero-friction login. |
| **Adaptive UI** | Tailwind 4 + shadcn/ui + Motion | Professional look that works on mobile and desktop. |

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
├── app/                    # Routing & Layouts (App Router)
│   ├── (auth)/             # Identity Management
│   ├── (dashboard)/       # Core Product Logic
│   └── api/                # Type-safe REST Endpoints
├── components/             # Atomic Design System
│   ├── ui/                 # Base Primitives (Shadcn)
│   ├── pipeline/           # Kanban Logic
│   └── contacts/           # CRM View Logic
├── lib/                    # Infrastructure & Config
│   ├── prisma.ts           # Database Singleton
│   └── validations/       # Zod Data Contracts
├── services/               # Business Logic Layer
└── auth.ts                 # OAuth Configuration
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
   DATABASE_URL="postgresql://..."
   AUTH_SECRET="your_secret"
   AUTH_GITHUB_ID="your_id"
   AUTH_GITHUB_SECRET="your_secret"
   ```

3. **Sync Database**
   ```bash
   npx prisma db push
   ```

4. **Launch**
   ```bash
   npm run dev
   ```

---

## 📈 Roadmap

- [ ] **Automated Follow-ups**: System-generated reminders for overdue activities.
- [ ] **Advanced Reporting**: Conversion rate analytics and lead-velocity tracking.
- [ ] **CSV Engine**: Bulk import/export for enterprise data migration.

---

## 👨‍💻 The Engineer

**Mohamed Rafik Mellouk**
*Junior Full-Stack Web Developer*

I specialize in building high-performance, type-safe web applications. LeadFlow is a testament to my commitment to **performance engineering**, **accessibility**, and **clean architecture**.

[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github)](https://github.com/Mllkmoha)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/mohamed-mellouk-a9114233a)
[![Portfolio](https://img.shields.io/badge/Portfolio-blue?style=for-the-badge)](https://mohamed-portfolio-b2d.pages.dev/)
