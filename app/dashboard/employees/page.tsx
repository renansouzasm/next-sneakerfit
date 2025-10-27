"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEmployeeContext } from "../_context/EmployeeContext";
import { EmployeeTable } from "../_components/employee-table";
import { EmployeeCreationForm } from "../_components/employee-creation-form";
import { useState } from "react";
import { EmptyData } from "../_components/empty-data";
import { LoadingData } from "../_components/loading-data";

export default function EmployeesPage() {
  const { employees, loading } = useEmployeeContext();
  const [isCreating, setIsCreating] = useState(false);

  const emptyContent = {
    title: "Lista de Funcionários Vazia",
    message:
      "Adicione novos funcionários, ou continue navegando pelo dashboard.",
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Funcionários</h1>
          <p className="text-muted-foreground">
            Gerencie os funcionários da sua empresa
          </p>
        </div>
        <Button className="cursor-pointer" onClick={() => setIsCreating(true)}>
          <Plus />
          Novo Funcionário
        </Button>
      </div>

      {loading ? (
        <LoadingData />
      ) : !employees.length ? (
        <EmptyData title={emptyContent.title} message={emptyContent.message}>
          <Button
            className="cursor-pointer"
            onClick={() => setIsCreating(true)}
          >
            <Plus />
            Novo Funcionário
          </Button>
        </EmptyData>
      ) : (
        <EmployeeTable />
      )}

      <EmployeeCreationForm
        isCreating={isCreating}
        setIsCreating={setIsCreating}
      />
    </div>
  );
}
