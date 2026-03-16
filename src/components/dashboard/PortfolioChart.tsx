"use client";

import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts";

interface PortfolioChartProps {
  data: { name: string; value: number }[];
}

export default function PortfolioChart({ data }: PortfolioChartProps) {
  return (
    <div className="w-full h-full min-h-[300px] flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="font-display font-black text-sm text-text-primary tracking-wider uppercase">
            Portfolio Value (24H)
          </h3>
          <p className="text-xs text-text-muted font-body">
            Real-time equity curve simulation
          </p>
        </div>
        <div className="flex gap-2">
          {["1H", "24H", "7D", "30D"].map((t) => (
            <button
              key={t}
              className={`px-3 py-1 rounded-md font-display font-bold text-[10px] border transition-all duration-200 ${
                t === "24H"
                  ? "bg-lime/10 text-lime border-lime/30 glow-lime"
                  : "bg-surface border-rim text-text-secondary hover:bg-surface-hover"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--lime)" stopOpacity={0.25} />
                <stop offset="100%" stopColor="var(--lime)" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="name"
              stroke="var(--rim)"
              tick={{ fill: "var(--text-muted)", fontSize: 10, fontFamily: "var(--font-body)" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              stroke="var(--rim)"
              tick={{ fill: "var(--text-muted)", fontSize: 10, fontFamily: "var(--font-body)" }}
              axisLine={false}
              tickLine={false}
              domain={["dataMin - 500", "dataMax + 500"]}
            />
            <Tooltip
              contentStyle={{
                background: "var(--ink2)",
                border: "1px solid var(--rim-strong)",
                borderRadius: "12px",
                backdropFilter: "blur(10px)",
                fontFamily: "var(--font-display)",
                fontSize: "12px",
                color: "var(--text-primary)",
              }}
              labelStyle={{ color: "var(--text-muted)", marginBottom: "4px" }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="var(--lime)"
              strokeWidth={2}
              fill="url(#chartGrad)"
              className="chart-line-draw"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
