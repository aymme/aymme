import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getMetadataArgsStorage } from 'typeorm';

import { HttpExceptionFilter } from '@aymme/api/core/utils';

import databaseConfig from './config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'sqlite',
        database: configService.get<string>('database.name'),
        synchronize: configService.get<boolean>('database.synchronize'),
        entities: getMetadataArgsStorage().tables.map((tbl) => tbl.target),
        logging: false,
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class ApiCoreFeatureModule {}
