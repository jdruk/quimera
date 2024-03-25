APP_NAME=api
DOCKER_COMPOSE=docker-compose

.PHONY: build up down restart logs bash shell install_deps migration_run generate_migration

build:
	$(DOCKER_COMPOSE) build

up:
	$(DOCKER_COMPOSE) up -d

down:
	$(DOCKER_COMPOSE) down

restart: down up

logs:
	$(DOCKER_COMPOSE) logs -f

bash:
	docker exec -it $(APP_NAME) bash

shell:
	docker exec -it $(APP_NAME) sh

install_deps:
	docker exec -it $(APP_NAME) npm install

migration_run:
	docker exec -it $(APP_NAME) npx ts-node ./node_modules/typeorm/cli.js migration:run -d src/config/data.source.ts

generate_migration:
	docker exec -it api npx ts-node ./node_modules/typeorm/cli.js migration:generate -d src/config/data.source.ts src/migrations/$(NAME)

migration_revert:
	docker exec -it $(APP_NAME) npx ts-node ./node_modules/typeorm/cli.js migration:revert -d src/config/data.source.ts

dev:
	cp .env.example .env && docker-compose build && docker-compose up -d && make generate_migration NAME=BaseMigration && make migration_run && docker-compose up