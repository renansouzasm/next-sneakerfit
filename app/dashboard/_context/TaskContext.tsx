"use client";

import { createContext, useContext, ReactNode } from "react";
import { useTask, TaskWithAssignees, FullDetailedTask } from "@/hooks/use-task";
import { TaskCreateForm, TaskUpdateForm } from "@/lib/schemas/task-schema";

interface ContextProps {
  children: ReactNode;
}

interface TaskContextType {
  tasks: TaskWithAssignees[];
  loading: boolean;
  error: string | null;
  createTask: (newTask: TaskCreateForm) => Promise<void>;
  updateTask: (updatedTask: TaskUpdateForm) => Promise<void>;
  deleteTask: (deleteId: string) => Promise<void>;
  findTask: (getTaskId: string) => Promise<FullDetailedTask | null | undefined>;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export function TaskProvider({ children }: ContextProps) {
  const {
    tasks,
    loading,
    error,
    createTask,
    updateTask,
    deleteTask,
    findTask,
  } = useTask();

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loading,
        error,
        createTask,
        updateTask,
        deleteTask,
        findTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTaskContext() {
  try {
    const context = useContext(TaskContext);

    if (!context) {
      throw new Error(
        "useTaskContext deve ser usado dentro de um TaskProvider"
      );
    }

    return context;
  } catch (error) {
    throw new Error(String(error));
  }
}
