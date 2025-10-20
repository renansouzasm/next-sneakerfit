import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

enum ProductStatus {
  AVAILABLE = "AVAILABLE",
  LOW_STOCK = "LOW_STOCK",
  NO_STOCK = "NO_STOCK",
}

function getStatusFromStock(stock: number): ProductStatus {
  if (stock === 0) return ProductStatus.NO_STOCK;
  if (stock < 6) return ProductStatus.LOW_STOCK;
  return ProductStatus.AVAILABLE;
}

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, brand, price, stock } = body;

    if (!name || !brand || !price) {
      return NextResponse.json(
        { error: "Missing properties are required." },
        { status: 400 }
      );
    }

    const priceInCents = Number(price);

    if (!priceInCents || priceInCents <= 0) {
      return NextResponse.json(
        { error: "Price must be a positive number." },
        { status: 400 }
      );
    }

    const stockInNumber = Number(stock) ? Number(stock) : 0;

    if (stockInNumber && stockInNumber < 0) {
      return NextResponse.json(
        { error: "Stock must be a positive or neutral number." },
        { status: 400 }
      );
    }

    const status = getStatusFromStock(stockInNumber);

    const newProduct = await prisma.product.create({
      data: {
        name,
        brand,
        price: priceInCents,
        stock: stockInNumber,
        status: status,
      },
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
