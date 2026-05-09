import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        items: true,
      },
    });
    return NextResponse.json(orders);
  } catch (error) {
    console.error("Orders API Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { customerName, customerStatus, nim, kelas, pickupMethod, address, paymentMethod, totalAmount, items } = body;

    // Generate simple order number (YYMMDD-XXXX)
    const date = new Date();
    const dateStr = `${date.getFullYear().toString().slice(2)}${(date.getMonth() + 1).toString().padStart(2, "0")}${date.getDate().toString().padStart(2, "0")}`;
    const randomStr = Math.floor(1000 + Math.random() * 9000).toString();
    const orderNumber = `LUM-${dateStr}-${randomStr}`;

    // Calculate queue number if QR payment
    let queueNumber = null;
    if (paymentMethod === "qr") {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const count = await prisma.order.count({
        where: {
          createdAt: { gte: today },
          paymentMethod: "qr",
        },
      });
      queueNumber = count + 1;
    }

    const order = await prisma.order.create({
      data: {
        orderNumber,
        customerName,
        customerStatus: customerStatus ?? "umum",
        nim,
        kelas,
        pickupMethod: pickupMethod ?? "ambil",
        address,
        paymentMethod,
        totalAmount: Number(totalAmount),
        status: paymentMethod === "qr" ? "pending" : "pending", // Default to pending
        queueNumber,
        items: {
          create: items.map((item: any) => ({
            menuItemId: item.id,
            menuItemName: item.name,
            quantity: item.quantity,
            price: item.price,
            topping: item.topping,
          })),
        },
      },
      include: { items: true },
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error("Orders API Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
