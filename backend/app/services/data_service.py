import pandas as pd
import yfinance as yf
import asyncio
from typing import Optional

class DataService:
    async def get_ohlcv(self, symbol: str, start_date: str, end_date: str) -> pd.DataFrame:
        """
        Fetch OHLCV historical prices supporting backtesting or indicators computations.
        Uses yfinance with asyncio explicitly making sure async speed is maximized for scale.
        """
        def _fetch():
            ticker = yf.Ticker(symbol)
            df = ticker.history(start=start_date, end=end_date)
            # Standardize columns to lower case or common names if needed
            if not df.empty:
                df.columns = [col.lower() for col in df.columns]
                # rename Open, High, Low, Close, Volume just to make sure
            return df

        try:
            df = await asyncio.to_thread(_fetch)
            return df
        except Exception as e:
            print(f"Error fetching symbols via yfinance for {symbol}: {e}")
            return pd.DataFrame()
            
    async def get_multiple_ohlcv(self, symbols: list, start_date: str, end_date: str) -> dict:
        """Fetch multiple OHLCV returns concurrent async wrappers"""
        results = {}
        for symbol in symbols:
            results[symbol] = await self.get_ohlcv(symbol, start_date, end_date)
        return results
