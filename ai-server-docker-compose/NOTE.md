# Development Environment Setup

## Using Single Development (CPU)
```bash
cd ai-server-docker-compose
cp .env.example .env
docker compose -f docker-compose-all-cpu-dev.yml build --no-cache --pull
docker compose -f docker-compose-all-cpu-dev.yml up -d
```

