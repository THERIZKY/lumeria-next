import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { name, sortOrder } = body;

    const category = await prisma.category.update({
      where: { id },
      data: {
        name,
        sortOrder,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.error("Category API Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.category.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Category deleted" });
  } catch (error) {
    console.error("Category API Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
