include .env

.PHONY: up
up:
	docker-compose up -d

.PHONY: down
down:
	docker-compose down

.PHONY: list-containers
list-containers:
	docker ps

.PHONY: up-microservice
up-microservice:
	docker-compose up -d nestjs-grpc-product-microservice

.PHONY: restart-microservice
restart-microservice:
	docker-compose restart nestjs-grpc-product-microservice

.PHONY: logs-microservice
logs-microservice:
	docker-compose logs -f nestjs-grpc-product-microservice

.PHONY: down-microservice
down-microservice:
	docker stop nestjs-grpc-product-microservice &&	docker rm nestjs-grpc-product-microservice

.PHONY: up-database
up-database:
	docker-compose up -d nestjs-grpc-product-database

.PHONY: restart-database
restart-database:
	docker-compose restart nestjs-grpc-product-database

.PHONY: logs-database
logs-database:
	docker-compose logs -f nestjs-grpc-product-database

.PHONY: down-database
down-database:
	docker stop nestjs-grpc-product-database &&	docker rm nestjs-grpc-product-database

.PHONY: database-cli
database-cli:
	docker exec -it nestjs-grpc-product-database mysql -u root -p

