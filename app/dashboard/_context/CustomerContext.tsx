"use client";

import { createContext, useContext, ReactNode } from "react";
import { useCustomer } from "@/hooks/use-customer";
import type { Customer } from "@prisma/client";
import {
  CustomerCreateForm,
  CustomerUpdateForm,
} from "@/lib/schemas/customer-schema";

interface ContextProps {
  children: ReactNode;
}

interface CustomerContextType {
  customers: Customer[];
  loading: boolean;
  error: string | null;
  createCustomer: (newCustomer: CustomerCreateForm) => Promise<void>;
  updateCustomer: (updatedCustomer: CustomerUpdateForm) => Promise<void>;
  deleteCustomer: (deleteId: string) => Promise<void>;
  findCustomer: (getCustomerId: string) => Promise<Customer | null | undefined>;
}

const CustomerContext = createContext<CustomerContextType | undefined>(
  undefined
);

export function CustomerProvider({ children }: ContextProps) {
  const {
    customers,
    loading,
    error,
    createCustomer,
    updateCustomer,
    deleteCustomer,
    findCustomer,
  } = useCustomer();

  return (
    <CustomerContext.Provider
      value={{
        customers,
        loading,
        error,
        createCustomer,
        updateCustomer,
        deleteCustomer,
        findCustomer,
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
}

export function useCustomerContext() {
  try {
    const context = useContext(CustomerContext);

    if (!context) {
      throw new Error(
        "useCustomerContext deve ser usado dentro de um CustomerProvider"
      );
    }

    return context;
  } catch (error) {
    throw new Error(String(error));
  }
}
