import Link from "next/link";
import { notFound } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { EditContactForm } from "../edit-contact-form";

import { PageTransition } from "@/components/layout/page-transition";

type EditContactPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditContactPage({
  params,
}: EditContactPageProps) {
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
            href={`/contacts/${contact.id}`}
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            ← Back to contact
          </Link>

          <h1 className="mt-4 text-2xl font-semibold tracking-tight">
            Edit Contact
          </h1>

          <p className="text-muted-foreground">
            Update {contact.firstName} {contact.lastName}&apos;s information.
          </p>
        </div>

        <div className="rounded-xl border bg-card p-6">
          <EditContactForm contact={contact} />
        </div>
      </div>
    </PageTransition>
  );
}
