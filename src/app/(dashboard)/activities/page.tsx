import { ActivityCompletionButton } from "./activity-completion-button";
import { DeleteActivityButton } from "./delete-activity-button";
import { ActivityFilters } from "./activity-filters";
import { ActivitySearch } from "./activity-search";
import { ActivitySort } from "./activity-sort";

import Link from "next/link";
import {
  Activity as ActivityIcon,
  CalendarDays,
  CheckCircle2,
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

type ActivityFilter =
  | "ALL"
  | "PENDING"
  | "COMPLETED"
  | "OVERDUE"
  | "TODAY"
  | "UPCOMING";

type ActivitySortOption = "NEWEST" | "OLDEST" | "DUE_DATE" | "TITLE";

export default async function ActivitiesPage({
  searchParams,
}: {
  searchParams: Promise<{
    filter?: string;
    search?: string;
    sort?: string;
  }>;
}) {
  const {
    filter: requestedFilter,
    search: requestedSearch,
    sort: requestedSort,
  } = await searchParams;

  const search = requestedSearch?.trim().toLowerCase() ?? "";

  const validFilters: ActivityFilter[] = [
    "ALL",
    "PENDING",
    "COMPLETED",
    "OVERDUE",
    "TODAY",
    "UPCOMING",
  ];

  const activeFilter = validFilters.includes(requestedFilter as ActivityFilter)
    ? (requestedFilter as ActivityFilter)
    : "ALL";

  const validSorts: ActivitySortOption[] = [
    "NEWEST",
    "OLDEST",
    "DUE_DATE",
    "TITLE",
  ];

  const activeSort: ActivitySortOption = validSorts.includes(
    requestedSort as ActivitySortOption,
  )
    ? (requestedSort as ActivitySortOption)
    : "NEWEST";

  const session = await auth();

  if (!session?.user?.id) {
    return null;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const userWhere = {
    contact: {
      userId: session.user.id,
    },
  };

  const filterWhere = {
    ...(activeFilter === "PENDING" ? { completed: false } : {}),
    ...(activeFilter === "COMPLETED" ? { completed: true } : {}),
    ...(activeFilter === "OVERDUE"
      ? { completed: false, dueDate: { lt: today } }
      : {}),
    ...(activeFilter === "TODAY"
      ? { completed: false, dueDate: { gte: today, lt: tomorrow } }
      : {}),
    ...(activeFilter === "UPCOMING"
      ? { completed: false, dueDate: { gte: tomorrow } }
      : {}),
  };

  const searchWhere = search
    ? {
        OR: [
          { title: { contains: search, mode: "insensitive" as const } },
          { content: { contains: search, mode: "insensitive" as const } },
          {
            contact: {
              is: {
                firstName: {
                  contains: search,
                  mode: "insensitive" as const,
                },
              },
            },
          },
          {
            contact: {
              is: {
                lastName: {
                  contains: search,
                  mode: "insensitive" as const,
                },
              },
            },
          },
          {
            contact: {
              is: {
                company: {
                  contains: search,
                  mode: "insensitive" as const,
                },
              },
            },
          },
        ],
      }
    : {};

  const orderBy = {
    NEWEST: { createdAt: "desc" as const },
    OLDEST: { createdAt: "asc" as const },
    DUE_DATE: {
      dueDate: { sort: "asc" as const, nulls: "last" as const },
    },
    TITLE: { title: "asc" as const },
  }[activeSort];

  const [
    totalCount,
    pendingCount,
    completedCount,
    overdueCount,
    sortedActivities,
  ] = await Promise.all([
    prisma.activity.count({ where: userWhere }),
    prisma.activity.count({
      where: { ...userWhere, completed: false },
    }),
    prisma.activity.count({
      where: { ...userWhere, completed: true },
    }),
    prisma.activity.count({
      where: {
        ...userWhere,
        completed: false,
        dueDate: { lt: today },
      },
    }),
    prisma.activity.findMany({
      where: {
        ...userWhere,
        ...filterWhere,
        ...searchWhere,
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
      orderBy,
    }),
  ]);

  const dueTodayCount = await prisma.activity.count({
    where: {
      ...userWhere,
      completed: false,
      dueDate: { gte: today, lt: tomorrow },
    },
  });

  return (
    <PageTransition>
      <div className="space-y-6">
        <div className="flex items-center justify-between gap-3">
          <p className="min-w-0 text-sm text-muted-foreground sm:text-base">
            {pendingCount} pending · {completedCount} completed
          </p>

          <Link
            href="/activities/new"
            className="inline-flex min-h-11 shrink-0 items-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            + New
          </Link>
        </div>
        <div className="grid grid-cols-3 gap-2 sm:gap-4">
          <Link
            href="/activities?filter=OVERDUE"
            className={`rounded-xl border p-3 transition-colors sm:p-4 ${
              overdueCount > 0 ? "border-rose-500/40 bg-rose-500/5" : "bg-card"
            }`}
          >
            <p className="text-xs text-muted-foreground">Overdue</p>
            <p
              className={`mt-1 text-2xl font-bold tabular-nums ${
                overdueCount > 0 ? "text-rose-600 dark:text-rose-400" : ""
              }`}
            >
              {overdueCount}
            </p>
          </Link>

          <Link
            href="/activities?filter=TODAY"
            className={`rounded-xl border p-3 transition-colors sm:p-4 ${
              dueTodayCount > 0 ? "border-sky-500/40 bg-sky-500/5" : "bg-card"
            }`}
          >
            <p className="text-xs text-muted-foreground">Today</p>
            <p
              className={`mt-1 text-2xl font-bold tabular-nums ${
                dueTodayCount > 0 ? "text-sky-600 dark:text-sky-400" : ""
              }`}
            >
              {dueTodayCount}
            </p>
          </Link>

          <Link
            href="/activities?filter=PENDING"
            className="rounded-xl border bg-card p-3 transition-colors sm:p-4"
          >
            <p className="text-xs text-muted-foreground">Pending</p>
            <p className="mt-1 text-2xl font-bold tabular-nums">
              {pendingCount}
            </p>
          </Link>
        </div>

        <ActivityFilters value={activeFilter} />

        <div className="flex gap-2">
          <div className="min-w-0 flex-1">
            <ActivitySearch />
          </div>
          <ActivitySort value={activeSort} />
        </div>

        <section className="overflow-hidden rounded-xl border bg-card">
          <div className="border-b p-5">
            <h2 className="font-semibold">
              {activeFilter === "ALL"
                ? "All activities"
                : activeFilter.charAt(0) +
                  activeFilter.slice(1).toLowerCase() +
                  " activities"}
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Your latest customer-related activities.
            </p>
          </div>

          {sortedActivities.length === 0 ? (
            <div className="flex flex-col items-center px-6 py-16 text-center">
              <div className="mb-4 rounded-full bg-muted p-4">
                <ActivityIcon className="size-7 text-muted-foreground" />
              </div>

              <h3 className="font-semibold">
                {totalCount === 0
                  ? "No activities yet"
                  : search
                    ? "No activities match your search"
                    : "No activities match this filter"}
              </h3>

              <p className="text-sm text-muted-foreground">
                {totalCount === 0
                  ? "Activities associated with your contacts will appear here."
                  : search
                    ? "Try a different search term or adjust your status filter."
                    : "Try selecting another filter to see your activities."}
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
              {sortedActivities.map((activity) => {
                const Icon = activityIcons[activity.type];
                const label = activityLabels[activity.type];

                const isOverdue =
                  !activity.completed &&
                  !!activity.dueDate &&
                  activity.dueDate < today;
                const isToday =
                  !activity.completed &&
                  !!activity.dueDate &&
                  activity.dueDate >= today &&
                  activity.dueDate < tomorrow;

                return (
                  <div
                    key={activity.id}
                    className={`flex items-start gap-2 px-3 py-3 sm:gap-3 sm:px-5 sm:py-4 ${
                      isOverdue ? "bg-rose-500/5" : ""
                    }`}
                  >
                    <ActivityCompletionButton
                      activityId={activity.id}
                      completed={activity.completed}
                    />

                    <div className="min-w-0 flex-1 pt-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3
                          className={`font-medium ${
                            activity.completed
                              ? "text-muted-foreground line-through"
                              : ""
                          }`}
                        >
                          {activity.title}
                        </h3>
                        <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                          <Icon className="size-3" aria-hidden="true" />
                          {label}
                        </span>
                      </div>

                      {activity.content && (
                        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                          {activity.content}
                        </p>
                      )}

                      <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
                        {activity.dueDate && (
                          <span
                            className={`inline-flex items-center gap-1.5 ${
                              isOverdue
                                ? "font-medium text-rose-600 dark:text-rose-400"
                                : isToday
                                  ? "font-medium text-sky-600 dark:text-sky-400"
                                  : ""
                            }`}
                          >
                            {isOverdue ? (
                              <Clock3 className="size-4" />
                            ) : (
                              <CalendarDays className="size-4" />
                            )}
                            {isToday
                              ? "Today"
                              : activity.dueDate.toLocaleDateString("en-GB", {
                                  day: "numeric",
                                  month: "short",
                                })}
                          </span>
                        )}

                        <Link
                          href={`/contacts/${activity.contact.id}`}
                          className="truncate underline-offset-4 hover:text-foreground hover:underline"
                        >
                          {activity.contact.firstName}{" "}
                          {activity.contact.lastName}
                        </Link>
                      </div>

                      <div className="mt-3 flex items-center gap-2">
                        <Link
                          href={`/activities/${activity.id}/edit`}
                          className="inline-flex h-9 items-center rounded-lg border bg-background px-3 text-sm font-medium transition-colors hover:bg-muted"
                        >
                          Edit
                        </Link>
                        <DeleteActivityButton activityId={activity.id} />
                      </div>
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
