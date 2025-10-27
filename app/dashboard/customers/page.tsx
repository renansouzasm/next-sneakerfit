"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCustomerContext } from "../_context/CustomerContext";
import { CustomerTable } from "../_components/customer-table";
import { CustomerCreationForm } from "../_components/customer-creation-form";
import { useState } from "react";
import { EmptyData } from "../_components/empty-data";
import { LoadingData } from "../_components/loading-data";

export default function CustomersPage() {
  const { customers, loading } = useCustomerContext();
  const [isCreating, setIsCreating] = useState(false);

  const emptyContent = {
    title: "Lista de Clientes Vazia",
    message: "Adicione novos clientes, ou continue navegando pelo dashboard.",
  };

  return (
    <section className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Clientes</h1>
          <p className="text-muted-foreground">
            Gerencie os clientes da sua loja
          </p>
        </div>

        <Button className="cursor-pointer" onClick={() => setIsCreating(true)}>
          <Plus />
          Novo Cliente
        </Button>
      </div>

      {loading ? (
        <LoadingData />
      ) : !customers.length ? (
        <EmptyData title={emptyContent.title} message={emptyContent.message}>
          <Button
            className="cursor-pointer"
            onClick={() => setIsCreating(true)}
          >
            <Plus />
            Novo Cliente
          </Button>
        </EmptyData>
      ) : (
        <CustomerTable />
      )}

      <CustomerCreationForm
        isCreating={isCreating}
        setIsCreating={setIsCreating}
      />
    </section>
  );
}
