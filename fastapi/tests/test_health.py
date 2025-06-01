from fastapi.testclient import TestClient
from ai_sample.core.app import get_app
import pytest
from dotenv import load_dotenv
import os
load_dotenv()

app = get_app()
client = TestClient(app)

def test_health():
    response = client.get("/")
    print(response.json())
    assert response.status_code == 200