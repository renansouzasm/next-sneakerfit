import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface ParamsProps {
  params: {
    id: string;
  };
}

export async function GET(_request: Request, { params }: ParamsProps) {
  try {
    const customer = await prisma.customer.findUnique({
      where: { id: params.id },
      include: {
        orders: {
          include: {
            products: {
              include: { product: true },
            },
          },
        },
      },
    });

    if (!customer) {
      return NextResponse.json(
        { error: "Customer not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(customer, { status: 200 });
  } catch (error) {
    console.error("GET /customers/[id] error:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: ParamsProps) {
  try {
    const body = await request.json();
    const { name, email, avatarUrl } = body;

    const customer = await prisma.customer.findUnique({
      where: { id: params.id },
    });

    if (!customer) {
      return NextResponse.json(
        { error: "Customer not found." },
        { status: 404 }
      );
    }

    if (email && email !== customer.email) {
      const emailExists = await prisma.customer.findUnique({
        where: { email },
      });
      if (emailExists) {
        return NextResponse.json(
          { error: "Another customer already uses this email." },
          { status: 409 }
        );
      }
    }

    const updatedCustomer = await prisma.customer.update({
      where: { id: params.id },
      data: {
        name: name ?? customer.name,
        email: email ?? customer.email,
        avatarUrl: avatarUrl ?? customer.avatarUrl,
      },
    });

    return NextResponse.json(updatedCustomer, { status: 200 });
  } catch (error) {
    console.error("PUT /customers/[id] error:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: ParamsProps) {
  try {
    const customer = await prisma.customer.findUnique({
      where: { id: params.id },
      include: {
        orders: true,
      },
    });

    if (!customer) {
      return NextResponse.json(
        { error: "Customer not found." },
        { status: 404 }
      );
    }

    await prisma.orderItem.deleteMany({
      where: {
        order: {
          customerId: params.id,
        },
      },
    });

    await prisma.order.deleteMany({
      where: { customerId: params.id },
    });

    await prisma.customer.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: "Customer deleted successfully." });
  } catch (error) {
    console.error("DELETE /customers/[id] error:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
