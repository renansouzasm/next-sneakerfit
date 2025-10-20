"use client";

import AppLayout from "../_components/AppLayout";
import MainHeader from "../_components/MainHeader";

import { useEmployees } from "@/lib/hooks/useEmployees";
import { EmployeeTable } from "./_components/employee-table";

export default function Employees() {
  const { employees, loading, error } = useEmployees();

  if (loading)
    return (
      <AppLayout>
        <p className="text-gray-400">Carregando funcionários</p>
      </AppLayout>
    );
  if (error) return <p className="text-red-500">Erro: {error}</p>;

  return (
    <AppLayout>
      <MainHeader
        title="Funcionários"
        url={`${process.env.NEXT_PUBLIC_HOST_URL}/dashboard/employees/new`}
      />

      <div className="card-config overflow-x-auto">
        <EmployeeTable employees={employees} />
      </div>
    </AppLayout>
  );
}
