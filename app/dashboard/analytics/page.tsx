"use client";

import AppLayout from "../_components/AppLayout";
import MainHeader from "../_components/MainHeader";
import { Card, CardContent } from "@/components/ui/card";
import { CategorySalesChart } from "./_components/category-sales-chart";
import { PerformanceChart } from "./_components/performance-chart";

export default function AnalyticsPage() {
  return (
    <AppLayout>
      <MainHeader title="Análises" showAvatars={false} showAddButton={false} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="card-config border-none">
          <CardContent className="p-6">
            <h3 className="m-0 mb-5 text-lg font-semibold text-white">
              Vendas por Categoria
            </h3>
            <CategorySalesChart />
          </CardContent>
        </Card>

        <Card className="card-config border-none">
          <CardContent className="p-6">
            <h3 className="m-0 mb-5 text-lg font-semibold text-white">
              Performance Mensal
            </h3>
            <PerformanceChart />
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
