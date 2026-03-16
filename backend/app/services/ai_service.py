import json
import os
from typing import List, Dict, Any
from anthropic import AsyncAnthropic
from app.services.backtest_service import BacktestService, BacktestConfig
from app.services.screener_service import ScreenerService
from app.services.risk_service import RiskService

class AIService:
    def __init__(self):
        self.client = AsyncAnthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))
        self.backtest_service = BacktestService()
        self.screener_service = ScreenerService()
        self.risk_service = RiskService()
        
        # Load system prompt
        prompt_path = os.path.join(os.path.dirname(__file__), '..', '..', 'ai_engine', 'prompts', 'copilot.txt')
        try:
             with open(prompt_path, 'r') as f:
                  self.system_prompt = f.read()
        except:
             self.system_prompt = "You are the QuantEdge AI Copilot research assistant."

    def get_tools_schema(self) -> List[Dict[str, Any]]:
        """
        Returns schemas for the 5 tools Claude can use.
        """
        return [
            {
                "name": "generate_strategy",
                "description": "Convert plain English trading strategy description into a StrategyConfig JSON structure.",
                "input_schema": {
                    "type": "object",
                    "properties": {
                        "name": {"type": "string", "description": "Short Strategy Name"},
                        "symbol": {"type": "string", "description": "e.g., AAPL"},
                        "timeframe": {"type": "string", "description": "e.g., 1d, 1h"},
                        "indicators": {"type": "array", "items": {"type": "string"}, "description": "List of indicators required, e.g., ['RSI(14)', 'SMA(50)']"},
                        "entry_conditions": {"type": "array", "items": {"type": "string"}, "description": "e.g., ['RSI < 30']"},
                        "exit_conditions": {"type": "array", "items": {"type": "string"}, "description": "e.g., ['RSI > 70']"},
                        "stop_loss_pct": {"type": "number", "description": "Optional SL percentage, e.g. 0.05"},
                        "take_profit_pct": {"type": "number", "description": "Optional TP percentage, e.g. 0.10"}
                    },
                    "required": ["name", "symbol", "timeframe", "indicators", "entry_conditions", "exit_conditions"]
                }
            },
            {
                "name": "run_backtest",
                "description": "Run a historical backtest for a ticker given parameters.",
                "input_schema": {
                    "type": "object",
                    "properties": {
                        "symbol": {"type": "string"},
                        "strategy_name": {"type": "string"},
                        "parameters": {"type": "object", "description": "Variables, e.g., {'rsi_length': 14}"}
                    },
                    "required": ["symbol", "strategy_name"]
                }
            },
            {
                "name": "explain_results",
                "description": "Explains a BacktestResult JSON output into plain English using specific metrics.",
                "input_schema": {
                    "type": "object",
                    "properties": {
                        "results": {"type": "object", "description": "Raw BacktestResult outputs"}
                    },
                    "required": ["results"]
                }
            },
            {
                "name": "screen_stocks",
                "description": "Identify Top stocks filtered using specific technical parameters setups.",
                "input_schema": {
                    "type": "object",
                    "properties": {
                        "criteria": {"type": "string", "description": "Filtered criteria keywords"}
                    },
                    "required": ["criteria"]
                }
            },
            {
                "name": "get_risk_report",
                "description": "Fetch human-readable portfolio risk overview.",
                "input_schema": {
                    "type": "object",
                    "properties": {
                        "symbol": {"type": "string"}
                    },
                    "required": ["symbol"]
                }
            }
        ]

    async def execute_tool(self, tool_name: str, tool_input: Dict[str, Any]) -> Any:
        """
        Map called tool to backing function directly.
        """
        try:
            if tool_name == "generate_strategy":
                # Generate Strategy just formats input standard, return back
                return {
                     "status": "generated",
                     "config": tool_input
                }

            elif tool_name == "run_backtest":
                 # Convert schema setup into BacktestConfig
                 symbol = tool_input.get("symbol", "AAPL")
                 config = BacktestConfig(
                      symbol=symbol,
                      strategy=tool_input.get("strategy_name", "ma_crossover"),
                      parameters=tool_input.get("parameters", {})
                 )
                 result = await self.backtest_service.run(config)
                 return result.model_dump()

            elif tool_name == "explain_results":
                 # Tool 3 focuses essentially on string explanations return
                 return {"success": True, "note": "Explained successfully via agent logic"}

            elif tool_name == "screen_stocks":
                 # Map criteria string to standard scanners list
                 symbols = ["AAPL", "MSFT", "TSLA", "GOOG", "AMD", "NVDA", "SPY"]
                 scan_results = await self.screener_service.scan(symbols)
                 return [res.model_dump() for res in scan_results]

            elif tool_name == "get_risk_report":
                 symbol = tool_input.get("symbol", "AAPL")
                 risk = await self.risk_service.compute_risk_metrics(symbol)
                 return risk.model_dump()
                 
            else:
                 return {"error": f"Tool {tool_name} not found"}
                 
        except Exception as e:
            return {"error": str(e)}
