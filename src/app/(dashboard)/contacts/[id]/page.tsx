import Link from "next/link";
import { notFound } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { PageTransition } from "@/components/layout/page-transition";

import { DeleteContactButton } from "./delete-contact-button";
import { NotesSection } from "./notes-section";

import { ActivityCompletionButton } from "../../activities/activity-completion-button";
import { DeleteActivityButton } from "../../activities/delete-activity-button";
import {
  Activity as ActivityIcon,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Mail,
  Phone,
  Users,
} from "lucide-react";

const avatarGradients = [
  "from-violet-500 to-indigo-500",
  "from-sky-500 to-cyan-400",
  "from-emerald-500 to-teal-400",
  "from-amber-500 to-orange-500",
  "from-rose-500 to-pink-500",
  "from-fuchsia-500 to-purple-500",
];

function gradientFor(id: string) {
  let hash = 0;
  for (const char of id) {
    hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  }
  return avatarGradients[hash % avatarGradients.length];
}

type ContactDetailsPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ContactDetailsPage({
  params,
}: ContactDetailsPageProps) {
  const session = await auth();

  if (!session?.user?.id) {
    notFound();
  }

  const { id } = await params;

  const contact = await prisma.contact.findFirst({
    where: {
      id,
      userId: session.user.id,
    },
    include: {
      activities: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!contact) {
    notFound();
  }

  return (
    <PageTransition>
      <div className="mx-auto max-w-3xl space-y-6">
        <div className="space-y-4">
          <Link
            href="/contacts"
            className="inline-flex min-h-11 items-center text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            ← Back to contacts
          </Link>

          <div className="flex items-center gap-4">
            <div
              className={`flex size-16 shrink-0 items-center justify-center rounded-full bg-linear-to-br ${gradientFor(contact.id)} text-xl font-semibold text-white shadow-md ring-4 ring-background sm:size-20 sm:text-2xl`}
            >
              {`${contact.firstName[0] ?? ""}${contact.lastName[0] ?? ""}`.toUpperCase()}
            </div>

            <div className="min-w-0">
              <h2 className="truncate text-xl font-semibold tracking-tight sm:text-2xl">
                {contact.firstName} {contact.lastName}
              </h2>

              <p className="truncate text-sm text-muted-foreground">
                {[contact.position, contact.company]
                  .filter(Boolean)
                  .join(" · ") || contact.email}
              </p>

              <span
                className={`mt-2 inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  {
                    NEW: "bg-sky-500/10 text-sky-700 dark:text-sky-400",
                    CONTACTED:
                      "bg-amber-500/10 text-amber-700 dark:text-amber-400",
                    INTERESTED:
                      "bg-violet-500/10 text-violet-700 dark:text-violet-400",
                    CONVERTED:
                      "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
                  }[contact.status] ?? "bg-muted"
                }`}
              >
                {contact.status.charAt(0) +
                  contact.status.slice(1).toLowerCase()}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Link
              href={`/contacts/${contact.id}/edit`}
              className="inline-flex h-11 items-center justify-center rounded-lg border text-sm font-medium transition-colors hover:bg-muted"
            >
              Edit
            </Link>

            <DeleteContactButton contactId={contact.id} />
          </div>
        </div>
        <div className="rounded-xl border bg-card">
          <div className="border-b px-4 py-3 sm:px-6 sm:py-4">
            <h2 className="font-semibold">Contact information</h2>
          </div>

          <dl className="grid grid-cols-2 gap-x-4 gap-y-5 p-4 sm:gap-6 sm:p-6">
            <div className="col-span-2 min-w-0">
              <dt className="text-xs text-muted-foreground sm:text-sm">
                Email
              </dt>
              <dd className="mt-1 truncate font-medium">
                <a
                  href={`mailto:${contact.email}`}
                  className="underline-offset-4 hover:underline"
                >
                  {contact.email}
                </a>
              </dd>
            </div>

            <div className="col-span-2 min-w-0">
              <dt className="text-xs text-muted-foreground sm:text-sm">
                Phone
              </dt>
              <dd className="mt-1 truncate font-medium">
                {contact.phone ? (
                  <a
                    href={`tel:${contact.phone}`}
                    className="underline-offset-4 hover:underline"
                  >
                    {contact.phone}
                  </a>
                ) : (
                  <span className="text-muted-foreground">Not provided</span>
                )}
              </dd>
            </div>

            <div className="min-w-0">
              <dt className="text-xs text-muted-foreground sm:text-sm">
                First name
              </dt>
              <dd className="mt-1 truncate font-medium">{contact.firstName}</dd>
            </div>

            <div className="min-w-0">
              <dt className="text-xs text-muted-foreground sm:text-sm">
                Last name
              </dt>
              <dd className="mt-1 truncate font-medium">{contact.lastName}</dd>
            </div>

            <div className="min-w-0">
              <dt className="text-xs text-muted-foreground sm:text-sm">
                Company
              </dt>
              <dd className="mt-1 truncate font-medium">
                {contact.company || (
                  <span className="text-muted-foreground">Not provided</span>
                )}
              </dd>
            </div>

            <div className="min-w-0">
              <dt className="text-xs text-muted-foreground sm:text-sm">
                Position
              </dt>
              <dd className="mt-1 truncate font-medium">
                {contact.position || (
                  <span className="text-muted-foreground">Not provided</span>
                )}
              </dd>
            </div>

            <div className="min-w-0">
              <dt className="text-xs text-muted-foreground sm:text-sm">
                Source
              </dt>
              <dd className="mt-1 truncate font-medium">
                {contact.source || (
                  <span className="text-muted-foreground">Not provided</span>
                )}
              </dd>
            </div>

            <div className="min-w-0">
              <dt className="text-xs text-muted-foreground sm:text-sm">
                Created
              </dt>
              <dd className="mt-1 truncate font-medium">
                {contact.createdAt.toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </dd>
            </div>
          </dl>
        </div>

        <NotesSection contactId={contact.id} />
        <section className="overflow-hidden rounded-xl border bg-card">
          <div className="border-b px-4 py-3 sm:px-6 sm:py-4">
            <h2 className="font-semibold">Activities</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Calls, emails, meetings, and tasks for this contact.
            </p>
          </div>

          {contact.activities.length === 0 ? (
            <div className="flex flex-col items-center px-6 py-12 text-center">
              <div className="mb-4 rounded-full bg-muted p-4">
                <ActivityIcon className="size-7 text-muted-foreground" />
              </div>

              <h3 className="font-semibold">No activities yet</h3>

              <p className="text-sm text-muted-foreground">
                Activities for this contact will appear here.
              </p>

              <Link
                href={`/activities/new?contactId=${contact.id}`}
                className="mt-5 text-sm font-medium underline underline-offset-4"
              >
                Add activity
              </Link>
            </div>
          ) : (
            <div className="divide-y">
              {contact.activities.map((activity) => {
                const Icon =
                  activity.type === "CALL"
                    ? Phone
                    : activity.type === "EMAIL"
                      ? Mail
                      : activity.type === "MEETING"
                        ? Users
                        : CheckCircle2;

                const label =
                  activity.type === "CALL"
                    ? "Call"
                    : activity.type === "EMAIL"
                      ? "Email"
                      : activity.type === "MEETING"
                        ? "Meeting"
                        : "Task";

                return (
                  <div
                    key={activity.id}
                    className="flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-6"
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

                        {activity.dueDate && (
                          <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
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
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex shrink-0 flex-wrap items-center gap-3">
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
