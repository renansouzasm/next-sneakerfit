"use client";

import { createContext, useContext, ReactNode } from "react";
import { useProduct } from "@/hooks/use-product";
import type { Product } from "@prisma/client";
import {
  ProductCreateForm,
  ProductUpdateForm,
} from "@/lib/schemas/product-schema";

interface ContextProps {
  children: ReactNode;
}

interface ProductContextType {
  products: Product[];
  loading: boolean;
  error: string | null;
  createProduct: (newProduct: ProductCreateForm) => Promise<void>;
  updateProduct: (updatedProduct: ProductUpdateForm) => Promise<void>;
  deleteProduct: (deleteId: string) => Promise<void>;
  findProduct: (getProductId: string) => Promise<Product | null | undefined>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: ContextProps) {
  const {
    products,
    loading,
    error,
    createProduct,
    updateProduct,
    deleteProduct,
    findProduct,
  } = useProduct();

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        error,
        createProduct,
        updateProduct,
        deleteProduct,
        findProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProductContext() {
  try {
    const context = useContext(ProductContext);

    if (!context) {
      throw new Error(
        "useProductContext deve ser usado dentro de um ProductProvider"
      );
    }

    return context;
  } catch (error) {
    throw new Error(String(error));
  }
}
