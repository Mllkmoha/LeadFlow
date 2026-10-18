import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

type RouteContext = {
  params: Promise<{
    id: string;
    noteId: string;
  }>;
};

const noteSchema = z.object({
  content: z.string().trim().min(1, "Note content is required"),
});

export async function PATCH(request: Request, { params }: RouteContext) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id, noteId } = await params;
    const body = await request.json();

    const result = noteSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          error: "Invalid note data",
          details: result.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const note = await prisma.note.findFirst({
      where: {
        id: noteId,
        contactId: id,
        contact: {
          userId: session.user.id,
        },
      },
    });

    if (!note) {
      return NextResponse.json({ error: "Note not found" }, { status: 404 });
    }

    const updatedNote = await prisma.note.updateMany({
      where: {
        id: noteId,
        contactId: id,
        contact: {
          userId: session.user.id,
        },
      },
      data: {
        content: result.data.content,
      },
    });

    if (updatedNote.count === 0) {
      return NextResponse.json({ error: "Note not found" }, { status: 404 });
    }

    return NextResponse.json(updatedNote);
  } catch (error) {
    console.error("UPDATE NOTE ERROR:", error);

    return NextResponse.json(
      { error: "Failed to update note" },
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
    const { id, noteId } = await params;

    const note = await prisma.note.findFirst({
      where: {
        id: noteId,
        contactId: id,
        contact: {
          userId: session.user.id,
        },
      },
    });

    if (!note) {
      return NextResponse.json({ error: "Note not found" }, { status: 404 });
    }

    const deletedNote = await prisma.note.deleteMany({
      where: {
        id: noteId,
        contactId: id,
        contact: {
          userId: session.user.id,
        },
      },
    });

    if (deletedNote.count === 0) {
      return NextResponse.json({ error: "Note not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Note deleted successfully",
    });
  } catch (error) {
    console.error("DELETE NOTE ERROR:", error);

    return NextResponse.json(
      { error: "Failed to delete note" },
      { status: 500 },
    );
  }
}
