"use client";

import AppLayout from "./_components/AppLayout";
import MainHeader from "./_components/MainHeader";
import { Card, CardContent } from "@/components/ui/card";
import { StatsCards } from "./_components/StatsCards";
import { RecentProductsTable } from "./_components/RecentProductsTable";
import { SalesByBrandChart } from "./_components/SalesByBrandChart";
import { MonthlySalesChart } from "./_components/MonthlySalesChart";

export default function DashboardPage() {
  return (
    <AppLayout>
      <MainHeader title="Dashboard" />

      <StatsCards />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        <Card className="card-config border-none">
          <CardContent className="p-6">
            <h3 className="m-0 mb-5 text-lg font-semibold text-white">
              Vendas por Marca
            </h3>
            <SalesByBrandChart />
          </CardContent>
        </Card>

        <Card className="card-config border-none">
          <CardContent className="p-6">
            <h3 className="m-0 mb-5 text-lg font-semibold text-white">
              Vendas Mensais
            </h3>
            <MonthlySalesChart />
          </CardContent>
        </Card>
      </div>

      <RecentProductsTable />
    </AppLayout>
  );
}
