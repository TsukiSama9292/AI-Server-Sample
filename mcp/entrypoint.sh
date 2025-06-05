#!/bin/bash

# 激活虛擬環境
source /venv/.venv/bin/activate

# # 執行 MCP 應用
yes | mcp dev server.py
