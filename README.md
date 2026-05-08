# Portfolio

Personal portfolio site displaying my projects.

## Tech

![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![CSS](https://img.shields.io/badge/CSS-1572B6?style=flat&logo=css3&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white)
![Azure](https://img.shields.io/badge/Azure-0078D4?style=flat&logo=microsoftazure&logoColor=white)

## Makefile

```bash
# Local
make start            # dev server → localhost:3000
make build            # production build → build/

# Docker — production
make docker           # build image + run → localhost:8080
make docker-stop      # stop container

# Docker — dev (hot-reload)
make docker-dev       # build image + run → localhost:3000
make docker-dev-stop  # stop container
```
