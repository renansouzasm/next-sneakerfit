import { BarChart3, ShoppingBag, Users, Package } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const statsData = [
  {
    icon: BarChart3,
    value: "R$ 45.280",
    label: "Vendas Hoje",
    color: "bg-[#ff6b35]",
  },
  {
    icon: ShoppingBag,
    value: "127",
    label: "Pedidos",
    color: "bg-[#1e88e5]",
  },
  {
    icon: Users,
    value: "1.234",
    label: "Clientes",
    color: "bg-[#d32f2f]",
  },
  {
    icon: Package,
    value: "856",
    label: "Produtos",
    color: "bg-[#4caf50]",
  },
];

export function StatsCards() {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-5 mb-10 max-sm:grid-cols-1">
      {statsData.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index} className="card-config transition-all duration-200 border-none">
            <CardContent className="p-6 flex items-center gap-4">
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl text-white ${stat.color} shadow-lg`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">
                  {stat.value}
                </div>
                <div className="text-sm text-[#9ca3af]">{stat.label}</div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
