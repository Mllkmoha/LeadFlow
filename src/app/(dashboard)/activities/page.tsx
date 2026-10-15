import Link from "next/link";
import {
  Activity as ActivityIcon,
  CalendarDays,
  CheckCircle2,
  Circle,
  Clock3,
  Mail,
  Phone,
  Users,
} from "lucide-react";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { PageTransition } from "@/components/layout/page-transition";

const activityIcons = {
  CALL: Phone,
  EMAIL: Mail,
  MEETING: Users,
  TASK: CheckCircle2,
};

const activityLabels = {
  CALL: "Call",
  EMAIL: "Email",
  MEETING: "Meeting",
  TASK: "Task",
};

export default async function ActivitiesPage() {
  const session = await auth();

  if (!session?.user?.id) {
    return null;
  }

  const activities = await prisma.activity.findMany({
    where: {
      contact: {
        userId: session.user.id,
      },
    },
    include: {
      contact: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          company: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const completedCount = activities.filter(
    (activity) => activity.completed,
  ).length;

  const pendingCount = activities.length - completedCount;

  return (
    <PageTransition>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Activities
          </h1>
          <p className="mt-1 text-muted-foreground">
            Keep track of calls, emails, meetings, and tasks.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border bg-card p-5">
            <p className="text-sm text-muted-foreground">Total activities</p>
            <p className="mt-2 text-2xl font-semibold">{activities.length}</p>
          </div>

          <div className="rounded-xl border bg-card p-5">
            <p className="text-sm text-muted-foreground">Pending</p>
            <p className="mt-2 text-2xl font-semibold">{pendingCount}</p>
          </div>

          <div className="rounded-xl border bg-card p-5">
            <p className="text-sm text-muted-foreground">Completed</p>
            <p className="mt-2 text-2xl font-semibold">{completedCount}</p>
          </div>
        </div>

        <section className="overflow-hidden rounded-xl border bg-card">
          <div className="border-b p-5">
            <h2 className="font-semibold">All activities</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Your latest customer-related activities.
            </p>
          </div>

          {activities.length === 0 ? (
            <div className="flex flex-col items-center px-6 py-16 text-center">
              <div className="mb-4 rounded-full bg-muted p-4">
                <ActivityIcon className="size-7 text-muted-foreground" />
              </div>
              <h3 className="font-semibold">No activities yet</h3>
              <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                Activities associated with your contacts will appear here.
              </p>
              <Link
                href="/contacts"
                className="mt-5 text-sm font-medium underline underline-offset-4"
              >
                View contacts
              </Link>
            </div>
          ) : (
            <div className="divide-y">
              {activities.map((activity) => {
                const Icon = activityIcons[activity.type];
                const label = activityLabels[activity.type];

                return (
                  <div
                    key={activity.id}
                    className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex min-w-0 items-start gap-3">
                      <div className="rounded-lg bg-muted p-2.5">
                        <Icon className="size-5 text-muted-foreground" />
                      </div>

                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-medium">{activity.title}</h3>
                          <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs">
                            {label}
                          </span>
                        </div>

                        {activity.content && (
                          <p className="mt-1 text-sm text-muted-foreground">
                            {activity.content}
                          </p>
                        )}

                        <Link
                          href={`/contacts/${activity.contact.id}`}
                          className="mt-2 inline-block text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                        >
                          {activity.contact.firstName}{" "}
                          {activity.contact.lastName}
                          {activity.contact.company
                            ? ` · ${activity.contact.company}`
                            : ""}
                        </Link>
                      </div>
                    </div>

                    <div className="flex shrink-0 flex-wrap items-center gap-3 text-sm text-muted-foreground">
                      {activity.dueDate && (
                        <span className="flex items-center gap-1.5">
                          {activity.dueDate < new Date() &&
                          !activity.completed ? (
                            <Clock3 className="size-4" />
                          ) : (
                            <CalendarDays className="size-4" />
                          )}
                          {activity.dueDate.toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                      )}

                      <span
                        className={
                          activity.completed
                            ? "flex items-center gap-1.5 text-foreground"
                            : "flex items-center gap-1.5"
                        }
                      >
                        {activity.completed ? (
                          <CheckCircle2 className="size-4" />
                        ) : (
                          <Circle className="size-4" />
                        )}
                        {activity.completed ? "Completed" : "Pending"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </PageTransition>
  );
}
