"use client";

import {
  createOrderAction,
  deleteOrderAction,
  getOrderByIdAction,
  getOrdersAction,
  updateOrderAction,
} from "@/app/dashboard/_actions/order-action";
import type {
  OrderCreateForm,
  OrderUpdateForm,
} from "@/lib/schemas/order-schema";
import { useEffect, useState } from "react";
import type { Order, Customer, OrderItem, Product } from "@prisma/client";
import { displayErrorToast, displaySuccessToast } from "@/utils/displayToast";

export type OrderWithSummary = Order & {
  customer: Customer | null;
  items: { id: string }[];
};

export type FullDetailedOrder = Order & {
  customer: Customer | null;
  items: (OrderItem & {
    product: Product | null;
  })[];
};

interface UseOrderType {
  orders: OrderWithSummary[];
  loading: boolean;
  error: string | null;
  createOrder: (newOrder: OrderCreateForm) => Promise<void>;
  updateOrder: (updatedOrder: OrderUpdateForm) => Promise<void>;
  deleteOrder: (id: string) => Promise<void>;
  findOrder: (
    getOrderId: string
  ) => Promise<FullDetailedOrder | null | undefined>;
}

export function useOrder(): UseOrderType {
  const [orders, setOrders] = useState<OrderWithSummary[]>([]);
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
        setOrders(response.data);
      }
      setLoading(false);
    }

    fetchOrders();
  }, []);

  async function findOrder(
    getOrderId: string
  ): Promise<FullDetailedOrder | null | undefined> {
    const response = await getOrderByIdAction(getOrderId);

    if (response.error) {
      displayErrorToast(String(response.error));
      setError(String(response.error));
      return undefined;
    }

    return response.data;
  }

  async function createOrder(newOrder: OrderCreateForm): Promise<void> {
    const response = await createOrderAction(newOrder);

    if (response.error) {
      const errorMessage =
        typeof response.error === "string"
          ? response.error
          : "Erro de validação. Verifique os campos.";
      displayErrorToast(errorMessage);
      setError(errorMessage);
    } else if (response.data) {
      const newOrderForList: OrderWithSummary = {
        ...response.data,
        items: response.data.items.map((item) => ({ id: item.id })),
      };

      setOrders((prevOrders) => [newOrderForList, ...prevOrders]);
      displaySuccessToast("Pedido criado com sucesso!");
    }
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
      const updatedOrderForList: OrderWithSummary = {
        ...response.data,
        items: response.data.items.map((item) => ({ id: item.id })),
      };

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === updatedOrderForList.id ? updatedOrderForList : order
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
    createOrder,
    findOrder,
  };
}
