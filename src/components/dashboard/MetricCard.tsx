"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { formatNumber, formatCurrency, formatPercent } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: number;
  change: number;
  type: "currency" | "percent" | "number";
  icon: React.ComponentType<{ className?: string }>;
}

import { useState, useEffect } from "react";

function AnimatedValue({ value, type }: { value: number; type: string }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const start = 0;
    const end = value;
    const duration = 1000; // 1s
    let startTime: number | null = null;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease out cubic
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(start + easedProgress * (end - start));
      
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  }, [value]);

  if (type === "currency") return <>{formatCurrency(displayValue)}</>;
  if (type === "percent") return <>{formatPercent(displayValue)}</>;
  return <>{formatNumber(displayValue)}</>;
}

export default function MetricCard({ title, value, change, type, icon: Icon }: MetricCardProps) {
  const isPositive = change >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 rounded-2xl border border-rim bg-surface hover:border-lime/30 hover:bg-white/[0.01] backdrop-blur-md transition-all duration-300 flex flex-col justify-between h-[140px] relative overflow-hidden group"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-lime/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="flex justify-between items-center">
        <span className="text-text-secondary font-body text-xs font-semibold">
          {title}
        </span>
        <div className="w-8 h-8 rounded-lg bg-white/5 border border-rim flex items-center justify-center text-text-muted group-hover:text-lime transition-colors">
          <Icon className="w-4 h-4" />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <h3 className="font-display font-black text-2xl text-text-primary">
          <AnimatedValue value={value} type={type} />
        </h3>
        <div className="flex items-center gap-1">
          <span className={`text-xs font-bold font-display flex items-center ${isPositive ? "text-success" : "text-danger"}`}>
            {isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
            {Math.abs(change).toFixed(2)}%
          </span>
          <span className="text-[10px] text-text-muted font-body">vs last period</span>
        </div>
      </div>
    </motion.div>
  );
}
