"use client";

import { useOrderContext } from "../_context/OrderContext";
import { OrderTable } from "../_components/order-table";
import { EmptyData } from "../_components/empty-data";
import { LoadingData } from "../_components/loading-data";

export default function OrdersPage() {
  const { orders, loading } = useOrderContext();

  const emptyContent = {
    title: "Lista de Pedidos Vazia",
    message: "Por enquanto não há pedidos, continue navegando pelo dashboard.",
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Pedidos</h1>
          <p className="text-muted-foreground">
            Gerencie os pedidos da sua loja
          </p>
        </div>
      </div>

      {loading ? (
        <LoadingData />
      ) : !orders.length ? (
        <EmptyData title={emptyContent.title} message={emptyContent.message} />
      ) : (
        <OrderTable />
      )}
    </div>
  );
}
