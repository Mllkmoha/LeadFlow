import Link from "next/link";

import { CheckCircle2, Clock } from "lucide-react";
import { StatCard } from "@/components/dashboard/stat-card";
import { RecentContacts } from "@/components/dashboard/recent-contacts";
import { PipelineOverview } from "@/components/dashboard/pipeline-overview";
import { PageTransition } from "@/components/layout/page-transition";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

function getTime() {
  return performance.now();
}

async function measureQuery<T>(
  name: string,
  query: () => Promise<T>,
): Promise<T> {
  const start = performance.now();

  try {
    return await query();
  } finally {
    console.log(
      `[Dashboard] ${name}: ${(performance.now() - start).toFixed(2)}ms`,
    );
  }
}

function getGreeting(date: Date) {
  const hour = date.getHours();

  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";

  return "Good evening";
}

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user?.id) {
    return null;
  }

  const userId = session.user.id;
  const firstName = session.user.name?.split(" ")[0] ?? "there";

  const now = new Date();

  const startOfToday = new Date(now);
  startOfToday.setHours(0, 0, 0, 0);

  const startOfTomorrow = new Date(startOfToday);
  startOfTomorrow.setDate(startOfTomorrow.getDate() + 1);

  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const queryStart = getTime();

  const [activityStats, recentActivities, contactStats, recentContacts] =
    await Promise.all([
      // 1. Activity statistics: 3 queries -> 1 query
      measureQuery(
        "Activity stats",
        () =>
          prisma.$queryRaw<
            {
              overdueActivities: bigint;
              dueTodayActivities: bigint;
              upcomingActivities: bigint;
            }[]
          >`
        SELECT
          COUNT(*) FILTER (
            WHERE a."completed" = false
            AND a."dueDate" < ${startOfToday}
          ) AS "overdueActivities",

          COUNT(*) FILTER (
            WHERE a."completed" = false
            AND a."dueDate" >= ${startOfToday}
            AND a."dueDate" < ${startOfTomorrow}
          ) AS "dueTodayActivities",

          COUNT(*) FILTER (
            WHERE a."completed" = false
            AND a."dueDate" >= ${startOfTomorrow}
          ) AS "upcomingActivities"

        FROM "Activity" a
        INNER JOIN "Contact" c
          ON c."id" = a."contactId"
        WHERE c."userId" = ${userId}
      `,
      ),

      // 2. Recent activities
      measureQuery("Recent activities", () =>
        prisma.activity.findMany({
          where: {
            contact: { userId },
          },
          select: {
            id: true,
            title: true,
            completed: true,
            createdAt: true,
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
        }),
      ),

      // 3. Contact statistics + pipeline: 5 queries -> 1 query
      measureQuery(
        "Contact stats",
        () =>
          prisma.$queryRaw<
            {
              totalContacts: bigint;
              newLeads: bigint;
              interested: bigint;
              converted: bigint;
              pipelineNew: bigint;
              pipelineContacted: bigint;
            }[]
          >`
        SELECT
          COUNT(*) AS "totalContacts",

          COUNT(*) FILTER (
            WHERE "status" = 'NEW'
            AND "createdAt" >= ${startOfMonth}
          ) AS "newLeads",

          COUNT(*) FILTER (
            WHERE "status" = 'INTERESTED'
          ) AS "interested",

          COUNT(*) FILTER (
            WHERE "status" = 'CONVERTED'
          ) AS "converted",

          COUNT(*) FILTER (
            WHERE "status" = 'NEW'
          ) AS "pipelineNew",

          COUNT(*) FILTER (
            WHERE "status" = 'CONTACTED'
          ) AS "pipelineContacted"

        FROM "Contact"
        WHERE "userId" = ${userId}
      `,
      ),

      // 4. Recent contacts
      measureQuery("Recent contacts", () =>
        prisma.contact.findMany({
          where: {
            userId,
          },
          orderBy: {
            createdAt: "desc",
          },
          take: 5,
          select: {
            id: true,
            firstName: true,
            lastName: true,
            company: true,
            status: true,
          },
        }),
      ),
    ]);

  console.log(
    `[Dashboard] Database queries: ${(getTime() - queryStart).toFixed(2)}ms`,
  );

  const activityData = activityStats[0];
  const contactData = contactStats[0];

  const overdueActivities = Number(activityData.overdueActivities);
  const dueTodayActivities = Number(activityData.dueTodayActivities);
  const upcomingActivities = Number(activityData.upcomingActivities);

  const totalContacts = Number(contactData.totalContacts);
  const newLeads = Number(contactData.newLeads);
  const interested = Number(contactData.interested);
  const converted = Number(contactData.converted);

  const pipelineCounts = {
    NEW: Number(contactData.pipelineNew),
    CONTACTED: Number(contactData.pipelineContacted),
    INTERESTED: interested,
    CONVERTED: converted,
  };


  return (
    <PageTransition>
      <div className="space-y-4 sm:space-y-6">
        <div className="space-y-1">
          <p className="text-xl font-semibold tracking-tight sm:text-3xl">
            {getGreeting(now)}, {firstName}
          </p>

          <p className="text-sm text-muted-foreground">
            {overdueActivities > 0
              ? `You have ${overdueActivities} overdue ${
                  overdueActivities === 1 ? "activity" : "activities"
                } to take care of.`
              : dueTodayActivities > 0
                ? `${dueTodayActivities} ${
                    dueTodayActivities === 1 ? "activity is" : "activities are"
                  } due today.`
                : "You're all caught up. Nice work."}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
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
            description="Potential leads"
          />

          <StatCard
            title="Converted"
            value={String(converted)}
            description="Won deals"
          />
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
          <StatCard
            title="Overdue"
            value={String(overdueActivities)}
            description="Past-due activities"
            href="/activities?filter=OVERDUE"
            highlight={overdueActivities > 0}
            actionLabel="Review overdue activities"
          />

          <StatCard
            title="Due Today"
            value={String(dueTodayActivities)}
            description="Due today"
            href="/activities?filter=TODAY"
            actionLabel="View today's schedule"
          />

          <div className="col-span-2 sm:col-span-1">
            <StatCard
              title="Upcoming"
              value={String(upcomingActivities)}
              description="Future activities"
              href="/activities?filter=UPCOMING"
              actionLabel="Explore upcoming activities"
            />
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <RecentContacts contacts={recentContacts} />
          <PipelineOverview counts={pipelineCounts} />
        </div>

        <section className="overflow-hidden rounded-xl border bg-card">
          <div className="border-b p-4 sm:p-5">
            <h2 className="font-semibold">Recent Activities</h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Your latest customer-related activities.
            </p>
          </div>

          {recentActivities.length === 0 ? (
            <p className="p-4 text-sm text-muted-foreground sm:p-5">
              No activities yet. Create an activity to see it here.
            </p>
          ) : (
            <div className="divide-y">
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex flex-col gap-2 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5"
                >
                  <div className="min-w-0">
                    <p className="truncate font-medium">{activity.title}</p>

                    <Link
                      href={`/contacts/${activity.contact.id}`}
                      className="mt-1 block text-sm text-muted-foreground transition-colors hover:text-primary hover:underline"
                    >
                      {activity.contact.firstName} {activity.contact.lastName}
                    </Link>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
                        activity.completed
                          ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
                          : "bg-amber-500/10 text-amber-700 dark:text-amber-400"
                      }`}
                    >
                      {activity.completed ? (
                        <CheckCircle2 className="size-3.5" aria-hidden="true" />
                      ) : (
                        <Clock className="size-3.5" aria-hidden="true" />
                      )}

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
