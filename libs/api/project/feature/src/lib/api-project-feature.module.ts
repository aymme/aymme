import { Module } from '@nestjs/common';

import { ApiProjectDataAccessModule } from '@aymme/api/project/data-access';

import { ApiProjectFeatureController } from './api-project-feature.controller';

@Module({
  imports: [ApiProjectDataAccessModule],
  controllers: [ApiProjectFeatureController],
  providers: [],
  exports: [],
})
export class ApiProjectFeatureModule {}
