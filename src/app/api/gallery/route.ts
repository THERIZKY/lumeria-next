import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const galleryItems = await prisma.galleryItem.findMany({
      orderBy: { sortOrder: "asc" },
    });
    return NextResponse.json(galleryItems);
  } catch (error) {
    console.error("Gallery API Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { src, caption, alt, sortOrder } = body;

    if (!src) {
      return NextResponse.json({ error: "Image src is required" }, { status: 400 });
    }

    const galleryItem = await prisma.galleryItem.create({
      data: {
        src,
        caption: caption ?? "",
        alt: alt ?? "",
        sortOrder: sortOrder ?? 0,
      },
    });

    return NextResponse.json(galleryItem, { status: 201 });
  } catch (error) {
    console.error("Gallery API Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
