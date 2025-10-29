"use client";

import { CartProvider } from "./CartContext";
import { StoreProductProvider } from "./StoreProductContext";

interface ContextProps {
  children: React.ReactNode;
}

export function ContextWrapper({ children }: ContextProps) {
  return (
    <StoreProductProvider>
      <CartProvider>{children}</CartProvider>
    </StoreProductProvider>
  );
}
