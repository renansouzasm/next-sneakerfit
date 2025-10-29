"use client";

import { createContext, useContext, ReactNode } from "react";
import { Product } from "@prisma/client";
import { useCart } from "@/hooks/use-cart";

interface ContextProps {
  children: ReactNode;
}

interface CartProduct extends Product {
  quantity: number;
}

interface CartContextType {
  cartProducts: CartProduct[];
  addNewProduct: (newProduct: Product) => Promise<void>;
  increaseQuantity: (productId: string) => Promise<void>;
  decreaseQuantity: (productId: string) => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: ContextProps) {
  const { cartProducts, addNewProduct, increaseQuantity, decreaseQuantity } =
    useCart();

  return (
    <CartContext.Provider
      value={{
        cartProducts,
        addNewProduct,
        increaseQuantity,
        decreaseQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCartContext() {
  try {
    const context = useContext(CartContext);

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
