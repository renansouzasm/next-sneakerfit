import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { OrderItem } from "@/app.types";

enum OrderStatus {
  PROCESSING = "PROCESSING",
  COMPLETED = "COMPLETED",
  CANCELED = "CANCELED",
}

interface ParamsProps {
  params: {
    id: string;
  };
}

export async function GET(_request: Request, { params }: ParamsProps) {
  try {
    const order = await prisma.order.findUnique({
      where: { id: params.id },
      include: {
        customer: true,
        products: {
          include: { product: true },
        },
      },
    });

    if (!order)
      return NextResponse.json({ error: "Order not found." }, { status: 404 });

    return NextResponse.json(order, { status: 200 });
  } catch (error) {
    console.error("GET /orders/[id] error:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: ParamsProps) {
  try {
    const body = await request.json();
    const { status, products } = body;

    const order = await prisma.order.findUnique({
      where: { id: params.id },
      include: { products: true },
    });

    if (!order)
      return NextResponse.json({ error: "Order not found." }, { status: 404 });

    const statusFormat = status ? status.toUpperCase() : order.status;

    if (!(statusFormat in OrderStatus)) {
      return NextResponse.json(
        { error: "Invalid status. Must be PROCESSING, COMPLETED or CANCELED." },
        { status: 400 }
      );
    }

    if (products && Array.isArray(products)) {
      await prisma.orderItem.deleteMany({
        where: { orderId: order.id },
      });

      await prisma.order.update({
        where: { id: order.id },
        data: {
          products: {
            create: products.map((p: OrderItem) => ({
              product: { connect: { id: p.productId } },
              quantity: p.quantity,
            })),
          },
        },
      });
    }

    const updatedOrder = await prisma.order.update({
      where: { id: order.id },
      data: {
        status: statusFormat,
      },
      include: {
        customer: true,
        products: { include: { product: true } },
      },
    });

    return NextResponse.json(updatedOrder, { status: 200 });
  } catch (error) {
    console.error("PUT /orders/[id] error:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: ParamsProps) {
  try {
    const order = await prisma.order.findUnique({
      where: { id: params.id },
      include: { products: true },
    });

    if (!order)
      return NextResponse.json({ error: "Order not found." }, { status: 404 });

    await prisma.orderItem.deleteMany({
      where: { orderId: order.id },
    });

    await prisma.order.delete({
      where: { id: order.id },
    });

    return NextResponse.json({ message: "Order deleted successfully." });
  } catch (error) {
    console.error("DELETE /orders/[id] error:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
