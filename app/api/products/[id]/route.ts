import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface ParamsPorps {
  params: {
    id: string;
  };
}

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

export async function GET(_request: Request, { params }: ParamsPorps) {
  try {
    const productId = params.id;
    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product) {
      return NextResponse.json(
        { error: "Product are not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: ParamsPorps) {
  try {
    const productId = params.id;
    const product = await prisma.product.findFirst({
      where: {
        id: productId,
      },
    });

    if (!product) {
      return NextResponse.json(
        { error: "Product are not found." },
        { status: 404 }
      );
    }

    const body = await request.json();
    const { name, brand, price, stock } = body;

    if (!name && !brand && !price && !stock) {
      return NextResponse.json(
        { error: "Missing properties are required." },
        { status: 400 }
      );
    }

    const priceInCents = Number(price) ? Number(price) : product.price;

    if (priceInCents && priceInCents <= 0) {
      return NextResponse.json(
        { error: "Price must be a positive number." },
        { status: 400 }
      );
    }

    const stockInNumber = Number(stock) ? Number(stock) : product.stock;

    if (stockInNumber && stockInNumber < 0) {
      return NextResponse.json(
        { error: "Stock must be a positive or neutral number." },
        { status: 400 }
      );
    }

    const status = getStatusFromStock(stockInNumber ?? product.stock);

    const newProductData = {
      name: name ?? product.name,
      brand: brand ?? product.brand,
      price: priceInCents,
      stock: stockInNumber,
      status: status,
    };

    const updateProduct = await prisma.product.update({
      where: {
        id: productId,
      },
      data: newProductData,
    });

    return NextResponse.json(updateProduct);
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: ParamsPorps) {
  try {
    const productId = params.id;
    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product) {
      return NextResponse.json(
        { error: "Product are not found." },
        { status: 404 }
      );
    }

    await prisma.product.delete({
      where: {
        id: productId,
      },
    });

    return NextResponse.json("Product deleted successfully.");
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
