import pandas as pd
import pandas_ta as ta
from typing import Dict, List
from pydantic import BaseModel
from app.services.data_service import DataService

class SignalResult(BaseModel):
    symbol: str
    rsi_14: float
    rsi_signal: str # "bullish", "bearish", "neutral"
    macd_signal: str
    bb_signal: str
    atr: float
    volume_surge: bool
    confidence_score: float

class SignalService:
    def __init__(self):
        self.data_service = DataService()

    async def compute_signals(self, symbols: List[str]) -> List[SignalResult]:
        """
        Compute standard indicators for a list of symbols using pandas-ta.
        Uses recent data endpoints for speeds and live dashboard responsiveness.
        """
        results = []
        for symbol in symbols:
            # Look backwards 1 year or 100 days to compute 20-day averages
            df = await self.data_service.get_ohlcv(symbol, "2024-03-01", "2026-03-16")
            if df.empty or len(df) < 30:
                continue

            close = df['close']
            volume = df['volume']

            # 1. RSI(14)
            rsi = ta.rsi(close, length=14)
            current_rsi = rsi.iloc[-1] if not rsi.empty else 50.0
            rsi_signal = "neutral"
            if current_rsi < 30: rsi_signal = "bullish"
            elif current_rsi > 70: rsi_signal = "bearish"

            # 2. MACD
            macd = ta.macd(close)
            macd_signal = "neutral"
            if macd is not None and not macd.empty:
                macd_line = macd.iloc[-1, 0] # MACD
                signal_line = macd.iloc[-1, 1] # Signal
                macd_signal = "bullish" if macd_line > signal_line else "bearish"

            # 3. Bollinger Bands
            bb = ta.bbands(close)
            bb_signal = "neutral"
            if bb is not None and not bb.empty:
                lower = bb.iloc[-1, 0] # BBL
                upper = bb.iloc[-1, 2] # BBU
                price = close.iloc[-1]
                if price < lower: bb_signal = "bullish"
                elif price > upper: bb_signal = "bearish"

            # 4. ATR Position Sizing
            atr = ta.atr(df['high'], df['low'], df['close'])
            current_atr = atr.iloc[-1] if atr is not None and not atr.empty else 0.0

            # 5. Volume surge
            avg_vol_20 = volume.rolling(window=20).mean()
            volume_surge = False
            if not volume.empty and not avg_vol_20.empty:
                 volume_surge = bool(volume.iloc[-1] > (2 * avg_vol_20.iloc[-1]))

            # Compute Confidence Score [0-100]
            confidence = 50.0 
            if rsi_signal == "bullish": confidence += 20
            if macd_signal == "bullish": confidence += 15
            if bb_signal == "bullish": confidence += 15
            if volume_surge: confidence += 10

            results.append(SignalResult(
                symbol=symbol,
                rsi_14=float(current_rsi),
                rsi_signal=rsi_signal,
                macd_signal=macd_signal,
                bb_signal=bb_signal,
                atr=float(current_atr),
                volume_surge=volume_surge,
                confidence_score=min(100.0, confidence)
            ))

        return results
