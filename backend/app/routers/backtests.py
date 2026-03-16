from fastapi import APIRouter, Depends, HTTPException
from app.services.backtest_service import BacktestService, BacktestConfig, BacktestResult
import uuid

router = APIRouter()
backtest_service = BacktestService()

@router.post("/run")
async def run_backtest(config: BacktestConfig):
    """
    Runs a backtests immediately and returns the results.
    Standard requirement returned task_id placeholder if Celery is used.
    """
    try:
        result = await backtest_service.run(config)
        return {
            "task_id": str(uuid.uuid4()),
            "status": "completed",
            "result": result
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/{id}")
async def get_backtest(id: str):
    """
    Fetch historical backtests results (Mock/Skeleton for demonstrate).
    """
    return {
        "id": id,
        "status": "completed",
        "result": {
            "total_return": 0.15,
            "sharpe_ratio": 1.5,
            "max_drawdown": -0.05
        }
    }
