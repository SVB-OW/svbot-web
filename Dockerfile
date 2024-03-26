FROM node:21 as base

LABEL description="SVBot-Web"
LABEL version="1.2"

ENV MONGO_URI ${MONGO_URI}
ENV PROD_ERROR_EMAIL ${PROD_ERROR_EMAIL}

WORKDIR /home/node/app

COPY package*.json ./
COPY yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile --network-timeout 600000

# Copy files into container
COPY . .

# Dont ask me.. https://dev.to/dariansampare/setting-up-docker-typescript-node-hot-reloading-code-changes-in-a-running-container-2b2f
FROM base as production

ENV NODE_PATH=./build

# Build it
RUN yarn build
RUN yarn add concurrently
RUN npx nuxt generate

EXPOSE 40001
EXPOSE 40002

CMD [ "npm", "start" ]
