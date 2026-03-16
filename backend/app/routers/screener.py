from fastapi import APIRouter, HTTPException, Query
from app.services.screener_service import ScreenerService, ScreenerResult
from typing import List

router = APIRouter()
screener_service = ScreenerService()

@router.get("/", response_model=List[ScreenerResult])
async def scan_market(symbols: List[str] = Query(..., description="List of symbols to scan")):
    """
    Scan provided symbols for breakout signals, oversold/overbought RSI conditions and 52-week highs.
    """
    try:
        results = await screener_service.scan(symbols)
        return results
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
