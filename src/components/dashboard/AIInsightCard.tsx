"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";

interface AIInsightCardProps {
  insight: string;
}

export default function AIInsightCard({ insight }: AIInsightCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="p-5 rounded-2xl border border-lime/30 bg-gradient-to-br from-lime/10 via-ink2 to-transparent backdrop-blur-md relative overflow-hidden group flex flex-col justify-between h-full"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-lime/5 via-transparent to-transparent opacity-50" />
      
      <div>
        <div className="flex items-center gap-2 mb-3">
          <div className="w-7 h-7 rounded-lg bg-lime/20 text-lime border border-lime/30 flex items-center justify-center glow-lime">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <span className="font-display font-black text-xs text-lime tracking-wider uppercase">
            AI Co-Pilot Insight
          </span>
        </div>

        <p className="text-text-primary font-body text-xs font-semibold leading-relaxed mb-4">
          "{insight}"
        </p>
      </div>

      <button className="flex items-center gap-1 text-[10px] font-bold font-display text-lime group-hover:gap-2 transition-all duration-300 self-end">
        Analyze Strategy <ArrowRight className="w-3 h-3" />
      </button>
    </motion.div>
  );
}
