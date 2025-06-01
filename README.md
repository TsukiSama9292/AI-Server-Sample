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

### 建立 CI VM 建立
- CPU: 4 核心
- RAM: 8 GB
- 磁碟: 100 GB
- 網路: 橋接模式，選擇主機的網路介面卡，IP: 192.168.0.241
- 作業系統: Ubuntu 22.04 LTS
- 使用者: ubuntu
- 密碼: ubuntu
- 伺服器名稱: ubuntu-2204-ci
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

### 建立 CD VM 建立
- CPU: 4 核心
- RAM: 16 GB
- 磁碟: 100 GB
- 網路: 橋接模式，選擇主機的網路介面卡
- 安裝步驟:
  1. 複製 CI 環境的虛擬機
    ![虛擬機複製](./img/vm-clone.gif)
  2. 遺忘 SSH 金鑰
      ```bash
      ssh-keygen -R 192.168.0.241
      ```
  2. SSH 登入，修改虛擬機的名稱
      ```bash
      ssh ubuntu@192.168.0.241
      ```
      ```bash
      sudo hostnamectl set-hostname ubuntu-2204-cd
      ```
      ```bash
      sudo nano /etc/hosts
      ```
      ```bash
      127.0.1.1   ubuntu-2204-cd
      ```
  3. 修改虛擬機的網路設定，確保 IP 位址不同
      ```bash
      sudo nano /etc/cloud/cloud.cfg.d/99-disable-network-config.cfg
      ```
      ```bash
      network: {config: disabled}
      ```
      ```bash
      sudo nano /etc/netplan/50-cloud-init.yaml
      ```yaml
      network:
          ethernets:
              enp0s3:
                  addresses:
                  - 192.168.0.242/24
                  nameservers:
                      addresses:
                      - 8.8.8.8
                      search: []
                  routes:
                  -   to: default
                      via: 192.168.0.1
          version: 2
      ```
      ```bash
      sudo netplan apply
      ```
  4. 關閉 SSH 視窗
  5. SSH 登入新 IP
      ```bash
      ssh ubuntu@192.168.0.242
      ```

### Github Actions Runner 建立
1. SSH 遺忘與重新登入
    ```bash
    ssh-keygen -R 192.168.0.241
    ```
    CI VM SSH 登入
    ```bash
    ssh ubuntu@192.168.0.241
    ```
    CD VM SSH 登入
    ```bash
    ssh ubuntu@192.168.0.242
    ```
2. Github 儲存庫建立 Runner
  - 前往 GitHub 儲存庫的設定頁面，點選 "Actions" -> "Runners" -> "New self-hosted runner"，預設 Linux
    ![GitHub Runner 設定](./img/github-runner-add.gif)
  - 兩個 VM 都跟隨指示下載並安裝 Runner
      建立資料夾，推薦自定名稱
      ```bash
      mkdir ai-sample-actions-runner && cd ai-sample-actions-runner
      ```
      下載 Runner 壓縮檔，請根據 Github 儲存庫指令，以下為範例指令：
      ```bash
      curl -o actions-runner-linux-x64-2.324.0.tar.gz -L https://github.com/actions/runner/releases/download/v2.324.0/actions-runner-linux-x64-2.324.0.tar.gz
      ```
      解壓縮 Runner 壓縮檔
      ```bash
      tar xzf ./actions-runner-linux-x64-2.324.0.tar.gz
      ```
      設定 Config，每次的 Token 都不同，一個 Token 只能用一次，請根據 Github 儲存庫指令，以下為範例指令：
      ```bash
      ./config.sh --url https://github.com/TsukiSama9292/AI-Server-Sample --token BADCU6CIOZZ4UAVHPMNBEOTIHPBBO
      
      # 設定
      >> Enter the name of the runner group to add this runner to: [press Enter for Default] -> 直接 Enter，或輸入自定名稱
      >> Enter the name of runner: [press Enter for ubuntu-2204-ci] -> 直接 Enter，或輸入自定名稱
      >> This runner will have the following labels: 'self-hosted', 'Linux', 'X64' 
      >> Enter any additional labels (ex. label-1,label-2): [press Enter to skip] -> 輸入 ci 或 cd
      >> Enter name of work folder: [press Enter for _work] -> 直接 Enter
      ```
      通常要在每次重啟時執行 Runner，可以用 `crontab` 來設定自動啟動
      ```bash
      crontab -e
      >>  no crontab for ubuntu - using an empty one
          Select an editor.  To change later, run 'select-editor'.
            1. /bin/nano        <---- easiest
            2. /usr/bin/vim.basic
            3. /usr/bin/vim.tiny
            4. /bin/ed
      >> 選擇 1
      ```
      滑到最底下，加入以下指令，確保每次重啟時都會執行 Runner
      ```bash
      @reboot /home/ubuntu/ai-sample-actions-runner/run.sh
      ```
      完成後，直接重啟 VM
      ```bash
      sudo reboot
      ```
  - 完成後，回到 GitHub 儲存庫的 Runner 設定頁面，應該會看到新建立的 Runner
    ![GitHub Runner 設定完成](./img/github-runner-complete.png)

### CD 環境
因為有用 GitHub Actions Runner，所以可以直接使用 GitHub Actions 來部署  
以下是手動部署的步驟：
```bash
docker compose -f docker-compose-ollama.yml up -d
```
可選: Ollama 預先下載模型 - 使用量化感知訓練模型，降低記憶體需求
```bash
docker exec ai_server_sample_ollama bash -c "ollama pull gemma3:1b-it-qat"
```

### 開發環境不限，但必須有 Docker 和 Docker Compose
可以考慮使用 [Kasm Workspace](https://www.kasmweb.com/)  
本人也有提供 Kasm 的鏡像範本，除了官方的 ubuntu dind 鏡像功能之外  
額外安裝 dbeaver, nvm, npm, node.js, Postman, Discord  
- [Workspace 鏡像區](https://tsukisama9292.github.io/kasm_registry/)
- [Docker Hub](https://hub.docker.com/r/tsukisama9292/ubuntu-jammy-dind)

### 建立 uv.lock - 該儲存庫已經建立好了(可略過該步驟)
需要在本來就有 UV 的環境下，原本建立 `pyproject.toml` 時不會有 `uv.lock` 檔案  
要先建立一個虛擬環境
```bash
cd fastapi
uv venv
uv sync
```