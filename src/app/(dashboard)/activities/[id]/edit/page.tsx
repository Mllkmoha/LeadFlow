import Link from "next/link";
import { PageTransition } from "@/components/layout/page-transition";
import { ActivityEditForm } from "./activity-edit-form";

export default async function EditActivityPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

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
            Edit Activity
          </h1>

          <p className="text-muted-foreground">
            Update the details of this activity.
          </p>
        </div>

        <div className="rounded-xl border bg-card p-6">
          <ActivityEditForm id={id} />
        </div>
      </div>
    </PageTransition>
  );
}
