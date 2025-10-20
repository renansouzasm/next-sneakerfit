"use client";

import { useState } from "react";
import { Product } from "@/app.types";
import { StaticImageData } from "next/image";

interface CreateProductData {
  name: string;
  brand: Product["brand"];
  price: number;
  stock?: number;
  imageUrl?: string | null | StaticImageData;
}

type UpdateProductData = Partial<CreateProductData>;

export function useProductActions() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function createProduct(
    data: CreateProductData
  ): Promise<Product | null> {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error || "Erro ao criar produto.");
      }

      const result: Product = await response.json();
      return result;
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Erro desconhecido.");
      return null;
    } finally {
      setLoading(false);
    }
  }

  async function updateProduct(
    id: string,
    data: UpdateProductData
  ): Promise<Product | null> {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error || "Erro ao atualizar produto.");
      }

      const result: Product = await response.json();
      return result;
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Erro desconhecido.");
      return null;
    } finally {
      setLoading(false);
    }
  }

  async function deleteProduct(id: string): Promise<boolean> {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/products/${id}`, { method: "DELETE" });
      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error || "Erro ao excluir produto.");
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

  return { createProduct, updateProduct, deleteProduct, loading, error };
}
