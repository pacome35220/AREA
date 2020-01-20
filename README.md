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
└── services - Implementation of all services you can use.
```

## Install


```bash
$ npm install
$ cd server && npm install
$ cd webapp && npm install
```

## Contributing rules

### [Commitizen](github.com/commitizen/cz-cli)

* `npm run commit`, prompt you to fill out any required commit fields at commit time, to format your commits messages. With [husky](github.com/typicode/husky) and [lint-staged](github.com/okonet/lint-staged), it also run linters on git staged files.

### [Prettier](github.com/prettier/prettier)

* `npm run prettify`, lint all files following rules wrote in [.prettierrc](./.prettierrc).

### [Conventional-changelog / standard-version](https://github.com/conventional-changelog/standard-version)

* `npm run release`, automate versioning and [CHANGELOG](./CHANGELOG.md) generation, with semver.org and conventionalcommits.org.
