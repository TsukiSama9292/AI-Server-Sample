# 🐳 Docker 介紹、安裝、中心

## 📚 簡介  
Docker 是一個開源的應用程式容器化平台，能夠讓開發者在隔離的環境中打包、分發和執行應用程式。它使用容器技術來確保應用程式在不同環境中的一致性，並且能夠快速部署和擴展。  
- 🔍 **什麼是容器？**  
  - 就像一個輕量化的「快取箱」，將應用程式及其依賴全部打包在一起，確保在任何環境下都能「一鍵運行」。  
  - 容器 ≠ 虛擬機：容器更小、更輕、啟動速度更快。  

- 💡 **為什麼要用 Docker？**  
  1. 📦 **一致性**：在開發、測試、上線各階段都能用相同容器映像（Image），減少「在我機器可跑、到伺服器卻跑不了」的尷尬。  
  2. 🚀 **快速部署**：容器啟動速度秒開，擴展服務只要再拉幾個容器即可負載均衡。  
  3. 🔄 **易於維護**：透過 Dockerfile 定義環境，無需手動安裝套件；只要更改設定檔、重新 build，就能自動產生新版映像。  
  4. 🌐 **跨平台**：支援 Windows、Linux、macOS，只要有 Docker，就能跑一樣的容器。  

---

## ⚙️ 安裝步驟（Ubuntu 範例）  

以下示範使用官方社群版本的 Ubuntu 進行安裝。如果已經安裝過 Docker／Docker Compose，則可跳過對應步驟。

### 🐧 環境需求  
- 🖥️ **作業系統**：Ubuntu 20.04 / 22.04（64-bit）  
- 🌐 **網路**：需能存取 Docker 官方倉庫  

### 1️⃣ 更新套件列表  
```bash
sudo apt-get update
````

### 2️⃣ 安裝必要工具

```bash
sudo apt-get install ca-certificates curl gnupg lsb-release -y
```

* `ca-certificates`：確保 HTTPS 金鑰驗證
* `curl`：下載 Docker GPG 金鑰
* `gnupg`、`lsb-release`：協助新增官方簽名與來源

### 3️⃣ 新增 Docker 官方 GPG 金鑰

```bash
sudo mkdir -m 0755 -p /etc/apt/keyrings  
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg \
  -o /etc/apt/keyrings/docker.gpg  
sudo chmod a+r /etc/apt/keyrings/docker.gpg
```

* 🗝️ **作用**：驗證從 Docker 倉庫拉取的套件真偽。

### 4️⃣ 新增 Docker 倉庫來源

```bash
echo \
  "deb [arch=$(dpkg --print-architecture) \
    signed-by=/etc/apt/keyrings/docker.gpg] \
    https://download.docker.com/linux/ubuntu \
    $(. /etc/os-release && echo \"$VERSION_CODENAME\") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

* 📂 **說明**：

  * 此命令會在 `/etc/apt/sources.list.d/` 建立 `docker.list`，指向 Docker 官方穩定版倉庫。

### 5️⃣ 更新套件列表（再次）

```bash
sudo apt-get update
```

* 🔄 **說明**：因為新增了 Docker 倉庫，需要重新讀取套件索引。

### 6️⃣ 安裝 Docker Engine 及相關套件

```bash
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin -y
```

* 🛠️ **套件清單**：

  * `docker-ce`：Docker 社群版核心
  * `docker-ce-cli`：命令列工具
  * `containerd.io`：容器執行時
  * `docker-buildx-plugin`：進階建構（多平台／多階段）
  * `docker-compose-plugin`：整合新版 Docker Compose V2

### 7️⃣ 加入 Docker 群組（免 sudo）

```bash
sudo usermod -aG docker $USER
```

* 👥 **說明**：

  * 將當前使用者加入 `docker` 群組，讓你執行 `docker` 命令時不用 `sudo`。
  * 執行完後需重新登入或重啟系統。

### 8️⃣ 重啟系統

```bash
sudo reboot
```

* 🔄 **說明**：讓群組變更生效，完成後即可直接以使用者身份執行 Docker。

---

## ✅ 驗證安裝

重啟後開啟終端機（Terminal），確認 Docker 和 Docker Compose 正常運作：

1. **檢查 Docker 版本**

   ```bash
   docker --version
   # 例如：Docker version 28.2.2, build e6534b4
   ```

   * 🧐 若看到版本號即代表安裝成功。

2. **檢查 Docker Compose 版本**

   ```bash
   docker compose version
   # 例如：Docker Compose version v2.36.2
   ```

   * 📦 確認 Docker Compose 已整合到 Docker CLI。

3. **執行測試容器**

   ```bash
   docker run --rm hello-world
   ```

   * 📣 若看到「Hello from Docker!」訊息，表示配置無誤。

---

## 📦 Docker Compose 簡介

Docker Compose 是一個用來定義與執行多容器 Docker 應用程式的工具。透過 `docker-compose.yml`，你可以在同一份設定檔中一次定義多個服務（Service）、網路（Network）、以及資料卷（Volume）。

* 🌟 **優點**：

  1. 🔗 **多容器協調**：只要一行 `docker compose up -d`，就能同時啟動多個服務。
  2. 📂 **易於管理**：可以將資料庫、後端、前端、Redis、Nginx 等服務全部放在同一個 yml 檔。
  3. 🔄 **一鍵重啟/關閉**：用 `docker compose down` 一次關閉所有服務，或用 `docker compose restart` 重啟。

* **範例 `docker-compose.yml`**

  ```yaml
  services:
    web1:
      image: nginx:latest
      ports:
        - "80:80"
    web2:
      image: nginx:latest
      ports:
        - "8080:80"
  ```

---

