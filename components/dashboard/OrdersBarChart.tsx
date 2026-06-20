"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useChartTheme } from "./chartTheme";

const data = [
  { name: "Po", orders: 42 },
  { name: "Út", orders: 38 },
  { name: "St", orders: 55 },
  { name: "Čt", orders: 47 },
  { name: "Pá", orders: 63 },
  { name: "So", orders: 29 },
  { name: "Ne", orders: 18 },
];

export default function OrdersBarChart() {
  const { tooltipStyle, gridStroke, axisStroke } = useChartTheme();

  return (
    <div style={{ width: "100%", height: 260 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid stroke={gridStroke} vertical={false} />
          <XAxis
            dataKey="name"
            stroke={axisStroke}
            tickLine={false}
            axisLine={false}
          />
          <YAxis stroke={axisStroke} tickLine={false} axisLine={false} />
          <Tooltip contentStyle={tooltipStyle} />
          <Bar
            dataKey="orders"
            fill="url(#barGradient)"
            radius={[6, 6, 0, 0]}
            maxBarSize={36}
          />
          <defs>
            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#60a5fa" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
          </defs>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
