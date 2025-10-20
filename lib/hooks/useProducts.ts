import { useFetch } from "./useFetch";
import { getProducts } from "../services/products";
import { Product } from "@/app.types";

export function useProducts() {
  const { data, loading, error } = useFetch<Product[]>(getProducts);

  return {
    products: data ?? [],
    loading,
    error,
  };
}
