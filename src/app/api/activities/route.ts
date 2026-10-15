
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { activitySchema } from "@/lib/validations/activity";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 },
    );
  }

  try {
    const body = await request.json();
    const result = activitySchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          error: "Invalid activity data",
          details: result.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const { contactId, title, type, content, dueDate } = result.data;

    const contact = await prisma.contact.findFirst({
      where: {
        id: contactId,
        userId: session.user.id,
      },
      select: {
        id: true,
      },
    });

    if (!contact) {
      return NextResponse.json(
        { error: "Contact not found" },
        { status: 404 },
      );
    }

    const activity = await prisma.activity.create({
      data: {
        type,
        title,
        content: content || null,
        dueDate: dueDate ? new Date(dueDate) : null,
        contactId: contact.id,
      },
    });

    return NextResponse.json(activity, { status: 201 });
  } catch (error) {
    console.error("CREATE ACTIVITY ERROR:", error);

    return NextResponse.json(
      { error: "Failed to create activity" },
      { status: 500 },
    );
  }
}
