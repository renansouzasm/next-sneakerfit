"use client";

import { Download, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useProductContext } from "../_context/ProductContext";
import { ProductCreationForm } from "../_components/product-creation-form";
import { ProductTable } from "../_components/product-table";
import { useState } from "react";
import { LoadingData } from "../_components/loading-data";
import { EmptyData } from "../_components/empty-data";
import { exportToPDF } from "@/utils/exportToPdf";

export default function ProductsPage() {
  const { products, loading } = useProductContext();
  const [isCreating, setIsCreating] = useState(false);

  const emptyContent = {
    title: "Lista de Produtos Vazia",
    message: "Adicione novos produtos, ou continue navegando pelo dashboard.",
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Produtos</h1>
          <p className="text-muted-foreground">
            Gerencie seu catálogo de sneakers
          </p>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            className="cursor-pointer"
            onClick={() => exportToPDF(products, "relatorio-sneakerfit")}
          >
            <Download className="mr-2 h-4 w-4" />
            Exportar PDF
          </Button>

          <Button
            className="cursor-pointer"
            onClick={() => setIsCreating(true)}
          >
            <Plus />
            Novo Produto
          </Button>
        </div>
      </div>

      {loading ? (
        <LoadingData />
      ) : !products.length ? (
        <EmptyData title={emptyContent.title} message={emptyContent.message}>
          <Button
            className="cursor-pointer"
            onClick={() => setIsCreating(true)}
          >
            <Plus />
            Novo Produto
          </Button>
        </EmptyData>
      ) : (
        <ProductTable />
      )}

      <ProductCreationForm
        isCreating={isCreating}
        setIsCreating={setIsCreating}
      />
    </div>
  );
}
