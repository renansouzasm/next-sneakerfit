import { Task } from "@/app.types";
import { TaskRow } from "./task-row";

interface TaskTableProps {
  filtered: Task[];
}

export function TaskTable({ filtered }: TaskTableProps) {
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-[rgba(255,255,255,0.05)] font-semibold text-sm text-[#5c5c5c] md:text-xs">
          <th className="text-left">Nome da Tarefa</th>
          <th className="text-left">Descrição</th>
          <th className="text-left">Pessoas</th>
          <th className="text-left">Prazo</th>
          <th className="text-left">Ações</th>
        </tr>
      </thead>

      <tbody>
        {filtered.map((task, index) => (
          <TaskRow key={index} task={task} />
        ))}
      </tbody>
    </table>
  );
}
