from fastapi.routing import APIRouter

from ai_sample.api import heartbeat, chat

api_router = APIRouter()
api_router.include_router(heartbeat.router)
api_router.include_router(chat.router, prefix="/chat", tags=["chat"])