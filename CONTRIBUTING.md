
# Contributing to AYMME

Welcome! Thank you for taking an interest in contributing to this application. Bellow, you will find
useful information on how to start the application locally and how you can start contributing to it.

For any questions, please don't hesitate to contact us via our [Discord channel](https://discord.gg/RpHs6G95).

## General Prerequisites

* Install [Node.js](https://nodejs.org/) `>=16.15`, the latest [LTS](https://nodejs.org/en/download/) is recommended
  * We do recommend you use a node version manager
    * [`nvm`](https://github.com/nvm-sh/nvm)
    * [`n`](https://github.com/tj/n)
    * [`volta`](https://github.com/volta-cli/volta)
    * [`nvm-windows`](https://github.com/coreybutler/nvm-windows)
* Install [`yarn`](https://classic.yarnpkg.com/lang/en/) (for installing npm dependencies, and we are using the classic version of yarn)
* Install [`docker`](https://www.docker.com/products/docker-desktop/) (for managing the database)

To install Yarn using `npm`, copy and paste the following command in your terminal of choice
```shell
npm install --global yarn
```

> 💡 For Windows users, you can use [Git Bash](https://gitforwindows.org/)

## General Setup

Before you proceed with the setup, you need to choose how you want to interact with the database. AYMME is currently using MongoDB for storing data.

To be able to use MongoDB for local development, you can use one of the following options
* Using the docker-compose.development.yml by running
  ```bash
  docker-compose -p aymme-dev -f ./docker/docker-compose.development.yml up # -d to run it in the background
  ```
  _This step is once you have the source code locally_
* Installing MongoDB locally by following the [MongoDB Guide](https://www.mongodb.com/docs/v4.4/tutorial/install-mongodb-on-os-x/), or
* By using a cloud solution, like [MongoDB Atlas](https://www.mongodb.com/atlas/database)

Once you are done with the above, clone the project locally
```bash
git clone https://github.com/aymme/aymme.git
cd aymme && yarn install
```

After you successfully installed the dependencies you should create a `.env` file in the root of the project
```bash
touch .env
```
And inside, you should have the following content
```dotenv
DATABASE_URL="mongodb://root:root@127.0.0.1:27017/aymme?authSource=admin"

# DATABASE_URL="mongodb://<USERNAME>:<PASSWORD>@<LOCATION>:<PORT>/<DATABASE_NAME>?authSource=admin"
```
_The connection string is for using the `docker-compose.development.yml`, for other environments please look at the corresponding documentation_

The final step is to run the database migrations
```shell
yarn prisma db push
```

### Running and building the application

To run the application locally you need to execute two commands
```shell
yarn start api
yarn start client
```
This will start the API on [http://localhost:3333](http://localhost:3333) and the Web application on [http://localhost:4200](http://localhost:4200)

For building the application, you just need to run the following command
```shell
yarn nx run-many --target=deploy --projects=api,client --parallel --skip-nx-cache
```

This will build the application and create the two containers. Usually this step is part of the pipelines, and you should not do it locally

## Pull requests

**Before starting to work on a new feature, please make sure we have a discussion around your idea**

It's never a good experience to invest a lot of time and effort on a feature that somebody else is working on, or it's not in the pipeline
To avoid this from happening, we would kindly ask contributors to create [a feature request](https://github.com/aymme/aymme/discussions/new?category=ideas). Let's first discuss the idea and come up with a plan
