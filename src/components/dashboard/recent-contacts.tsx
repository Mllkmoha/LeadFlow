import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ContactStatus } from "@/../generated/prisma/client";

type RecentContact = {
  id: string;
  firstName: string;
  lastName: string;
  company: string | null;
  status: ContactStatus;
};

type RecentContactsProps = {
  contacts: RecentContact[];
};

export function RecentContacts({ contacts }: RecentContactsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Contacts</CardTitle>
      </CardHeader>

      <CardContent>
        {contacts.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No contacts yet.
          </p>
        ) : (
          <div className="space-y-4">
            {contacts.map((contact) => (
              <div
                key={contact.id}
                className="flex items-center justify-between"
              >
                <div>
                  <Link
                    href={`/contacts/${contact.id}`}
                    className="font-medium hover:underline"
                  >
                    {contact.firstName} {contact.lastName}
                  </Link>

                  <p className="text-sm text-muted-foreground">
                    {contact.company || "No company"}
                  </p>
                </div>

                <span className="text-sm text-muted-foreground">
                  {contact.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}