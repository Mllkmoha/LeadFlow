import Link from "next/link";
import type { ReactNode } from "react";

type LegalPageLayoutProps = {
  title: string;
  description: string;
  children: ReactNode;
};

export default function LegalPageLayout({
  title,
  description,
  children,
}: LegalPageLayoutProps) {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto w-full max-w-4xl px-5 py-12 sm:px-8 sm:py-16">
        <header className="mb-12 border-b border-border pb-8">
          <Link
            href="/"
            className="mb-8 inline-flex items-center text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
          >
            <span aria-hidden="true" className="mr-2">
              ←
            </span>
            LeadFlow
          </Link>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {title}
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
            {description}
          </p>

          <p className="mt-5 text-sm text-muted-foreground">
            Last updated: November 4, 2026
          </p>
        </header>

        <article className="legal-content space-y-10 text-sm leading-7 text-muted-foreground sm:text-base">
          {children}
        </article>

        <footer className="mt-16 flex flex-col gap-4 border-t border-border pt-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} LeadFlow. All rights reserved.</p>

          <nav aria-label="Legal pages" className="flex gap-5">
            <Link
              href="/privacy"
              className="transition-colors hover:text-foreground"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="transition-colors hover:text-foreground"
            >
              Terms of Service
            </Link>
          </nav>
        </footer>
      </div>
    </main>
  );
}
