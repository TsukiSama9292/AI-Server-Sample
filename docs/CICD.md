# CI/CD 介紹、操作說明

## 🧩 總覽（Summary）  
持續整合（CI）與持續交付／部署（CD）是現代軟體開發與運維（DevOps）流程中的核心概念，能透過自動化管道將程式碼從撰寫階段一路送到生產環境，達成「快速、穩定、可重複」的交付流程。CI/CD 的主要價值在於：  
1. 📦 **自動化建置與測試**：每次程式碼提交（Commit）後自動化執行建置與測試，確保程式品質；  
2. 🚀 **快速部署與交付**：將建置成功的產物快速部署到測試或正式環境，縮短發布週期，並降低人為操作失誤；  
3. 🔄 **持續迭代與回饋**：透過監控與回報機制即時偵測生產環境問題，確保每次變更都能快速回饋並修正，突破傳統「手動部署→人工測試→回報錯誤」的瓶頸。  

---

## 📚 簡介  
- 🧱 **什麼是 CI（Continuous Integration, 持續整合）？**  
  - CI 旨在將「需求規劃 → 程式碼撰寫 → 建置（Build） → 測試（Test）」等步驟自動化，讓開發者能夠隨時將本地程式安全地合併到主分支（master/main），並在同一環境中執行單元測試與整合測試，減少環境差異與人為疏失。  
  - 典型流程：開發者將程式碼 Push 到 GitHub/GitLab/Bitbucket 等版本控制系統後，CI 工具（如 Jenkins、GitLab CI、CircleCI）會自動拉取程式碼進行建置與測試，並在失敗時立刻通知開發者進行修復。  

- 🏗️ **什麼是 CD（Continuous Delivery / Continuous Deployment，持續交付／持續部署）？**  
  - CD 可細分為兩種：  
    1. **持續交付（Continuous Delivery）**：建置與測試完成後，自動將可部署的建置產物部署到準生產（Staging）環境，需要人工按下按鈕才能推向正式生產（Production）。  
    2. **持續部署（Continuous Deployment）**：在測試通過後，自動無縫將最新程式推向生產環境，全程無需人工干預，適用於需要極速更新的小步快跑團隊。  
  - CD 流程：當 CI 建置與測試階段通過後，系統便會進入「Release → Deploy → Operate → Monitor」階段，透過自動化工具將程式佈署到伺服器或容器平台，並持續監控服務狀態，發現異常即時推送警示給維運團隊，確保服務高可用性與穩定度。  

---

## 🔄 流程詳解  

### 🛠️ CI 流程  
1. **Plan & Code**：在 Git 平臺上建立 Issue 或使用者故事（User Story），開發者依需求建立分支（Feature Branch），開始撰寫程式碼。  
2. **Build**：CI 工具（如 Jenkins、GitLab CI、CircleCI）自動從 Git 倉庫拉取分支程式碼，使用預先定義的建置腳本（如 Maven、Gradle、npm、Webpack）將原始碼打包成可部署的二進位或容器映像檔。  
3. **Test**：建置完成後觸發自動化測試（單元測試、整合測試、靜態原始碼分析、安全掃描），確保程式功能正常且無重大漏洞。  
4. **Merge**：所有測試通過後，可自動或手動將分支 Merge 回主分支，並在主分支持續進行下次循環。  

> ✨ **Tip**：建議將測試分為快速回歸測試（Quick Tests）與完整測試（Full Tests），將快速測試放在 CI 流程最前方，如此可更快發現程式基礎錯誤，再視情況執行較耗時的測試。  

### 🚀 CD 流程  
1. **Release**：CI 通過後，產出可部署建置產物（Artifact），標上版本號或 Tag，並存放至 Artifact Repository（如 Docker Registry、Nexus、Artifactory）。  
2. **Deploy**：將建置產物自動化部署至測試環境（Staging）或生產環境（Production），可結合容器化平臺（Docker + Kubernetes）、Serverless 架構或雲端服務（AWS、GCP、Azure）。  
3. **Operate**：透過基礎架構即程式宣告（Infrastructure as Code，IaC）工具（如 Terraform、Pulumi、Ansible），確保環境可重現性，並在部署後進行必要的環境配置調整或資料庫遷移。  
4. **Monitor**：利用監控與日誌系統（如 Prometheus + Grafana、ELK Stack、Datadog）即時監測服務運行狀態，並整合告警機制（Webhook、Slack、Telegram、PagerDuty）將異常通知團隊，快速響應與修復。  

---

## 🌟 CI/CD 的優點  
1. ⚡ **加快開發速度**：自動化建置與測試可大幅縮短每次提交的回饋時間，開發者隨時可看到程式是否通過測試，避免手動測試拖延專案進度。  
2. 📈 **提升品質與可靠度**：透過一致的測試與建置環境，減少「在本地可跑、到伺服器卻報錯」的問題，並輔以安全掃描工具檢測映像檔漏洞，降低系統風險。  
3. 🔄 **持續迭代**：快速回饋循環讓團隊能更頻繁地交付新功能，並在錯誤發生後及時修復，形成「持續寫程式 → 持續集成 → 持續交付 → 持續監控」的閉環。  
4. 🤝 **增進團隊協作**：CI/CD 透過統一的管道、明確的建置與部署步驟，讓開發、測試、維運人員能在同一流程上協同工作，避免職責重疊或訊息落差。  

