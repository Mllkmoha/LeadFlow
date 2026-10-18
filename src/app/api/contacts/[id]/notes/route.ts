import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

type RouteContext = {
  params: Promise<{ id: string }>;
};

const noteSchema = z.object({
  content: z.string().trim().min(1, "Note content is required"),
});

export async function GET(_request: Request, { params }: RouteContext) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;

    const contact = await prisma.contact.findFirst({
      where: {
        id,
        userId: session.user.id,
      },
    });

    if (!contact) {
      return NextResponse.json({ error: "Contact not found" }, { status: 404 });
    }

    const notes = await prisma.note.findMany({
      where: {
        contactId: id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(notes);
  } catch (error) {
    console.error("GET NOTES ERROR:", error);

    return NextResponse.json(
      { error: "Failed to fetch notes" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request, { params }: RouteContext) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
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

    const contact = await prisma.contact.findFirst({
      where: {
        id,
        userId: session.user.id,
      },
    });

    if (!contact) {
      return NextResponse.json({ error: "Contact not found" }, { status: 404 });
    }

    const note = await prisma.note.create({
      data: {
        content: result.data.content,
        contactId: id,
      },
    });

    return NextResponse.json(note, { status: 201 });
  } catch (error) {
    console.error("CREATE NOTE ERROR:", error);

    return NextResponse.json(
      { error: "Failed to create note" },
      { status: 500 },
    );
  }
}

export async function PATCH(request: Request, { params }: RouteContext) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
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
        id,
        contact: {
          userId: session.user.id,
        },
      },
    });

    if (!note) {
      return NextResponse.json({ error: "Note not found" }, { status: 404 });
    }

    const updatedNote = await prisma.note.update({
      where: {
        id,
        contact: {
          userId: session.user.id,
        },
      },
      data: {
        content: result.data.content,
      },
    });

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
    const { id } = await params;

    const note = await prisma.note.findFirst({
      where: {
        id,
        contact: {
          userId: session.user.id,
        },
      },
    });

    if (!note) {
      return NextResponse.json({ error: "Note not found" }, { status: 404 });
    }

    await prisma.note.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({ message: "Note deleted successfully" });
  } catch (error) {
    console.error("DELETE NOTE ERROR:", error);

    return NextResponse.json(
      { error: "Failed to delete note" },
      { status: 500 },
    );
  }
}
