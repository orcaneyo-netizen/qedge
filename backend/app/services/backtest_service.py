import pandas as pd
import vectorbt as vbt
import pandas_ta as ta
from typing import Optional, Dict, List
from pydantic import BaseModel
from app.services.data_service import DataService

class BacktestConfig(BaseModel):
    symbol: str
    start_date: str
    end_date: str
    strategy: str = "ma_crossover"
    config: Dict = {"fast_period": 10, "slow_period": 50}

class BacktestResult(BaseModel):
    total_return: float
    annual_return: float
    sharpe_ratio: float
    max_drawdown: float
    win_rate: float
    profit_factor: float
    equity_curve: List[List[float]] # [[timestamp, value]]
    monthly_returns: Optional[Dict] = None

class BacktestService:
    def __init__(self):
        self.data_service = DataService()

    async def run(self, config: BacktestConfig) -> BacktestResult:
        """
        Runs a VectorBT backtests using data fetched from data_service
        Supports flexible configs and returns typed formatted responses for dashboard consumption.
        """
        # 1. Fetch OHLCV via data_service
        df = await self.data_service.get_ohlcv(config.symbol, config.start_date, config.end_date)
        if df.empty:
            raise Exception(f"No OHLCV price data returned for {config.symbol}")

        close = df['close']

        # 2. Compute indicators with pandas-ta
        fast_window = config.config.get("fast_period", 10)
        slow_window = config.config.get("slow_period", 50)
        
        sma_fast = ta.sma(close, length=fast_window)
        sma_slow = ta.sma(close, length=slow_window)

        # 3. Generate entry/exit signals as boolean Series
        entries = (sma_fast > sma_slow)
        exits = (sma_fast < sma_slow)

        # Shift signals to execute on next day open/close instead of today peak to avoid bias
        entries = entries.shift(1).fillna(False)
        exits = exits.shift(1).fillna(False)

        # 4. vbt.Portfolio.from_signals(price, entries, exits)
        portfolio = vbt.Portfolio.from_signals(
            close, 
            entries, 
            exits, 
            fees=0.001, 
            slippage=0.001,
            init_cash=10000.0,
            freq='d'
        )

        # 5. Extract stats: total_return, annual_return, sharpe, max_drawdown
        stats = portfolio.stats()

        # 6. Monthly returns matrix for heatmap (Optional layout template for dashboard)
        # 7. Equity curve as list of [timestamp, value]
        equity_curve = [[float(ts.timestamp() * 1000), float(val)] for ts, val in portfolio.value().items()]

        return BacktestResult(
            total_return=float(stats.get('Total Return [%]', 0.0) / 100),
            annual_return=float(stats.get('Ann. Return [%]', 0.0) / 100),
            sharpe_ratio=float(stats.get('Sharpe Ratio', 0.0)),
            max_drawdown=float(stats.get('Max Drawdown [%]', 0.0) / 100),
            win_rate=float(stats.get('Win Rate [%]', 0.0) / 100),
            profit_factor=float(stats.get('Profit Factor', 0.0)),
            equity_curve=equity_curve
        )
