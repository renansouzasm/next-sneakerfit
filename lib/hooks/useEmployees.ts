import { useFetch } from "./useFetch";
import { getEmployees } from "../services/employees";
import { Employee } from "@/app.types";

export function useEmployees() {
  const { data, loading, error } = useFetch<Employee[]>(getEmployees);

  return {
    employees: data ?? [],
    loading,
    error,
  };
}
