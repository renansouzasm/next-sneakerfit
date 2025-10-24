"use client";

import {
  createContext,
  useContext,
  ReactNode,
  useState,
  SetStateAction,
  Dispatch,
} from "react";
import { useProduct } from "@/hooks/useProduct";
import type { Product } from "@prisma/client";

interface ContextProps {
  children: ReactNode;
}

interface ProductContextType {
  products: Product[];
  loading: boolean;
  error: string | null;
  cartItems: Product[];
  setCartItems: Dispatch<SetStateAction<Product[]>>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: ContextProps) {
  const { products, loading, error } = useProduct();
  const [cartItems, setCartItems] = useState<Product[]>([]);

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        error,
        cartItems,
        setCartItems,
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
