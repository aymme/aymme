import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import databaseConfig from './config/database.config';

@Module({
  imports: [ConfigModule.forRoot({
    load: [databaseConfig],
    isGlobal: true,

  })],
})
export class ApiCoreFeatureModule {}
