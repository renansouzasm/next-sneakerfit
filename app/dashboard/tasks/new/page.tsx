"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AppLayout from "../../_components/AppLayout";
import MainHeader from "../../_components/MainHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Plus } from "lucide-react";
import Link from "next/link";
import { useTaskActions } from "@/lib/hooks/useTaskActions";
import { useEmployees } from "@/lib/hooks/useEmployees";
import { TaskStatus } from "@/app.types";
import { handleSuccessToast } from "@/utils/handleToast";

interface TaskForm {
  title: string;
  description: string;
  dueDate: string;
  status: TaskStatus;
  assignees: string[];
}

export default function NewTaskPage() {
  const router = useRouter();
  const { createTask, loading } = useTaskActions();
  const { employees } = useEmployees();

  const [form, setForm] = useState<TaskForm>({
    title: "",
    description: "",
    dueDate: "",
    status: TaskStatus.TODO,
    assignees: [],
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!form.title || !form.dueDate) {
      alert("Título e data de entrega são obrigatórios.");
      return;
    }

    const newTask = await createTask(form);

    if (newTask) {
      handleSuccessToast("Tarefa criada com sucesso!");
      router.push("/dashboard/tasks");
    }
  }

  const handleToggleAssignee = (id: string) => {
    setForm((prev) => {
      const alreadySelected = prev.assignees.includes(id);
      return {
        ...prev,
        assignees: alreadySelected
          ? prev.assignees.filter((a) => a !== id)
          : [...prev.assignees, id],
      };
    });
  };

  return (
    <AppLayout>
      <div className="flex items-center gap-4 mb-6">
        <Button
          className="text-muted-foreground hover:text-white"
          variant="ghost"
          size="icon"
        >
          <Link href="/dashboard/tasks">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>

        <MainHeader title="Nova Tarefa" />
      </div>

      <Card className="bg-[#161b22] border-[#21262d] max-w-2xl rounded-md">
        <CardHeader>
          <CardTitle className="text-white">Informações da Tarefa</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-white">
                Título
              </Label>
              <Input
                id="title"
                placeholder="Ex: Atualizar página de produtos"
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="bg-[#0d1117] border-[#21262d] text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-white">
                Descrição
              </Label>
              <Input
                id="description"
                placeholder="Breve descrição da tarefa"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                className="bg-[#0d1117] border-[#21262d] text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dueDate" className="text-white">
                  Data de entrega
                </Label>
                <Input
                  id="dueDate"
                  type="date"
                  required
                  value={form.dueDate}
                  onChange={(e) =>
                    setForm({ ...form, dueDate: e.target.value })
                  }
                  className="bg-[#0d1117] border-[#21262d] text-white"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-white">Status</Label>
                <Select
                  value={form.status}
                  onValueChange={(value) =>
                    setForm({ ...form, status: value as TaskStatus })
                  }
                >
                  <SelectTrigger className="bg-[#0d1117] border-[#21262d] text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="TODO">A Fazer</SelectItem>
                    <SelectItem value="IN_PROGRESS">Em Progresso</SelectItem>
                    <SelectItem value="DONE">Concluída</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-white">Funcionários</Label>
              <div className="grid grid-cols-2 gap-2">
                {employees.map((emp) => (
                  <label
                    key={emp.id}
                    className={`flex items-center gap-2 text-white border p-2 rounded cursor-pointer transition-all ${
                      form.assignees.includes(emp.id)
                        ? "bg-orange/20 border-orange text-orange-300"
                        : "bg-[#0d1117] border-[#21262d]"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={form.assignees.includes(emp.id)}
                      onChange={() => handleToggleAssignee(emp.id)}
                    />
                    <span>{emp.name}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                className="flex-1 bg-transparent border-[#21262d] text-white hover:bg-[#0d1117]"
                variant="outline"
                onClick={() => router.push("/dashboard/tasks")}
              >
                Cancelar
              </Button>

              <Button
                type="submit"
                disabled={loading}
                className="flex-1 bg-orange text-white hover:bg-orange/90"
              >
                <Plus className="h-4 w-4 mr-2" />
                {loading ? "Criando..." : "Criar Tarefa"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </AppLayout>
  );
}
