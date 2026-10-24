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
        <div>
          <Link
            href="/contacts"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            ← Back to contacts
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href={`/contacts/${contact.id}/edit`}
              className="rounded-lg border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
            >
              Edit
            </Link>

            <DeleteContactButton contactId={contact.id} />

            <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium">
              {contact.status}
            </span>
          </div>
        </div>

        <div className="rounded-xl border bg-card">
          <div className="border-b px-6 py-4">
            <h2 className="font-semibold">Contact information</h2>
          </div>

          <div className="grid gap-6 p-6 sm:grid-cols-2">
            <div>
              <p className="text-sm text-muted-foreground">First name</p>
              <p className="mt-1 font-medium">{contact.firstName}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Last name</p>
              <p className="mt-1 font-medium">{contact.lastName}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="mt-1 font-medium">{contact.email}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Phone</p>
              <p className="mt-1 font-medium">
                {contact.phone || "Not provided"}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Company</p>
              <p className="mt-1 font-medium">
                {contact.company || "Not provided"}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Position</p>
              <p className="mt-1 font-medium">
                {contact.position || "Not provided"}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Source</p>
              <p className="mt-1 font-medium">
                {contact.source || "Not provided"}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Created</p>
              <p className="mt-1 font-medium">
                {contact.createdAt.toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        <NotesSection contactId={contact.id} />
        <section className="overflow-hidden rounded-xl border bg-card">
          <div className="border-b p-5">
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
