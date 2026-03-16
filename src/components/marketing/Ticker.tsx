export default function Ticker() {
  const items = [
    { ticker: "AAPL", price: 175.24, change: 1.25 },
    { ticker: "TSLA", price: 168.10, change: -0.85 },
    { ticker: "NVDA", price: 882.12, change: 4.15 },
    { ticker: "MSFT", price: 420.55, change: 0.65 },
    { ticker: "AMD", price: 195.40, change: 2.30 },
    { ticker: "GOOGL", price: 148.20, change: -1.10 },
    { ticker: "META", price: 505.35, change: 3.40 },
    { ticker: "AMZN", price: 178.15, change: 0.95 },
  ];

  const doubledItems = [...items, ...items];

  return (
    <div className="w-full glass border-y border-rim py-3 overflow-hidden">
      <div className="marquee-track flex gap-8 items-center">
        {doubledItems.map((item, index) => (
          <div key={index} className="flex items-center gap-3 px-4">
            <span className="font-display font-bold text-sm text-text-primary">
              {item.ticker}
            </span>
            <span className="font-body text-sm text-text-secondary">
              ${item.price.toFixed(2)}
            </span>
            <span
              className={`font-body text-xs font-semibold ${
                item.change >= 0 ? "text-success" : "text-danger"
              }`}
            >
              {item.change >= 0 ? "+" : ""}
              {item.change.toFixed(2)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
