"use client";

import { useEffect, useState } from "react";
import type { Employee } from "@prisma/client";
import { displayErrorToast, displaySuccessToast } from "@/utils/displayToast";
import {
  createEmployeeAction,
  deleteEmployeeAction,
  getEmployeeByIdAction,
  getEmployeesAction,
  updateEmployeeAction,
} from "@/app/dashboard/_actions/employee-action";
import type {
  EmployeeCreateForm,
  EmployeeUpdateForm,
} from "@/lib/schemas/employee-schema";

interface UseEmployeeType {
  employees: Employee[];
  loading: boolean;
  error: string | null;
  createEmployee: (newEmployee: EmployeeCreateForm) => Promise<void>;
  updateEmployee: (updatedEmployee: EmployeeUpdateForm) => Promise<void>;
  deleteEmployee: (id: string) => Promise<void>;
  findEmployee: (getEmployeeId: string) => Promise<Employee | null | undefined>;
}

export function useEmployee(): UseEmployeeType {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEmployees(): Promise<void> {
      setLoading(true);
      setError(null);

      const response = await getEmployeesAction();

      if (!response.data) {
        setError(String(response.error));
        displayErrorToast(String(response.error));
      } else if (response.data) {
        setEmployees(response.data);
      }
      setLoading(false);
    }

    fetchEmployees();
  }, []);

  async function findEmployee(
    getEmployeeId: string
  ): Promise<Employee | null | undefined> {
    const response = await getEmployeeByIdAction(getEmployeeId);

    if (response.error) {
      displayErrorToast(String(response.error));
      setError(String(response.error));
      return undefined;
    }

    return response.data;
  }

  async function createEmployee(
    newEmployee: EmployeeCreateForm
  ): Promise<void> {
    const response = await createEmployeeAction(newEmployee);

    if (response.error) {
      const errorMessage =
        typeof response.error === "string"
          ? response.error
          : "Erro de validação. Verifique os campos.";
      displayErrorToast(errorMessage);
      setError(errorMessage);
    } else if (response.data) {
      setEmployees((prevEmployees) => [response.data, ...prevEmployees]);
      displaySuccessToast("Empregado criado com sucesso!");
    }
  }

  async function updateEmployee(updateData: EmployeeUpdateForm): Promise<void> {
    const response = await updateEmployeeAction(updateData);

    if (response.error) {
      const errorMessage =
        typeof response.error === "string"
          ? response.error
          : "Erro de validação. Verifique os campos.";
      displayErrorToast(errorMessage);
      setError(errorMessage);
      return;
    } else if (response.data) {
      setEmployees((prevEmployees) =>
        prevEmployees.map((employee) =>
          employee.id === response.data.id ? response.data : employee
        )
      );
      displaySuccessToast("Empregado atualizado com sucesso!");
    }
  }

  async function deleteEmployee(deleteId: string): Promise<void> {
    const response = await deleteEmployeeAction(deleteId);

    if (response.error) {
      displayErrorToast(String(response.error));
      setError(String(response.error));
      return;
    }

    setEmployees((prevEmployees) =>
      prevEmployees.filter((employee) => employee.id !== deleteId)
    );
    displaySuccessToast("Empregado deletado com sucesso!");
  }

  return {
    employees,
    loading,
    error,
    updateEmployee,
    deleteEmployee,
    createEmployee,
    findEmployee,
  };
}
