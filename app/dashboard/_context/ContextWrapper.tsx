"use client";

import { CustomerProvider } from "./CustomerContext";
import { EmployeeProvider } from "./EmployeeContext";
import { OrderProvider } from "./OrderContext";
import { ProductProvider } from "./ProductContext";
import { TaskProvider } from "./TaskContext";

interface ContextProps {
  children: React.ReactNode;
}

export function ContextWrapper({ children }: ContextProps) {
  return (
    <ProductProvider>
      <EmployeeProvider>
        <CustomerProvider>
          <OrderProvider>
            <TaskProvider>{children}</TaskProvider>
          </OrderProvider>
        </CustomerProvider>
      </EmployeeProvider>
    </ProductProvider>
  );
}
