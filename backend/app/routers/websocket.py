import asyncio
import json
import random
from fastapi import APIRouter, WebSocket, WebSocketDisconnect

router = APIRouter()

@router.websocket("/prices")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    try:
        symbols = ["AAPL", "MSFT", "TSLA", "GOOG", "AMD", "NVDA"]
        while True:
            # Generate simulated price tick updates
            tick_data = {
                "ticker": random.choice(symbols),
                "price": round(random.uniform(100, 1000), 2),
                "change": round(random.uniform(-5, 5), 2),
                "type": random.choice(["BUY", "SELL", "HOLD"])
            }
            await websocket.send_text(json.dumps(tick_data))
            await asyncio.sleep(1) # stream every second

    except WebSocketDisconnect:
        print("Client disconnected")
