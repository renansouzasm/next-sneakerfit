"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Sneakers", value: 55 },
  { name: "Casual", value: 30 },
  { name: "Performance", value: 15 },
];

const COLORS = ["#ff6b35", "#1e88e5", "#4caf50"];

export function CategorySalesChart() {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          outerRadius={90}
          fill="#8884d8"
          label
        >
          {data.map((_, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            background: "#111827",
            border: "1px solid #1f2937",
            color: "#fff",
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
