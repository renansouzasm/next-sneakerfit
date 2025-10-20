import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const customers = await prisma.customer.findMany({
      include: {
        orders: {
          include: {
            products: {
              include: {
                product: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(customers, { status: 200 });
  } catch (error) {
    console.error("GET /customers error:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, avatarUrl } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required." },
        { status: 400 }
      );
    }

    const existingCustomer = await prisma.customer.findUnique({
      where: { email },
    });

    if (existingCustomer) {
      return NextResponse.json(
        { error: "Customer with this email already exists." },
        { status: 409 }
      );
    }

    const newCustomer = await prisma.customer.create({
      data: {
        name,
        email,
        avatarUrl,
      },
    });

    return NextResponse.json(newCustomer, { status: 201 });
  } catch (error) {
    console.error("POST /customers error:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
