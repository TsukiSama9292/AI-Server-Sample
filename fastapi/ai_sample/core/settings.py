from pydantic.v1 import BaseSettings

class Settings(BaseSettings):
    # API URLs
    ollama_api_url: str

    # LLM settings
    provider: str = "ollama"
    model_name: str = "gemma3:1b-it-qat"
    temperature: float = 1.0
    top_p: float = 1.0
    max_tokens: int = 8192

    # Server settings
    host: str = "0.0.0.0"
    port: int = 8080
    workers: int = 1
    reload: bool = False
    log_level: str = "info"
    
    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


# 在程式一開始就讀取所有設定
setting = Settings()