"use client";

import AppLayout from "../_components/AppLayout";
import MainHeader from "../_components/MainHeader";
import { useState } from "react";
import { useProducts } from "@/lib/hooks/useProducts";
import { ProductTable } from "./_components/product-table";
import { ProductStatus } from "@/app.types";
const navItems = ["Todos", "Disponível", "Baixo Estoque", "Sem Estoque"];

export default function ProductsPage() {
  const { products, loading, error } = useProducts();
  const [activeFilter, setActiveFilter] = useState<string>("Todos");

  if (loading)
    return (
      <AppLayout>
        <p className="text-gray-400">Carregando produtos</p>
      </AppLayout>
    );
  if (error) return <p className="text-red-500">Erro: {error}</p>;

  const filteredProducts =
    activeFilter === "Todos"
      ? products
      : products.filter((product) => {
          const filterMap: { [key: string]: ProductStatus } = {
            Disponível: ProductStatus.AVAILABLE,
            "Baixo Estoque": ProductStatus.LOW_STOCK,
            "Sem Estoque": ProductStatus.NO_STOCK,
          };
          return product.status === filterMap[activeFilter];
        });

  return (
    <AppLayout>
      <MainHeader
        title="Produtos"
        url={`${process.env.NEXT_PUBLIC_HOST_URL}/dashboard/products/new`}
      />

      <nav className="flex items-center text-[15px] py-5 gap-6">
        {navItems.map((item) => (
          <button
            key={item}
            onClick={() => setActiveFilter(item)}
            className={`text-[#5c5c5c] no-underline transition-colors duration-300 pb-2 border-b-2 border-transparent cursor-pointer hover:text-white ${
              item === activeFilter ? "border-b-orange text-white" : ""
            }`}
          >
            {item}
          </button>
        ))}
      </nav>

      <div className="card-config overflow-x-auto">
        <ProductTable products={filteredProducts} />
      </div>
    </AppLayout>
  );
}
