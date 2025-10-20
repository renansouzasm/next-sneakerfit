"use client";

import AppLayout from "../_components/AppLayout";
import MainHeader from "../_components/MainHeader";

import { useCustomers } from "@/lib/hooks/useCustomers";
import { CustomerTable } from "./_components/customer-table";

export default function CustomersPage() {
  const { customers, loading, error } = useCustomers();

  if (loading)
    return (
      <AppLayout>
        <p className="text-gray-400">Carregando clientes</p>
      </AppLayout>
    );
  if (error) return <p className="text-red-500">Erro: {error}</p>;

  return (
    <AppLayout>
      <MainHeader title="Clientes" showAvatars={false} />

      <div className="card-config overflow-x-auto">
        <CustomerTable customers={customers} />
      </div>
    </AppLayout>
  );
}
