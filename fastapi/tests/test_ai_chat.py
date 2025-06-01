import json
from fastapi.testclient import TestClient
from ai_sample.core.app import get_app
import pytest
from dotenv import load_dotenv
import os

load_dotenv()

app = get_app()
client = TestClient(app)

def test_ai_chat_streaming():
    data = { "question": "你是誰?" }
    with client.stream(
        "POST",
        "/chat/chatbot",
        json=data,
        headers={"Content-Type": "application/json"}
    ) as response:
        assert response.status_code == 200

        full_text = ""
        for line in response.iter_lines():
            if not line or not line.startswith("data:"):
                continue

            json_str = line[len("data: "):]
            data_obj = json.loads(json_str)

            full_text += data_obj.get("context", "")
            if data_obj.get("status") == "done":
                break

        print("完整 AI 回复：", full_text)