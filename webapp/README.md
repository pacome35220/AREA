# AREA Webapp

We use [Angular](https://angular.io/) to develop the web client of AREA.

As [it's not recommended to install npm packages globally](https://code.mendhak.com/npm-install-globally-is-bad/), we installed them in the devDependencies. To use them, there are several ways :

1. If you're on the recent [npm](https://docs.npmjs.com/try-the-latest-stable-version-of-npm) (version > 5.2), you can use :

    ```bash
    $ npx <command>
    ```

    npx looks for command in `node_modules/.bin/`

2. You can also add `node_modules/.bin/` in your `$PATH` to just use the command as a global package, a smart way is to add this in your `.bashrc`
    ```bash
    if [[ $PATH != *"node_modules/.bin"* ]]; then
        export PATH=./node_modules/.bin:$PATH
    fi
    ```

## Install

```bash
$ npm install
```

## Build

```bash
# if you have `node_modules/.bin/` in your `$PATH`
$ ng build # add --prod for production build
# or
$ npx ng build # add --prod for production build
```

## Development

```bash
# if you have `node_modules/.bin/` in your `$PATH`
$ ng serve # --port <port>
# or
$ npx serve # --port <port>
```
