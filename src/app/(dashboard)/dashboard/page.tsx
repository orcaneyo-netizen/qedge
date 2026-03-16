"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { DollarSign, Percent, TrendingUp, Zap } from "lucide-react";
import MetricCard from "@/components/dashboard/MetricCard";
import PortfolioChart from "@/components/dashboard/PortfolioChart";
import SignalFeed, { Signal } from "@/components/dashboard/SignalFeed";
import AIInsightCard from "@/components/dashboard/AIInsightCard";
import { fetchDashboard } from "@/lib/api";

export default function DashboardPage() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    async function load() {
      const res = await fetchDashboard();
      setData(res);
    }
    load();
  }, []);

  if (!data) return <div className="text-text-muted">Loading...</div>;

  return (
    <div className="flex flex-col gap-6 h-full">
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Portfolio Value"
          value={data.metrics.totalValue}
          change={2.45}
          type="currency"
          icon={DollarSign}
        />
        <MetricCard
          title="Today's Return"
          value={data.metrics.todayReturn}
          change={1.2}
          type="percent"
          icon={Percent}
        />
        <MetricCard
          title="Win Rate"
          value={data.metrics.winRate}
          change={-0.5}
          type="percent"
          icon={Zap}
        />
        <MetricCard
          title="Sharpe Ratio"
          value={data.metrics.sharpeRatio}
          change={0.15}
          type="number"
          icon={TrendingUp}
        />
      </div>

      {/* Main Grid: Chart + Side Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
        <div className="lg:col-span-2 rounded-2xl border border-rim bg-surface p-6 backdrop-blur-md flex flex-col h-full min-h-[300px]">
          <PortfolioChart data={data.portfolioHistory} />
        </div>

        <div className="flex flex-col gap-4 h-full min-h-0">
          <div className="h-[140px]">
            <AIInsightCard insight={data.insights} />
          </div>
          <div className="flex-1 rounded-2xl border border-rim bg-surface p-5 backdrop-blur-md flex flex-col min-h-0 overflow-hidden">
            <SignalFeed signals={data.signals} />
          </div>
        </div>
      </div>
    </div>
  );
}
