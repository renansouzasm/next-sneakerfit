"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import AppLayout from "../../../_components/AppLayout";
import MainHeader from "../../../_components/MainHeader";
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
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { useTaskActions } from "@/lib/hooks/useTaskActions";
import { useEmployees } from "@/lib/hooks/useEmployees";
import { Task, TaskStatus } from "@/app.types";
import { handleSuccessToast } from "@/utils/handleToast";

export default function EditTaskPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const { updateTask, loading } = useTaskActions();
  const { employees } = useEmployees();

  const [task, setTask] = useState<Task | null>(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    dueDate: "",
    status: TaskStatus.TODO,
    assignees: [] as string[],
  });

  useEffect(() => {
    async function fetchTask() {
      try {
        const res = await fetch(`/api/tasks/${id}`);
        if (!res.ok) throw new Error("Falha ao carregar tarefa.");
        const data: Task = await res.json();
        setTask(data);

        setForm({
          title: data.title,
          description: data.description || "",
          dueDate: data.dueDate?.split("T")[0] || "",
          status: data.status,
          assignees: data.assignees.map((a) => a.employeeId),
        });
      } catch (error) {
        console.error(error);
      }
    }

    if (id) fetchTask();
  }, [id]);

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

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!task) return;

    const updated = await updateTask(task.id, form);
    
    if (updated) {
      handleSuccessToast("Tarefa atualizada com sucesso!")
      router.push("/dashboard/tasks");
    }
  }

  if (!task) {
    return (
      <AppLayout>
        <p className="text-gray-400 p-6">Carregando dados da tarefa...</p>
      </AppLayout>
    );
  }

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

        <MainHeader title={`Editar Tarefa: ${task.title}`} />
      </div>

      <Card className="bg-[#161b22] border-[#21262d] max-w-2xl rounded-md">
        <CardHeader>
          <CardTitle className="text-white">Editar Informações</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-white">
                Título
              </Label>
              <Input
                id="title"
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
                  Data de Entrega
                </Label>
                <Input
                  id="dueDate"
                  type="date"
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
                <Save className="h-4 w-4 mr-2" />
                {loading ? "Salvando..." : "Salvar Alterações"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </AppLayout>
  );
}
