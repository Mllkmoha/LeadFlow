
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

const completionSchema = z.object({
  completed: z.boolean(),
});

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 },
    );
  }

  try {
    const { id } = await params;
    const body = await request.json();
    const result = completionSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid completion status" },
        { status: 400 },
      );
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
        completed: result.data.completed,
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
