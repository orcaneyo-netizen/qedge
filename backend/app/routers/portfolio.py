from fastapi import APIRouter, HTTPException, Query
from app.services.portfolio_service import PortfolioService, PortfolioOptimizeResult
from typing import List

router = APIRouter()
portfolio_service = PortfolioService()

@router.post("/optimise")
async def optimize_weights(symbols: List[str], method: str = "max_sharpe", target_volatility: float = 0.15):
    """
    Compute optimal portfolio weights based on PyPortfolioOpt math.
    """
    try:
         results = await portfolio_service.optimize(symbols, method, target_volatility)
         return results
    except Exception as e:
         raise HTTPException(status_code=400, detail=str(e))
