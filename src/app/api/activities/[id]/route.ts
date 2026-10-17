import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { updateActivitySchema } from "@/lib/validations/activity";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: Request, { params }: RouteContext) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;

    const activity = await prisma.activity.findFirst({
      where: {
        id,
        contact: {
          userId: session.user.id,
        },
      },
    });

    if (!activity) {
      return NextResponse.json(
        { error: "Activity not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(activity);
  } catch (error) {
    console.error("GET ACTIVITY ERROR:", error);

    return NextResponse.json(
      { error: "Failed to load activity" },
      { status: 500 },
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await request.json();
    const result = updateActivitySchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid activity data", details: result.error.flatten() },
        { status: 400 },
      );
    }

    if (result.data.contactId) {
      const contact = await prisma.contact.findFirst({
        where: {
          id: result.data.contactId,
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
    }

    const activity = await prisma.activity.findFirst({
      where: {
        id,
        contact: {
          userId: session.user.id,
        },
      },
      select: {
        id: true,
      },
    });

    if (!activity) {
      return NextResponse.json(
        { error: "Activity not found" },
        { status: 404 },
      );
    }

    const updatedActivity = await prisma.activity.update({
      where: {
        id: activity.id,
      },
      data: {
        ...result.data,
        dueDate: result.data.dueDate
          ? new Date(result.data.dueDate)
          : result.data.dueDate === ""
            ? null
            : undefined,
      },
    });

    return NextResponse.json(updatedActivity);
  } catch (error) {
    console.error("UPDATE ACTIVITY ERROR:", error);

    return NextResponse.json(
      { error: "Failed to update activity" },
      { status: 500 },
    );
  }
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;

    const activity = await prisma.activity.findFirst({
      where: {
        id,
        contact: {
          userId: session.user.id,
        },
      },
      select: {
        id: true,
      },
    });

    if (!activity) {
      return NextResponse.json(
        { error: "Activity not found" },
        { status: 404 },
      );
    }

    await prisma.activity.delete({
      where: {
        id: activity.id,
      },
    });

    return NextResponse.json({
      message: "Activity deleted successfully",
    });
  } catch (error) {
    console.error("DELETE ACTIVITY ERROR:", error);

    return NextResponse.json(
      { error: "Failed to delete activity" },
      { status: 500 },
    );
  }
}
