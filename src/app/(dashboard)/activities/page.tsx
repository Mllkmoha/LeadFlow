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

  const overdueCount = activities.filter(
    (activity) =>
      !activity.completed &&
      activity.dueDate !== null &&
      activity.dueDate < new Date(new Date().setHours(0, 0, 0, 0)),
  ).length;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const filteredActivities = activities.filter((activity) => {
    if (activeFilter === "PENDING" && activity.completed) return false;
    if (activeFilter === "COMPLETED" && !activity.completed) return false;

    if (
      activeFilter === "OVERDUE" &&
      (activity.completed ||
        activity.dueDate === null ||
        activity.dueDate >= today)
    ) {
      return false;
    }

    if (
      activeFilter === "TODAY" &&
      (activity.completed ||
        activity.dueDate === null ||
        activity.dueDate < today ||
        activity.dueDate >= tomorrow)
    ) {
      return false;
    }

    if (
      activeFilter === "UPCOMING" &&
      (activity.completed ||
        activity.dueDate === null ||
        activity.dueDate < tomorrow)
    ) {
      return false;
    }

    if (!search) return true;

    const searchableText = [
      activity.title,
      activity.content ?? "",
      activity.contact.firstName,
      activity.contact.lastName,
      activity.contact.company ?? "",
    ]
      .join(" ")
      .toLowerCase();

    return searchableText.includes(search);
  });

  const sortedActivities = [...filteredActivities].sort((a, b) => {
    switch (activeSort) {
      case "OLDEST":
        return a.createdAt.getTime() - b.createdAt.getTime();

      case "DUE_DATE":
        if (a.dueDate === null && b.dueDate === null) return 0;
        if (a.dueDate === null) return 1;
        if (b.dueDate === null) return -1;
        return a.dueDate.getTime() - b.dueDate.getTime();

      case "TITLE":
        return a.title.localeCompare(b.title);

      case "NEWEST":
      default:
        return b.createdAt.getTime() - a.createdAt.getTime();
    }
  });

  return (
    <PageTransition>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              Activities
            </h1>
            <p className="mt-1 text-muted-foreground">
              Keep track of calls, emails, meetings, and tasks.
            </p>
          </div>

          <Link
            href="/activities/new"
            className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            + New Activity
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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

          <div className="rounded-xl border bg-card p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Overdue</p>
              <Clock3 className="size-4 text-red-500" />
            </div>
            <p className="mt-2 text-2xl font-semibold">{overdueCount}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Pending activities past their due date
            </p>
          </div>
        </div>

        <ActivityFilters value={activeFilter} />
        <ActivitySearch />
        <ActivitySort value={activeSort} />

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
                {activities.length === 0
                  ? "No activities yet"
                  : search
                    ? "No activities match your search"
                    : "No activities match this filter"}
              </h3>

              <p className="text-sm text-muted-foreground">
                {activities.length === 0
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
                        <span
                          className={`flex items-center gap-1.5 ${
                            !activity.completed && activity.dueDate < today
                              ? "font-medium text-red-600 dark:text-red-400"
                              : activity.dueDate >= today &&
                                  activity.dueDate < tomorrow
                                ? "font-medium text-blue-600 dark:text-blue-400"
                                : ""
                          }`}
                        >
                          {!activity.completed && activity.dueDate < today ? (
                            <Clock3 className="size-4" />
                          ) : (
                            <CalendarDays className="size-4" />
                          )}

                          {!activity.completed &&
                          activity.dueDate >= today &&
                          activity.dueDate < tomorrow
                            ? "Today"
                            : activity.dueDate.toLocaleDateString("en-GB", {
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

                      <Link
                        href={`/activities/${activity.id}/edit`}
                        className="inline-flex items-center justify-center rounded-lg border border-border bg-background px-3 py-1.5 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      >
                        Edit
                      </Link>

                      <ActivityCompletionButton
                        activityId={activity.id}
                        completed={activity.completed}
                      />

                      <DeleteActivityButton activityId={activity.id} />
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
