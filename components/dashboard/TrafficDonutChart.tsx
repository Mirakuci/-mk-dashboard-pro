"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { useChartTheme } from "./chartTheme";

const data = [
  { name: "Organic", value: 48 },
  { name: "Referral", value: 21 },
  { name: "Ads", value: 17 },
  { name: "Direct", value: 14 },
];

const COLORS = ["#60a5fa", "#38bdf8", "#818cf8", "#a78bfa"];

export default function TrafficDonutChart() {
  const { tooltipStyle } = useChartTheme();

  return (
    <div style={{ width: "100%", height: 220 }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={85}
            paddingAngle={4}
            dataKey="value"
            stroke="none"
          >
            {data.map((_, index) => (
              <Cell key={data[index].name} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={tooltipStyle}
            formatter={(value) => `${value} %`}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="donutLegend">
        {data.map((item, i) => (
          <div key={item.name} className="donutLegendItem">
            <span className="donutDot" style={{ background: COLORS[i] }} />
            <span>{item.name}</span>
            <b>{item.value} %</b>
          </div>
        ))}
      </div>
    </div>
  );
}
