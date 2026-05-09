import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const menuItems = await prisma.menuItem.findMany({
      include: {
        category: true,
      },
    });
    return NextResponse.json(menuItems);
  } catch (error) {
    console.error("Menu API Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, description, price, image, categoryId, rating, isActive } = body;

    if (!name || !price || !categoryId) {
      return NextResponse.json({ error: "Name, price, and categoryId are required" }, { status: 400 });
    }

    const menuItem = await prisma.menuItem.create({
      data: {
        name,
        description: description ?? "",
        price: Number(price),
        image: image ?? "",
        categoryId,
        rating: rating ? Number(rating) : 0,
        isActive: isActive ?? true,
      },
      include: {
        category: true,
      },
    });

    return NextResponse.json(menuItem, { status: 201 });
  } catch (error) {
    console.error("Menu API Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
