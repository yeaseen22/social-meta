up:
	docker-compose up -d

up-dev:
	docker-compose up

down:
	docker-compose down

build:
	docker-compose build

# Client Web Management
client-web:
	docker-compose up client

client-web-detach:
	docker-compose up client -d

client-web-down:
	docker-compose down client


# Server Management
server-run:
	docker-compose up app

server-detach:
	docker-compose up app -d

server-down:
	docker-compose down app


# Database Mangement
db:
	docker-compose up mongodb

db-detach:
	docker-compose up mongodb -d

down-db:
	docker-compose down mongodb
