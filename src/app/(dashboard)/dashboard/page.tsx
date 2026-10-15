import { StatCard } from "@/components/dashboard/stat-card";
import { RecentContacts } from "@/components/dashboard/recent-contacts";
import { PipelineOverview } from "@/components/dashboard/pipeline-overview";
import { PageTransition } from "@/components/layout/page-transition";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { ContactStatus } from "@/../generated/prisma/client";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user?.id) {
    return null;
  }

  const userId = session.user.id;

  const [totalContacts, newLeads, interested, converted, recentContacts] =
    await Promise.all([
      prisma.contact.count({
        where: { userId },
      }),

      prisma.contact.count({
        where: {
          userId,
          status: ContactStatus.NEW,
          createdAt: {
            gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
          },
        },
      }),

      prisma.contact.count({
        where: {
          userId,
          status: ContactStatus.INTERESTED,
        },
      }),

      prisma.contact.count({
        where: {
          userId,
          status: ContactStatus.CONVERTED,
        },
      }),

      prisma.contact.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
        take: 5,
        select: {
          id: true,
          firstName: true,
          lastName: true,
          company: true,
          status: true,
        },
      }),
    ]);

  const pipeline = await prisma.contact.groupBy({
    by: ["status"],
    where: { userId },
    _count: {
      _all: true,
    },
  });

  const pipelineCounts = {
    NEW: 0,
    CONTACTED: 0,
    INTERESTED: 0,
    CONVERTED: 0,
  };

  for (const stage of pipeline) {
    pipelineCounts[stage.status] = stage._count._all;
  }
  return (
    <PageTransition>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Overview of your customer relationships.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Contacts"
            value={String(totalContacts)}
            description="All contacts"
          />

          <StatCard
            title="New Leads"
            value={String(newLeads)}
            description="Added this month"
          />

          <StatCard
            title="Interested"
            value={String(interested)}
            description="Potential customers"
          />

          <StatCard
            title="Converted"
            value={String(converted)}
            description="Successful conversions"
          />
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <RecentContacts contacts={recentContacts} />
          <PipelineOverview counts={pipelineCounts} />
        </div>
      </div>
    </PageTransition>
  );
}