---

## 🛠️ 常見 CI/CD 工具  
1. **Jenkins**（開源自建方案）  
   - 功能：支援數千種插件，可與 Git、Docker、Kubernetes、Slack 等無縫整合，靈活性高但需自行維護與升級。  
   - 適用場景：企業自有私有雲或自建伺服器，需高度客製化 Pipeline 且具備維運能力的團隊。  

2. **GitLab CI/CD**（結合版本控制與 CI/CD）  
   - 功能：直接與 GitLab Repository 整合，使用 `.gitlab-ci.yml` 定義 Pipeline，提供免費 Runner、Auto DevOps、容器掃描等功能。  
   - 適用場景：GitLab 平臺用戶，想要「一站式」管理版控、Issue、CI/CD 與 Docker Registry 的團隊。  

3. **GitHub Actions**（GitHub 平臺內建 CI/CD）
   - 功能：透過 YAML 檔案定義工作流程，支援多種觸發事件（如 Pull Request、Push、Issue），並可使用 Marketplace 上的 Actions 來擴展功能。  
   - 適用場景：GitHub 儲存庫用戶，需快速上手且無需額外維護 CI/CD 環境的團隊。

---

## 操作說明 - Github Actions Runner 建立
1. 前置條件
    - 🐳 [Docker 社群版](./Docker.md) 已安裝完成
    - 🖥️ CI VM 與 CD VM 已建立並可 SSH 登入
        - CI VM IP: 192.168.0.241
        - CD VM IP: 192.168.0.242
2. SSH 登入
    🔑 SSH 遺忘金鑰(可選，因為我上一步是設定IP，所以先移除金鑰)
    ```bash
    ssh-keygen -R 192.168.0.241
    ssh-keygen -R 192.168.0.242
    ```
    🖥️ CI VM SSH 登入  
    ```bash
    ssh ubuntu@192.168.0.241
    ```
    🖥️ CD VM SSH 登入  
    ```bash
    ssh ubuntu@192.168.0.242
    ```
3. 🚀 Github 儲存庫建立 Runner
  - 🛠️ 前往 GitHub 儲存庫的設定頁面，點選 "Actions" -> "Runners" -> "New self-hosted runner"，預設 Linux
    ![GitHub Runner 設定](../img/github-runner-add.gif)
  - 🖥️ 兩個 VM 都跟隨指示下載並安裝 Runner
      📂 建立資料夾，推薦自定名稱
      ```bash
      mkdir ai-sample-actions-runner && cd ai-sample-actions-runner
      ```
      ⬇️ 下載 Runner 壓縮檔，請根據 Github 儲存庫指令，以下為範例指令：
      ```bash
      curl -o actions-runner-linux-x64-2.324.0.tar.gz -L https://github.com/actions/runner/releases/download/v2.324.0/actions-runner-linux-x64-2.324.0.tar.gz
      ```
      📦 解壓縮 Runner 壓縮檔
      ```bash
      tar xzf ./actions-runner-linux-x64-2.324.0.tar.gz
      ```
      ⚙️ 設定 Config，每次的 Token 都不同，一個 Token 只能用一次，請根據 Github 儲存庫指令，以下為範例指令：
      ```bash
      ./config.sh --url https://github.com/TsukiSama9292/AI-Server-Sample --token BADCU6CIOZZ4UAVHPMNBEOTIHPBBO
      
      # 設定
      >> Enter the name of the runner group to add this runner to: [press Enter for Default] -> 直接 Enter，或輸入自定名稱
      >> Enter the name of runner: [press Enter for ubuntu-2204-ci] -> 直接 Enter，或輸入自定名稱
      >> This runner will have the following labels: 'self-hosted', 'Linux', 'X64' 
      >> Enter any additional labels (ex. label-1,label-2): [press Enter to skip] -> 輸入 ci 或 cd
      >> Enter name of work folder: [press Enter for _work] -> 直接 Enter
      ```
      🔄 通常要在每次重啟時執行 Runner，可以用 `crontab` 來設定自動啟動
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
      👉 滑到最底下，加入以下指令，確保每次重啟時都會執行 Runner
      ```bash
      @reboot /home/ubuntu/ai-sample-actions-runner/run.sh
      ```
      🔄 完成後，直接重啟 VM
      ```bash
      sudo reboot
      ```
  - ✅ 完成後，回到 GitHub 儲存庫的 Runner 設定頁面，應該會看到新建立的 Runner
    ![GitHub Runner 設定完成](../img/github-runner-complete.png)