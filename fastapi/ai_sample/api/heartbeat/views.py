from fastapi import APIRouter
# 初始化路由
router = APIRouter()
# 用於檢查 AI 服務器的健康狀態
@router.get("/")
async def _heart():
    """
    Health check endpoint for the AI server.
    """
    return {"message": "AI server is healthy"}