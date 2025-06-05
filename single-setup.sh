#!/bin/bash

# 檢查容器群是否已經部署過
if docker compose ls -a | grep -q 'ai-server-docker-compose'; then
    echo "容器群已經部署過"
    exit 0 # 已經部署過，退出腳本
fi

# 切換到專案資料夾
cd ai-server-docker-compose || { echo "找不到資料夾，請確認路徑正確"; exit 1; }

# 複製環境變數範本
echo "正在複製環境變數範本..."
cp .env.example .env

# 根據參數選擇 compose 檔案
COMPOSE_FILE="docker-compose-all-cpu-single.yml"
if [ "$1" == "--gpu" ]; then
    COMPOSE_FILE="docker-compose-all-cuda-single.yml"
    echo "使用 GPU 模式"
else
    echo "使用 CPU 模式（預設）"
fi

# 啟動所有服務
docker compose -f "$COMPOSE_FILE" up -d

# 等待容器健康狀態就緒
echo "正在檢查 ai_server_sample_ollama 是否啟動並健康..."

MAX_RETRIES=60
RETRY_COUNT=0

until curl -s -o /dev/null -w "%{http_code}" 127.0.0.1:11434 | grep -q "200"; do
    ((RETRY_COUNT++))
    if [ "$RETRY_COUNT" -ge "$MAX_RETRIES" ]; then
        echo "Error: ollama pull gemma3"
        exit 1
    fi
    sleep 1
done

echo "服務啟動成功，開始下載模型..."

# 下載 gemma3 模型
docker exec ai_server_sample_ollama bash -c "ollama pull gemma3:1b-it-qat"

# 檢查模型是否已下載成功
if docker exec ai_server_sample_ollama bash -c "ollama list | grep -q 'gemma3:1b-it-qat'"; then
    echo "模型 gemma3:1b-it-qat 已下載"
else
    echo "模型 gemma3:1b-it-qat 未下載"
    exit 1
fi
