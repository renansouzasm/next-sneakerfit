"use client";

import { useEffect, useState } from "react";
import type { Customer } from "@prisma/client";
import { displayErrorToast, displaySuccessToast } from "@/utils/displayToast";
import {
  createCustomerAction,
  deleteCustomerAction,
  getCustomerByIdAction,
  getCustomersAction,
  updateCustomerAction,
} from "@/app/dashboard/customers/_actions/customer-actions";
import type {
  CustomerCreateForm,
  CustomerUpdateForm,
} from "@/lib/schemas/customer-schema";

interface UseCustomerType {
  customers: Customer[];
  loading: boolean;
  error: string | null;
  createCustomer: (newCustomer: CustomerCreateForm) => Promise<void>;
  updateCustomer: (updatedCustomer: CustomerUpdateForm) => Promise<void>;
  deleteCustomer: (id: string) => Promise<void>;
  findCustomer: (getCustomerId: string) => Promise<Customer | null | undefined>;
}

export function useCustomer(): UseCustomerType {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCustomers(): Promise<void> {
      setLoading(true);
      setError(null);

      const response = await getCustomersAction();

      if (!response.data) {
        setError(String(response.error));
        displayErrorToast(String(response.error));
      } else if (response.data) {
        setCustomers(response.data);
      }
      setLoading(false);
    }

    fetchCustomers();
  }, []);

  async function findCustomer(
    getCustomerId: string
  ): Promise<Customer | null | undefined> {
    const response = await getCustomerByIdAction(getCustomerId);

    if (response.error) {
      displayErrorToast(String(response.error));
      setError(String(response.error));
      return undefined;
    }

    return response.data;
  }

  async function createCustomer(
    newCustomer: CustomerCreateForm
  ): Promise<void> {
    const response = await createCustomerAction(newCustomer);

    if (response.error) {
      const errorMessage =
        typeof response.error === "string"
          ? response.error
          : "Erro de validação. Verifique os campos.";
      displayErrorToast(errorMessage);
      setError(errorMessage);
    } else if (response.data) {
      setCustomers((prevCustomers) => [response.data, ...prevCustomers]);
      displaySuccessToast("Cliente criado com sucesso!");
    }
  }

  async function updateCustomer(updateData: CustomerUpdateForm): Promise<void> {
    const response = await updateCustomerAction(updateData);

    if (response.error) {
      const errorMessage =
        typeof response.error === "string"
          ? response.error
          : "Erro de validação. Verifique os campos.";
      displayErrorToast(errorMessage);
      setError(errorMessage);
      return;
    } else if (response.data) {
      setCustomers((prevCustomers) =>
        prevCustomers.map((customer) =>
          customer.id === response.data.id ? response.data : customer
        )
      );
      displaySuccessToast("Cliente atualizado com sucesso!");
    }
  }

  async function deleteCustomer(deleteId: string): Promise<void> {
    const response = await deleteCustomerAction(deleteId);

    if (response.error) {
      displayErrorToast(String(response.error));
      setError(String(response.error));
      return;
    }

    setCustomers((prevCustomers) =>
      prevCustomers.filter((customer) => customer.id !== deleteId)
    );
    displaySuccessToast("Cliente deletado com sucesso!");
  }

  return {
    customers,
    loading,
    error,
    updateCustomer,
    deleteCustomer,
    createCustomer,
    findCustomer,
  };
}
