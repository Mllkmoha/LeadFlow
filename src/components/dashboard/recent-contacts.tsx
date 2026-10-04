import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const contacts = [
  {
    name: "Sarah Johnson",
    company: "Acme Inc.",
    status: "Interested",
  },
  {
    name: "Michael Chen",
    company: "Nova Labs",
    status: "Contacted",
  },
  {
    name: "Emma Williams",
    company: "Vertex",
    status: "New",
  },
];

export function RecentContacts() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Contacts</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {contacts.map((contact) => (
            <div
              key={contact.name}
              className="flex items-center justify-between"
            >
              <div>
                <p className="font-medium">{contact.name}</p>
                <p className="text-sm text-muted-foreground">
                  {contact.company}
                </p>
              </div>

              <span className="text-sm text-muted-foreground">
                {contact.status}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}