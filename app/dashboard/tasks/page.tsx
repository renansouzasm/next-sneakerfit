"use client";

import { useState } from "react";
import AppLayout from "../_components/AppLayout";
import MainHeader from "../_components/MainHeader";
import { Task, TaskStatus } from "@/app.types";
import { TaskTable } from "./_components/task-table";
import { useTasks } from "@/lib/hooks/useTasks";

const navItems = ["Todos", "A Fazer", "Em Progresso", "Concluído"];

export default function TasksPage() {
  const { tasks, loading, error } = useTasks();
  const [activeFilter, setActiveFilter] = useState<string>("Todos");

  if (loading)
    return (
      <AppLayout>
        <p className="text-gray-400">Carregando tarefas</p>
      </AppLayout>
    );
  if (error) return <p className="text-red-500">Erro: {error}</p>;

  const filteredTasks =
    activeFilter === "Todos"
      ? tasks
      : tasks.filter((task) => {
          const filterMap: { [key: string]: TaskStatus } = {
            "A Fazer": TaskStatus.TODO,
            "Em Progresso": TaskStatus.IN_PROGRESS,
            Concluído: TaskStatus.DONE,
          };
          return task.status === filterMap[activeFilter];
        });

  const groupedTasks = filteredTasks.reduce((acc, task) => {
    const { status } = task;

    if (!acc[status]) {
      acc[status] = [];
    }
    acc[status].push(task);

    return acc;
  }, {} as Record<string, Task[]>);

  const orderedStatuses: TaskStatus[] = [
    TaskStatus.TODO,
    TaskStatus.IN_PROGRESS,
    TaskStatus.DONE,
  ];

  return (
    <AppLayout>
      <MainHeader
        title="Tarefas"
        showAddButton={true}
        url={`${process.env.NEXT_PUBLIC_HOST_URL}/dashboard/tasks/new`}
      />

      <nav className="flex items-center text-[15px] py-5 gap-6">
        {navItems.map((item) => (
          <button
            className={`text-[#5c5c5c] no-underline transition-colors duration-300 pb-2 border-b-2 border-transparent cursor-pointer hover:text-white ${
              item === activeFilter ? "border-b-orange text-white" : ""
            }`}
            key={item}
            onClick={() => setActiveFilter(item)}
          >
            {item}
          </button>
        ))}
      </nav>

      <div className="space-y-6">
        {orderedStatuses.map((status) => {
          const tasksForStatus = groupedTasks[status] || [];

          if (tasksForStatus.length === 0) return null;

          return (
            <div className="card-config overflow-x-auto" key={status}>
              <TaskTable filtered={tasksForStatus} />
            </div>
          );
        })}
      </div>
    </AppLayout>
  );
}
