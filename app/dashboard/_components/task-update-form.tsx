"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dispatch, SetStateAction, useState } from "react";
import { useTaskContext } from "../_context/TaskContext";
import { Task, TaskAssignment, TaskStatus, Employee } from "@prisma/client";
import { displayErrorToast } from "@/utils/displayToast";
import { useEmployeeContext } from "../_context/EmployeeContext";

type TaskWithAssignees = Task & {
  assignees: (TaskAssignment & {
    employee: Employee | null;
  })[];
};

interface TaskUpdateFormProps {
  task: TaskWithAssignees;
  isUpdating: boolean;
  setIsUpdating: Dispatch<SetStateAction<boolean>>;
}

export function TaskUpdateForm({
  task,
  isUpdating,
  setIsUpdating,
}: TaskUpdateFormProps) {
  const { updateTask } = useTaskContext();
  const { employees } = useEmployeeContext();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState({
    title: task.title,
    description: task.description || "",
    status: task.status,
    dueDate: task.dueDate
      ? new Date(task.dueDate).toISOString().split("T")[0]
      : new Date().toISOString().split("T")[0],

    employeeIds: task.assignees
      .map((assigned) => assigned.employeeId)
      .filter((id): id is string => id !== null && id !== undefined),
  });

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { id, value } = event.target;
    setForm((prev) => ({
      ...prev,
      [id]: value,
    }));
  }

  function handleStatusSelect(value: string) {
    setForm((prev) => ({ ...prev, status: value as TaskStatus }));
  }

  function toggleEmployee(employeeId: string) {
    setForm((prev) => ({
      ...prev,
      employeeIds: prev.employeeIds.includes(employeeId)
        ? prev.employeeIds.filter((id: string) => id !== employeeId)
        : [...prev.employeeIds, employeeId],
    }));
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      await updateTask({
        id: task.id,
        title: form.title,
        description: form.description,
        status: form.status,
        dueDate: new Date(form.dueDate),
        employeeIds: form.employeeIds,
      });
      setIsUpdating(false);
    } catch (error) {
      displayErrorToast(String(error));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog open={isUpdating} onOpenChange={setIsUpdating}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Editar Tarefa</DialogTitle>
          <DialogDescription>
            Atualize as informações da tarefa abaixo
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-4 pt-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="title">Título</Label>
            <Input
              id="title"
              type="text"
              placeholder="Digite o título da tarefa"
              minLength={3}
              onChange={handleChange}
              value={form.title}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              placeholder="Descreva a tarefa"
              onChange={handleChange}
              value={form.description}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={form.status} onValueChange={handleStatusSelect}>
              <SelectTrigger id="status">
                <SelectValue placeholder="Selecione o status" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value={TaskStatus.TODO}>A Fazer</SelectItem>
                <SelectItem value={TaskStatus.IN_PROGRESS}>
                  Em Progresso
                </SelectItem>
                <SelectItem value={TaskStatus.DONE}>Concluída</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="dueDate">Data de Entrega</Label>
            <Input
              id="dueDate"
              type="date"
              onChange={handleChange}
              value={form.dueDate}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Funcionários Responsáveis</Label>
            <div className="space-y-2 rounded-lg border border-border p-3 max-h-48 overflow-y-auto">
              {employees.map((employee) => (
                <div key={employee.id} className="flex items-center gap-3">
                  <Checkbox
                    id={`employee-${employee.id}`}
                    checked={form.employeeIds.includes(employee.id)}
                    onCheckedChange={() => toggleEmployee(employee.id)}
                  />
                  <label
                    htmlFor={`employee-${employee.id}`}
                    className="flex items-center gap-2 cursor-pointer flex-1"
                  >
                    <Avatar className="size-6">
                      <AvatarImage
                        src={employee.avatarUrl || "/placeholder.svg"}
                        alt={employee.name}
                      />
                      <AvatarFallback>{employee.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{employee.name}</span>
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button
              className="cursor-pointer"
              type="button"
              variant="outline"
              onClick={() => setIsUpdating(false)}
            >
              Cancelar
            </Button>
            <Button
              className="cursor-pointer"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Salvando..." : "Atualizar"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
