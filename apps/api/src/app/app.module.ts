import { Module } from '@nestjs/common';
import { ApiCoreFeatureModule } from '@aymme/api/core/feature';
import { ApiEndpointFeatureModule } from '@aymme/api/endpoint/feature';
import { ApiInterceptFeatureModule } from '@aymme/api/intercept/feature';
import { ApiProjectFeatureModule } from '@aymme/api/project/feature';
import { ApiResponseFeatureModule } from '@aymme/api/response/feature';
import { ApiCollectionFeatureModule } from '@aymme/api/collection/feature';

@Module({
  imports: [
    ApiCoreFeatureModule,
    ApiInterceptFeatureModule,
    ApiProjectFeatureModule,
    ApiEndpointFeatureModule,
    ApiResponseFeatureModule,
    ApiCollectionFeatureModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
