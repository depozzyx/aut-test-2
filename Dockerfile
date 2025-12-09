# BUILD STEP
FROM node:20.19.4 As build

WORKDIR /app
COPY . .

RUN corepack enable

RUN pnpm install --frozen-lockfile --fetch-timeout 240000
RUN pnpm tsc
RUN pnpm lint-deploy
RUN pnpm build-main

EXPOSE 3001
