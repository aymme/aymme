# AYMME

*AMMYE is currently in development. If you want to contribute please reach out.*

AYMME stands for "Are You Mocking ME?" and makes mocking data easier when using "ng serve". Angular CLI already covers the instant feedback when code changes, but when you need to test multiple scenarios using different data or error responses this can be a hassle. AYMME is able to provide you an easy why to configure mock data.

<em>This project was generated using [Nx](https://nx.dev). AYMME follows a mix of NX folder structure and best practices for splitting features per domain.</em>

## Getting Started
The following instructions will help you to run the project on your local environment for development and testing

### Prerequisites
For you to be able to run the project you need to have Node 16 LTS and [Yarn v1](https://classic.yarnpkg.com/lang/en/).

To install Node, you can use one of the options provided by [Node.js](https://nodejs.org/en/). Or you can use a node version manager like
[nvm](https://github.com/nvm-sh/nvm) or [n](https://github.com/tj/n)

### Installing

First, clone the project locally
```bash
git clone git@github.com:Backbase/aymme.git
```
once you have the project locally, you need to install all the dependencies
```bash
cd aymme && yarn install
```
After you successfully installed the dependencies you should create a .env file
```bash
touch .env
```
And inside, put the following content
```dotenv
DATABASE_URL="file:./db.sqlite"
```

*Note: The DB file is temporarily in the project, until we integrate Electron and use the User's local system to store the DB*

### Migrations and seeding the DB
#### Development Environment
To be able to work locally, you only need to update the `.env` file with the following content
```dotenv
DATABASE_URL="file:./db.sqlite"
```
And in your terminal run the following command
```shell
yarn prisma migrate dev
```
This will create or apply migrations, re-generate the PrismaClient and run the seeds

When generating a new migration, depending on the changes. You might need to update the migration file, manually.
For example, if you add a new column to a table, and generate a migration. Prisma will generate a SQL script for 
creating a new temp table, copy existing data to it. And then it will drop the table and rename the temp table.

Now this is not necessary, because we can only `ALTER` the table. As far as I know, this is possible with SQLite.
For more info on customizing migrations please read the following [documentation](https://www.prisma.io/docs/guides/database/developing-with-prisma-migrate/customizing-migrations)

*Note: Only use it in dev environment*

#### DB Prototyping

While you are working a new feature, you might need to change the DB often.
For this matter, you should use
```shell
yarn prisma db push
```
This script is suitable for prototyping

#### Reset the database

If you want to reset the database to undo manual changes or `db push` experiments, use the following script
```shell
yarn prisma migrate reset
```
#### Create only a migration file

If you want to create only a migration and not applying it, you can use
```shell
yarn prisma migrate dev --create-only
```
#### Seed the database 

To seed the database, you can use
```shell
yarn prisma db seed
```

#### Production and Test environments
To deploy a migration to production or test environment, you should be using
```shell
yarn prisma migrate deploy
```
This script should be part of CI/CD pipeline

### Docker Environment

This repo also provides a way for you to use AYMME inside a docker environment

In order for you to use AYMME in a Container, first start with the [Installing](#installing) guide

Once you have finished with the Installing step run the following commands
```shell
yarn nx run-many --target=deploy --projects=api,client --parallel --skip-nx-cache
```
This will build the projects and their containers. Once this is finished, you should be able to run `docker-compose` from the root of the project
```shell
docker-compose up
# or
docker-compose up -d # To run it in the background
```

*Note: Running the app in containers will create a separate DB file, independent of your local db file. This file will be generated only once (unless you have removed the container previously). Each time you start the container, only the pending migrations will be applied*__

### Developing (cheatsheet)

Following a cheatsheet for AYMME working in the NX framework. Please note that some commands will create a structure of the components that is not always reflecting the AYMME structure. Please have a look at other “features” to see the structure. There will be examples further in this cheatsheet. 

---
> Use —dry-run flag in order to verify the output of the command before executing it. 
---

/Please Note: In the project the prefix: “ay” is used for all components, directives, pipes, services. Automatically the prefix “Aymme” is set by NX. Inside the new module you will need to change this “prefix” to: “prefix”: “ay”/ 

Prefix example: 

file: *.eslintrc.json*: "prefix": "ay" (there are 2 occurrences)


#### Create a FEATURE library 

*How to:*

`npx nx g @nrwl/angular:lib --directory=directory --name=feature-name  --simpleModuleName`

*Example:* 

`npx nx g @nrwl/angular:lib --directory=client/profile --name=profile  --simpleModuleName`


#### Create a COMPONENT

*How to:*

`npx nx g component componentName --project=projectName --export`

*Example:*

`npx nx g component projects-list --project=client-projects-ui-projects-list --export`

#### Create a SERVICE

*How To* 

`nx generate @nrwl/angular:service --project=projectName --name serviceName`

*Example* 

`nx generate @nrwl/angular:service --project=client-projects-data-access --name projects`
