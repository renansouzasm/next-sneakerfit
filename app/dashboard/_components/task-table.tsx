"use client";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTaskContext } from "../_context/TaskContext";
import { TaskRow } from "./task-row";

export function TaskTable() {
  const { tasks } = useTaskContext();

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Tarefa</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Criada em</TableHead>
            <TableHead>Entrega</TableHead>
            <TableHead>Responsáveis</TableHead>
            <TableHead className="w-16"></TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {tasks.length > 0 &&
            tasks.map((task) => <TaskRow key={task.id} task={task} />)}
        </TableBody>
      </Table>
    </div>
  );
}
