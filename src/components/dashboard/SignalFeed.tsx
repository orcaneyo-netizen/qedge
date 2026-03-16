"use client";

import { motion, AnimatePresence } from "framer-motion";

export interface Signal {
  ticker: string;
  type: "BUY" | "SELL";
  price: number;
  time: string;
  strength: "STRONG" | "MODERATE" | "WEAK";
}

interface SignalFeedProps {
  signals: Signal[];
}

export default function SignalFeed({ signals }: SignalFeedProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-display font-black text-sm text-text-primary tracking-wider uppercase">
          Live Signals
        </h3>
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-lime"></span>
        </span>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 flex flex-col gap-2">
        <AnimatePresence>
          {signals.map((signal, i) => (
            <motion.div
              key={`${signal.ticker}-${signal.time}-${i}`}
              initial={{ opacity: 0, x: 50, y: -10 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.3 }}
              className="p-3 rounded-xl border border-rim bg-surface hover:border-lime/20 flex justify-between items-center group backdrop-blur-md"
            >
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center font-display font-black text-xs ${
                  signal.type === "BUY" ? "bg-success/10 text-success border border-success/20" : "bg-danger/10 text-danger border border-danger/20"
                }`}>
                  {signal.type}
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm text-text-primary group-hover:text-lime transition-colors">
                    {signal.ticker}
                  </h4>
                  <p className="text-[10px] text-text-muted font-body">
                    at ${signal.price.toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <span className={`text-[9px] font-bold font-display px-2 py-0.5 rounded-full ${
                  signal.strength === "STRONG" ? "bg-lime/20 text-lime border border-lime/30" :
                  signal.strength === "MODERATE" ? "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20" :
                  "bg-white/10 text-white border border-white/20"
                }`}>
                  {signal.strength}
                </span>
                <p className="text-[9px] text-text-muted font-body mt-1">
                  {signal.time}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
