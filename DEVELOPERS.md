# Developing react-native-pos-printer

- [Development Setup](#development-setup)
  - [Installing Dependencies](#installing-dependencies)
  - [Forking react-native-pos-printer on GitHub](#forking-supabase-on-github)
- [Building react-native-pos-printer](#building-supabase)
  - [Choosing Directory](#choosing-directory)
- [Start a Development Server](#start-a-development-server)
  - [react-native-pos-printer Website Development Server](#supabase-website-development-server)
  - [react-native-pos-printer Docs Development Server](#supabase-docs-development-server)
  - [react-native-pos-printer Studio Development Server](#supabase-studio-development-server)
- [Monorepo](#monorepo)
  - [Getting started](#getting-started)
  - [Shared components](#shared-components)
  - [Installing packages](#installing-packages)
  - [Development](#development)
- [Common Tasks](#common-tasks)
  - [Adding redirects](#adding-redirects)
- [Finally](#finally)
- [Community Channels](#community-channels)

## Development Setup

First off, thanks for your interest in react-native-pos-printer and for wanting to contribute! before you begin, read the
[code of conduct](./CODE_OF_CONDUCT.md) and check out the
[existing issues](https://github.com/gzero1/react-native-pos-printer/issues).
This document describes how to set up your development environment to build and test react-native-pos-printer.

### Installing Dependencies

Before you can build react-native-pos-printer, you must install and configure the following dependencies on your
machine:

- [Git](http://git-scm.com/)

- [Node.js v16.x (LTS)](http://nodejs.org)

- [npm](https://www.npmjs.com/) version 7+.

### Forking react-native-pos-printer on GitHub

To contribute code to react-native-pos-printer, you must fork the [react-native-pos-printer Repository](https://github.com/gzero1/react-native-pos-printer). After you fork the repository, you may now begin editing the source code.

## Building react-native-pos-printer

To build react-native-pos-printer, you clone the source code repository:

2. Clone your GitHub forked repository:

   ```sh
   git clone https://github.com/<github_username>/supabase.git
   ```

3. Go to the react-native-pos-printer directory:
   ```sh
   cd supabase
   ```

### Choosing Directory

Before you start a development server, you must choose if you want to work on the [Module itself](https://react-native-pos-printer.github.io) or the [Docs](https://react-native-pos-printer.github.io/docs)

1. Go to the [Module](https://react-native-pos-printer.github.io) directory

   ```sh
   cd apps/www
   ```

   Go to the [Docs](https://react-native-pos-printer.github.io/docs) directory

   ```sh
   cd web
   ```

2. Install npm dependencies:

   npm

   ```sh
   npm install
   ```

   or with yarn

   ```sh
   yarn install
   ```

## Start a Development Server

To debug code, and to see changes in real time, it is often useful to have a local HTTP server. Click one of the three links below to choose which development server you want to start.

- [react-native-pos-printer Website](#react-native-pos-printer-Website-Development-Server)
- [react-native-pos-printer Docs](#react-native-pos-printer-Docs-Development-Server)
- [react-native-pos-printer Studio](#react-native-pos-printer-Studio-Development-Server)

### react-native-pos-printer Website Development Server

The website is moving to a new monorepo setup. See the [Monorepo](#monorepo) section below.

### react-native-pos-printer Docs Development Server

1. Build development server

   npm

   ```sh
   npm run build
   ```

   or with yarn

   ```sh
   yarn build

   ```

2. Start development server

   npm

   ```sh
   npm run start
   ```

   or with yarn

   ```sh
   yarn start
   ```

3. To access the local server, enter the following URL into your web browser:

   ```sh
   http://localhost:3005/docs
   ```

### react-native-pos-printer Studio Development Server

1. Start development server

   npm

   ```sh
   npm run dev
   ```

   or with yarn

   ```sh
   yarn dev
   ```

2. To access the local server, enter the following URL into your web browser:

   ```sh
   http://localhost:8082/
   ```

## Monorepo

We are in the process of migrating this repository to monorepo which will significantly improve the developer workflow.
You must be using NPM 7 or higher.

### Getting started

```sh
npm install # install dependencies
npm run dev # start all the applications
```

Then edit and visit any of the following sites:

- `/apps/www`: http://localhost:3000
  - The main website.
- `/apps/temp-docs`: http://localhost:3001
  - We are migrating the docs to a Next.js application.
- `/apps/temp-community-forum`: http://localhost:3002
  - pulls all our github discussions into a nextjs site. Temporary/POC
- `/apps/temp-community-tutorials`: http://localhost:3003
  - pulls all our DEV articles (which community members can write) into a nextjs site. Temporary/POC

### Shared components

The monorepo has a set of shared components under `/packages`:

- `/packages/common`: Common React code, shared between all sites.
- `/packages/config`: All shared config
- `/packages/tsconfig`: Shared Typescript settings

### Installing packages

Installing a package with NPM workspaces requires you to add the `-w` flag to tell NPM which workspace you want to install into.

The format is: `npm install <package name> -w=<workspace to install in>`.

For example:

- `npm install pngjs -w react-native-pos-printer`: installs into `./packages/react-native-pos-printer`
- `npm install pngjs -w example`: installs into `./example`

You do not need to install `devDependencies` in each workspace. These can all be installed in the root package.

### Development

`yarn start`

## Finally

After making your changes to the file(s) you'd like to update, it's time to open a pull request. Once you submit your pull request, others from the react-native-pos-printer team/community will review it with you.

Did you have an issue, like a merge conflict, or don't know how to open a pull request? Check out [GitHub's pull request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests) tutorial on how to resolve merge conflicts and other issues. Once your PR has been merged, you will be proudly listed as a contributor in the [contributor chart](https://github.com/gzero1/react-native-pos-printer/supabase/graphs/contributors)

## Community Channels

Stuck somewhere? Have any questions? please join the [Discord Community Server](https://discord.supabase.com/) or the [Github Discussions](https://github.com/gzero1/react-native-pos-printer/supabase/discussions). We are here to help!
