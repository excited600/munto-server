.PHONY: deploy up down logs

APP_NAME=munto
PORT=3000

deploy:
	docker-compose up -d --build

up:
	docker-compose up -d

down:
	docker-compose down

logs:
	docker-compose logs -f