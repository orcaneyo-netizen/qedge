"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Sparkles, Brain, Code, Play } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
  time: string;
}

export default function AICopilotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I am your QuantEdge AI Co-Pilot. I can help you build, backtest, and optimize quantitative trading strategies. What are we building today?",
      time: "14:20",
    },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;

    const newMessage: Message = {
      role: "user",
      content: input,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages([...messages, newMessage]);
    setInput("");

    // Simulate response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Strategy outline detected: 'Mean Reversion with RSI'. I am generating the Backtest configuration script now...",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] gap-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-display font-black text-2xl text-text-primary flex items-center gap-2">
            AI Co-Pilot <Sparkles className="w-5 h-5 text-lime glow-lime" />
          </h2>
          <p className="text-xs text-text-muted font-body">
            Natural language interface for strategy generation, optimization, and code execution.
          </p>
        </div>
      </div>

      <div className="flex-1 rounded-2xl border border-rim bg-surface backdrop-blur-md flex flex-col overflow-hidden">
        {/* Messages Feed */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex flex-col max-w-[80%] ${
                msg.role === "user" ? "self-end items-end" : "self-start items-start"
              }`}
            >
              <div className={`rounded-2xl p-4 text-sm font-body ${
                msg.role === "user"
                  ? "bg-lime text-ink font-semibold"
                  : "bg-ink2 border border-rim text-text-secondary"
              }`}>
                {msg.content}
              </div>
              <span className="text-[10px] text-text-muted mt-1 px-2">
                {msg.time}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-rim flex gap-3 items-center">
          <input
            type="text"
            placeholder="Describe your strategy idea (e.g., 'Buy AAPL when RSI under 30 and volume spikes')..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            className="flex-1 bg-ink2 border border-rim rounded-xl py-3 px-4 font-body text-sm text-text-primary focus:outline-none focus:border-lime/40"
          />
          <button
            onClick={sendMessage}
            className="p-3 rounded-xl bg-lime text-ink hover:scale-105 active:scale-95 transition-all glow-lime duration-300"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Suggested Actions */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { icon: Brain, title: "Optimize Strategy", desc: "Find best Sharpe bounds" },
          { icon: Code, title: "Generate Python", desc: "Export to Backtrader" },
          { icon: Play, title: "Run Dry Simulation", desc: "1-month quick test" },
        ].map((act, i) => (
          <button key={i} className="rounded-xl border border-rim bg-surface p-4 flex gap-3 items-center hover:border-lime/20 cursor-pointer text-left">
            <div className="w-10 h-10 rounded-lg bg-lime/10 border border-lime/20 flex items-center justify-center text-lime glow-lime">
              <act.icon className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-display font-bold text-xs text-text-primary">{act.title}</h4>
              <p className="text-[10px] text-text-muted font-body">{act.desc}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
