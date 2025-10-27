"use client";

import { createContext, useContext, ReactNode } from "react";
import { useEmployee } from "@/hooks/use-employee";
import type { Employee } from "@prisma/client";
import {
  EmployeeCreateForm,
  EmployeeUpdateForm,
} from "@/lib/schemas/employee-schema";

interface ContextProps {
  children: ReactNode;
}

interface EmployeeContextType {
  employees: Employee[];
  loading: boolean;
  error: string | null;
  createEmployee: (newEmployee: EmployeeCreateForm) => Promise<void>;
  updateEmployee: (updatedEmployee: EmployeeUpdateForm) => Promise<void>;
  deleteEmployee: (deleteId: string) => Promise<void>;
  findEmployee: (getEmployeeId: string) => Promise<Employee | null | undefined>;
}

const EmployeeContext = createContext<EmployeeContextType | undefined>(
  undefined
);

export function EmployeeProvider({ children }: ContextProps) {
  const {
    employees,
    loading,
    error,
    createEmployee,
    updateEmployee,
    deleteEmployee,
    findEmployee,
  } = useEmployee();

  return (
    <EmployeeContext.Provider
      value={{
        employees,
        loading,
        error,
        createEmployee,
        updateEmployee,
        deleteEmployee,
        findEmployee,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
}

export function useEmployeeContext() {
  try {
    const context = useContext(EmployeeContext);

    if (!context) {
      throw new Error(
        "useEmployeeContext deve ser usado dentro de um EmployeeProvider"
      );
    }

    return context;
  } catch (error) {
    throw new Error(String(error));
  }
}
