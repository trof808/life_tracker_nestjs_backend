## Полезные ссылки

1. https://dev.to/chukwutosin_/step-by-step-guide-setting-up-a-nestjs-application-with-docker-and-postgresql-5hei

## Запуск

1. Создать .env.development от .env.development.copy
2. Запустить приложение через docker
`docker-compose -f docker-compose.dev.yml up --build`

#### pgAdmin

`http://localhost:5050/login?next=/`
user = admin@admin.com
pass = pgadmin4

#### API

`http://localhost:8888`