"use client";

import {
  useOrder,
  OrderWithSummary,
  FullDetailedOrder,
} from "@/hooks/use-order";
import { createContext, useContext, ReactNode } from "react";
import { OrderCreateForm, OrderUpdateForm } from "@/lib/schemas/order-schema";

interface ContextProps {
  children: ReactNode;
}

interface OrderContextType {
  orders: OrderWithSummary[];
  loading: boolean;
  error: string | null;
  createOrder: (newOrder: OrderCreateForm) => Promise<void>;
  updateOrder: (updatedOrder: OrderUpdateForm) => Promise<void>;
  deleteOrder: (deleteId: string) => Promise<void>;
  findOrder: (
    getOrderId: string
  ) => Promise<FullDetailedOrder | null | undefined>;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: ContextProps) {
  const {
    orders,
    loading,
    error,
    createOrder,
    updateOrder,
    deleteOrder,
    findOrder,
  } = useOrder();

  return (
    <OrderContext.Provider
      value={{
        orders,
        loading,
        error,
        createOrder,
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
