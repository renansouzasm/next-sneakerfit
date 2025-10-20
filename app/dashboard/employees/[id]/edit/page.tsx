"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
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
import { Employee, EmployeeStatus } from "@/app.types";
import { useEmployeeActions } from "@/lib/hooks/useEmployeeActions";

export default function EditEmployeePage() {
  const router = useRouter();
  const params = useParams();
  const { updateEmployee, loading } = useEmployeeActions();

  const [employee, setEmployee] = useState<Employee | null>(null);

  // Carrega o funcionário
  useEffect(() => {
    async function fetchEmployee() {
      const res = await fetch(`/api/employees/${params.id}`);
      const data = await res.json();
      setEmployee(data);
    }
    fetchEmployee();
  }, [params.id]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!employee) return;

    const updated = await updateEmployee(employee.id, employee);
    if (updated) router.push("/dashboard/employees");
  }

  if (!employee) return <p className="text-center mt-10">Carregando...</p>;

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

        <MainHeader title={`Editar: ${employee.name}`} />
      </div>

      <Card className="bg-[#161b22] border-[#21262d] max-w-2xl rounded-md">
        <CardHeader>
          <CardTitle className="text-white">Editar Funcionário</CardTitle>
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
                  value={employee.name}
                  onChange={(e) =>
                    setEmployee({ ...employee, name: e.target.value })
                  }
                  className="bg-[#0d1117] border-[#21262d] text-white"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">
                  E-mail
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={employee.email}
                  onChange={(e) =>
                    setEmployee({ ...employee, email: e.target.value })
                  }
                  className="bg-[#0d1117] border-[#21262d] text-white"
                  required
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
                  value={employee.cpf}
                  onChange={(e) =>
                    setEmployee({ ...employee, cpf: e.target.value })
                  }
                  className="bg-[#0d1117] border-[#21262d] text-white"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="role" className="text-white">
                  Cargo
                </Label>
                <Input
                  id="role"
                  value={employee.role}
                  onChange={(e) =>
                    setEmployee({ ...employee, role: e.target.value })
                  }
                  className="bg-[#0d1117] border-[#21262d] text-white"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-white">Status</Label>
              <Select
                value={employee.status}
                onValueChange={(value) =>
                  setEmployee({
                    ...employee,
                    status: value as EmployeeStatus,
                  })
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
