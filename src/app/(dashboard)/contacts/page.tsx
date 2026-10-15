import Link from "next/link";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { ContactStatus } from "@/../generated/prisma/client";
import { PageTransition } from "@/components/layout/page-transition";

import { ContactsFilters } from "./contacts-filters";

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

      ...(status
        ? {
            status: status as ContactStatus,
          }
        : {}),
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <PageTransition>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Contacts</h1>
            <p className="text-muted-foreground">
              Manage your customer relationships.
            </p>
          </div>

          <Link
            href="/contacts/new"
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Add contact
          </Link>
        </div>

        <ContactsFilters />

        <div className="rounded-xl border bg-card p-6">
          {contacts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <h2 className="text-lg font-semibold">No contacts yet</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Add your first contact to get started.
              </p>

              <Link
                href="/contacts/new"
                className="mt-4 rounded-lg border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
              >
                Create your first contact
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {contacts.map((contact) => (
                <div
                  key={contact.id}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div>
                    <Link
                      href={`/contacts/${contact.id}`}
                      className="font-medium hover:underline"
                    >
                      {contact.firstName} {contact.lastName}
                    </Link>
                    <p className="text-sm text-muted-foreground">
                      {contact.email}
                    </p>
                  </div>

                  <span className="text-sm text-muted-foreground">
                    {contact.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
}
