"use client";

import { useState } from "react";
import { Employee, EmployeeStatus } from "@/app.types";
import { StaticImageData } from "next/image";

interface CreateEmployeeData {
  name: string;
  email: string;
  cpf: string;
  role: string;
  avatarUrl?: string | null | StaticImageData;
  status?: EmployeeStatus;
}

type UpdateEmployeeData = Partial<CreateEmployeeData>;

export function useEmployeeActions() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function createEmployee(
    data: CreateEmployeeData
  ): Promise<Employee | null> {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error || "Erro ao criar funcionário.");
      }

      const result: Employee = await response.json();
      return result;
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Erro desconhecido.");
      return null;
    } finally {
      setLoading(false);
    }
  }

  async function updateEmployee(
    id: string,
    data: UpdateEmployeeData
  ): Promise<Employee | null> {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/employees/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error || "Erro ao atualizar funcionário.");
      }

      const result: Employee = await response.json();
      return result;
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Erro desconhecido.");
      return null;
    } finally {
      setLoading(false);
    }
  }

  async function deleteEmployee(id: string): Promise<boolean> {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/employees/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error || "Erro ao excluir funcionário.");
      }
      return true;
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Erro desconhecido.");
      return false;
    } finally {
      setLoading(false);
    }
  }

  return { createEmployee, updateEmployee, deleteEmployee, loading, error };
}
