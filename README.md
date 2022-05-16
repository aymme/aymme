<br />
<p align="center">
  <img src="apps/client/src/assets/images/aymme-logo.png" alt="Aymme" width="150" height="133">
</p>

<h1 align="center">AYMME</h1>

<p align="center"><b>Easy to use solution for mocking API endpoints</b></p>

[![MIT](https://img.shields.io/github/license/aymme/aymme?style=flat-square)](https://choosealicense.com/licenses/mit/)
![Github](https://img.shields.io/github/v/release/aymme/aymme?style=flat-square)
[![Discord](https://img.shields.io/discord/943939370564612156?label=Discord&style=flat-square)](https://discord.gg/RpHs6G95)

AYMME stands for "Are You Mocking ME?" and this tool makes mocking data easier when using your Web Application. Most Javascript Framework already covering the instant feedback when code changes, but when you need to test multiple scenarios using different data, error responses or error messages this can really be annoying.
AYMME is made in order to manage this for you by providing a set of functionalities

## ✨ Features
* Mocking API (backend) responses
* Mocking different status codes (200, 500, 404, etc.)
* JSON editor so you can provide the responses
* Set specific project configuration to group endpoints
* Share AYMME projects with your team

## Getting started
AYMME was designed to be used locally, or in the cloud. The fastest way to get started with AYMME is 
by running the docker containers locally. You can find a pre-defined [Docker Compose](./docker/docker-compose.yml) file, which looks like the following snippet
```docker
version: "3.8"

services:
  api:
    container_name: aymme-be
    image: aymme/api:latest
    environment:
      - DATABASE_URL=mongodb://root:root@mongodb:27017/aymme?authSource=admin
    depends_on:
      - mongodb
    ports:
      - "3333:3333"

  client:
    container_name: aymme-fe
    image: aymme/client:latest
    ports:
      - "80:80"
    depends_on:
      - api:aymme-be

  mongodb:
    image: 'bitnami/mongodb:5.0'
    ports:
      - "27017:27017"
    volumes:
      - 'mongo-db:/bitnami/mongodb'
    environment:
      - MONGODB_REPLICA_SET_MODE=primary
      - MONGODB_ROOT_USER=root
      - MONGODB_ROOT_PASSWORD=root
      - MONGODB_REPLICA_SET_KEY=replicasetkey123
      - MONGODB_DATABASE=aymme

volumes:
  mongo-db:
```

Once you have the Docker Compose file in your desired location, you can run the app by executing the following command in the same folder
where your file is located
```shell
docker-compose up # -d to run it in the background
```

Once everything is up and running, you can access the application on [http://localhost](http://localhost)

## Contributing
Really happy to see you peaking in this section. We love for people to contribute to Aymme. However, we do like to follow some rules. For more information, please refer to our
[contribution guide](./CONTRIBUTING.md)

## License
This repository is available under the [MIT License](./LICENSE)
