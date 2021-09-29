import { Module } from '@nestjs/common';

import { ApiResponseDataAccessModule } from '@aymme/api/response/data-access';

import { ApiResponseFeatureController } from './api-response-feature.controller';

@Module({
  imports: [ApiResponseDataAccessModule],
  controllers: [ApiResponseFeatureController],
  providers: [],
  exports: [],
})
export class ApiResponseFeatureModule {}
