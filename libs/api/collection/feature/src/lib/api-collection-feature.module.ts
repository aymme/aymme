import { Module } from '@nestjs/common';

import { ApiCollectionDataAccessModule } from '@aymme/api/collection/data-access';
import { ApiCollectionFeatureController } from './api-collection-feature.controller';

@Module({
  imports: [ApiCollectionDataAccessModule],
  controllers: [ApiCollectionFeatureController],
  providers: [],
  exports: [],
})
export class ApiCollectionFeatureModule {}
