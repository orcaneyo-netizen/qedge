"use client";

import { motion } from "framer-motion";
import Magnetic from "@/components/ui/Magnetic";

export default function Hero() {
  return (
    <div className="relative flex flex-col items-center justify-center text-center px-6 md:px-12 py-24 md:py-36 max-w-7xl mx-auto overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex mb-4 px-4 py-1.5 rounded-full border border-lime/30 bg-lime/5 backdrop-blur-md text-lime text-xs font-semibold font-display tracking-widest uppercase items-center gap-2"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-lime"></span>
        </span>
        V2.0 Live Signals Active
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="font-display font-black text-4xl md:text-6xl lg:text-7xl tracking-tight leading-none mb-6 max-w-4xl"
      >
        Quant Alpha. <br />
        <span className="text-reveal inline-block bg-gradient-to-r from-lime to-emerald-400 bg-clip-text text-transparent">
          Zero PhD.
        </span>{" "}
        <br />
        Real Returns.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-text-secondary text-base md:text-lg max-w-xl mb-10 font-body font-light leading-relaxed"
      >
        Institutional-grade quantitative models, backtested strategies, and live-streaming AI signals. Built for traders who want math on their side.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="flex flex-col sm:flex-row gap-4 sm:gap-6"
      >
        <Magnetic>
          <a href="/dashboard" className="px-8 py-4 rounded-xl bg-lime text-ink font-bold font-display text-base glow-lime hover:scale-105 active:scale-95 transition-all duration-300 inline-block">
            Launch Dashboard
          </a>
        </Magnetic>
        <Magnetic>
          <a href="#features" className="px-8 py-4 rounded-xl border border-rim bg-surface hover:bg-surface-hover backdrop-blur-md font-bold font-display text-base hover:scale-105 active:scale-95 transition-all duration-300 inline-block">
            Explore Features
          </a>
        </Magnetic>
      </motion.div>

      {/* 3D Dashboard Preview (Perspective Tilt) */}
      <motion.div
        initial={{ opacity: 0, y: 100, rotateX: 20, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, rotateX: 10, scale: 1 }}
        transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
        className="mt-20 w-full max-w-5xl aspect-video rounded-2xl glass-strong shadow-2xl overflow-hidden relative border border-rim-strong group"
        style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ink to-ink mix-blend-multiply opacity-50 z-10" />
        
        {/* Mock Dashboard Content */}
        <div className="p-6 md:p-8 flex flex-col h-full bg-ink2 z-0">
          <div className="flex justify-between items-center mb-6">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <div className="px-4 py-1 rounded-full border border-rim bg-surface text-xs text-text-muted">
              quantedge.app/dashboard
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 flex-1">
            <div className="col-span-2 rounded-xl bg-surface border border-rim p-4 h-48 md:h-auto">
              <div className="flex justify-between items-center mb-4">
                <div className="h-4 w-24 rounded bg-white/10 animate-pulse" />
                <div className="h-4 w-12 rounded bg-lime/20 animate-pulse" />
              </div>
              <div className="w-full h-full flex items-end">
                {/* Mock Chart SVG */}
                <svg className="w-full h-[70%] text-lime" fill="none" viewBox="0 0 500 150">
                  <path d="M0,120 L50,130 L100,100 L150,110 L200,80 L250,90 L300,50 L350,70 L400,30 L450,40 L500,10" stroke="currentColor" strokeWidth="3" className="chart-line-draw" />
                  <path d="M0,120 L50,130 L100,100 L150,110 L200,80 L250,90 L300,50 L350,70 L400,30 L450,40 L500,10 L500,150 L0,150 Z" fill="url(#grad)" opacity="0.1" />
                  <defs>
                    <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="var(--lime)" />
                      <stop offset="100%" stopColor="transparent" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              {[1, 2, 3].map((_, i) => (
                <div key={i} className="rounded-xl bg-surface border border-rim p-4 flex justify-between items-center">
                  <div className="flex flex-col gap-2">
                    <div className="h-3 w-16 rounded bg-white/10 animate-pulse" />
                    <div className="h-4 w-24 rounded bg-white/20 animate-pulse" />
                  </div>
                  <div className="h-2 w-12 rounded-full bg-lime/20" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
