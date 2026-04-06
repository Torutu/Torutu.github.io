.PHONY: make install start build

make:
	@echo "make install: installs dependencies"
	@echo "make start: starts the development server"
	@echo "make build: builds the project"

install:
	npm install

start:
	npm start

build:
	npm run build

