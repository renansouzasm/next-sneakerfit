"use client";

import {
  createTaskAction,
  deleteTaskAction,
  getTaskByIdAction,
  getTasksAction,
  updateTaskAction,
} from "@/app/dashboard/_actions/task-action";
import { useEffect, useState } from "react";
import type { Task, TaskAssignment, Employee } from "@prisma/client";
import { displayErrorToast, displaySuccessToast } from "@/utils/displayToast";
import type { TaskCreateForm, TaskUpdateForm } from "@/lib/schemas/task-schema";

export type TaskWithAssignees = Task & {
  assignees: (TaskAssignment & {
    employee: Employee | null;
  })[];
};

export type FullDetailedTask = TaskWithAssignees;

interface UseTaskType {
  tasks: TaskWithAssignees[];
  loading: boolean;
  error: string | null;
  createTask: (newTask: TaskCreateForm) => Promise<void>;
  updateTask: (updatedTask: TaskUpdateForm) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  findTask: (getTaskId: string) => Promise<FullDetailedTask | null | undefined>;
}

export function useTask(): UseTaskType {
  const [tasks, setTasks] = useState<TaskWithAssignees[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTasks(): Promise<void> {
      setLoading(true);
      setError(null);

      const response = await getTasksAction();

      if (!response.data) {
        setError(String(response.error));
        displayErrorToast(String(response.error));
      } else if (response.data) {
        setTasks(response.data);
      }
      setLoading(false);
    }

    fetchTasks();
  }, []);

  async function findTask(
    getTaskId: string
  ): Promise<FullDetailedTask | null | undefined> {
    const response = await getTaskByIdAction(getTaskId);

    if (response.error) {
      displayErrorToast(String(response.error));
      setError(String(response.error));
      return undefined;
    }

    return response.data;
  }

  async function createTask(newTask: TaskCreateForm): Promise<void> {
    const response = await createTaskAction(newTask);

    if (response.error) {
      const errorMessage =
        typeof response.error === "string"
          ? response.error
          : "Erro de validação. Verifique os campos.";
      displayErrorToast(errorMessage);
      setError(errorMessage);
    } else if (response.data) {
      const taskForState: TaskWithAssignees = {
        ...response.data,
        assignees: [],
      };
      setTasks((prevTasks) => [taskForState, ...prevTasks]);
      displaySuccessToast("Tarefa criada com sucesso!");
    }
  }

  async function updateTask(updateData: TaskUpdateForm): Promise<void> {
    const response = await updateTaskAction(updateData);

    if (response.error) {
      const errorMessage =
        typeof response.error === "string"
          ? response.error
          : "Erro de validação. Verifique os campos.";
      displayErrorToast(errorMessage);
      setError(errorMessage);
      return;
    } else if (response.data) {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === response.data.id ? { ...task, ...response.data } : task
        )
      );
      displaySuccessToast("Tarefa atualizada com sucesso!");
    }
  }

  async function deleteTask(deleteId: string): Promise<void> {
    const response = await deleteTaskAction(deleteId);

    if (response.error) {
      displayErrorToast(String(response.error));
      setError(String(response.error));
      return;
    }

    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== deleteId));
    displaySuccessToast("Tarefa deletada com sucesso!");
  }

  return {
    tasks,
    loading,
    error,
    updateTask,
    deleteTask,
    createTask,
    findTask,
  };
}
