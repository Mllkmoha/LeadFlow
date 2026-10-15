import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { contactSchema } from "@/lib/validations/contact";

export async function GET() {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const contacts = await prisma.contact.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(contacts);
  } catch (error) {
    console.error("GET CONTACTS ERROR:", error);

    return NextResponse.json(
      { error: "Failed to fetch contacts" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          error: "Invalid contact data",
          details: result.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const contact = await prisma.contact.create({
      data: {
        ...result.data,
        userId: session.user.id,
      },
    });

    return NextResponse.json(contact, { status: 201 });
  } catch (error) {
    console.error("CREATE CONTACT ERROR:", error);

    return NextResponse.json(
      { error: "Failed to create contact" },
      { status: 500 },
    );
  }
}
