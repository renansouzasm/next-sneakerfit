import { apiClient } from "./api-client";
import { Task } from "@/app.types";

export async function getTasks(): Promise<Task[]> {
  return apiClient<Task[]>("tasks");
}

export async function getTaskById(id: string): Promise<Task> {
  return apiClient<Task>(`tasks/${id}`);
}

export async function createTask(data: Partial<Task>) {
  return apiClient<Task>("tasks", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateTask(id: string, data: Partial<Task>) {
  return apiClient<Task>(`tasks/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function deleteTask(id: string) {
  return apiClient<{ message: string }>(`tasks/${id}`, { method: "DELETE" });
}
