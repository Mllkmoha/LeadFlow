import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

function csvCell(value: unknown): string {
  const text = value === null || value === undefined ? "" : String(value);
  // Prevent CSV/Excel formula injection
  const safe = /^[=+\-@\t\r]/.test(text) ? `'${text}` : text;
  return `"${safe.replace(/"/g, '""')}"`;
}

function toCsv(headers: string[], rows: unknown[][]): string {
  return [headers, ...rows]
    .map((row) => row.map(csvCell).join(","))
    .join("\r\n");
}

export async function GET() {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const contacts = await prisma.contact.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
      include: { activities: { orderBy: { createdAt: "desc" } } },
    });

    const contactsCsv = toCsv(
      [
        "First name",
        "Last name",
        "Email",
        "Phone",
        "Company",
        "Position",
        "Status",
        "Source",
        "Created",
      ],
      contacts.map((c) => [
        c.firstName,
        c.lastName,
        c.email,
        c.phone,
        c.company,
        c.position,
        c.status,
        c.source,
        c.createdAt.toISOString(),
      ]),
    );

    const activitiesCsv = toCsv(
      [
        "Contact",
        "Type",
        "Title",
        "Description",
        "Due date",
        "Completed",
        "Created",
      ],
      contacts.flatMap((c) =>
        c.activities.map((a) => [
          `${c.firstName} ${c.lastName}`,
          a.type,
          a.title,
          a.content,
          a.dueDate?.toISOString() ?? "",
          a.completed ? "yes" : "no",
          a.createdAt.toISOString(),
        ]),
      ),
    );

    const body = `# Contacts\r\n${contactsCsv}\r\n\r\n# Activities\r\n${activitiesCsv}\r\n`;
    const date = new Date().toISOString().slice(0, 10);

    return new NextResponse("\uFEFF" + body, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="leadflow-export-${date}.csv"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("EXPORT ERROR:", error);

    return NextResponse.json(
      { error: "Failed to export data" },
      { status: 500 },
    );
  }
}
