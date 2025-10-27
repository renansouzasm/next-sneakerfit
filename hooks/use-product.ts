"use client";

import { useEffect, useState } from "react";
import type { Product } from "@prisma/client";
import { displayErrorToast, displaySuccessToast } from "@/utils/displayToast";
import {
  createProductAction,
  deleteProductAction,
  getProductByIdAction,
  getProductsAction,
  updateProductAction,
} from "@/app/dashboard/_actions/product-action";
import type {
  ProductCreateForm,
  ProductUpdateForm,
} from "@/lib/schemas/product-schema";

interface UseProductType {
  products: Product[];
  loading: boolean;
  error: string | null;
  createProduct: (newProduct: ProductCreateForm) => Promise<void>;
  updateProduct: (updatedProduct: ProductUpdateForm) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  findProduct: (getProductId: string) => Promise<Product | null | undefined>;
}

export function useProduct(): UseProductType {
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

  async function createProduct(newProduct: ProductCreateForm): Promise<void> {
    const response = await createProductAction(newProduct);

    if (response.error) {
      const errorMessage =
        typeof response.error === "string"
          ? response.error
          : "Erro de validação. Verifique os campos.";
      displayErrorToast(errorMessage);
      setError(errorMessage);
    } else if (response.data) {
      setProducts((prevProducts) => [response.data, ...prevProducts]);
      displaySuccessToast("Produto criado com sucesso!");
    }
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

  async function deleteProduct(deleteId: string): Promise<void> {
    const response = await deleteProductAction(deleteId);

    if (response.error) {
      displayErrorToast(String(response.error));
      setError(String(response.error));
      return;
    }

    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== deleteId)
    );
    displaySuccessToast("Produto deletado com sucesso!");
  }

  return {
    products,
    loading,
    error,
    updateProduct,
    deleteProduct,
    createProduct,
    findProduct,
  };
}
