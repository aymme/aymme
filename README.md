# AYMME

*AMMYE is currently in develop. If you want to contribute please reach out.*

AYMME stands for "Are You Mocking ME?" and makes mocking data easier when using "ng serve". Angular CLI already covers the instant feedback when code changes, but when you need to test multiple scenarios using different data or error responses or you need to change the structure of your Experience. AYMME is able to manage this for you.

This project was generated using [Nx](https://nx.dev). AYMME follows a mix of NX folder structure and best practices for splitting features per domain.

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
