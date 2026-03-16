"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Terminal, ArrowRight, Play } from "lucide-react";
import { useState, useRef } from "react";

const SIMULATED_SNIPPETS = {
  rsi: [
    { text: "# 💻 Initializing VectorBT Backtest Engine...", delay: 40 },
    { text: "import vectorbt as vbt", delay: 30 },
    { text: "import pandas_ta as ta", delay: 30 },
    { text: " ", delay: 10 },
    { text: "# 📊 Fetching OHLCV from app.services.data_service", delay: 30 },
    { text: "df = await data_service.get_ohlcv('AAPL', '2024-01-01', '2026-06-01')", delay: 40 },
    { text: "close = df['close']", delay: 20 },
    { text: " ", delay: 10 },
    { text: "# 📐 Computing indicators with pandas-ta", delay: 30 },
    { text: "rsi = ta.rsi(close, length=14)", delay: 30 },
    { text: " ", delay: 10 },
    { text: "# 🔔 Generating signals: Buy if RSI < 30, Sell if RSI > 70", delay: 40 },
    { text: "entries = (rsi < 30).shift(1).fillna(False)", delay: 40 },
    { text: "exits = (rsi > 70).shift(1).fillna(False)", delay: 40 },
    { text: " ", delay: 10 },
    { text: "# 🚀 Running Simulation...", delay: 50 },
    { text: "pf = vbt.Portfolio.from_signals(close, entries, exits, fees=0.001)", delay: 40 },
    { text: "print(pf.stats())", delay: 30 },
  ],
  default: [
    { text: "# 💻 Initializing Backtest Engine...", delay: 40 },
    { text: "import vectorbt as vbt", delay: 30 },
    { text: "import pandas_ta as ta", delay: 30 },
    { text: " ", delay: 10 },
    { text: "# 📊 Fetching accurate full data structures", delay: 30 },
    { text: "df = await data_service.get_ohlcv('SPY', '2024-01-01', 'now')", delay: 40 },
    { text: " ", delay: 10 },
    { text: "# 📐 Preparing triggers...", delay: 30 },
    { text: "print('Engine Online')", delay: 30 },
  ]
};

export default function AICopilotDemo() {
  const [typedText, setTypedText] = useState<string[]>([]);
  const [prompt, setPrompt] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  
  const handleSimulate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isTyping) return;
    
    setIsTyping(true);
    setTypedText([]);
    
    const snippetType = prompt.toLowerCase().includes("rsi") ? "rsi" : "default";
    const snippets = SIMULATED_SNIPPETS[snippetType];
    
    let currentLine = 0;
    let currentChar = 0;
    
    const interval = setInterval(() => {
      if (currentLine >= snippets.length) {
        clearInterval(interval);
        setIsTyping(false);
        return;
      }
      
      const line = snippets[currentLine].text;
      if (currentChar < line.length) {
        setTypedText(prev => {
          const newLines = [...prev];
          if (!newLines[currentLine]) newLines[currentLine] = "";
          newLines[currentLine] += line[currentChar];
          return newLines;
        });
        currentChar++;
      } else {
        currentLine++;
        currentChar = 0;
      }
      
      if (terminalRef.current) {
        terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
      }
    }, 20);
  };

  return (
    <section className="px-6 md:px-12 max-w-7xl mx-auto py-20 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 mb-4 text-lime font-display text-xs font-bold uppercase tracking-wider"
          >
            <Sparkles className="w-4 h-4 text-lime" />
            AI Co-Pilot
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-display font-black text-3xl md:text-5xl tracking-tight mb-6"
          >
            Build Strategies in <br />
            <span className="text-gradient-lime">Plain English.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-text-secondary font-body mb-8 max-w-md"
          >
            Tell the AI exactly what you want it to look for. It outputs optimized production-ready Python backtest scripts internally leveraging VectorBT and Pandas-TA.
          </motion.p>

          <motion.form 
            onSubmit={handleSimulate}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center gap-2 p-1.5 rounded-xl border border-rim bg-surface/50 backdrop-blur-sm max-w-md"
          >
            <input 
              type="text" 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder='e.g., "Buy Apple when RSI is under 30"'
              className="flex-1 bg-transparent border-none outline-none text-sm text-text-primary px-3 font-body"
              disabled={isTyping}
            />
            <button 
              type="submit"
              disabled={isTyping || !prompt.trim()}
              className="p-2.5 rounded-lg bg-lime text-ink font-bold transition-all hover:bg-lime/90 disabled:opacity-50 disabled:cursor-not-allowed group flex items-center justify-center"
            >
              {isTyping ? <Play className="w-4 h-4 animate-pulse" /> : <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />}
            </button>
          </motion.form>
        </div>

        <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="rounded-2xl border border-rim bg-ink2 backdrop-blur-md overflow-hidden shadow-2xl h-[360px] flex flex-col"
          >
            <div className="p-4 bg-surface border-b border-rim flex items-center justify-between">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
              </div>
              <div className="text-[10px] text-text-muted font-display flex items-center gap-1">
                <Terminal className="w-3 h-3" /> quant_bot.py
              </div>
            </div>
            <div 
              ref={terminalRef}
              className="p-6 font-mono text-[11px] leading-relaxed text-text-secondary flex-1 overflow-y-auto"
            >
              <AnimatePresence>
                {typedText.length === 0 && !isTyping && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-text-muted italic flex items-center h-full justify-center"
                  >
                    Enter a strategy prompt on the left to generate logic...
                  </motion.div>
                )}
              </AnimatePresence>

              {typedText.map((line, i) => (
                <div key={i} className="flex gap-4">
                  <span className="text-white/20 select-none w-4">{i + 1}</span>
                  <span className={line.startsWith("#") ? "text-text-muted" : "text-lime/90"}>{line}</span>
                </div>
              ))}
              {isTyping && <span className="inline-block w-2 h-4 bg-lime animate-pulse ml-1" />}
            </div>
          </motion.div>
      </div>
    </section>
  );
}
