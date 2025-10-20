"use client";

import { useProducts } from "@/lib/hooks/useProducts";
import Image from "next/image";
import { formatCurrencyBrl } from "@/utils/formatCurrencyBrl";
import { Card } from "@/components/ui/card";
import avatar from "@/public/sneaker.png";
import AppLayout from "./AppLayout";

export function RecentProductsTable() {
  const { products, loading } = useProducts();
  const recent = products.slice(0, 5);

  if (loading)
    return (
      <AppLayout>
        <p className="text-gray-400">Carregando tarefas</p>
      </AppLayout>
    );

  return (
    <Card className="card-config border-none">
      <div className="p-6">
        <h3 className="m-0 mb-5 text-lg font-semibold text-white">
          Produtos Recentes
        </h3>

        <table className="w-full border-collapse">
          <thead>
            <tr className="text-sm text-[#9ca3af] border-b border-[#1f1f1f]">
              <th className="text-left p-3">Imagem</th>
              <th className="text-left p-3">Produto</th>
              <th className="text-left p-3">Marca</th>
              <th className="text-left p-3">Preço</th>
              <th className="text-left p-3">Estoque</th>
            </tr>
          </thead>

          <tbody>
            {recent.map((product) => (
              <tr
                key={product.id}
                className="border-b border-[#1f1f1f] last:border-none text-white text-sm"
              >
                <td className="p-3">
                  <Image
                    src={product.imageUrl || avatar}
                    alt={product.name}
                    width={40}
                    height={40}
                    className="rounded-md"
                  />
                </td>
                <td className="p-3">{product.name}</td>
                <td className="p-3 capitalize">{product.brand}</td>
                <td className="p-3">{formatCurrencyBrl(product.price)}</td>
                <td className="p-3">{product.stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
