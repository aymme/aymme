FROM node:16.14.2-alpine

# Create app directory
WORKDIR /app

# Copy the build application & prisma to the container
COPY ./dist/apps/api .
COPY prisma ./prisma/

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

RUN yarn install

# dependencies that nestjs needs
RUN yarn add reflect-metadata tslib rxjs @nestjs/platform-express prisma

RUN yarn prisma generate

EXPOSE 3333

CMD ["sh","-c", "yarn prisma db push && node ./main.js"]
