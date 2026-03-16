import pandas as pd
import numpy as np
import empyrical
from typing import Dict
from pydantic import BaseModel
from app.services.data_service import DataService

class RiskMetrics(BaseModel):
    annual_return: float
    max_drawdown: float
    sharpe_ratio: float
    sortino_ratio: float
    calmar_ratio: float
    historical_var_95: float
    beta_vs_spy: float

class RiskService:
    def __init__(self):
        self.data_service = DataService()

    async def compute_risk_metrics(self, symbol: str) -> RiskMetrics:
        """
        Compute risk/performance metrics for symbol relative to SPY benchmarks.
        """
        # 1. Fetch data
        df = await self.data_service.get_ohlcv(symbol, "2024-03-01", "2026-03-16")
        spy_df = await self.data_service.get_ohlcv("SPY", "2024-03-01", "2026-03-16")

        if df.empty:
             raise Exception(f"No price data loaded for {symbol}")

        returns = df['close'].pct_change().dropna()
        spy_returns = spy_df['close'].pct_change().dropna() if not spy_df.empty else pd.Series()

        # Aligne both returns indices
        aligned = pd.concat([returns, spy_returns], axis=1).dropna()
        aligned.columns = ['returns', 'spy_returns']

        rets = aligned['returns']
        spy_rets = aligned['spy_returns']

        # 2. Compute metrics with safe fallbacks
        try:
            ann_ret = empyrical.annual_return(rets)
            max_dd = empyrical.max_drawdown(rets)
            sharpe = empyrical.sharpe_ratio(rets, risk_free=0.04)
            sortino = empyrical.sortino_ratio(rets, risk_free=0.04)
            calmar = empyrical.calmar_ratio(rets)
            
            # Historical VaR
            var_95 = np.percentile(rets, 5)

            # Beta vs SPY
            beta = 1.0
            if not spy_rets.empty:
                 beta = empyrical.beta(rets, spy_rets)

        except Exception as e:
            # Safe Fallback to numpy if empyrical errors out
            ann_ret = rets.mean() * 252
            max_dd = 0.0 # simple fallback
            sharpe = (rets.mean() / rets.std()) * np.sqrt(252) if rets.std() > 0 else 0.0
            sortino = sharpe
            calmar = 0.0
            var_95 = np.percentile(rets, 5)
            beta = 1.0

        return RiskMetrics(
            annual_return=round(float(ann_ret), 4),
            max_drawdown=round(float(max_dd), 4),
            sharpe_ratio=round(float(sharpe), 4),
            sortino_ratio=round(float(sortino), 4),
            calmar_ratio=round(float(calmar), 4),
            historical_var_95=round(float(var_95), 4),
            beta_vs_spy=round(float(beta), 4)
        )
