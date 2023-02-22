# Dev Docs

## Getting Started

### Prerequisites

- Node.js 16.19.0
- Yarn 1.22.19

### Setup

- yarn install
- create .env file with the content below

```env
MONGO_URI=mongodb://<your mongo db uri>
```

### Running

Dev: `yarn dev`
Prod: `yarn build && yarn start`

### Linting / Formatting

We use ESLint and Prettier for linting and formatting. You can run the following commands to lint and format the code:

Check only: `yarn lint`, `yarn format`
Fix: `yarn lint-fix`, `yarn format-fix`
