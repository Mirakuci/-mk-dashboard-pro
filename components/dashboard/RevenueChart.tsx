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
import { useChartTheme } from "./chartTheme";

const data = [
  { name: "Led", value: 12000 },
  { name: "Úno", value: 18000 },
  { name: "Bře", value: 14000 },
  { name: "Dub", value: 22000 },
  { name: "Kvě", value: 26000 },
  { name: "Čvn", value: 30000 },
];

export default function RevenueChart() {
  const { tooltipStyle, gridStroke, axisStroke } = useChartTheme();

  return (
    <div style={{ width: "100%", height: 260 }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid stroke={gridStroke} />
          <XAxis
            dataKey="name"
            stroke={axisStroke}
            tickLine={false}
            axisLine={false}
          />
          <YAxis stroke={axisStroke} tickLine={false} axisLine={false} />
          <Tooltip contentStyle={tooltipStyle} />
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
