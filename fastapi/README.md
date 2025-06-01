# FastAPI 開發與介紹
## 檔案結構
```bash
app/
├── ai_sample
│   ├── api
│   │   ├── chat                # 聊天 API 模組
│   │   │   ├── __init__.py      
│   │   │   ├── schema.py       # 聊天 API 傳入結構定義
│   │   │   └── views.py        # 聊天 API 視圖(邏輯集中處)
│   │   ├── heartbeat           # 心跳檢查 API 模組
│   │   │   ├── __init__.py
│   │   │   └── views.py        # 心跳檢查 API 視圖(邏輯集中處)
│   │   ├── __init__.py
│   │   ├── router.py           # API 路由設定 - 將各 API 模組整合
│   │   └── schema.py           # API 傳入結構定義 - 最上層
│   ├── chain                   # LangChain 邏輯相關模組
│   │   ├── chat.py             # 聊天相關邏輯
│   │   └── __init__.py
│   ├── core
│   │   ├── app.py              # 取得 FastAPI 應用程式
│   │   ├── __init__.py
│   │   └── settings.py         # 伺服器設定
│   └── prompt                  # 提示詞相關模組
│       ├── chatTemplate.py     # 聊天提示詞模板
│       └── __init__.py 
├── .env                        # 環境變數設定
├── entrypoint.sh               # 啟動腳本
├── main.py                     # FastAPI 應用程式入口
├── pyproject.toml              # Python 專案設定，包含依賴項，uv 讀取它建立 uv.lock
├── README.md                   # 專案說明文件
└── uv.lock                     # uv 依賴鎖定檔案
```