# Dev Docs

## Getting Started

### Prerequisites

- Node.js 20.18.0
- pnpm 9.12.0

### Setup

- pnpm install
- create .env file with the content below

```env
DB_NAME=svbot
MONGO_URI=mongodb://<your mongo db uri>
NITRO_PORT=4001
```

### Running

Dev: `pnpm dev`
Prod: `pnpm build && pnpm start`

### Linting / Formatting

We use ESLint and Prettier for linting and formatting. You can run the following
commands to lint and format the code:

Check only: `pnpm lint:js`, `pnpm lint:style`, `pnpm format`, `pnpm typecheck` or all together `pnpm check`
Fix: `pnpm lint:js:fix`, `pnpm lint:style:fix`, `pnpm format:fix`
