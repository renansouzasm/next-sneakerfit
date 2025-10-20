"use client";

import { useState } from "react";
import { Customer } from "@/app.types";
import { StaticImageData } from "next/image";

interface CreateCustomerData {
  name: string;
  email: string;
  avatarUrl?: string | null | StaticImageData;
}

type UpdateCustomerData = Partial<CreateCustomerData>;

export function useCustomerActions() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function createCustomer(
    data: CreateCustomerData
  ): Promise<Customer | null> {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/customers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error((await res.json()).error);
      return await res.json();
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Erro desconhecido.");
      return null;
    } finally {
      setLoading(false);
    }
  }

  async function updateCustomer(
    id: string,
    data: UpdateCustomerData
  ): Promise<Customer | null> {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/customers/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error((await res.json()).error);
      return await res.json();
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Erro desconhecido.");
      return null;
    } finally {
      setLoading(false);
    }
  }

  return { createCustomer, updateCustomer, loading, error };
}
