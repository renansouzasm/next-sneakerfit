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
import { EmployeeStatus } from "@/app.types";
import { useEmployeeActions } from "@/lib/hooks/useEmployeeActions";

interface EmployeeForm {
  name: string;
  email: string;
  cpf: string;
  role: string;
  status: EmployeeStatus;
}

export default function NewEmployeePage() {
  const router = useRouter();
  const { createEmployee, loading } = useEmployeeActions();

  const [form, setForm] = useState<EmployeeForm>({
    name: "",
    email: "",
    cpf: "",
    role: "",
    status: EmployeeStatus.ACTIVE,
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const newEmployee = await createEmployee(form);
    if (newEmployee) router.push("/dashboard/employees");
  }

  return (
    <AppLayout>
      <div className="flex items-center gap-4 mb-6">
        <Button
          className="text-muted-foreground hover:text-white"
          variant="ghost"
          size="icon"
        >
          <Link href="/dashboard/employees">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>

        <MainHeader title="Novo Funcionário" />
      </div>

      <Card className="bg-[#161b22] border-[#21262d] max-w-2xl rounded-md">
        <CardHeader>
          <CardTitle className="text-white">Informações</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-white">
                  Nome
                </Label>
                <Input
                  id="name"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="bg-[#0d1117] border-[#21262d] text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">
                  E-mail
                </Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="bg-[#0d1117] border-[#21262d] text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cpf" className="text-white">
                  CPF
                </Label>
                <Input
                  id="cpf"
                  required
                  value={form.cpf}
                  onChange={(e) => setForm({ ...form, cpf: e.target.value })}
                  className="bg-[#0d1117] border-[#21262d] text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="role" className="text-white">
                  Cargo
                </Label>
                <Input
                  id="role"
                  required
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  className="bg-[#0d1117] border-[#21262d] text-white"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-white">Status</Label>
              <Select
                value={form.status}
                onValueChange={(value) =>
                  setForm({ ...form, status: value as EmployeeStatus })
                }
              >
                <SelectTrigger className="bg-[#0d1117] border-[#21262d] text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ACTIVE">Ativo</SelectItem>
                  <SelectItem value="VACATION">Em Férias</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                className="flex-1 bg-transparent border-[#21262d] text-white hover:bg-[#0d1117]"
                variant="outline"
                onClick={() => router.push("/dashboard/employees")}
              >
                Cancelar
              </Button>

              <Button
                type="submit"
                disabled={loading}
                className="flex-1 bg-orange text-white hover:bg-orange/90"
              >
                <Plus className="h-4 w-4 mr-2" />
                {loading ? "Criando..." : "Criar Funcionário"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </AppLayout>
  );
}
