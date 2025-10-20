import { apiClient } from "./api-client";
import { Employee } from "@/app.types";

export async function getEmployees(): Promise<Employee[]> {
  return apiClient<Employee[]>("employees");
}

export async function getEmployeeById(id: string): Promise<Employee> {
  return apiClient<Employee>(`employees/${id}`);
}

export async function createEmployee(data: Partial<Employee>) {
  return apiClient<Employee>("employees", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateEmployee(id: string, data: Partial<Employee>) {
  return apiClient<Employee>(`employees/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function deleteEmployee(id: string) {
  return apiClient<{ message: string }>(`employees/${id}`, {
    method: "DELETE",
  });
}
