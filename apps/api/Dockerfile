FROM node:16.14.2-alpine

# Create app directory
WORKDIR /app

# Copy the build application & prisma to the container
COPY ./dist/apps/api .
COPY prisma ./prisma/

ENV PORT=3333

RUN yarn install

# dependencies that nestjs needs
RUN yarn add reflect-metadata tslib rxjs @nestjs/platform-express prisma

RUN yarn prisma db push

CMD ["node", "./main.js"]
