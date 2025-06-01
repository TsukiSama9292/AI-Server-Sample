# ⚡ FastAPI 開發與介紹

## 📖 專案說明
這個專案是使用 FastAPI 框架開發的，主要目的是提供一個 API 服務 🛠️  
整合 LangChain 🤖 進行聊天機器人功能  
專案包含了基本的 API 路由、心跳檢查 💓、聊天功能以及 LangChain 的應用  

## 🔐 建立 uv.lock - 依賴鎖定檔案
原本建立 `pyproject.toml` 時，不會有 `uv.lock` 檔案  
需要先安裝 `uv`，然後執行 `uv venv` 和 `uv sync` 來建立 `uv.lock` 檔案  
P.S: 該儲存庫已經建立好了 `uv.lock` 檔案，所以可以略過這個步驟  
```bash
cd fastapi
uv venv
uv sync
```

## 📂 檔案結構
```bash
app/
├── ai_sample
│   ├── api
│   │   ├── chat                # 💬 聊天 API 模組
│   │   │   ├── __init__.py      
│   │   │   ├── schema.py       # 📋 聊天 API 傳入結構定義
│   │   │   └── views.py        # 👓 聊天 API 視圖(邏輯集中處)
│   │   ├── heartbeat           # 💓 心跳檢查 API 模組
│   │   │   ├── __init__.py
│   │   │   └── views.py        # 👀 心跳檢查 API 視圖(邏輯集中處)
│   │   ├── __init__.py
│   │   ├── router.py           # 🛣️ API 路由設定 - 將各 API 模組整合
│   │   └── schema.py           # 📋 API 傳入結構定義 - 最上層
│   ├── chain                   # 🔗 LangChain 邏輯相關模組
│   │   ├── chat.py             # 💬 聊天相關邏輯
│   │   └── __init__.py
│   ├── core
│   │   ├── app.py              # ⚡ 取得 FastAPI 應用程式
│   │   ├── __init__.py
│   │   └── settings.py         # ⚙️ 伺服器設定
│   └── prompt                  # 📝 提示詞相關模組
│       ├── chatTemplate.py     # 💡 聊天提示詞模板
│       └── __init__.py 
├── API_List.md                 # 📄 API 列表與說明
├── dev.ipynb                   # 📓 開發用 Jupyter Notebook
├── .env                        # 🔑 環境變數設定
├── entrypoint.sh               # 🚀 容器啟動腳本，用於啟動 FastAPI
├── main.py                     # ⚡ FastAPI 應用程式入口
├── pyproject.toml              # 📦 Python 專案設定，包含依賴項，uv 讀取它建立 uv.lock
├── README.md                   # 📖 專案說明文件
└── uv.lock                     # 🔐 uv 依賴鎖定檔案
```