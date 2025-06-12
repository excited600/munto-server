.PHONY: deploy

APP_NAME=munto
PORT=3000

build:
	docker build -t $(APP_NAME) .

run:
	docker run -d --rm -p 3000:$(PORT) --name $(APP_NAME) $(APP_NAME)

deploy:
	chmod +x ./deploy.sh
	./deploy.sh 