import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getMetadataArgsStorage } from 'typeorm';

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
        logging: true,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class ApiCoreFeatureModule {}
