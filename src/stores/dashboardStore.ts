import { create } from "zustand";

export interface MetricData {
  totalValue: number;
  todayReturn: number;
  winRate: number;
  sharpeRatio: number;
}

export interface Signal {
  ticker: string;
  type: "BUY" | "SELL";
  price: number;
  time: string;
  strength: "STRONG" | "MODERATE" | "WEAK";
}

interface DashboardState {
  metrics: MetricData;
  signals: Signal[];
  chartData: { name: string; value: number }[];
  setMetrics: (metrics: MetricData) => void;
  addSignal: (signal: Signal) => void;
  setChartData: (data: { name: string; value: number }[]) => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  metrics: {
    totalValue: 0,
    todayReturn: 0,
    winRate: 0,
    sharpeRatio: 0,
  },
  signals: [],
  chartData: [],
  setMetrics: (metrics) => set({ metrics }),
  addSignal: (signal) => set((state) => ({ signals: [signal, ...state.signals].slice(0, 50) })),
  setChartData: (chartData) => set({ chartData }),
}));
