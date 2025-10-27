import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TableCell, TableRow } from "@/components/ui/table";
import { formatDate } from "@/utils/formatDate";
import { Task, TaskAssignment, Employee } from "@prisma/client";
import { TaskUpdateForm } from "./task-update-form";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { TaskDeleteDialog } from "./task-delete-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type TaskWithAssignees = Task & {
  assignees: (TaskAssignment & {
    employee: Employee | null;
  })[];
};

interface TaskRowProps {
  task: TaskWithAssignees;
}

export function TaskRow({ task }: TaskRowProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  return (
    <TableRow key={task.id}>
      <TableCell>
        <div>
          <div className="font-medium">{task.title}</div>
          <div className="text-sm text-muted-foreground line-clamp-1">
            {task.description}
          </div>
        </div>
      </TableCell>
      <TableCell>{task.status}</TableCell>

      <TableCell className="text-muted-foreground">
        {formatDate(task.createdAt)}
      </TableCell>
      <TableCell className="text-muted-foreground">
        {formatDate(task.dueDate) ?? "Sem data de entrega"}
      </TableCell>

      <TableCell>
        <div className="flex -space-x-2">
          {task.assignees.slice(0, 3).map((assignee) => {
            if (!assignee.employee) return null;

            return (
              <Avatar
                key={assignee.employee.id}
                className="size-8 border-2 border-background"
              >
                <AvatarImage
                  src={assignee.employee.avatarUrl || "/placeholder.svg"}
                  alt={assignee.employee.name}
                />
                <AvatarFallback>
                  {assignee.employee.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
            );
          })}
          {task.assignees.length > 3 && (
            <div className="flex size-8 items-center justify-center rounded-full border-2 border-background bg-muted text-xs font-medium">
              +{task.assignees.length - 3}
            </div>
          )}
        </div>
      </TableCell>

      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => setIsUpdating(true)}
            >
              <Pencil />
              Editar
            </DropdownMenuItem>

            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => setIsDeleting(true)}
            >
              <Trash2 />
              Deletar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>

      <TaskUpdateForm
        task={task}
        isUpdating={isUpdating}
        setIsUpdating={setIsUpdating}
      />

      <TaskDeleteDialog
        task={task}
        isDeleting={isDeleting}
        setIsDeleting={setIsDeleting}
      />
    </TableRow>
  );
}
