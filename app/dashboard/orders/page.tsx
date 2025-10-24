"use client";

import { EmptyData } from "../_components/empty-data";
import { LoadingData } from "../_components/loading-data";
import { useOrderContext } from "../_context/OrderContext";
import { OrderTable } from "./_components/order-table";

export default function ProductPage() {
  const { orders, loading } = useOrderContext();

  if (loading) return <LoadingData />;
  if (!orders.length) return <EmptyData />;

  return (
    <section className="p-4 space-y-8">
      <OrderTable orders={orders} />
    </section>
  );
}
