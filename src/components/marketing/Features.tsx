"use client";

import { motion } from "framer-motion";
import { Zap, Shield, Cpu, BarChart3, Globe, Lock, Sliders } from "lucide-react";

const features = [
  {
    title: "Neural Signal Core",
    description: "Deep learning models trained on petabytes of order book data to predict micro-structure price movements.",
    icon: Cpu,
    className: "md:col-span-2 md:row-span-2 bg-gradient-to-br from-lime/10 via-transparent to-transparent border-lime/20",
    glow: "group-hover:shadow-[0_0_50px_-12px_rgba(198,255,0,0.3)]",
  },
  {
    title: "Backtest Engine v4",
    description: "Run 10-year tick-by-tick simulations in under 2 seconds. zero curve fitting.",
    icon: BarChart3,
    className: "bg-surface",
  },
  {
    title: "Institutional Liquidity",
    description: "Access aggregated dark pools and primary markets with sub-millisecond execution routing.",
    icon: Shield,
    className: "bg-surface",
  },
  {
    title: "Global Macro Scanner",
    description: "Real-time correlation matrix across 45,000+ global assets, equities, and FX.",
    icon: Globe,
    className: "bg-surface",
  },
  {
    title: "Risk Guardrails",
    description: "Automated VaR limits and drawdown stops embedded at the smart-contract level.",
    icon: Lock,
    className: "bg-surface",
  },
  {
    title: "Adaptive Optimiser",
    description: "Dynamic Mean-Variance and Black-Litterman allocation that adjusts to regime shifts.",
    icon: Sliders,
    className: "md:col-span-2 bg-surface",
  },
];

export default function Features() {
  return (
    <section id="features" className="px-6 md:px-12 max-w-7xl mx-auto py-20 relative z-10">
      <div className="text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-display font-black text-3xl md:text-5xl tracking-tight mb-4"
        >
          Institutional Grade. <span className="text-gradient-lime">SaaS Simplicity.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-text-secondary max-w-xl mx-auto font-body"
        >
          Everything you need to find, backtest, and execute quantitative strategies, without the overhead of a quant desk.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[220px]">
        {features.map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className={`group rounded-2xl border border-rim p-8 flex flex-col justify-between hover:border-lime/30 hover:bg-white/[0.02] transition-all duration-500 backdrop-blur-md relative overflow-hidden ${feature.className} ${feature.glow || ""}`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-lime/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="flex flex-col gap-4">
              <div className="w-12 h-12 rounded-xl bg-lime/10 flex items-center justify-center text-lime border border-lime/20 group-hover:scale-110 transition-transform duration-500">
                <feature.icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-display font-bold text-xl mb-2 text-text-primary group-hover:text-lime transition-colors">
                  {feature.title}
                </h3>
                <p className="text-text-secondary text-sm font-body leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 text-xs font-semibold font-display text-lime opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-300">
              Analyze Core <span>&rarr;</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
