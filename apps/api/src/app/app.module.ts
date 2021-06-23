import { Module } from '@nestjs/common';

import { ApiCoreFeatureModule } from '@aymme/api/core/feature';
import { ApiInterceptFeatureModule } from '@aymme/api/intercept/feature';
import { ApiProjectFeatureModule } from '@aymme/api/project/feature';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ApiCoreFeatureModule,
    ApiInterceptFeatureModule,
    ApiProjectFeatureModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
