"use client";

import { createContext, useContext, ReactNode } from "react";
import { useOrder } from "@/hooks/useOrder";
import type { OrderWithDetails } from "@/hooks/useOrder";
import type { OrderUpdateForm } from "@/lib/schemas/order-schema";

interface ContextProps {
  children: ReactNode;
}

interface OrderContextType {
  orders: OrderWithDetails[];
  loading: boolean;
  error: string | null;
  updateOrder: (updatedOrder: OrderUpdateForm) => Promise<void>;
  deleteOrder: (id: string) => Promise<void>;
  findOrder: (
    getOrderId: string
  ) => Promise<OrderWithDetails | null | undefined>;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: ContextProps) {
  const { orders, loading, error, updateOrder, deleteOrder, findOrder } =
    useOrder();

  return (
    <OrderContext.Provider
      value={{
        orders,
        loading,
        error,
        updateOrder,
        deleteOrder,
        findOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrderContext() {
  try {
    const context = useContext(OrderContext);

    if (!context) {
      throw new Error(
        "useOrderContext deve ser usado dentro de um OrderProvider"
      );
    }

    return context;
  } catch (error) {
    throw new Error(String(error));
  }
}
