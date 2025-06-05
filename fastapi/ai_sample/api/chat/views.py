
from fastapi import APIRouter
from ai_sample.api.chat.schema import ChatRequest
from fastapi.responses import StreamingResponse
from ai_sample.agnet.chat import chatbot
# 初始化路由
router = APIRouter()

@router.post("/chatbot")
async def _chat(request: ChatRequest):
    """
    Endpoint for handling chat requests.
    """
    return StreamingResponse(
        chatbot(
            question=request.question,
        ),
        media_type="text/event-stream"
    )