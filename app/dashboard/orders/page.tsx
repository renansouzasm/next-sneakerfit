"use client";

import AppLayout from "../_components/AppLayout";
import MainHeader from "../_components/MainHeader";
import { useState } from "react";
import { OrderTable } from "./_components/order-table";
import { useOrders } from "@/lib/hooks/useOrders";

const navItems = [
  "Todos",
  "Pendentes",
  "Processando",
  "Enviados",
  "Concluídos",
  "Cancelados",
];

export default function OrdersPage() {
  const { orders, loading, error } = useOrders();
  const [activeFilter, setActiveFilter] = useState<string>("Todos");

  if (loading)
    return (
      <AppLayout>
        <p className="text-gray-400">Carregando pedidos</p>
      </AppLayout>
    );
  if (error) return <p className="text-red-500">Erro: {error}</p>;

  const filteredOrders =
    activeFilter === "Todos"
      ? orders
      : orders.filter((order) => {
          const filterMap: { [key: string]: string } = {
            Pendentes: "pending",
            Processando: "processing",
            Enviados: "shipped",
            Concluídos: "completed",
            Cancelados: "canceled",
          };
          return order.status === filterMap[activeFilter];
        });

  return (
    <AppLayout>
      <MainHeader title="Pedidos" />

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
        <OrderTable filtered={filteredOrders} />
      </div>
    </AppLayout>
  );
}
