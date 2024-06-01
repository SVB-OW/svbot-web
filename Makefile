dockerup:
	docker-compose up -d

dockerup-dev:
	docker-compose up

dockerdown:
	docker-compose down

dockerupdate:
	docker-compose down
	docker-compose build --no-cache
	docker-compose up -d
