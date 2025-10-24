"use client";

import { CustomerTable } from "./_components/customer-table";
import { EmptyData } from "../_components/empty-data";
import { LoadingData } from "../_components/loading-data";
import { useCustomerContext } from "../_context/CustomerContext";

export default function ProductPage() {
  const { customers, loading } = useCustomerContext();

  if (loading) return <LoadingData />;
  if (!customers.length) return <EmptyData />;

  return (
    <section className="p-4 space-y-8">
      <CustomerTable customers={customers} />
    </section>
  );
}
