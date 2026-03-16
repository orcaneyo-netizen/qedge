"use client";

import { motion } from "framer-motion";
import { BarChart3, TrendingUp, Cpu, Shield, Settings, LogOut, Home, Compass } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Dashboard", icon: Home, href: "/dashboard" },
  { name: "Screener", icon: Compass, href: "/screener" },
  { name: "Backtest", icon: BarChart3, href: "/backtest" },
  { name: "AI Copilot", icon: Cpu, href: "/ai-copilot" },
  { name: "Portfolio", icon: TrendingUp, href: "/portfolio" },
  { name: "Risk", icon: Shield, href: "/risk" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <motion.aside
      initial={{ x: -40, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-[240px] h-full glass border-r border-rim py-6 px-4 flex flex-col justify-between fixed left-0 top-0 z-40"
    >
      <div className="flex flex-col gap-8">
        <Link href="/" className="font-display font-black text-2xl tracking-wider text-gradient-lime px-2">
          QuantEdge
        </Link>

        <nav className="flex flex-col gap-1">
          {navItems.map((item, i) => {
            const isActive = pathname === item.href;
            return (
              <Link key={i} href={item.href}>
                <motion.div
                  whileHover={{ x: 4 }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl font-display font-bold text-sm transition-all duration-200 ${
                    isActive
                      ? "bg-lime/10 text-lime border border-lime/20 glow-lime"
                      : "text-text-secondary hover:bg-surface hover:text-text-primary"
                  }`}
                >
                  <item.icon className={`w-5 h-5 ${isActive ? "text-lime" : "text-text-muted"}`} />
                  <span>{item.name}</span>
                  {isActive && (
                    <motion.div
                      layoutId="sidebar-active-indicator"
                      className="absolute left-1 w-1 h-6 bg-lime rounded-full"
                    />
                  )}
                </motion.div>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="flex flex-col gap-4">
        {/* User Card */}
        <div className="p-4 rounded-xl border border-rim bg-surface flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-lime/10 text-lime border border-lime/20 flex items-center justify-center font-display font-bold text-xs">
              JD
            </div>
            <div>
              <h4 className="font-display font-bold text-xs text-text-primary">John Doe</h4>
              <p className="text-[10px] text-lime font-semibold font-body">Pro Plan</p>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center px-2 text-text-muted text-xs font-body">
          <button className="hover:text-text-primary transition-colors flex items-center gap-1">
            <Settings className="w-3.5 h-3.5" /> settings
          </button>
          <button className="hover:text-text-primary transition-colors flex items-center gap-1">
            <LogOut className="w-3.5 h-3.5" /> logout
          </button>
        </div>
      </div>
    </motion.aside>
  );
}
