"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { name: "Led", value: 12000 },
  { name: "Úno", value: 18000 },
  { name: "Bře", value: 14000 },
  { name: "Dub", value: 22000 },
  { name: "Kvě", value: 26000 },
  { name: "Čvn", value: 30000 },
];

export default function RevenueChart() {
  return (
    <div style={{ width: "100%", height: 260 }}>
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid stroke="rgba(255,255,255,0.05)" />
          <XAxis
            dataKey="name"
            stroke="#6b7c93"
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#6b7c93"
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            contentStyle={{
              background: "#0f1723",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "10px",
              color: "#e8eef7",
            }}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#38bdf8"
            strokeWidth={3}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}