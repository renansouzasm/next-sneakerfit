"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", value: 80 },
  { month: "Fev", value: 120 },
  { month: "Mar", value: 150 },
  { month: "Abr", value: 200 },
  { month: "Mai", value: 170 },
  { month: "Jun", value: 210 },
];

export function PerformanceChart() {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <AreaChart data={data}>
        <XAxis dataKey="month" stroke="#9ca3af" />
        <YAxis stroke="#9ca3af" />
        <Tooltip
          contentStyle={{
            background: "#111827",
            border: "1px solid #1f2937",
            color: "#fff",
          }}
        />
        <Area
          type="monotone"
          dataKey="value"
          stroke="#ff6b35"
          fill="rgba(255,107,53,0.2)"
          strokeWidth={3}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
