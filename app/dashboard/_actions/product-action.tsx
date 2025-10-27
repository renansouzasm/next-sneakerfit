"use server";

import {
  productCreateSchema,
  ProductCreateForm,
  productUpdateSchema,
  ProductUpdateForm,
} from "@/lib/schemas/product-schema";
import { revalidatePath } from "next/cache";
import { Prisma, ProductStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";

const PRODUCTS_PATH = "/dashboard/employees";

function getNewStatus(stock: number): ProductStatus {
  if (stock <= 0) return ProductStatus.NO_STOCK;
  if (stock <= 5) return ProductStatus.LOW_STOCK;
  return ProductStatus.AVAILABLE;
}

export async function getProductsAction() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
    });
    return {
      data: products,
    };
  } catch (error) {
    return { error: String(error) };
  }
}

export async function getProductByIdAction(getProductId: string) {
  if (!getProductId) {
    return {
      error: "ID do produto não fornecido.",
    };
  }

  try {
    const product = await prisma.product.findUnique({
      where: {
        id: getProductId,
      },
    });
    return {
      data: product,
    };
  } catch (error) {
    return { error: String(error) };
  }
}

export async function createProductAction(formData: ProductCreateForm) {
  const validation = productCreateSchema.safeParse(formData);

  if (!validation.success) {
    return {
      error: validation.error.flatten().fieldErrors,
    };
  }

  const { name, brand, price, stock, thumbUrl } = validation.data;

  const newStatus = getNewStatus(stock);
  const priceInCents = Math.round(price * 100);

  try {
    const newProduct = await prisma.product.create({
      data: {
        name,
        brand,
        price: priceInCents,
        stock,
        status: newStatus,
        thumbUrl,
      },
    });

    revalidatePath(PRODUCTS_PATH);

    return {
      data: newProduct,
    };
  } catch (error) {
    return { error: String(error) };
  }
}

export async function updateProductAction(updatedData: ProductUpdateForm) {
  const validation = productUpdateSchema.safeParse(updatedData);

  if (!validation.success) {
    return {
      error: validation.error.flatten().fieldErrors,
    };
  }

  const { id: updateId, ...restOfData } = validation.data;

  const dataToUpdate: Prisma.ProductUpdateInput = {
    ...restOfData,
  };

  if (restOfData.price !== undefined) {
    dataToUpdate.price = Math.round(restOfData.price * 100);
  }

  if (restOfData.stock !== undefined) {
    dataToUpdate.status = getNewStatus(restOfData.stock);
  }

  try {
    const updatedProduct = await prisma.product.update({
      where: {
        id: updateId,
      },
      data: dataToUpdate,
    });

    revalidatePath(PRODUCTS_PATH);

    return {
      data: updatedProduct,
    };
  } catch (error) {
    return { error: String(error) };
  }
}

export async function deleteProductAction(deleteId: string) {
  if (!deleteId) {
    return {
      error: "ID do produto não fornecido.",
    };
  }

  try {
    await prisma.product.delete({
      where: {
        id: deleteId,
      },
    });

    revalidatePath(PRODUCTS_PATH);

    return { data: { message: "Produto deletado com sucesso!" } };
  } catch (error) {
    return { error: String(error) };
  }
}
