import { apiClient } from "./api-client";
import { Customer } from "@/app.types";

export async function getCustomers(): Promise<Customer[]> {
  return apiClient<Customer[]>("customers");
}

export async function getCustomerById(id: string): Promise<Customer> {
  return apiClient<Customer>(`customers/${id}`);
}

export async function createCustomer(data: Partial<Customer>) {
  return apiClient<Customer>("customers", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateCustomer(id: string, data: Partial<Customer>) {
  return apiClient<Customer>(`customers/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function deleteCustomer(id: string) {
  return apiClient<{ message: string }>(`customers/${id}`, {
    method: "DELETE",
  });
}
