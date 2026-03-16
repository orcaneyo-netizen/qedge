from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import uvicorn

# Include Routers
from app.routers import backtests, signals, screener, portfolio, risk, ai_copilot, websocket

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup tasks
    yield
    # Shutdown tasks

app = FastAPI(
    title="QuantEdge Core Quant Engine",
    description="Backend powering backtesting, signal generation, and risk analysis",
    version="1.0.0",
    lifespan=lifespan
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Update to specific domain for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Attach Routers
app.include_router(backtests.router, prefix="/api/backtests", tags=["Backtests"])
app.include_router(signals.router, prefix="/api/signals", tags=["Signals"])
app.include_router(screener.router, prefix="/api/screener", tags=["Screener"])
app.include_router(portfolio.router, prefix="/api/portfolio", tags=["Portfolio"])
app.include_router(risk.router, prefix="/api/risk", tags=["Risk"])
app.include_router(ai_copilot.router, prefix="/api/ai", tags=["AI Copilot"])
app.include_router(websocket.router, prefix="/ws", tags=["WebSocket"])

@app.get("/health")
def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
