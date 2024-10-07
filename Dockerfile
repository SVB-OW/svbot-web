FROM node:20-alpine as base

WORKDIR /home/node/app

COPY . .

RUN corepack enable
RUN pnpm install --frozen-lockfile
RUN pnpm build

FROM base as production
COPY --from=base /home/node/app/.output ./.output
CMD ["pnpm", "start"]
