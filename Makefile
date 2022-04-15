init: docker-down-clear docker-pull docker-build docker-up
down: docker-down
up: docker-up
restart: docker-down docker-up

docker-up:
	docker-compose up -d

docker-down:
	docker-compose down --remove-orphans

docker-down-clear:
	docker-compose down -v --remove-orphans

docker-pull:
	docker-compose pull

docker-build:
	docker-compose build

docker-push:
	docker build --pull --file ./docker/prod/node/Dockerfile --tag bereznii/smaki:node-1 .
	docker push bereznii/smaki:node-1