## 🛠️ 其他作業系統安裝說明（簡略）

* **Windows 10/11**

  1. 前往 [Docker Desktop 官方網站](https://www.docker.com/products/docker-desktop/) 下載 Windows 版本安裝程式。
  2. 雙擊安裝並依指示完成，啟動後即可使用。
  3. Docker Desktop 內建 Docker Compose，無需額外安裝。

* **macOS (Intel / Apple Silicon)**

  1. 同樣至 [Docker Desktop 官方網站](https://www.docker.com/products/docker-desktop/) 下載 macOS 版本安裝程式。
  2. 將應用程式拖入「應用程式」資料夾並啟動即可使用。
  3. Apple Silicon 型號需選擇對應的 M1 / M2 版本。

---

## 🏢 Docker 中心 (Docker Hub)

Docker 中心（Docker Hub）是 Docker 官方提供的雲端映像檔（Image）註冊與儲存平台，也是全球最大的公共與私有容器映像檔庫。它讓開發者可以輕鬆地 **儲存**、**分享**、**管理** 以及 **發佈** Docker 映像檔，並支援自動化建置與整合常見的 CI/CD 工具，讓團隊協作與部署流程更加順暢。🌐✨ :contentReference[oaicite:0]{index=0}

- 🚀 **核心功能**  
  - 📦 **公共與私有儲存庫**：  
    - 公共（Public）儲存庫允許任何使用者下載、使用與貢獻映像檔，促進開源社群分享；  
    - 私有（Private）儲存庫則可限制存取權限，只允許授權使用者或團隊查看與拉取映像檔，以保護機密應用程式與商業資料。🔐 :contentReference[oaicite:1]{index=1}  
  - 🔄 **自動化建置（Automated Builds）**：  
    - 可與 GitHub、Bitbucket 等版本控制平臺整合，當原始碼發生變更時，自動重新建置並推送更新至 Docker 中心。🎯 :contentReference[oaicite:2]{index=2}  
  - 🔔 **Webhook 通知**：  
    - 當映像檔推送或標籤（Tag）變動時，可透過 Webhook 發送即時通知，並觸發下游自動化工作流程（如 CI/CD pipeline）。🔗 :contentReference[oaicite:3]{index=3}  
  - ⚡ **映像檔拉取速率（Rate Limits）**：  
    - Docker Hub 針對匿名與免費帳戶有每日拉取次數限制；付費方案可獲得更高的拉取速率，確保團隊在高流量場景能穩定取得映像檔。📈 :contentReference[oaicite:4]{index=4}  
  - 🛡️ **安全掃描（Image Security Scanning）**：  
    - 支援掃描映像檔中的已知漏洞（Vulnerabilities），並提供修補建議，以維持映像檔的安全性與可靠度。🔍 :contentReference[oaicite:5]{index=5}  

- 📝 **常見操作指令**  
  1. 🔑 **登入 Docker 中心**  
     ```bash
     docker login
     # 輸入 Docker Hub 帳號與密碼，即可登入取得權杖
     ```
  2. 📤 **推送映像檔（Push）**  
     ```bash
     docker tag myapp:latest <你的帳號>/myapp:latest
     docker push <你的帳號>/myapp:latest
     # 成功推送後，可在 Docker 中心的個人儲存庫中看到映像檔
     ```
  3. 📥 **拉取映像檔（Pull）**  
     ```bash
     docker pull <帳號或官方名稱>/nginx:latest
     # 從 Docker 中心拉取指定映像檔至本地端
     ```
  4. 🗂️ **檢視儲存庫**  
     - 直接在瀏覽器中開啟 `https://hub.docker.com/repositories/<你的帳號>`，即可查看所有儲存的映像檔，並管理標籤與存取權限。  

- 🌟 **為何使用 Docker 中心？**  
  1. 🔍 **快速取得／共享映像檔**：  
     - 社群中已有大量「官方（Official）映像檔」，如 `nginx`、`mysql`、`python` 等，這些映像皆經過最佳化與安全掃描，開發者可直接取用，毋須重頭建置。:contentReference[oaicite:6]{index=6}  
  2. 🤝 **促進團隊協作**：  
     - 團隊成員只需共用同一個儲存庫名稱與存取金鑰，便可確保開發、測試、部署使用完全一致的映像檔版本，降低環境差異導致的問題。:contentReference[oaicite:7]{index=7}  
  3. 🔄 **結合 CI/CD**：  
     - 自動化建置可將映像檔建置流程「程式化」，與 Jenkins、GitLab CI、GitHub Actions 等工具無縫整合，一旦程式碼變更即重新產生最新映像，確保持續交付（Continuous Delivery）與持續部署（Continuous Deployment）的穩定性。:contentReference[oaicite:8]{index=8}  
  4. 🔐 **強化安全與監控**：  
     - 採用官方或 Docker 驗證發布者（Verified Publisher）的映像，可大幅降低惡意碼或漏洞風險；同時，透過安全掃描與拉取速率限制，確保映像檔品質與服務可用性。:contentReference[oaicite:9]{index=9}  

> ✨ **Tip**
>
> 🔒 如果需要私有化的高度控制與更嚴格的存取機制，也可考慮使用 **Docker Registry** 自行架設私有倉庫，或選用第三方容器註冊服務（如 GitHub Container Registry、GitLab Container Registry、AWS ECR 等）。
>
> 🧹 建議定期清理不再使用的標籤（Tag），保持儲存庫整潔，並減少不必要的儲存成本。
>
> 🌟 透過 Docker 中心，你可以將開發流程中的容器映像檔管理變得更高效、更安全，並輕鬆與團隊及社群分享成果。
>
> 🐳 [前往 Docker Hub 官網](https://hub.docker.com/) 