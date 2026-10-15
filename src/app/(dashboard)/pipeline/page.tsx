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

  return (
    <PageTransition>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Pipeline</h1>
          <p className="text-muted-foreground">
            Manage your contacts through the sales pipeline.
          </p>
        </div>

        <PipelineBoard contacts={contacts} />
      </div>
    </PageTransition>
  );
}
