import { Module } from '@nestjs/common';

import { ApiEndpointDataAccessModule } from '@aymme/api/endpoint/data-access';
import { ApiInterceptFeatureController } from './api-intercept-feature.controller';
import { ApiProjectDataAccessModule } from '@aymme/api/project/data-access';

@Module({
  imports: [ApiEndpointDataAccessModule, ApiProjectDataAccessModule],
  controllers: [ApiInterceptFeatureController],
  providers: [],
  exports: [],
})
export class ApiInterceptFeatureModule {}
