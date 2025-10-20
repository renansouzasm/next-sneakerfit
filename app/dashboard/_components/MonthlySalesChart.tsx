"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { month: "Jan", sales: 21000 },
  { month: "Fev", sales: 28000 },
  { month: "Mar", sales: 32000 },
  { month: "Abr", sales: 45000 },
  { month: "Mai", sales: 37000 },
  { month: "Jun", sales: 42000 },
];

export function MonthlySalesChart() {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={data}>
        <XAxis dataKey="month" stroke="#9ca3af" />
        <YAxis stroke="#9ca3af" />
        <Tooltip
          contentStyle={{
            background: "#111827",
            border: "1px solid #1f2937",
            color: "#fff",
          }}
          formatter={(value: number) =>
            `R$ ${(value / 1000).toFixed(1)} mil`
          }
        />
        <Line
          type="monotone"
          dataKey="sales"
          stroke="#1e88e5"
          strokeWidth={3}
          dot={{ r: 4 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
