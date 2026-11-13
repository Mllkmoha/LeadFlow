import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const query = new URL(request.url).searchParams.get("q")?.trim() ?? "";

  if (query.length < 2) {
    return NextResponse.json({ contacts: [], activities: [] });
  }

  try {
    const [contacts, activities] = await Promise.all([
      prisma.contact.findMany({
        where: {
          userId: session.user.id,
          OR: [
            { firstName: { contains: query, mode: "insensitive" } },
            { lastName: { contains: query, mode: "insensitive" } },
            { email: { contains: query, mode: "insensitive" } },
            { company: { contains: query, mode: "insensitive" } },
          ],
        },
        select: { id: true, firstName: true, lastName: true, company: true },
        take: 5,
      }),
      prisma.activity.findMany({
        where: {
          contact: { userId: session.user.id },
          title: { contains: query, mode: "insensitive" },
        },
        select: { id: true, title: true, completed: true },
        take: 5,
      }),
    ]);

    return NextResponse.json({ contacts, activities });
  } catch (error) {
    console.error("SEARCH ERROR:", error);
    return NextResponse.json({ error: "Search failed" }, { status: 500 });
  }
}
