import { Module } from '@nestjs/common';

import { ApiEndpointFeatureController } from './api-endpoint-feature.controller';
import { ApiEndpointDataAccessModule } from '@aymme/api/endpoint/data-access';
import { ApiProjectDataAccessModule } from '@aymme/api/project/data-access';

@Module({
  imports: [ApiEndpointDataAccessModule, ApiProjectDataAccessModule],
  controllers: [ApiEndpointFeatureController],
  providers: [],
  exports: [],
})
export class ApiEndpointFeatureModule {}
