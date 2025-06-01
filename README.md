# AI Server 範本

## 簡介
這是一個 AI Server 的範本，刻意僅使用 CPU 運行 ollama。  
Docker Compose 來管理多個服務，包括 FastAPI、Next.js、Nginx 和 PostgreSQL。  
此範本適用於開發和持續集成（CI/CD）環境。

## 前置條件
以下是官方社群版本的 Ubuntu 安裝步驟，已經安裝過可忽略。  
- Docker
- Docker Compose
```bash
sudo apt-get update
sudo apt-get install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "${UBUNTU_CODENAME:-$VERSION_CODENAME}") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin -y
sudo usermod -aG docker $USER
sudo reboot
```

## 檔案結構
```bash
AI-Server-Sample/
├── docker-compose-cd.yml       # 開發/CI 用的 docker-compose 檔案
├── docker-compose-ollama.yml   # OLLAMA 用的 docker-compose 檔案
├── docker-compose.yml          # CD 用的 docker-compose 檔案
├── dockerfile.fastapi          # FastAPI 的 Dockerfile
├── dockerfile.next             # Next.js 的 Dockerfile
├── dockerfile.nginx            # Nginx 的 Dockerfile
├── dockerfile.pgsql            # PostgreSQL 的 Dockerfile
├── .env                        # 環境變數檔案 -> For Docker Compose
├── fastapi                     # FastAPI 應用程式的目錄
├── .github                     # GitHub Actions 的目錄
│   └── workflows               # 工作流程的目錄
│       ├── cd.yml              # CD 的工作流程
│       └── ci.yml              # CI 的工作流程
├── next                        # Next.js 應用程式的目錄
├── nginx                       # Nginx 的目錄
├── pgsql                       # PostgreSQL 的目錄
└── README.md                   # 專案說明文件
```

## 使用說明

### 建立 CI 環境
- CPU: 4 核心
- RAM: 8 GB
- 磁碟: 100 GB
- 網路: 橋接模式，選擇主機的網路介面卡
- 安裝步驟:
  1. 完整 CI 虛擬機
    ![CI虛擬機](./img/vm-ci.png)
  2. 網路設定
    ![網路設定](./img/network-setting.png)
  3. 啟動虛擬機並進行系統安裝，在安裝過程中設定網路
    ![VM-網路設定](./img/ci-ipv4-config.png)
  4. 系統安裝完畢，重啟後，使用 SSH 登入
    ![SSH 登入](./img/ssh-login.png)
  5. [安裝 Docker 社群版](#前置條件)
  6. [先完成 CD 環境的虛擬機](#建立-cd-環境)
  7. Github 儲存庫建立 Runner
    - 前往 GitHub 儲存庫的設定頁面
    - 點選 "Actions" -> "Runners" -> "Add runner"
    - 選擇 Linux，並按照指示安裝 Runner
    - 完成後，Runner 會自動連接到 GitHub Actions

### 建立 CD 環境
- CPU: 4 核心
- RAM: 16 GB
- 磁碟: 100 GB
- 網路: 橋接模式，選擇主機的網路介面卡
- 安裝步驟:
  1. 複製 CI 環境的虛擬機
    ![虛擬機複製](./img/vm-copy.png)
  2. 修改虛擬機的名稱
    ![虛擬機名稱修改](./img/vm-name-change.png)
  3. 修改虛擬機的網路設定，確保 IP 位址不同
    ![虛擬機網路設定](./img/vm-network-change.png)

### Ollama 啟用服務
```bash
docker compose -f docker-compose-ollama.yml up -d
```
### Ollama 預先下載模型 - 使用量化感知訓練模型，降低記憶體需求
```bash
docker exec ai_server_sample_ollama bash -c "ollama pull gemma3:1b-it-qat"
```
