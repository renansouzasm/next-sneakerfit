import { apiClient } from "./api-client";
import { Order } from "@/app.types";

export async function getOrders(): Promise<Order[]> {
  return apiClient<Order[]>("orders");
}

export async function getOrderById(id: string): Promise<Order> {
  return apiClient<Order>(`orders/${id}`);
}

export async function createOrder(data: Partial<Order>) {
  return apiClient<Order>("orders", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateOrder(id: string, data: Partial<Order>) {
  return apiClient<Order>(`orders/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function deleteOrder(id: string) {
  return apiClient<{ message: string }>(`orders/${id}`, {
    method: "DELETE",
  });
}
