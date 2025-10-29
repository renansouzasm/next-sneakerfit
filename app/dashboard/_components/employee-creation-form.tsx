"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEmployeeContext } from "../_context/EmployeeContext";
import { displayErrorToast } from "@/utils/displayToast";
import { EmployeeStatus } from "@prisma/client";

interface EmployeeCreationFormProps {
  isCreating: boolean;
  setIsCreating: Dispatch<SetStateAction<boolean>>;
}

export function EmployeeCreationForm({
  isCreating,
  setIsCreating,
}: EmployeeCreationFormProps) {
  const { createEmployee } = useEmployeeContext();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const defaultForm = {
    name: "",
    email: "",
    cpf: "",
    status: "ACTIVE" as EmployeeStatus,
    avatarUrl: "/placeholder.svg",
  };
  const [form, setForm] = useState(defaultForm);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { id, value } = event.target;
    setForm({
      ...form,
      [id]: value,
    });
  }

  function handleSelect(value: string) {
    setForm((prev) => ({ ...prev, status: value as EmployeeStatus }));
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      await createEmployee({ ...form });

      setForm(defaultForm);
    } catch (error) {
      displayErrorToast(String(error));
    } finally {
      setIsSubmitting(false);
      setIsCreating(false);
    }
  };

  return (
    <Dialog open={isCreating} onOpenChange={setIsCreating}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Novo Funcionário</DialogTitle>
          <DialogDescription>
            Adicione um novo funcionário ao sistema
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome</Label>
            <Input
              id="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Digite o nome"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="email@exemplo.com"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cpf">CPF</Label>
            <Input
              id="cpf"
              value={form.cpf}
              type="string"
              onChange={handleChange}
              placeholder="000.000.000-00"
              minLength={11}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={form.status} onValueChange={handleSelect}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value={EmployeeStatus.ACTIVE}>Ativo</SelectItem>
                <SelectItem value={EmployeeStatus.VACATION}>Férias</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-3 pt-4">
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
              {isSubmitting ? "Criando..." : "Criar Funcionário"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
