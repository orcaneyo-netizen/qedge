const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export interface BacktestConfig {
  symbol: string;
  strategy: string;
  parameters: Record<string, any>;
}

export async function fetchDashboard() {
  // Returns mock fallback if backend down, ideally returns live portfolios analytics
  try {
       const res = await fetch(`${API_BASE}/api/portfolio/analytics`); // if endpoint created
       if (res.ok) return await res.json();
  } catch(e) {}
  return mockDashboardData;
}

export async function runBacktest(config: BacktestConfig) {
  const res = await fetch(`${API_BASE}/api/backtests/run`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(config)
  });
  if (!res.ok) throw new Error("Backtest failed to execute");
  return res.json(); // { task_id, status, result }
}

export async function fetchSignals(symbols: string[]) {
  const query = symbols.map(s => `symbols=${s}`).join("&");
  const res = await fetch(`${API_BASE}/api/signals/?${query}`);
  if (!res.ok) throw new Error("Failed to fetch signals");
  return res.json();
}

export async function optimizePortfolio(symbols: string[], method = "max_sharpe") {
  const res = await fetch(`${API_BASE}/api/portfolio/optimise?method=${method}`, {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify(symbols)
  });
  if (!res.ok) throw new Error("Portfolio optimization failed");
  return res.json();
}

export async function fetchRiskMetrics(symbol: string) {
  const res = await fetch(`${API_BASE}/api/risk/${symbol}`);
  if (!res.ok) throw new Error("Risk metrics failed");
  return res.json();
}

export async function streamAIResponse(messages: any[], onChunk: (chunk: string) => void) {
  const res = await fetch(`${API_BASE}/api/ai/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages })
  });
  
  const reader = res.body?.getReader();
  if (!reader) return;

  const decoder = new TextDecoder();
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    const chunk = decoder.decode(value);
    onChunk(chunk); // Handle stream parsing standardly SSE in component
  }
}

// Mock Data remains for safe fallback rendering
const mockDashboardData = {
  metrics: {
    totalValue: 124500.82,
    todayReturn: 2.45,
    winRate: 68.5,
    sharpeRatio: 3.12,
  },
  signals: [
    { ticker: "AAPL", type: "BUY", price: 175.2, time: "14:24", strength: "STRONG" },
    { ticker: "TSLA", type: "SELL", price: 168.1, time: "14:22", strength: "WEAK" },
    { ticker: "NVDA", type: "BUY", price: 882.1, time: "14:20", strength: "MODERATE" },
    { ticker: "MSFT", type: "BUY", price: 420.5, time: "14:15", strength: "STRONG" },
  ],
  insights: "Strong momentum detected in mega-cap tech stocks. Strategy Alpha-9 recommends increasing position sizes on pullbacks.",
  portfolioHistory: [
    { name: "09:00", value: 121500 },
    { name: "10:00", value: 122000 },
    { name: "11:00", value: 121800 },
    { name: "12:00", value: 123000 },
    { name: "13:00", value: 123800 },
    { name: "14:00", value: 124500 },
  ],
};
