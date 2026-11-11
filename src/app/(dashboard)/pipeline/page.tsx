import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { PageTransition } from "@/components/layout/page-transition";

import { PipelineBoard } from "./pipeline-board";

export default async function PipelinePage() {
  const session = await auth();

  if (!session?.user?.id) {
    return null;
  }

  const contacts = await prisma.contact.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const total = contacts.length;
  const converted = contacts.filter((c) => c.status === "CONVERTED").length;
  const inProgress = total - converted;
  const conversionRate =
    total === 0 ? 0 : Math.round((converted / total) * 100);

  return (
    <PageTransition>
      <div className="space-y-4 sm:space-y-6">
        <div className="grid grid-cols-3 gap-3 sm:gap-4">
          <div className="rounded-xl border bg-card p-3 sm:p-4">
            <p className="text-xs text-muted-foreground">Total</p>
            <p className="mt-1 text-2xl font-bold tabular-nums">{total}</p>
          </div>

          <div className="rounded-xl border bg-card p-3 sm:p-4">
            <p className="text-xs text-muted-foreground">In progress</p>
            <p className="mt-1 text-2xl font-bold tabular-nums">{inProgress}</p>
          </div>

          <div className="rounded-xl border bg-emerald-500/5 p-3 ring-1 ring-emerald-500/30 sm:p-4">
            <p className="text-xs text-muted-foreground">Conversion</p>
            <p className="mt-1 text-2xl font-bold tabular-nums text-emerald-600 dark:text-emerald-400">
              {conversionRate}%
            </p>
          </div>
        </div>

        <PipelineBoard contacts={contacts} />
      </div>
    </PageTransition>
  );
}
