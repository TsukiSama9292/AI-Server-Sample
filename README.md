# 🚀 [AI 網頁伺服器範本](https://github.com/TsukiSama9292/AI-Server-Sample)

<div align="center">

<a href="https://deepwiki.com/TsukiSama9292/AI-Server-Sample">
  <img src="https://deepwiki.com/badge.svg" alt="Ask DeepWiki" width="150" />
</a>
<a href="https://github.com/TsukiSama9292/AI-Server-Sample/tree/dev">
  <img src="https://img.shields.io/badge/Version-Dev-blue?style=for-the-badge" alt="Latest Version" />
</a>
<a href="https://github.com/TsukiSama9292/AI-Server-Sample/blob/main/LICENSE">
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="MIT License" />
</a>

</div>

## 🧩 用途

📚 這是一個結合「全端架構 + AI Agent + 自動部署」的教學範本。  

✅ 適合想學習如何從 0 到 1 建立 AI 網頁伺服器的開發者。  

🔧 無論你對 FastAPI、Next.js、LangChain、或 GitHub Actions 有興趣，都可以透過這個專案快速理解實際架構運作方式。

🙏 專案開放自由使用，不必發 PR，歡迎參考、改寫、甚至 fork 成你自己的版本！

## ✨ 特色  
📐 伺服器組件圖 (架構圖，使用 UML 2.X)

📘 詳細的操作引導  

📁 具備檔案結構介紹  

## 💻 系統需求

- 🧠 **CPU**: 至少 4 核心（建議更多）  
- 🧵 **RAM**: 建議 32 GB（穩定）  
- 💾 **磁碟**: 至少空閒 200 GB（VM 檔案, Docker 映像檔與 AI 模型）  
- 🐧 **作業系統**: Windows / Linux / macOS（✅ 推薦使用 Linux）  
- 🌐 **網路**: 穩定的網際網路連線  
  - 🌍 若在中國境內，請搭配 **科學上網** 工具，以順利拉取：
    - 📁 GitHub 儲存庫  
    - 📦 Docker Image  
    - 🧠 AI Model  

## ⚡ 快速開始

```bash
git clone https://github.com/TsukiSama9292/AI-Server-Sample.git      # 下載專案(部屬分支)
cd AI-Server-Sample                                                  # 進入專案資料夾
cp .env.example .env                                                 # 複製範本環境變數
docker compose up -d                                                 # 啟用全端網頁服務
docker compose -f docker-compose-ollama.yml up -d                    # 啟用 Ollama 服務
```

## 🛠️ 技術棧  

| 項目          | 工具                          | 說明                                                                 |
|---------------|-------------------------------|--------------------------------------------------------------------|
| **CI/CD**     | ⚙️ Github Actions             | 分支策略，實現持續集成和部署 🚀                                        |
| **Proxy Server** | 🌐 Nginx                   | 作為反向代理伺服器，處理 HTTP 請求並轉發至前後端服務 🔁                   |
| **Back-End**  | 🐍 FastAPI + 🧠 LangChain     | 建立 API 的 Python 框架，LangChain 負責 Agent 邏輯處理                |
| **Front-End** | 💻 Next.js (React)            | 建立前端網頁 🖼️                                                     |
| **AI Server** | 🤖 Ollama                     | 支援 CPU，提供 AI 模型服務 🧩                                        |
| **DB**        | 🐘 PostgreSQL + 🧪 PGLite     | 預計使用，資料存儲用途 💾                                             |



## 🏗️ 架構圖 - [線上架構圖](https://viewer.diagrams.net/?tags=%7B%7D&lightbox=1&highlight=0000ff&edit=_blank&layers=1&nav=1&title=ai-sample-server.drawio&dark=auto#Uhttps%3A%2F%2Fdrive.google.com%2Fuc%3Fid%3D1QD_Iwv_ZQpG5kS-wWtm0l2T6u9CXrsgk%26export%3Ddownload)

![架構圖](./img/ai-sample-server.drawio.png)

## 📚 推薦閱讀文獻 - 新手友善

[💻 虛擬機介紹、安裝、建立指南 🚀](./docs/VM.md)  

[🔁 CI/CD 介紹、操作說明 👨‍💻](./docs/CICD.md)  

[🐳 Docker 介紹、安裝、中心 📦](./docs/Docker.md)  


---

## 📁 檔案結構
```bash
AI-Server-Sample/
├── 🐳 docker-compose-ollama.yml   # 📦 CD 環境: Ollama 用的 docker-compose 檔案
├── 🐳 docker-compose-server.yml   # 🌐 伺服器用的 docker-compose 檔案
├── 🐳 docker-compose.yml          # 👨‍💻 開發用的 docker-compose 檔案
├── 🐍 dockerfile.fastapi          # ⚙️ FastAPI 的 Dockerfile
├── 💻 dockerfile.nextjs           # 🖼️ Next.js 的 Dockerfile
├── 🌐 dockerfile.nginx            # 🔁 Nginx 的 Dockerfile
├── docs                           # 📚 組件說明文件目錄
|── 🧾 .env.example                # 📌 環境變數範本檔案 (Docker Compose 可用)
├── 🐍 fastapi                     # 🧠 FastAPI 應用程式的目錄
├── 🔧 .github                     # 🤖 GitHub Actions 的目錄
│   └── 🔁 workflows               # ⚙️ 工作流程的目錄
│       ├── 🚀 cd.yml              # 🚚 CD 的工作流程
│       └── 🧪 ci.yml              # 🧪 CI 的工作流程
├── 🖼️ img                         # 🖼️ 圖片目錄
├── 📄 LICENSE                     # 📜 專案許可證文件
├── 💻 nextjs                      # 🖥️ Next.js 應用程式的目錄
├── 🌐 nginx                       # 🌐 Nginx 的目錄
└── 📘 README.md                   # 📝 專案說明文件
```

## 🖥️ 推薦的開發環境
可以考慮使用 [Kasm Workspace](https://www.kasmweb.com/) 🚀  
本人也有提供 Kasm 的鏡像範本，除了官方的 ubuntu dind 鏡像功能之外  
額外安裝了 dbeaver 🗃️, nvm 🔧, npm 📦, node.js 🟢, Postman 📬, Discord 💬  

🏷️ [Workspace 鏡像區](https://tsukisama9292.github.io/kasm_registry/)  

🐳 [Docker Hub](https://hub.docker.com/r/tsukisama9292/ubuntu-jammy-dind)  