"use client";

import {
  getProductByIdAction,
  getProductsAction,
  updateProductAction,
} from "@/app/dashboard/_actions/product-action";
import { useEffect, useState } from "react";
import type { Product } from "@prisma/client";
import { displayErrorToast, displaySuccessToast } from "@/utils/displayToast";
import type { ProductUpdateForm } from "@/lib/schemas/product-schema";

interface UseProductType {
  products: Product[];
  loading: boolean;
  error: string | null;
  updateProduct: (updatedProduct: ProductUpdateForm) => Promise<void>;
  findProduct: (getProductId: string) => Promise<Product | null | undefined>;
}

export function useStoreProduct(): UseProductType {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts(): Promise<void> {
      setLoading(true);
      setError(null);

      const response = await getProductsAction();

      if (!response.data) {
        setError(String(response.error));
        displayErrorToast(String(response.error));
      } else if (response.data) {
        setProducts(response.data);
      }
      setLoading(false);
    }

    fetchProducts();
  }, []);

  async function findProduct(
    getProductId: string
  ): Promise<Product | null | undefined> {
    const response = await getProductByIdAction(getProductId);

    if (response.error) {
      displayErrorToast(String(response.error));
      setError(String(response.error));
      return undefined;
    }

    return response.data;
  }

  async function updateProduct(updateData: ProductUpdateForm): Promise<void> {
    const response = await updateProductAction(updateData);

    if (response.error) {
      const errorMessage =
        typeof response.error === "string"
          ? response.error
          : "Erro de validação. Verifique os campos.";
      displayErrorToast(errorMessage);
      setError(errorMessage);
      return;
    } else if (response.data) {
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === response.data.id ? response.data : product
        )
      );
      displaySuccessToast("Produto atualizado com sucesso!");
    }
  }

  return {
    products,
    loading,
    error,
    updateProduct,
    findProduct,
  };
}
