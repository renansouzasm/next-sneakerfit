"use client";

import { ProductAdd } from "./_components/product-add";

interface ProductLayoutProps {
  children: React.ReactNode;
}

export default function ProductLayout({ children }: ProductLayoutProps) {

  return (
    <section className="p-4 space-y-8">
      <header className="flex justify-between">
        <h1 className="font-bold">Produtos</h1>

        <ProductAdd />
      </header>

      <main>{children}</main>
    </section>
  );
}
