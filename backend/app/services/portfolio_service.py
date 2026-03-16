import pandas as pd
from pypfopt import EfficientFrontier, risk_models, expected_returns, HRPOpt
from typing import Dict, List
from pydantic import BaseModel
from app.services.data_service import DataService

class PortfolioOptimizeResult(BaseModel):
    weights: Dict[str, float]
    expected_return: float
    expected_volatility: float
    sharpe_ratio: float

class PortfolioService:
    def __init__(self):
        self.data_service = DataService()

    async def optimize(self, symbols: List[str], method: str = "max_sharpe", target_volatility: float = 0.15) -> PortfolioOptimizeResult:
        """
        Optimize portfolio weights using PyPortfolioOpt
        """
        # 1. Fetch data for all symbols
        hist_data = {}
        for symbol in symbols:
            df = await self.data_service.get_ohlcv(symbol, "2024-03-01", "2026-03-16")
            if not df.empty and 'close' in df.columns:
                hist_data[symbol] = df['close']

        if not hist_data:
             raise Exception("No price data returned for optimization of symbols")

        df_prices = pd.DataFrame(hist_data).dropna()

        if df_prices.empty:
             raise Exception("Resulting prices dataframe empty after joining assets")

        # 2. Expected returns and Risk models
        mu = expected_returns.mean_historical_return(df_prices)
        S = risk_models.sample_cov(df_prices)

        # 3. Efficient Frontier / HRP
        weights = {}
        performance = (0.0, 0.0, 0.0)

        if method == "hrp":
            returns = df_prices.pct_change().dropna()
            hrp = HRPOpt(returns)
            weights = hrp.optimize()
            # HRP doesn't use expected performance standardly, return weights directly
            return PortfolioOptimizeResult(
                weights=dict(weights),
                expected_return=0.0,
                expected_volatility=0.0,
                sharpe_ratio=0.0
            )
        else:
            ef = EfficientFrontier(mu, S)
            if method == "max_sharpe":
                weights = ef.max_sharpe()
            elif method == "min_volatility":
                weights = ef.min_volatility()
            elif method == "efficient_risk":
                weights = ef.efficient_risk(target_volatility)
            else:
                weights = ef.max_sharpe()

            cleaned_weights = ef.clean_weights()
            try:
                performance = ef.portfolio_performance(verbose=False)
            except Exception:
                performance = (0.0, 0.0, 0.0)

            return PortfolioOptimizeResult(
                 weights=dict(cleaned_weights),
                 expected_return=float(performance[0]),
                 expected_volatility=float(performance[1]),
                 sharpe_ratio=float(performance[2])
            )
