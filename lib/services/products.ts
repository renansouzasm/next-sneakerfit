import { apiClient } from "./api-client";
import { Product } from "@/app.types";

export async function getProducts(): Promise<Product[]> {
  return apiClient<Product[]>("products");
}

export async function getEmployeeById(id: string): Promise<Product> {
  return apiClient<Product>(`products/${id}`);
}

export async function createEmployee(data: Partial<Product>) {
  return apiClient<Product>("products", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateEmployee(id: string, data: Partial<Product>) {
  return apiClient<Product>(`products/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function deleteEmployee(id: string) {
  return apiClient<{ message: string }>(`products/${id}`, {
    method: "DELETE",
  });
}
