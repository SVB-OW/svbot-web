FROM node:20 as base

LABEL description="SVBot-Web"
LABEL version="1.3"

ENV MONGO_URI ${MONGO_URI}
ENV PROD_ERROR_EMAIL ${PROD_ERROR_EMAIL}

WORKDIR /home/node/app

COPY package.json ./
COPY pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile --network-timeout 600000

# Copy files into container
COPY . .

# Dont ask me.. https://dev.to/dariansampare/setting-up-docker-typescript-node-hot-reloading-code-changes-in-a-running-container-2b2f
FROM base as production

ENV NODE_PATH=./build

# Build it
RUN pnpm build
RUN pnpm add concurrently
RUN npx nuxt generate

EXPOSE 40001
EXPOSE 40002

CMD [ "npm", "start" ]
