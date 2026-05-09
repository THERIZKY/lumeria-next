import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const content = await prisma.homepageContent.findMany();
    // Convert array of {key, value} to an object
    const data = content.reduce((acc, item) => {
      acc[item.key] = item.value;
      return acc;
    }, {} as Record<string, string>);
    
    return NextResponse.json(data);
  } catch (error) {
    console.error("Homepage API Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    
    // Use a transaction to update multiple keys
    const operations = Object.entries(body).map(([key, value]) => {
      return prisma.homepageContent.upsert({
        where: { key },
        update: { value: String(value) },
        create: { key, value: String(value) },
      });
    });

    await prisma.$transaction(operations);

    return NextResponse.json({ message: "Homepage content updated" });
  } catch (error) {
    console.error("Homepage API Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
