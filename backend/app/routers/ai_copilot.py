import json
import os
from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from typing import List, Dict, Any
from app.utils.auth import get_current_user
from app.services.ai_service import AIService

class ChatRequest(BaseModel):
    messages: List[Dict[str, Any]]

router = APIRouter()
ai_service = AIService()

@router.post("/chat")
async def chat(request: ChatRequest, user = Depends(get_current_user)):
    """
    Streams AI responses using SSE supporting chat structure streams.
    Executes tool use callbacks when demanded.
    """
    # Verify exact environment variables setup
    if not os.getenv("ANTHROPIC_API_KEY"):
         raise HTTPException(status_code=500, detail="Anthropic API Key not configured on Server")

    async def generate():
        try:
             # Streaming with tools schema callbacks 
             async with ai_service.client.messages.stream(
                 model="claude-3-5-sonnet-latest", # using cost-preferred sonnet
                 max_tokens=2048,
                 system=ai_service.system_prompt,
                 tools=ai_service.get_tools_schema(),
                 messages=request.messages
             ) as stream:
                 for event in stream:
                     if event.type == "text":
                         yield f"data: {json.dumps({'type':'text', 'content': event.text})}\n\n"
                     
                     elif event.type == "content_block_delta" and event.delta.type == "text_delta":
                         yield f"data: {json.dumps({'type':'text', 'content': event.delta.text})}\n\n"

                 # Execute Tool if final message demands
                 final_message = await stream.get_final_message()
                 for block in final_message.content:
                     if block.type == "tool_use":
                          result = await ai_service.execute_tool(block.name, block.input)
                          yield f"data: {json.dumps({'type':'tool_result','tool':block.name,'result':result})}\n\n"

        except Exception as e:
             yield f"data: {json.dumps({'type':'error', 'content': str(e)})}\n\n"

        yield "data: [DONE]\n\n"

    return StreamingResponse(generate(), media_type="text/event-stream")
