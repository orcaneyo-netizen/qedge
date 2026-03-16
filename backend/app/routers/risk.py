from fastapi import APIRouter, HTTPException
from app.services.risk_service import RiskService, RiskMetrics

router = APIRouter()
risk_service = RiskService()

@router.get("/{symbol}", response_model=RiskMetrics)
async def get_risk_metrics(symbol: str):
    """
    Returns rolling VaR, Beta vs SPY, Sharpe and drawdown analytics using empyrical.
    """
    try:
        results = await risk_service.compute_risk_metrics(symbol)
        return results
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
