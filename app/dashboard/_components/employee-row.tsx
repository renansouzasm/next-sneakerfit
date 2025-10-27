import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Employee } from "@prisma/client";
import { useState } from "react";
import { EmployeeUpdateForm } from "./employee-update-form";
import { EmployeeDeleteDialog } from "./employee-delete-dialog";
import { TableCell, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface EmployeeRowProps {
  employee: Employee;
}

export function EmployeeRow({ employee }: EmployeeRowProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  return (
    <TableRow key={employee.id}>
      <TableCell>
        <div className="flex items-center gap-3">
          <Avatar className="size-8">
            <AvatarImage
              src={employee.avatarUrl || "/placeholder.svg"}
              alt={employee.name}
            />
            <AvatarFallback>{employee.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <span className="font-medium">{employee.name}</span>
        </div>
      </TableCell>
      <TableCell className="text-muted-foreground">{employee.email}</TableCell>
      <TableCell className="text-muted-foreground">{employee.cpf}</TableCell>
      <TableCell>{employee.status}</TableCell>

      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="size-4" />
              <span className="sr-only">Abrir menu</span>
            </Button>
          </DropdownMenuTrigger>
          
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setIsUpdating(true)}>
              <Pencil className="mr-2 size-4" />
              Editar
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setIsDeleting(true)}
              className="text-destructive"
            >
              <Trash2 className="mr-2 size-4" />
              Excluir
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>

      <EmployeeUpdateForm
        employee={employee}
        isUpdating={isUpdating}
        setIsUpdating={setIsUpdating}
      />

      <EmployeeDeleteDialog
        employee={employee}
        isDeleting={isDeleting}
        setIsDeleting={setIsDeleting}
      />
    </TableRow>
  );
}
