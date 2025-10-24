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
import { createSupabaseServerClient } from "@/lib/supabase/server";

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

    revalidatePath("/dashboard/products");

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
    const oldProduct = await prisma.product.findUnique({
      where: { id: updateId },
      select: { thumbUrl: true },
    });
    const oldUrl = oldProduct?.thumbUrl;
    const newUrl = restOfData.thumbUrl;

    const updatedProduct = await prisma.product.update({
      where: {
        id: updateId,
      },
      data: dataToUpdate,
    });

    if (oldUrl && newUrl && oldUrl !== newUrl) {
      const supabase = await createSupabaseServerClient();
      const oldPath = getPathFromUrl(oldUrl);
      if (oldPath) {
        await supabase.storage.from("product-thumbs").remove([oldPath]);
      }
    }
    revalidatePath("/dashboard/products");

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

  const supabase = await createSupabaseServerClient();

  try {
    const product = await prisma.product.findUnique({
      where: { id: deleteId },
      select: { thumbUrl: true },
    });

    await prisma.product.delete({
      where: {
        id: deleteId,
      },
    });

    if (product?.thumbUrl) {
      const filePath = getPathFromUrl(product.thumbUrl);

      if (filePath) {
        await supabase.storage.from("product-thumbs").remove([filePath]);
      }
    }

    revalidatePath("/dashboard/products");

    return { data: { message: "Produto deletado com sucesso!" } };
  } catch (error) {
    return { error: String(error) };
  }
}

function getPathFromUrl(url: string) {
  try {
    const { pathname } = new URL(url);
    const path = pathname.split("/product-thumbs/")[1];

    return path;
  } catch (error) {
    console.error("URL inválida:", error);
    return null;
  }
}
