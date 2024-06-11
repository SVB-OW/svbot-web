FROM node:20 as base

LABEL description="SVBot-Web"
LABEL version="1.3"

WORKDIR /home/node/app

COPY package.json ./
COPY pnpm-lock.yaml ./

# Install dependencies
RUN corepack enable
RUN pnpm install --frozen-lockfile

# Copy files into container
COPY . .

# Dont ask me.. https://dev.to/dariansampare/setting-up-docker-typescript-node-hot-reloading-code-changes-in-a-running-container-2b2f
FROM base as production

ENV NODE_PATH=./build

# Build it
RUN pnpm build
RUN pnpm add concurrently
RUN pnpm run build

CMD [ "npm", "start" ]
