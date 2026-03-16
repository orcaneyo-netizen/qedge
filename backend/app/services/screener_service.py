import pandas as pd
import pandas_ta as ta
from typing import List
from pydantic import BaseModel
from app.services.data_service import DataService

class ScreenerResult(BaseModel):
    symbol: str
    rsi: float
    volume_surge: bool
    high_52week: bool

class ScreenerService:
    def __init__(self):
        self.data_service = DataService()

    async def scan(self, symbols: List[str]) -> List[ScreenerResult]:
        """
        Scan a list of symbols applying filters from the raw scripts 
        (RSI thresholds, Volume surges, and 52-week highs).
        """
        results = []
        for symbol in symbols:
            df = await self.data_service.get_ohlcv(symbol, "2024-03-01", "2026-03-16")
            if df.empty or len(df) < 50:
                continue

            close = df['close']
            volume = df['volume']

            # 1. RSI(14) calculation
            rsi = ta.rsi(close, length=14)
            current_rsi = rsi.iloc[-1] if not rsi.empty else 50.0

            # 2. Volume Surge (current > 2x 20-day avg)
            avg_vol = volume.rolling(window=20).mean()
            volume_surge = False
            if not volume.empty and not avg_vol.empty:
                 volume_surge = bool(volume.iloc[-1] > (2 * avg_vol.iloc[-1]))

            # 3. 52-Week High
            high_52w = df['high'].rolling(window=252).max().iloc[-1]
            at_high_52w = False
            if not df.empty:
                at_high_52w = bool(close.iloc[-1] >= high_52w * 0.98) # within 2% of high

            # Apply some logical filtering (e.g., Bullish Screener)
            if current_rsi > 40 or volume_surge or at_high_52w:
                results.append(ScreenerResult(
                    symbol=symbol,
                    rsi=float(current_rsi),
                    volume_surge=volume_surge,
                    high_52week=at_high_52w
                ))

        return results
