"use client";

import { useState } from "react";
import type { Product } from "@prisma/client";
import { displaySuccessToast } from "@/utils/displayToast";

interface CartProduct extends Product {
  quantity: number;
}

interface UseProductType {
  cartProducts: CartProduct[];
  addNewProduct: (newProduct: Product) => Promise<void>;
  increaseQuantity: (productId: string) => Promise<void>;
  decreaseQuantity: (productId: string) => Promise<void>;
}

export function useCart(): UseProductType {
  const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);

  async function addNewProduct(newProduct: Product): Promise<void> {
    setCartProducts((prev) => {
      const existing = prev.find((product) => product.id === newProduct.id);

      if (existing) {
        return prev.map((product) =>
          product.id === newProduct.id
            ? { ...product, quantity: product.quantity + 1 }
            : product
        );
      }

      return [...prev, { ...newProduct, quantity: 1 }];
    });

    displaySuccessToast("Produto adicionado ao carrinho com sucesso!");
  }

  async function increaseQuantity(productId: string): Promise<void> {
    setCartProducts((prev) => {
      return prev.map((product) =>
        product.id === productId
          ? { ...product, quantity: ++product.quantity }
          : product
      );
    });
  }

  async function decreaseQuantity(productId: string): Promise<void> {
    const cartItem = cartProducts.find((product) => product.id === productId);

    if (!cartItem) {
      return;
    }

    if (!(cartItem.quantity > 1)) {
      setCartProducts((prev) =>
        prev.filter((product) => product.id !== productId)
      );
      return;
    }

    setCartProducts((prev) => {
      return prev.map((product) =>
        product.id === productId
          ? { ...product, quantity: --product.quantity }
          : product
      );
    });
  }

  return {
    cartProducts,
    addNewProduct,
    increaseQuantity,
    decreaseQuantity,
  };
}
