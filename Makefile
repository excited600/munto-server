.PHONY: deploy up down logs

APP_NAME=munto
PORT=3000

up:
	docker-compose up -d

down:
	docker-compose down

logs:
	docker-compose logs -f