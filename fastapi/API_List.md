# API List

## API Documentation
| Category            | API Name                              | Method | Endpoint                                  | Description        |
|---------------------|---------------------------------------|--------|-------------------------------------------|--------------------|
| [Health](#health)   | [Health Check API](#health-check-api) | GET    | `http://localhost:60080/api/`             | 檢查服務狀態         |
| [Chat](#chat)       | [Chatbot API](#chatbot-api)           | POST   | `http://localhost:60080/api/chat/chatbot` | 問答型聊天機器人介面   |


## Health

### Health Check API
```bash
curl -X 'GET' 'http://localhost:60080/api/'
```

## Chat

### Chatbot API
```bash
curl -X 'POST' 'http://localhost:60080/api/chat/chatbot' \
-H 'Content-Type: application/json' \
-d '{"question":"Who are you?"}'
```