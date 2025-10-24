"use client";

import { ProductTable } from "./_components/product-table";
import { EmptyData } from "../_components/empty-data";
import { LoadingData } from "../_components/loading-data";
import { useProductContext } from "../_context/ProductContext";

export default function ProductPage() {
  const { products, loading } = useProductContext();

  if (loading) return <LoadingData />;
  if (!products.length) return <EmptyData />;

  return (
    <section>
      <div className="bg-card/25 rounded-md overflow-hidden">
        <ProductTable products={products} />
      </div>
    </section>
  );
}
