"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Play, Settings, Plus, BarChart3, TrendingUp, Zap } from "lucide-react";
import MetricCard from "@/components/dashboard/MetricCard";
import PortfolioChart from "@/components/dashboard/PortfolioChart";

export default function BacktestPage() {
  const [isRunning, setIsRunning] = useState(false);
  const [hasResults, setHasResults] = useState(false);

  const runBacktest = () => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
      setHasResults(true);
    }, 2000);
  };

  const mockHistory = [
    { name: "2018", value: 100000 },
    { name: "2019", value: 115000 },
    { name: "2020", value: 142000 },
    { name: "2021", value: 138000 },
    { name: "2022", value: 165000 },
    { name: "2023", value: 198000 },
    { name: "2024", value: 245000 },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-display font-black text-2xl text-text-primary">
            Backtest Engine
          </h2>
          <p className="text-xs text-text-muted font-body">
            Simulate strategy execution over historical tick data with sub-second processing.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Configuration Panel */}
        <div className="col-span-1 rounded-2xl border border-rim bg-surface p-6 backdrop-blur-md flex flex-col gap-5">
          <div className="flex items-center gap-2 mb-2">
            <Settings className="w-4 h-4 text-lime" />
            <span className="font-display font-black text-xs text-text-primary tracking-wider uppercase">
              Configuration
            </span>
          </div>

          <div className="flex flex-col gap-3">
            <label className="text-xs font-bold font-display text-text-secondary">Strategy</label>
            <select className="bg-ink2 border border-rim rounded-xl py-2.5 px-3 font-body text-sm text-text-primary focus:outline-none focus:border-lime/40">
              <option>Mean Reversion (RSI + BB)</option>
              <option>MACD Crossover</option>
              <option>Grid Trading Bot</option>
            </select>
          </div>

          <div className="flex flex-col gap-3">
            <label className="text-xs font-bold font-display text-text-secondary">Assets</label>
            <div className="flex flex-wrap gap-2">
              {["AAPL", "TSLA", "NVDA"].map(t => (
                <div key={t} className="px-3 py-1.5 rounded-lg border border-rim bg-ink2 flex items-center gap-1.5 text-xs font-bold font-display text-text-primary">
                  {t} <span className="text-text-muted cursor-pointer hover:text-danger">&times;</span>
                </div>
              ))}
              <button className="p-1 px-2.5 rounded-lg border border-dashed border-rim text-text-muted hover:border-lime/30 hover:text-lime transition-colors">
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-bold font-display text-text-secondary">Start</label>
              <input type="date" className="bg-ink2 border border-rim rounded-xl py-2 px-3 font-body text-xs text-text-primary focus:outline-none" defaultValue="2018-01-01" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-bold font-display text-text-secondary">End</label>
              <input type="date" className="bg-ink2 border border-rim rounded-xl py-2 px-3 font-body text-xs text-text-primary focus:outline-none" defaultValue="2024-01-01" />
            </div>
          </div>

          <button
            onClick={runBacktest}
            disabled={isRunning}
            className="w-full mt-4 bg-lime text-ink font-bold font-display text-sm py-3 rounded-xl glow-lime hover:scale-[1.02] active:scale-98 transition-all duration-300 flex items-center justify-center gap-2 disabled:bg-lime/50 disabled:cursor-not-allowed"
          >
            {isRunning ? (
              <span className="w-4 h-4 border-2 border-ink border-t-transparent rounded-full animate-spin" />
            ) : (
              <Play className="w-4 h-4 text-ink fill-current" />
            )}
            {isRunning ? "Running..." : "Run Simulation"}
          </button>
        </div>

        {/* Results Panel */}
        <div className="col-span-1 lg:col-span-2 rounded-2xl border border-rim bg-surface p-6 backdrop-blur-md flex flex-col min-h-[350px] relative">
          {!hasResults && !isRunning && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
              <BarChart3 className="w-12 h-12 text-text-muted mb-4 stroke-1 animate-pulse" />
              <h3 className="font-display font-bold text-base text-text-primary mb-1">No Simulation Data</h3>
              <p className="text-xs text-text-muted font-body max-w-sm">
                Configure your strategy and date bounds on the left to start fully aggregated tick simulations.
              </p>
            </div>
          )}

          {isRunning && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-surface/50 backdrop-blur-sm z-10 rounded-2xl">
              <div className="w-10 h-10 border-4 border-lime border-t-transparent rounded-full animate-spin mb-4" />
              <h3 className="font-display font-bold text-base text-lime mb-1">Simulating...</h3>
              <p className="text-xs text-text-muted font-body">
                Processing 45.2M data nodes...
              </p>
            </div>
          )}

          {hasResults && !isRunning && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col gap-6 h-full flex-1"
            >
              <div className="grid grid-cols-3 gap-4">
                <MetricCard title="Total Return" value={145.2} change={12.5} type="percent" icon={TrendingUp} />
                <MetricCard title="Sharpe Ratio" value={2.85} change={0.12} type="number" icon={BarChart3} />
                <MetricCard title="Win Rate" value={68.2} change={2.4} type="percent" icon={Zap} />
              </div>

              <div className="flex-1 rounded-xl border border-rim bg-ink2/50 p-4">
                <PortfolioChart data={mockHistory} />
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
