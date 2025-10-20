import { useFetch } from "./useFetch";
import { getCustomers } from "../services/customers";
import { Customer } from "@/app.types";

export function useCustomers() {
  const { data, loading, error } = useFetch<Customer[]>(getCustomers);

  return {
    customers: data ?? [],
    loading,
    error,
  };
}
