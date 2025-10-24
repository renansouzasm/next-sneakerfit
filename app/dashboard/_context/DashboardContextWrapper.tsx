"use client";

import { ProductProvider } from "./ProductContext";
import { CustomerProvider } from "./CustomerContext";
import { OrderProvider } from "./OrderContext";

interface DashboardContextWrapperProps {
  children: React.ReactNode;
}

export function DashboardContextWrapper({
  children,
}: DashboardContextWrapperProps) {
  return (
    <ProductProvider>
      <CustomerProvider>
        <OrderProvider>{children}</OrderProvider>
      </CustomerProvider>
    </ProductProvider>
  );
}
