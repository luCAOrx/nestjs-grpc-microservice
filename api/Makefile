include .env

.PHONY: up
up:
	docker-compose up -d

.PHONY: down
down:
	docker-compose down

.PHONY: restart
restart:
	docker-compose restart nestjs-grpc-api

.PHONY: logs
logs:
	docker-compose logs -f nestjs-grpc-api
