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

  const now = new Date();

  const startOfToday = new Date(now);
  startOfToday.setHours(0, 0, 0, 0);

  const startOfTomorrow = new Date(startOfToday);
  startOfTomorrow.setDate(startOfTomorrow.getDate() + 1);

  const [overdueActivities, dueTodayActivities, upcomingActivities] =
    await Promise.all([
      prisma.activity.count({
        where: {
          contact: { userId },
          completed: false,
          dueDate: { lt: startOfToday },
        },
      }),

      prisma.activity.count({
        where: {
          contact: { userId },
          completed: false,
          dueDate: {
            gte: startOfToday,
            lt: startOfTomorrow,
          },
        },
      }),

      prisma.activity.count({
        where: {
          contact: { userId },
          completed: false,
          dueDate: { gte: startOfTomorrow },
        },
      }),
    ]);

  const recentActivities = await prisma.activity.findMany({
    where: {
      contact: {
        userId,
      },
    },
    include: {
      contact: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
  });

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
        <div className="grid gap-4 md:grid-cols-3">
          <StatCard
            title="Overdue"
            value={String(overdueActivities)}
            description="Past-due activities"
            href="/activities?filter=OVERDUE"
          />

          <StatCard
            title="Due Today"
            value={String(dueTodayActivities)}
            description="Activities due today"
            href="/activities?filter=TODAY"
          />

          <StatCard
            title="Upcoming"
            value={String(upcomingActivities)}
            description="Future activities"
            href="/activities?filter=UPCOMING"
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <RecentContacts contacts={recentContacts} />
          <PipelineOverview counts={pipelineCounts} />
        </div>

        <section className="overflow-hidden rounded-xl border bg-card">
          <div className="border-b p-5">
            <h2 className="font-semibold">Recent Activities</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Your latest customer-related activities.
            </p>
          </div>

          {recentActivities.length === 0 ? (
            <p className="p-5 text-sm text-muted-foreground">
              No activities yet. Create an activity to see it here.
            </p>
          ) : (
            <div className="divide-y">
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex flex-col gap-2 p-5 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="min-w-0">
                    <p className="truncate font-medium">{activity.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {activity.contact.firstName} {activity.contact.lastName}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                        activity.completed
                          ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
                          : "bg-amber-500/10 text-amber-700 dark:text-amber-400"
                      }`}
                    >
                      {activity.completed ? "Completed" : "Pending"}
                    </span>

                    <span className="whitespace-nowrap text-xs text-muted-foreground">
                      {new Intl.DateTimeFormat("en", {
                        month: "short",
                        day: "numeric",
                      }).format(activity.createdAt)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </PageTransition>
  );
}
