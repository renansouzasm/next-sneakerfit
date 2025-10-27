"use client";

import { ProductProvider } from "./ProductContext";

interface ContextProps {
  children: React.ReactNode;
}

export function ContextWrapper({ children }: ContextProps) {
  return <ProductProvider>{children}</ProductProvider>;
}
