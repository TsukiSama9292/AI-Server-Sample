```bash
cp .env.example .env
docker compose -f docker-compose-all-cpu.yml build --no-cache --pull
docker compose -f docker-compose-all-cpu.yml up -d
```
```bash
docker compose -f docker-compose-all-cpu-dev.yml build --no-cache --pull
docker compose -f docker-compose-all-cpu-dev.yml up -d
docker exec ai_server_sample_ollama bash -c "ollama pull gemma3:1b-it-qat"
```