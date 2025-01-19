up:
	docker-compose up -d

up-dev:
	docker-compose up

down:
	docker-compose down

build:
	docker-compose build

# Database Mangement
up-db:
	docker-compose up mongodb

down-db:
	docker-compose down mongodb