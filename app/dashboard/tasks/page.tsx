"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTaskContext } from "../_context/TaskContext";
import { TaskCreationForm } from "../_components/task-creation-form";
import { TaskTable } from "../_components/task-table";
import { useState } from "react";
import { LoadingData } from "../_components/loading-data";
import { EmptyData } from "../_components/empty-data";

export default function TasksPage() {
  const { tasks, loading } = useTaskContext();
  const [isCreating, setIsCreating] = useState(false);

  const emptyContent = {
    title: "Lista de Tarefas Vazia",
    message: "Adicione novas tarefas, ou continue navegando pelo dashboard.",
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tarefas</h1>
          <p className="text-muted-foreground">
            Gerencie as tarefas e projetos da equipe
          </p>
        </div>

        <Button className="cursor-pointer" onClick={() => setIsCreating(true)}>
          <Plus />
          Nova Tarefa
        </Button>
      </div>

      {loading ? (
        <LoadingData />
      ) : !tasks.length ? (
        <EmptyData title={emptyContent.title} message={emptyContent.message}>
          <Button
            className="cursor-pointer"
            onClick={() => setIsCreating(true)}
          >
            <Plus />
            Nova Tarefa
          </Button>
        </EmptyData>
      ) : (
        <TaskTable />
      )}

      <TaskCreationForm isCreating={isCreating} setIsCreating={setIsCreating} />
    </div>
  );
}
