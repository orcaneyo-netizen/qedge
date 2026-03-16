"use client";

import { motion } from "framer-motion";
import { DollarSign, Briefcase, Percent, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react";
import MetricCard from "@/components/dashboard/MetricCard";
import PortfolioChart from "@/components/dashboard/PortfolioChart";

const mockHoldings = [
  { ticker: "AAPL", shares: 150, avgPrice: 165.40, currentPrice: 175.24, value: 26286.00, return: 5.95 },
  { ticker: "NVDA", shares: 30, avgPrice: 720.00, currentPrice: 882.12, value: 26463.60, return: 22.51 },
  { ticker: "MSFT", shares: 80, avgPrice: 410.20, currentPrice: 420.55, value: 33644.00, return: 2.52 },
  { ticker: "TSLA", shares: 100, avgPrice: 185.00, currentPrice: 168.10, value: 16810.00, return: -9.13 },
];

export default function PortfolioPage() {
  const totalValue = mockHoldings.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-display font-black text-2xl text-text-primary">
            Portfolio Management
          </h2>
          <p className="text-xs text-text-muted font-body">
            Monitor current holdings, allocation weightings, and risk attributes.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard title="Equity Value" value={totalValue} change={2.8} type="currency" icon={Briefcase} />
        <MetricCard title="Cash Balance" value={12000.50} change={0} type="currency" icon={DollarSign} />
        <MetricCard title="Margin Usage" value={25.4} change={-1.2} type="percent" icon={Percent} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
        {/* Holdings Table */}
        <div className="lg:col-span-2 rounded-2xl border border-rim bg-surface backdrop-blur-md p-6 flex flex-col gap-4">
          <h3 className="font-display font-black text-sm text-text-primary tracking-wider uppercase mb-2">
            Current Holdings
          </h3>

          <div className="overflow-x-auto flex flex-col flex-1">
            <div className="grid grid-cols-5 border-b border-rim pb-3 text-[11px] font-bold font-display text-text-muted tracking-wider uppercase">
              <div>Asset</div>
              <div>Qty</div>
              <div>Avg Cost</div>
              <div>Market</div>
              <div>Return</div>
            </div>

            <div className="flex flex-col divide-y divide-rim flex-1">
              {mockHoldings.map((h, i) => (
                <motion.div
                  key={h.ticker}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="grid grid-cols-5 py-3.5 items-center font-body text-sm text-text-secondary hover:bg-white/[0.01] transition-colors"
                >
                  <div className="font-display font-black text-sm text-text-primary">
                    {h.ticker}
                  </div>
                  <div>{h.shares}</div>
                  <div>${h.avgPrice.toFixed(2)}</div>
                  <div className="font-semibold text-text-primary">${h.currentPrice.toFixed(2)}</div>
                  <div className={`font-bold flex items-center gap-1 ${h.return >= 0 ? "text-success" : "text-danger"}`}>
                    {h.return >= 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    {Math.abs(h.return).toFixed(2)}%
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Allocation/Optimizer side panel */}
        <div className="rounded-2xl border border-rim bg-surface p-6 backdrop-blur-md flex flex-col gap-5">
          <h3 className="font-display font-black text-sm text-text-primary tracking-wider uppercase mb-2">
            Target Allocation
          </h3>
          <div className="flex flex-col gap-3">
            {mockHoldings.map(h => {
              const weight = (h.value / totalValue) * 100;
              return (
                <div key={h.ticker} className="flex flex-col gap-1">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-display font-bold text-text-primary">{h.ticker}</span>
                    <span className="font-body text-text-secondary">{weight.toFixed(1)}%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-ink2 border border-rim overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${weight}%` }}
                      transition={{ duration: 1 }}
                      className="h-full bg-lime rounded-full glow-lime"
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <button className="w-full mt-2 bg-transparent border border-lime text-lime font-bold font-display text-xs py-2.5 rounded-xl hover:bg-lime/10 hover:shadow-[0_0_15px_-5px_var(--lime)] active:scale-98 transition-all duration-300">
            Run Optimizer
          </button>
        </div>
      </div>
    </div>
  );
}
