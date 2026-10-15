import Link from "next/link";
import { notFound } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { PageTransition } from "@/components/layout/page-transition";

import { DeleteContactButton } from "./delete-contact-button";
import { NotesSection } from "./notes-section";

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
      </div>
    </PageTransition>
  );
}
