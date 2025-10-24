"use client";

import { StoreProvider } from "./StoreContext";

interface StoreContextWrapperProps {
  children: React.ReactNode;
}

export function StoreContextWrapper({ children }: StoreContextWrapperProps) {
  return <StoreProvider>{children}</StoreProvider>;
}
