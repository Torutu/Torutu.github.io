IMAGE      = portfolio
DEV_IMAGE  = portfolio-dev
CONTAINER  = portfolio
DEV_CONTAINER = portfolio-dev
PORT       = 8080
DEV_PORT   = 3000

.PHONY: help install start build \
        docker docker-build docker-run docker-stop \
        docker-dev docker-dev-build docker-dev-run docker-dev-stop

help:
	@echo ""
	@echo "  ── Local ──────────────────────────────────────────────────"
	@echo "  make install          install npm dependencies"
	@echo "  make start            start the dev server  →  localhost:$(DEV_PORT)"
	@echo "  make build            compile a production build  →  ./build"
	@echo ""
	@echo "  ── Docker (production) ────────────────────────────────────"
	@echo "  make docker           build image + run container  →  localhost:$(PORT)"
	@echo "  make docker-build     build the production Docker image"
	@echo "  make docker-run       run the container (image must exist)"
	@echo "  make docker-stop      stop and remove the container"
	@echo ""
	@echo "  ── Docker (dev, hot-reload) ───────────────────────────────"
	@echo "  make docker-dev       build dev image + run with hot-reload  →  localhost:$(DEV_PORT)"
	@echo "  make docker-dev-build build the dev Docker image"
	@echo "  make docker-dev-run   run the dev container (image must exist)"
	@echo "  make docker-dev-stop  stop and remove the dev container"
	@echo ""

# ── Local ──────────────────────────────────────────────────────────────────────

install:
	npm install

start: node_modules
	npm start

build: node_modules
	npm run build

node_modules:
	npm install

# ── Docker (production) ────────────────────────────────────────────────────────

docker: docker-build docker-run

docker-build:
	docker build -t $(IMAGE) .

docker-run:
	docker run -d --name $(CONTAINER) -p $(PORT):80 $(IMAGE)
	@echo "Running at http://localhost:$(PORT)"

docker-stop:
	docker stop $(CONTAINER) && docker rm $(CONTAINER)

# ── Docker (dev, hot-reload) ───────────────────────────────────────────────────

docker-dev: docker-dev-build docker-dev-run

docker-dev-build:
	docker build -f Dockerfile.dev -t $(DEV_IMAGE) .

docker-dev-run:
	docker run -it --rm \
		--name $(DEV_CONTAINER) \
		-p $(DEV_PORT):3000 \
		-v "$(PWD):/app" \
		-v /app/node_modules \
		$(DEV_IMAGE)

docker-dev-stop:
	docker stop $(DEV_CONTAINER)
