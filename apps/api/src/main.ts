/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as bodyParser from 'body-parser';
import * as winston from 'winston';

import { PrismaService } from '@aymme/api/database/data-access';
import { AppModule } from './app/app.module';
import { utilities as nestWinstonModuleUtilities, WinstonModule } from 'nest-winston';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      levels: {
        error: 1,
        warn: 1,
        help: 1,
        data: 1,
        info: 1,
        debug: 1,
        verbose: 1,
      },
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.ms(),
            nestWinstonModuleUtilities.format.nestLike('AYMME', { prettyPrint: true })
          ),
        }),
        // other transports...
      ],
    }),
  });
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3333;

  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app.listen(port, () => {
    Logger.log('Listening at http://localhost:' + port + '/' + globalPrefix);
  });
}

bootstrap();
