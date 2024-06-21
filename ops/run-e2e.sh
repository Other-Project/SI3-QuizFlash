#!/usr/bin/env sh
docker compose -f docker-compose-e2e.yml up --remove-orphans --exit-code-from playwright
