# FundraiseUp Fullstack Test

## Prerequisites

1. `node` v14+, `npm` v8+

2. `yarn` installed globally

3. `mongodb` instance with suitable table (set via config) and collection - for instance I've used the `docker` approach

```bash
docker run -d --name mongodb-test \
  -p 27017:27017 \
  -p 27018:27018 \
  -e "MONGO_INITDB_ROOT_USERNAME=user1" \
  -e "MONGO_INITDB_ROOT_PASSWORD=1234567" \
  mongo
```

4. (Optional) `VSCode` with installed `eslint` and `prettier` plugins - to continue developing

5. (Optional) `MongoDB Compass` is a neat tool to administrate and observe `mongodb` collections

## Building and starting

1. Clone the `config.json.dist` file into `config.json` and replace it's contents according to your setup

2. Install deps packages via `yarn install`

3. Generate bundles with `yarn build`

4. Create database (for example `fundraiseup-test`) with `tracks` collection inside

5. Start apps either with separate commands like `yarn server` and `yarn tracker` - or via combined `yarn start`

6. Open `server` app inside your browser typing the `SERVER_PATH` url inside

7. Test the `tracker` behaviour there

8. (Optional) for development purposes there are several more commands:

```bash
yarn format

yarn lint

yarn server:dev

yarn tracker:dev
```
