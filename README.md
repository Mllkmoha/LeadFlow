# LeadFlow

A full-stack CRM application for managing contacts, tracking leads, and organizing sales pipelines.

LeadFlow is a personal development project built with Next.js, React, TypeScript, and PostgreSQL. It focuses on a clean dashboard experience and practical CRM workflows.

## Features

- **Dashboard** — Overview of contacts and lead activity.
- **Contact management** — Create, view, edit, and delete contacts.
- **Contact notes** — Add, edit, and delete notes associated with contacts.
- **Search and filtering** — Find and filter contacts.
- **Sales pipeline** — Visualize and organize leads by stage.
- **Authentication** — Authentication integration with Auth.js.
- **Responsive interface** — Modern application layout with reusable UI components.
- **Form validation** — Type-safe validation with Zod.
- **Data fetching** — Server APIs and client-side caching with TanStack Query.

## Tech Stack

**Frontend**
- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Base UI and shadcn/ui
- Lucide React
- Motion

**Backend and data**
- Next.js Route Handlers
- PostgreSQL
- Prisma ORM
- Auth.js
- Zod

**Tools**
- Git and GitHub
- ESLint
- npm

## Getting Started

### Prerequisites

- Node.js compatible with the project's Next.js version
- npm
- PostgreSQL database
- GitHub OAuth credentials if using GitHub sign-in

### 1. Clone the repository

```bash
git clone https://github.com/Mllkmoha/LeadFlow.git
cd LeadFlow
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a local environment file:

```bash
cp .env.example .env
```

Set the required values in `.env`:

```env
DATABASE_URL="your-database-connection-url"
DIRECT_URL="your-direct-database-connection-url"
AUTH_SECRET="your-generated-auth-secret"
AUTH_GITHUB_ID="your-github-oauth-client-id"
AUTH_GITHUB_SECRET="your-github-oauth-client-secret"
```

Use your own database connection details and OAuth credentials. Never commit `.env` or expose real secrets.

Generate an authentication secret with:

```bash
openssl rand -base64 32
```

### 4. Set up the database

Make sure PostgreSQL is configured and your environment variables are correct. Apply the database migrations using the Prisma setup configured for this project.

### 5. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Build the application |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint |

## Project Structure

```text
src/
├── app/
│   ├── (auth)/          # Authentication pages
│   ├── (dashboard)/     # Dashboard, contacts, and pipeline
│   └── api/             # API route handlers
├── components/          # Reusable UI components
└── lib/                 # Shared utilities and validation
prisma/                  # Database schema and related files
public/                  # Static assets
```

## Project Status

LeadFlow is under active development. Features and setup requirements may change as the application evolves.

## Author

**Mohamed Rafik Mellouk**

- GitHub: [@Mllkmoha](https://github.com/Mllkmoha)

---

Built as a practical full-stack web development project.
