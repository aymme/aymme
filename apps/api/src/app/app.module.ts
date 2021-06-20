import { Module } from '@nestjs/common';

import { ApiCoreFeatureModule } from '@aymme/api/core/feature';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [ApiCoreFeatureModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
