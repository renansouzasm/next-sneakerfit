"use client";

import { ProductTable } from "./_components/product-table";
import { EmptyData } from "./_components/empty-data";
import { LoadingData } from "../_components/loading-data";
import { useProductContext } from "../_context/ProductContext";
import { ProductAdd } from "./_components/product-add";

export default function ProductPage() {
  const { products, loading } = useProductContext();

  return (
    <main className="py-16">
      <div className="layout-size space-y-8">
        <header className="flex justify-between">
          <h1 className="text-foreground font-bold text-xl tracking-widest">
            Produtos
          </h1>

          <ProductAdd />
        </header>

        {loading ? (
          <LoadingData />
        ) : !products.length ? (
          <EmptyData />
        ) : (
          <ProductTable products={products} />
        )}
      </div>
    </main>
  );
}
