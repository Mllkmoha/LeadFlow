import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { updateContactSchema } from "@/lib/validations/contact";

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

    const contact = await prisma.contact.findFirst({
      where: {
        id,
        userId: session.user.id,
      },
    });

    if (!contact) {
      return NextResponse.json({ error: "Contact not found" }, { status: 404 });
    }

    return NextResponse.json(contact);
  } catch (error) {
    console.error("GET CONTACT ERROR:", error);

    return NextResponse.json(
      { error: "Failed to fetch contact" },
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

    const result = updateContactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          error: "Invalid contact data",
          details: result.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const existingContact = await prisma.contact.findFirst({
      where: {
        id,
        userId: session.user.id,
      },
    });

    if (!existingContact) {
      return NextResponse.json({ error: "Contact not found" }, { status: 404 });
    }

    const contact = await prisma.contact.update({
      where: {
        id,
      },
      data: result.data,
    });

    return NextResponse.json(contact);
  } catch (error) {
    console.error("UPDATE CONTACT ERROR:", error);

    return NextResponse.json(
      { error: "Failed to update contact" },
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

    const existingContact = await prisma.contact.findFirst({
      where: {
        id,
        userId: session.user.id,
      },
    });

    if (!existingContact) {
      return NextResponse.json({ error: "Contact not found" }, { status: 404 });
    }

    await prisma.contact.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({ message: "Contact deleted successfully" });
  } catch (error) {
    console.error("DELETE CONTACT ERROR:", error);

    return NextResponse.json(
      { error: "Failed to delete contact" },
      { status: 500 },
    );
  }
}
