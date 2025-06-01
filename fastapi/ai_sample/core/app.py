from fastapi import FastAPI
import os
from dotenv import load_dotenv
load_dotenv()
from ai_sample.api.router import api_router
is_debug = os.getenv("IS_DEBUG")
def get_app() -> FastAPI:
    if is_debug:
        app = FastAPI(
            root_path="/api",
            title="AI Sample",
            service_name="ai_sample",
            description="AI service for sample application",
            version="0.0.1",
            contact={"name": "XuanYou-Lin(TsukiSama9292)", "email": "tsukisama9292@gmail.com"},
            openapi_tags=[
                {"name": "heartbeat", "description": "Heartbeat API"},
                {"name": "chat", "description": "Chat API"},
            ],
            license_info={
                "name": "Copyright (c) 2025 XuanYou-Lin(TsukiSama9292).",
            },
            docs_url="/docs",
            redoc_url="/redoc",
            openapi_url="/openapi.json",
            debug=True,
        )
    else:
        app = FastAPI(
            root_path="/api",
            title="AI Sample",
            service_name="ai_sample",
            description="AI service for sample application",
            version="0.0.1",
            contact={"name": "XuanYou-Lin(TsukiSama9292)", "email": "tsukisama9292@gmail.com"},
            license_info={
                "name": "Copyright (c) Apache 2.0 - by 2025 XuanYou-Lin(TsukiSama9292).",
            },
            docs_url=None,
            redoc_url=None,
            openapi_url=None,
            debug=False,
        )
    app.include_router(router=api_router, prefix="")
    return app