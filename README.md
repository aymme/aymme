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
After you successfully installed the dependencies you should create two files
```bash
touch database/db.sqlite
touch .env
```
Inside the `.env` file you should put the following ENV variable
```dotenv
DATABASE_NAME=./database/db.sqlite
```

*Note: The DB file is temporarily in the project, until we integrate Electron and use the User's local system to store the DB*

### Migrations and seeding the DB
Each time you create a new SQLite Database, you need to run the migrations and the initial seed data

For local development, as of this moment, when you start the API, it will generate the DB tables. This is possible
because of the `synchronize: true` option, provided by TypeORM

For testing and local development you can run the following commands
```shell
yarn schema:drop # To DROP all the tables
yarn schema:sync # To sync the DB tables with the Entities
yarn seed:run # To run the RootSeeder. This will ingest one project "Aymme" and one collection "default"
```
For production, we will generate migrations and run them. And we should disable `synchronize: false`. More on this in the Deployment section

###Some useful commands

Run all the migrations
```shell
yarn migration:run
```
It will run all the migrations that are not yet synced with the DB

---

Generate a migration
```shell
yarn migration:generate NameOfMigration
```
This will generate a new file in the following format ${TIMESTAMP}-NameOfMigration in the `database/migrations` folder.
The generate command will also create the necessary SQL for the migration based on the changed Entities.

---

Show all migrations
```shell
yarn migration:show
```
This will also tell you which of the migrations are synced or not

---

Revert the last executed migration
```shell
yarn migration:revert
```

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
