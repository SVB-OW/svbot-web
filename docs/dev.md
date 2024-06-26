# Dev Docs

## Getting Started

### Prerequisites

- Node.js 20.14.0
- pnpm 9.1.4

### Setup

- pnpm install
- create .env file with the content below

```env
MONGO_URI=mongodb://<your mongo db uri>
HOME_URI=http://localhost:4001
API_URI=http://localhost:4002
HOME_PORT=4001
API_PORT=4002
DB_NAME=svbot
```

### Running

Dev: `pnpm dev`
Prod: `pnpm build && pnpm start`

### Linting / Formatting

We use ESLint and Prettier for linting and formatting. You can run the following
commands to lint and format the code:

Check only: `pnpm lint`, `pnpm format`, `pnpm typecheck`
Fix: `pnpm lint:fix`, `pnpm format:fix`
