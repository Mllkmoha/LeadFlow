<div align="center">

# 🚀 LeadFlow

**A modern CRM for managing contacts, sales pipelines, and customer relationships in one focused workspace.**

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Latest-blue?style=flat-square&logo=postgresql)](https://www.postgresql.org/)
[![Prisma](https://img.shields.io/badge/Prisma-7.10-2D3E3E?style=flat-square&logo=prisma)](https://www.prisma.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)

[Explore Repository](https://github.com/Mllkmoha/LeadFlow) · [Report Bug](https://github.com/Mllkmoha/LeadFlow/issues)

</div>

---

## 📖 Overview

LeadFlow is a professional CRM (Customer Relationship Management) application designed to replace fragmented spreadsheets with a centralized, focused workspace. It allows users to track leads through a structured sales funnel, maintain detailed interaction histories, and coordinate follow-ups efficiently.

The application provides a seamless transition from lead discovery to conversion, ensuring that every customer interaction is documented and every sales opportunity is tracked.

## 🖼️ Project Preview

<!-- Add LeadFlow screenshots here -->

---

## 🎯 Key Highlights

- **Type-Safe Architecture**: Full-stack TypeScript implementation ensuring consistency from the database to the UI.
- **Modern UI/UX**: Built with Tailwind CSS 4 and shadcn/ui for a polished, professional, and responsive interface.
- **Secure Identity**: Integrated GitHub OAuth authentication via NextAuth.js for secure, identity-based access.
- **Relational Data Model**: Optimized PostgreSQL schema managed by Prisma for high data integrity.
- **Efficient State Management**: Utilizes TanStack Query for optimized data fetching and server-state synchronization.

## ✨ Features

| Feature | Description |
| :--- | :--- |
| 👥 **Contact Management** | Full CRUD operations for leads including company, position, and source tracking. |
| 📊 **Sales Pipeline** | Visual Kanban-style tracking of leads through `NEW`, `CONTACTED`, `INTERESTED`, and `CONVERTED` stages. |
| 📝 **Contact Notes** | Persistent, contact-specific notes to capture critical context from every interaction. |
| 🔄 **Activity Tracking** | Schedule and track Calls, Emails, Meetings, and Tasks linked directly to contacts. |
| 📈 **Analytics Dashboard** | High-level overview of pipeline health and activity metrics. |
| 🔐 **Authentication** | Secure sign-in flow powered by GitHub OAuth. |

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 16 (App Router)
- **Library**: React 19
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui, Base UI, Lucide React
- **Animations**: Motion (Framer Motion)
- **State Management**: TanStack Query

### Backend
- **Language**: TypeScript
- **API**: REST-style API Routes
- **Validation**: Zod

### Database & Auth
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: NextAuth.js / Auth.js (GitHub Provider)

---

## 🏗️ Architecture

LeadFlow follows a modern decoupled architecture, separating the client-side presentation from the server-side business logic.

```text
User
 │
 ▼
Next.js App Router
 │
 ├── React UI (Client Components)
 │
 ├── Server Components
 │
 └── API Routes
       │
       ▼
    Prisma ORM
       │
       ▼
  PostgreSQL Database
```

The **Authentication Layer** (NextAuth.js) intercepts requests to protected routes, validating the session via JWT and synchronizing user identity with the database.

---

## 📂 Application Structure

```text
src/
├── app/
│   ├── (auth)/             # Authentication pages (Login)
│   ├── (dashboard)/        # Core CRM application (Pipeline, Contacts, etc.)
│   └── api/                # REST API endpoints
├── components/
│   ├── ui/                 # Base reusable UI components
│   ├── pipeline/           # Kanban board and pipeline logic
│   └── contacts/           # Contact profiles and management views
├── lib/
│   ├── prisma.ts           # Prisma client singleton
│   └── validations/       # Zod schemas for data integrity
├── services/               # Business logic and database service layer
└── auth.ts                 # NextAuth configuration
```

---

## 🔄 Core Workflows

### Contacts
Users can create new leads, edit existing profiles, and delete records. Each contact acts as a hub for all related notes and activities.

### Pipeline
Leads are moved through a structured funnel. By updating the contact status, leads shift across the Kanban board, providing a visual representation of the sales process.

### Activities & Notes
Users can log specific interaction types (Calls, Emails, Meetings, Tasks) with due dates. Notes allow for unstructured data capture, ensuring a complete audit trail for every lead.

### Authentication
The application uses GitHub OAuth. Upon first sign-in, the user is automatically registered in the PostgreSQL database, creating a secure link between the GitHub identity and the CRM data.

---

## 🔌 API Reference

| Endpoint | Method | Purpose |
| :--- | :--- | :--- |
| `/api/contacts` | `GET`, `POST` | List all contacts or create a new one |
| `/api/contacts/[id]` | `PATCH`, `DELETE` | Update or remove a specific contact |
| `/api/contacts/[id]/notes` | `GET`, `POST` | Retrieve or add notes for a contact |
| `/api/activities` | `GET`, `POST` | List or create new activities |
| `/api/activities/[id]` | `PATCH`, `DELETE` | Update activity status or remove it |
| `/api/dashboard` | `GET` | Fetch aggregate pipeline and activity metrics |
| `/api/settings` | `GET`, `PATCH` | Manage user-specific application settings |

---

## 🗄️ Database

LeadFlow uses **PostgreSQL** with **Prisma ORM** for a type-safe relational schema:

- **User**: The authenticated account owner.
- **Contact**: The primary entity with attributes like `email`, `company`, and `status`.
- **Activity**: Linked to a contact; tracks the type of interaction and completion status.
- **Note**: Linked to a contact; stores textual interaction details.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL instance

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Mllkmoha/LeadFlow.git
   cd LeadFlow/app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL=
   AUTH_SECRET=
   AUTH_GITHUB_ID=
   AUTH_GITHUB_SECRET=
   ```

4. **Database Setup**
   ```bash
   npx prisma db push
   ```

5. **Run Development Server**
   ```bash
   npm run dev
   ```

### Production Build
```bash
npm run build
npm start
```

---

## ⚙️ Available Scripts

| Script | Command | Description |
| :--- | :--- | :--- |
| `dev` | `npm run dev` | Starts the Next.js development server |
| `build` | `npm run build` | Compiles the application for production |
| `start` | `npm run start` | Starts the production server |
| `lint` | `npm run lint` | Runs ESLint for code quality checks |

---

## 🛠️ Development

- **TypeScript**: Strict typing used across the entire stack.
- **Validation**: Server-side validation implemented via Zod.
- **Database**: Migrations and schema updates managed via Prisma.
- **UI**: Atomic component design using Tailwind CSS 4.

---

## 📈 Roadmap

### Implemented
- [x] GitHub OAuth Authentication
- [x] Visual Sales Pipeline (Kanban)
- [x] Contact & Activity CRUD
- [x] Analytics Dashboard
- [x] Responsive UI Design

### Planned
- [ ] Integration of email notifications for upcoming activities.
- [ ] CSV Import/Export for bulk lead migration.
- [ ] Advanced conversion rate analytics.

---

## 👨‍💻 Author

**Mohamed Rafik Mellouk**
*Junior Full-Stack Web Developer*

[![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=github)](https://github.com/Mllkmoha)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=flat-square&logo=linkedin)](https://linkedin.com/in/mohamed-mellouk-a9114233a)
[![Portfolio](https://img.shields.io/badge/Portfolio-blue?style=flat-square)](https://mohamed-portfolio-b2d.pages.dev/)
