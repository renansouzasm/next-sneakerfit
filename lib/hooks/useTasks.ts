import { useFetch } from "./useFetch";
import { getTasks } from "../services/tasks";
import { Task } from "@/app.types";

export function useTasks() {
  const { data, loading, error } = useFetch<Task[]>(getTasks);

  return {
    tasks: data ?? [],
    loading,
    error,
  };
}
