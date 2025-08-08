# BUILD STEP
FROM node:20.19.4 As build

WORKDIR /app
COPY . .

# COPY yarn.lock tsconfig* /app/

RUN yarn install --network-timeout 240000
RUN yarn tsc
RUN yarn lint-deploy
RUN yarn build-main

EXPOSE 3001
