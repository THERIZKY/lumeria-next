import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { src, caption, alt, sortOrder } = body;

    const galleryItem = await prisma.galleryItem.update({
      where: { id },
      data: {
        ...(src && { src }),
        ...(caption !== undefined && { caption }),
        ...(alt !== undefined && { alt }),
        ...(sortOrder !== undefined && { sortOrder }),
      },
    });

    return NextResponse.json(galleryItem);
  } catch (error) {
    console.error("Gallery API Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.galleryItem.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Gallery item deleted" });
  } catch (error) {
    console.error("Gallery API Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
