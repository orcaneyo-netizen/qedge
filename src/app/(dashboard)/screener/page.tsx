"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, ArrowUpDown } from "lucide-react";

const mockStocks = [
  { ticker: "AAPL", name: "Apple Inc.", Price: 175.24, Change: 1.25, Rsi: 62.4, Volume: "85M", Signal: "BUY" },
  { ticker: "TSLA", name: "Tesla Inc.", Price: 168.10, Change: -0.85, Rsi: 41.2, Volume: "110M", Signal: "HOLD" },
  { ticker: "NVDA", name: "NVIDIA Corp.", Price: 882.12, Change: 4.15, Rsi: 78.5, Volume: "52M", Signal: "STRONG BUY" },
  { ticker: "MSFT", name: "Microsoft Corp.", Price: 420.55, Change: 0.65, Rsi: 58.9, Volume: "40M", Signal: "BUY" },
  { ticker: "AMD", name: "AMD", Price: 195.40, Change: 2.30, Rsi: 65.1, Volume: "38M", Signal: "BUY" },
  { ticker: "NFLX", name: "Netflix Inc.", Price: 610.20, Change: -1.45, Rsi: 48.3, Volume: "22M", Signal: "HOLD" },
];

export default function ScreenerPage() {
  const [search, setSearch] = useState("");

  const filtered = mockStocks.filter(
    s => s.ticker.toLowerCase().includes(search.toLowerCase()) || 
         s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-display font-black text-2xl text-text-primary">
            Market Screener
          </h2>
          <p className="text-xs text-text-muted font-body">
            Filter institutional data feeds by technical triggers and volume profiles.
          </p>
        </div>
      </div>

      <div className="flex gap-4 items-center">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            placeholder="Search symbol or company..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-surface border border-rim rounded-xl py-2.5 pl-11 pr-4 font-body text-sm text-text-primary focus:outline-none focus:border-lime/40 backdrop-blur-md"
          />
        </div>
        <button className="px-4 py-2.5 rounded-xl border border-rim bg-surface flex items-center gap-2 hover:border-lime/30 text-xs font-bold font-display text-text-secondary">
          <Filter className="w-4 h-4" /> Filters
        </button>
      </div>

      <div className="rounded-2xl border border-rim bg-surface backdrop-blur-md overflow-hidden flex flex-col">
        <div className="grid grid-cols-6 border-b border-rim p-4 text-[11px] font-bold font-display text-text-muted tracking-wider uppercase">
          <div className="col-span-2">Company</div>
          <div className="flex items-center gap-1 cursor-pointer hover:text-text-primary">Price <ArrowUpDown className="w-3 h-3" /></div>
          <div className="flex items-center gap-1 cursor-pointer hover:text-text-primary">Change <ArrowUpDown className="w-3 h-3" /></div>
          <div>RSI (14)</div>
          <div>Signal</div>
        </div>

        <div className="flex flex-col flex-1 divide-y divide-rim">
          {filtered.map((stock, i) => (
            <motion.div
              key={stock.ticker}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="grid grid-cols-6 p-4 items-center font-body text-sm text-text-secondary hover:bg-white/[0.01] transition-colors"
            >
              <div className="col-span-2 flex flex-col">
                <span className="font-display font-black text-sm text-text-primary group-hover:text-lime">
                  {stock.ticker}
                </span>
                <span className="text-[10px] text-text-muted">{stock.name}</span>
              </div>
              <div className="font-semibold text-text-primary">
                ${stock.Price.toFixed(2)}
              </div>
              <div className={`font-bold text-xs ${stock.Change >= 0 ? "text-success" : "text-danger"}`}>
                {stock.Change >= 0 ? "+" : ""}{stock.Change.toFixed(2)}%
              </div>
              <div className="text-xs">
                {stock.Rsi.toFixed(1)}
              </div>
              <div>
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                  stock.Signal.includes("BUY") ? "bg-success/10 text-success border border-success/20" : "bg-surface border border-rim text-text-muted"
                }`}>
                  {stock.Signal}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
