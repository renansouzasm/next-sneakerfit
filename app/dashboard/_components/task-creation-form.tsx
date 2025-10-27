"use client";

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
import { displayErrorToast } from "@/utils/displayToast";
import { useEmployeeContext } from "../_context/EmployeeContext";

interface TaskCreationFormProps {
  isCreating: boolean;
  setIsCreating: Dispatch<SetStateAction<boolean>>;
}

export function TaskCreationForm({
  isCreating,
  setIsCreating,
}: TaskCreationFormProps) {
  const { createTask } = useTaskContext();
  const { employees } = useEmployeeContext();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const defaultForm = {
    title: "",
    description: "",
    dueDate: new Date().toISOString().split("T")[0],
    employeeIds: [] as string[],
  };
  const [form, setForm] = useState(defaultForm);

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { id, value } = event.target;
    setForm((prev) => ({
      ...prev,
      [id]: value,
    }));
  }

  function toggleEmployee(employeeId: string) {
    setForm((prev) => ({
      ...prev,
      employeeIds: prev.employeeIds.includes(employeeId)
        ? prev.employeeIds.filter((id) => id !== employeeId)
        : [...prev.employeeIds, employeeId],
    }));
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      await createTask({
        ...form,
        dueDate: new Date(form.dueDate),
      });
      setForm(defaultForm);
    } catch (error) {
      displayErrorToast(String(error));
    } finally {
      setIsSubmitting(false);
      setIsCreating(false);
    }
  }

  return (
    <Dialog open={isCreating} onOpenChange={setIsCreating}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Nova Tarefa</DialogTitle>
          <DialogDescription>
            Crie uma nova tarefa e atribua responsáveis
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
              onClick={() => setIsCreating(false)}
            >
              Cancelar
            </Button>
            <Button
              className="cursor-pointer"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Salvando..." : "Criar"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
