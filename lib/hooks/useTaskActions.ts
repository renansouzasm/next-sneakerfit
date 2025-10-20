"use client";

import { useState } from "react";
import { Task } from "@/app.types";

interface CreateTaskData {
  title: string;
  description?: string;
  dueDate: string;
  status: Task["status"];
  assignees?: string[];
}

type UpdateTaskData = Partial<CreateTaskData>;

export function useTaskActions() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function createTask(data: CreateTaskData): Promise<Task | null> {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error || "Erro ao criar tarefa.");
      }

      return await res.json();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido.");
      return null;
    } finally {
      setLoading(false);
    }
  }

  async function updateTask(
    id: string,
    data: UpdateTaskData
  ): Promise<Task | null> {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error || "Erro ao atualizar tarefa.");
      }

      return await res.json();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido.");
      return null;
    } finally {
      setLoading(false);
    }
  }

  async function deleteTask(id: string): Promise<boolean> {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/tasks/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error || "Erro ao excluir tarefa.");
      }
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido.");
      return false;
    } finally {
      setLoading(false);
    }
  }

  return { createTask, updateTask, deleteTask, loading, error };
}
