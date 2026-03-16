from fastapi import APIRouter, HTTPException, Query
from app.services.signal_service import SignalService, SignalResult
from typing import List

router = APIRouter()
signal_service = SignalService()

@router.get("/", response_model=List[SignalResult])
async def get_signals(symbols: List[str] = Query(..., description="List of ticker symbols to compute signals for")):
    """
    Compute technical analysis signals for a provided list of stock tickers.
    """
    try:
        results = await signal_service.compute_signals(symbols)
        return results
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
