import { Module } from '@nestjs/common';

import { ApiEndpointDataAccessModule } from '@aymme/api/endpoint/data-access';
import { ApiInterceptFeatureController } from './api-intercept-feature.controller';

@Module({
  imports: [ApiEndpointDataAccessModule],
  controllers: [ApiInterceptFeatureController],
  providers: [],
  exports: [],
})
export class ApiInterceptFeatureModule {}
