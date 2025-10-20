import { useFetch } from "./useFetch";
import { getOrders } from "../services/orders";
import { Order } from "@/app.types";

export function useOrders() {
  const { data, loading, error } = useFetch<Order[]>(getOrders);

  return {
    orders: data ?? [],
    loading,
    error,
  };
}
