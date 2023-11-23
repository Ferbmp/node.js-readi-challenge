start:
	@echo "Starting containers..."
	docker-compose up

finish:
	@echo "Stopping containers..."
	docker-compose down