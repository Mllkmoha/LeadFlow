
import Link from "next/link";

import { PageTransition } from "@/components/layout/page-transition";
import { ActivityForm } from "./activity-form";

export default function NewActivityPage() {
  return (
    <PageTransition>
      <div className="mx-auto max-w-3xl space-y-6">
        <div>
          <Link
            href="/activities"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            ← Back to activities
          </Link>

          <h1 className="mt-4 text-2xl font-semibold tracking-tight">
            New Activity
          </h1>

          <p className="text-muted-foreground">
            Record a call, email, meeting, or task for a contact.
          </p>
        </div>

        <div className="rounded-xl border bg-card p-6">
          <ActivityForm />
        </div>
      </div>
    </PageTransition>
  );
}
