"use client";

import { createContext, useContext, ReactNode } from "react";
import type { Product } from "@prisma/client";
import { ProductUpdateForm } from "@/lib/schemas/product-schema";
import { useStoreProduct } from "@/hooks/use-store-product";

interface ContextProps {
  children: ReactNode;
}

interface StoreProductContextType {
  products: Product[];
  loading: boolean;
  error: string | null;
  updateProduct: (updatedProduct: ProductUpdateForm) => Promise<void>;
  findProduct: (getProductId: string) => Promise<Product | null | undefined>;
}

const StoreProductContext = createContext<StoreProductContextType | undefined>(
  undefined
);

export function StoreProductProvider({ children }: ContextProps) {
  const { products, loading, error, updateProduct, findProduct } =
    useStoreProduct();

  return (
    <StoreProductContext.Provider
      value={{
        products,
        loading,
        error,
        updateProduct,
        findProduct,
      }}
    >
      {children}
    </StoreProductContext.Provider>
  );
}

export function useProductContext() {
  try {
    const context = useContext(StoreProductContext);

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
