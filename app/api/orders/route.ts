import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

enum OrderStatus {
  PROCESSING = "PROCESSING",
  COMPLETED = "COMPLETED",
  CANCELED = "CANCELED",
}

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      include: {
        customer: true,
        products: {
          include: { product: true },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    console.error("GET /orders error:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { customerId, products } = body;

    if (!customerId || !Array.isArray(products) || products.length === 0) {
      return NextResponse.json(
        { error: "customerId and at least one product are required." },
        { status: 400 }
      );
    }

    const customer = await prisma.customer.findUnique({
      where: { id: customerId },
    });

    if (!customer) {
      return NextResponse.json(
        { error: "Customer not found." },
        { status: 404 }
      );
    }

    let totalValue = 0;
    const orderItems = [];

    for (const item of products) {
      const { productId, quantity } = item;

      if (!productId || !quantity || quantity <= 0) {
        return NextResponse.json(
          { error: "Each product must have a valid productId and quantity." },
          { status: 400 }
        );
      }

      const product = await prisma.product.findUnique({
        where: { id: productId },
      });

      if (!product) {
        return NextResponse.json(
          { error: `Product with ID ${productId} not found.` },
          { status: 404 }
        );
      }

      const newStock = product.stock - quantity;
      await prisma.product.update({
        where: { id: productId },
        data: {
          stock: newStock >= 0 ? newStock : 0,
          status:
            newStock <= 0
              ? "NO_STOCK"
              : newStock < 6
              ? "LOW_STOCK"
              : "AVAILABLE",
        },
      });

      totalValue += product.price * quantity;
      orderItems.push({ productId, quantity });
    }

    const newOrder = await prisma.order.create({
      data: {
        customerId,
        totalValue,
        status: "PROCESSING",
        products: {
          create: orderItems,
        },
      },
      include: {
        customer: true,
        products: {
          include: { product: true },
        },
      },
    });

    return NextResponse.json(newOrder, { status: 201 });
  } catch (error) {
    console.error("POST /orders error:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
