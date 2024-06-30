# FROM node:20
# COPY .output ./.output
# ARG HOME_URI
# RUN echo $HOME_URI > log
# CMD node .output/server/index.mjs

FROM node:20 as base

ARG HOME_URI
ARG API_URI

LABEL description="SVBot-Web"
LABEL version="1.5"

WORKDIR /home/node/app

COPY package.json ./
COPY pnpm-lock.yaml ./

# Install dependencies
RUN corepack enable
RUN pnpm install --frozen-lockfile
RUN echo $HOME_URI > log

# Copy files into container
COPY . .

FROM base as production

ARG HOME_URI
ARG API_URI

# Build it
RUN echo $HOME_URI > log2
RUN pnpm build
RUN pnpm add concurrently

CMD [ "npm", "start" ]
