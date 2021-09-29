import { Module } from '@nestjs/common';

import { ApiEndpointFeatureController } from './api-endpoint-feature.controller';
import { ApiEndpointDataAccessModule } from '@aymme/api/endpoint/data-access';

@Module({
  imports: [ApiEndpointDataAccessModule],
  controllers: [ApiEndpointFeatureController],
  providers: [],
  exports: [],
})
export class ApiEndpointFeatureModule {}
