import { ChevronRight } from "lucide-react";

import Link from "next/link";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { ContactStatus } from "@/../generated/prisma/client";
import { PageTransition } from "@/components/layout/page-transition";

import { ContactsFilters } from "./contacts-filters";

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

const statusDots: Record<string, string> = {
  NEW: "bg-sky-500",
  CONTACTED: "bg-amber-500",
  INTERESTED: "bg-violet-500",
  CONVERTED: "bg-emerald-500",
};

type ContactsPageProps = {
  searchParams: Promise<{
    search?: string;
    status?: string;
  }>;
};

export default async function ContactsPage({
  searchParams,
}: ContactsPageProps) {
  const session = await auth();
  const { search, status } = await searchParams;

  if (!session?.user?.id) {
    return null;
  }

  const validStatuses = Object.values(ContactStatus);
  const selectedStatus = validStatuses.find(
    (validStatus) => validStatus === status,
  );

  const contacts = await prisma.contact.findMany({
    where: {
      userId: session.user.id,

      ...(search?.trim()
        ? {
            AND: search
              .trim()
              .split(/\s+/)
              .filter(Boolean)
              .map((term) => ({
                OR: [
                  {
                    firstName: {
                      contains: term,
                      mode: "insensitive",
                    },
                  },
                  {
                    lastName: {
                      contains: term,
                      mode: "insensitive",
                    },
                  },
                  {
                    email: {
                      contains: term,
                      mode: "insensitive",
                    },
                  },
                  {
                    company: {
                      contains: term,
                      mode: "insensitive",
                    },
                  },
                ],
              })),
          }
        : {}),

      ...(selectedStatus
        ? {
            status: selectedStatus,
          }
        : {}),
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <PageTransition>
      <div className="space-y-4 sm:space-y-6">
        <div className="flex items-center justify-between gap-3">
          <p className="min-w-0 text-sm text-muted-foreground sm:text-base">
            Manage your customer relationships.
          </p>

          <Link
            href="/contacts/new"
            className="inline-flex min-h-11 shrink-0 items-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Add contact
          </Link>
        </div>

        <ContactsFilters />

        <div className="overflow-hidden rounded-xl border bg-card">
          {contacts.length === 0 ? (
            <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
              <div className="flex size-12 items-center justify-center rounded-full bg-muted">
                <span className="text-xl">?</span>
              </div>

              <h2 className="mt-4 text-lg font-semibold">
                {search || status ? "No matching contacts" : "No contacts yet"}
              </h2>

              <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                {search || status
                  ? "Try changing your search or filters."
                  : "Add your first contact to start managing your relationships."}
              </p>

              {!search && !status && (
                <Link
                  href="/contacts/new"
                  className="mt-4 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
                >
                  Create your first contact
                </Link>
              )}
            </div>
          ) : (
            <div className="divide-y">
              {contacts.map((contact) => {
                const initials =
                  `${contact.firstName[0] ?? ""}${contact.lastName[0] ?? ""}`.toUpperCase();

                const statusStyles: Record<string, string> = {
                  NEW: "bg-sky-500/10 text-sky-700 dark:text-sky-400",
                  CONTACTED:
                    "bg-amber-500/10 text-amber-700 dark:text-amber-400",
                  INTERESTED:
                    "bg-violet-500/10 text-violet-700 dark:text-violet-400",
                  CONVERTED:
                    "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
                };

                return (
                  <div
                    key={contact.id}
                    className="group relative flex items-center gap-3 px-4 py-3.5 transition-colors hover:bg-muted/50 sm:gap-4 sm:px-5"
                  >
                    <div
                      className={`flex size-11 shrink-0 items-center justify-center rounded-full bg-linear-to-br ${gradientFor(contact.id)} text-sm font-semibold text-white shadow-sm ring-2 ring-background`}
                    >
                      {initials}
                    </div>

                    <div className="min-w-0 flex-1">
                      <Link
                        href={`/contacts/${contact.id}`}
                        className="block truncate font-medium after:absolute after:inset-0"
                      >
                        {contact.firstName} {contact.lastName}
                      </Link>

                      <p className="truncate text-sm text-muted-foreground">
                        {contact.email}
                      </p>

                      {contact.company && (
                        <p className="truncate text-xs text-muted-foreground/70">
                          {contact.company}
                        </p>
                      )}
                    </div>

                    <span
                      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
                        statusStyles[contact.status] ??
                        "bg-muted text-muted-foreground"
                      }`}
                    >
                      <span
                        className={`size-1.5 rounded-full ${statusDots[contact.status] ?? "bg-muted-foreground"}`}
                      />
                      {contact.status.charAt(0) +
                        contact.status.slice(1).toLowerCase()}
                    </span>

                    <ChevronRight
                      className="hidden size-4 shrink-0 text-muted-foreground/50 transition-transform group-hover:translate-x-0.5 sm:block"
                      aria-hidden="true"
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
}
