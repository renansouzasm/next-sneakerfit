"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { brand: "Nike", sales: 54000 },
  { brand: "Adidas", sales: 39000 },
  { brand: "New Balance", sales: 22000 },
];

export function SalesByBrandChart() {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={data}>
        <XAxis dataKey="brand" stroke="#9ca3af" />
        <YAxis stroke="#9ca3af" />
        <Tooltip
          contentStyle={{
            background: "#111827",
            border: "1px solid #1f2937",
            color: "#fff",
          }}
          formatter={(value: number) => `R$ ${(value / 1000).toFixed(1)} mil`}
        />
        <Bar dataKey="sales" fill="#ff6b35" radius={[8, 8, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
