# AREA

Automation platform of his digital life

### 🏠 [Homepage](https://github.com/pacome35220/AREA)

## Project structure

Each subfolders contains its own README.md

```console
.
├── server - Back-end server with business logic of AREA
├── webapp - Front-end Angular web application
├── mobile - Front-end Xamarin mobile application
```

## Development workflow

If you want to develop on the server or the webapp, here is how to get started.

### 1. Prepare your environment

Here comes a little surprise: You need [Node.JS](http://nodejs.org) and [docker-compose](https://docs.docker.com/compose/).

### 2. Install the dependencies

```sh
$ npm install
$ cd server && npm install
$ cd webapp && npm install
```

### 3. Expose the default database port

In the [docker-compose.yml](./docker-compose.yml), in the `db` service, add a field `ports` to expose the default database port.

For PostgreSQL, the default port is 5432.

```yml
ports:
    - "8081:5432"
```

### 4. Load environment variables

First, load environment variables used in [docker-compose.yml](./docker-compose.yml) with this command :

```sh
$ source .travis/.env
```

### 5. Run database service

```sh
$ docker-compose up --build db
```

### 6. Add `.env` in server directory

We use the well-known [dotenv](https://www.npmjs.com/package/dotenv) to pre-load environment variables in the [server](./server/.env).

```sh
ENV=            # actually usused
DB=             # must be postgres
DB_USER=        # must be the same as POSTGRES_USER in docker-compose.yml
DB_PASSWORD=    # must be the same as POSTGRES_PASSWORD in docker-compose.yml
DB_HOST=        # must be localhost
DB_PORT=        # must be the same as in 3. chapter
```

### 7. Running server

```sh
$ cd server
$ npm run dev
```

### 8. Running Angular webapp

```sh
$ cd webapp
$ npm start
```

## Contributing rules

### [Commitizen](github.com/commitizen/cz-cli)

* `npm run commit`, prompt you to fill out any required commit fields at commit time, to format your commits messages. With [husky](github.com/typicode/husky) and [lint-staged](github.com/okonet/lint-staged), it also run linters on git staged files.

### [Prettier](github.com/prettier/prettier)

* `npm run prettify`, lint all files following rules wrote in [.prettierrc](./.prettierrc).

### [Conventional-changelog / standard-version](https://github.com/conventional-changelog/standard-version)

* `npm run release`, automate versioning and [CHANGELOG](./CHANGELOG.md) generation, with semver.org and conventionalcommits.org.

## Schema of AREA

![Schema of AREA](https://cdn.discordapp.com/attachments/638401431090626590/683306512092889245/Area.vpd.png)
