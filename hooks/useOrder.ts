"use client";

import { useEffect, useState } from "react";
import { Customer, Order, OrderItem } from "@prisma/client";
import { displayErrorToast, displaySuccessToast } from "@/utils/displayToast";
import {
  deleteOrderAction,
  getOrderByIdAction,
  getOrdersAction,
  updateOrderAction,
} from "@/app/dashboard/orders/_actions/order-actions";
import type { OrderUpdateForm } from "@/lib/schemas/order-schema";

export type OrderWithDetails = Order & {
  customer: Customer | null;
  items: OrderItem[];
};

interface UseOrderType {
  orders: OrderWithDetails[];
  loading: boolean;
  error: string | null;
  updateOrder: (updatedOrder: OrderUpdateForm) => Promise<void>;
  deleteOrder: (id: string) => Promise<void>;
  findOrder: (
    getOrderId: string
  ) => Promise<OrderWithDetails | null | undefined>;
}

export function useOrder(): UseOrderType {
  const [orders, setOrders] = useState<OrderWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchOrders(): Promise<void> {
      setLoading(true);
      setError(null);

      const response = await getOrdersAction();

      if (!response.data) {
        setError(String(response.error));
        displayErrorToast(String(response.error));
      } else if (response.data) {
        setOrders(response.data as OrderWithDetails[]);
      }
      setLoading(false);
    }

    fetchOrders();
  }, []);

  async function findOrder(
    getOrderId: string
  ): Promise<OrderWithDetails | null | undefined> {
    const response = await getOrderByIdAction(getOrderId);

    if (response.error) {
      displayErrorToast(String(response.error));
      setError(String(response.error));
      return undefined;
    }

    return response.data as OrderWithDetails | null;
  }

  async function updateOrder(updateData: OrderUpdateForm): Promise<void> {
    const response = await updateOrderAction(updateData);

    if (response.error) {
      const errorMessage =
        typeof response.error === "string"
          ? response.error
          : "Erro de validação. Verifique os campos.";
      displayErrorToast(errorMessage);
      setError(errorMessage);
      return;
    } else if (response.data) {
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === response.data.id
            ? (response.data as OrderWithDetails)
            : order
        )
      );
      displaySuccessToast("Pedido atualizado com sucesso!");
    }
  }

  async function deleteOrder(deleteId: string): Promise<void> {
    const response = await deleteOrderAction(deleteId);

    if (response.error) {
      displayErrorToast(String(response.error));
      setError(String(response.error));
      return;
    }

    setOrders((prevOrders) =>
      prevOrders.filter((order) => order.id !== deleteId)
    );
    displaySuccessToast("Pedido deletado com sucesso!");
  }

  return {
    orders,
    loading,
    error,
    updateOrder,
    deleteOrder,
    findOrder,
  };
}
