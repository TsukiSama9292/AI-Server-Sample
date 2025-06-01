from ai_sample.core.settings import setting
import uvicorn

def main() -> None:
    uvicorn.run(
        "ai_sample.core.app:get_app",
        workers=1,
        host=setting.host,
        port=setting.port,
        reload=setting.reload,
        log_level=setting.log_level,
        factory=True,
    )

if __name__ == "__main__":
    main()