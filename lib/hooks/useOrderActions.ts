"use client";

import { useState } from "react";
import { Order, OrderStatus, OrderItem } from "@/app.types";

interface CreateOrderData {
  customerId: string;
  products: {
    productId: string;
    quantity: number;
  }[];
}

interface UpdateOrderData {
  status?: OrderStatus;
  products?: OrderItem[];
}

export function useOrderActions() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function createOrder(data: CreateOrderData): Promise<Order | null> {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error || "Erro ao criar pedido.");
      }

      const order: Order = await response.json();
      return order;
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Erro desconhecido.");
      return null;
    } finally {
      setLoading(false);
    }
  }

  async function updateOrder(
    id: string,
    data: UpdateOrderData
  ): Promise<Order | null> {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/orders/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error || "Erro ao atualizar pedido.");
      }

      const updatedOrder: Order = await response.json();
      return updatedOrder;
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Erro desconhecido.");
      return null;
    } finally {
      setLoading(false);
    }
  }

  async function deleteOrder(id: string): Promise<boolean> {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/orders/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error || "Erro ao excluir pedido.");
      }

      return true;
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Erro desconhecido.");
      return false;
    } finally {
      setLoading(false);
    }
  }

  return {
    createOrder,
    updateOrder,
    deleteOrder,
    loading,
    error,
  };
}
