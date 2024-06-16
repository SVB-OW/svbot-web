FROM node:20 as base

LABEL description="SVBot-Web"
LABEL version="1.4"

ENV NODE_ENV ${NODE_ENV}
ENV MONGO_URI ${MONGO_URI}
ENV HOME_URI ${HOME_URI}
ENV API_URI ${API_URI}
ENV HOME_PORT ${HOME_PORT}
ENV NITRO_PORT ${NITRO_PORT}
ENV API_PORT ${API_PORT}

WORKDIR /home/node/app

COPY package.json ./
COPY pnpm-lock.yaml ./

# Install dependencies
RUN corepack enable
RUN pnpm install --frozen-lockfile

# Copy files into container
COPY . .

FROM base as production

ENV NODE_PATH=./build

# Build it
RUN pnpm build
RUN pnpm add concurrently
RUN pnpm run build

CMD [ "npm", "start" ]
