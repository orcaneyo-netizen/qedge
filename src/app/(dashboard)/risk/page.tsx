"use client";

import { motion } from "framer-motion";
import { Shield, AlertTriangle, Percent, ArrowUpRight } from "lucide-react";
import MetricCard from "@/components/dashboard/MetricCard";

const mockRisks = [
  { metric: "Value at Risk (VaR)", value: "3.24%", threshold: "5.00%", status: "NORMAL" },
  { metric: "Conditional VaR (CVaR)", value: "4.85%", threshold: "7.00%", status: "NORMAL" },
  { metric: "Max Drawdown (30D)", value: "-1.82%", threshold: "-3.00%", status: "NORMAL" },
  { metric: "Beta vs SPY", value: "1.18", threshold: "1.20", status: "WARNING" },
  { metric: "Sharpe (Daily)", value: "3.12", threshold: "2.00", status: "NORMAL" },
];

export default function RiskPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-display font-black text-2xl text-text-primary flex items-center gap-2">
            Risk Management <Shield className="w-5 h-5 text-lime glow-lime" />
          </h2>
          <p className="text-xs text-text-muted font-body">
            Monitor Value at Risk, Greek exposures, and automated Stress-Test simulations.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard title="Stress Test Margin" value={82.5} change={0} type="percent" icon={Shield} />
        <MetricCard title="Daily VaR" value={3.24} change={-0.15} type="percent" icon={AlertTriangle} />
        <MetricCard title="Beta Exposure" value={1.18} change={0.02} type="number" icon={Percent} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
        {/* Risk Metrics Table */}
        <div className="lg:col-span-2 rounded-2xl border border-rim bg-surface backdrop-blur-md p-6 flex flex-col gap-4">
          <h3 className="font-display font-black text-sm text-text-primary tracking-wider uppercase mb-2">
            Risk Parameters & Thresholds
          </h3>

          <div className="overflow-x-auto flex flex-col flex-1">
            <div className="grid grid-cols-4 border-b border-rim pb-3 text-[11px] font-bold font-display text-text-muted tracking-wider uppercase">
              <div>Metric</div>
              <div>Current Value</div>
              <div>Threshold</div>
              <div>Status</div>
            </div>

            <div className="flex flex-col divide-y divide-rim flex-1">
              {mockRisks.map((r, i) => (
                <motion.div
                  key={r.metric}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="grid grid-cols-4 py-3.5 items-center font-body text-sm text-text-secondary hover:bg-white/[0.01] transition-colors"
                >
                  <div className="font-display font-bold text-xs text-text-primary">
                    {r.metric}
                  </div>
                  <div className="font-semibold text-text-primary">{r.value}</div>
                  <div className="text-text-muted">{r.threshold}</div>
                  <div>
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${
                      r.status === "NORMAL" ? "bg-success/10 text-success border-success/20" : "bg-warning/10 text-warning border-warning/20"
                    }`}>
                      {r.status}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Stress Test Simulation grid side bar */}
        <div className="rounded-2xl border border-rim bg-surface p-6 backdrop-blur-md flex flex-col gap-4">
          <h3 className="font-display font-black text-sm text-text-primary tracking-wider uppercase mb-2">
            Stress Test Simulations
          </h3>

          <div className="flex flex-col gap-3">
            {[
              { name: "2008 Financial Crisis", res: "-12.4%", status: "SAFE" },
              { name: "VIX @ 40 Spike", res: "-5.8%", status: "SAFE" },
              { name: "Tech Sell-off (-15%)", res: "-18.2%", status: "WARNING" },
            ].map(s => (
              <div key={s.name} className="p-3 rounded-xl border border-rim bg-ink2/50 flex flex-col gap-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-display font-bold text-text-primary">{s.name}</span>
                  <span className={`text-[10px] font-bold ${s.status === "SAFE" ? "text-success" : "text-warning"}`}>{s.status}</span>
                </div>
                <div className="flex justify-between items-center text-[10px] text-text-secondary font-body">
                  <span>Simulated Result: <span className={s.status === "SAFE" ? "text-success" : "text-danger"}>{s.res}</span></span>
                  <span className="flex items-center gap-0.5 text-lime cursor-pointer hover:underline">Re-run <ArrowUpRight className="w-2.5 h-2.5" /></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
