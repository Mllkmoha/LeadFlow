import Link from "next/link";
import { ContactForm } from "./contact-form";

import { PageTransition } from "@/components/layout/page-transition";

export default function NewContactPage() {
  return (
    <PageTransition>
      <div className="mx-auto max-w-3xl space-y-6">
        <div>
          <Link
            href="/contacts"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            ← Back to contacts
          </Link>

          <h1 className="mt-4 text-2xl font-semibold tracking-tight">
            New Contact
          </h1>

          <p className="text-muted-foreground">
            Add a new customer or lead to your CRM.
          </p>
        </div>

        <div className="rounded-xl border bg-card p-6">
          <ContactForm />
        </div>
      </div>
    </PageTransition>
  );
}
