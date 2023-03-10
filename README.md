## Configuration

1. Create a `.env` file
   - Rename the [.env.sample](.env.sample) file to `.env` to fix it.
2. Edit env config
   - Edit the file in the [config](src/config) folder.
   - `default`, `development`, `production`, `test`

## Installation

```sh
# 1. node_modules
npm ci
# 1-1. npm < v7 or Node.js <= v14
npm i
# 2. When synchronize database from existing entities
npm run entity:sync
# 2-1. When import entities from an existing database
npm run entity:load
```

## Development

```sh
npm run start:dev
npm run start:repl
# add new module with template
nest g res modules/module-name
```

Run [http://localhost:3000](http://localhost:3000)

## Test

```sh
npm test # exclude e2e
npm run test:e2e
```

## Production

```sh
npm run lint
npm run build
# define environment variable yourself.
# NODE_ENV=production PORT=8000 NO_COLOR=true node dist/app
node dist/app
# OR
npm start
```

## Features

We create this boilerplate using NestJS's default boilerplate with the following add-on features:

- **_Authentication & Authorization_**: JWT & Passport
- **_API Documentation_**: Swagger
- **_Object–relational mapping_**: TypeORM
- **_Environment Variables_**: dotenv
- **_Database_**: mySQL
- **_Code Style_**: ESlint + Prettier (with `eslint-config-airbnb-typescript`)
- **_TypeScript_** supported

Please check the `package.json` for more details.

## Folders

```js
src/ // the source code of the application
│  ├─ modules/ // the directory that contains all modules
│  │  ├─ auth/ // a module for authentication-related functionality
│  │  │  ├─ dtos/
│  │  │  ├─ entities/
│  │  │  ├─ auth.controller.ts
│  │  │  ├─ auth.module.ts
│  │  │  ├─ auth.service.ts
│  │  ├─ user/ // a module for user-related functionality
│  │  │  ├─ dtos/
│  │  │  ├─ entities/
│  │  │  ├─ user.controller.ts
│  │  │  ├─ user.module.ts
│  │  │  ├─ user.service.ts
│  ├─ common/ // common utilities and shared components
│  │  ├─ constants.ts
│  │  ├─ decorators/
│  │  │  ├─ roles.decorator.ts
│  │  │  ├─ user.decorator.ts
│  │  ├─ exceptions/
│  │  │  ├─ http-exception.filter.ts
│  │  │  ├─ validation.filter.ts
│  │  ├─ interceptors/
│  │  │  ├─ logging.interceptor.ts
│  │  │  ├─ transform.interceptor.ts
│  │  ├─ pipes/
│  │  │  ├─ parse-int.pipe.ts
│  │  │  ├─ validation.pipe.ts
│  ├─ config/ // a module for configuration-related functionality
│  │  ├─ config.module.ts
│  │  ├─ config.service.ts
│  ├─ utils/ // utility modules
│  │  ├─ utils.module.ts
│  │  ├─ logger.ts
│  ├─ main.ts
├─ tests/
│  ├─ app/ // end-to-end tests of the application
│  │  ├─ app.e2e-spec.ts
│  ├─ jest-e2e.json
├─ package.json
├─ README.md
├─ .env
├─ .env.example
├─ .gitignore
├─ tsconfig.json
├─ nest-cli.json
```
