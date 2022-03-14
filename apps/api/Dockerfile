FROM node:lts-alpine

# Create app directory
WORKDIR /app

# Copy the build application & prisma to the container
COPY ./dist/apps/api .
COPY prisma ./prisma/

ENV PORT=3333

RUN yarn install

# dependencies that nestjs needs
RUN yarn add reflect-metadata tslib rxjs @nestjs/platform-express prisma

RUN yarn prisma generate

CMD ["sh","-c", "yarn prisma migrate deploy && node ./main.js"]