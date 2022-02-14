import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';

import { ApiProjectDataAccessModule } from '@aymme/api/project/data-access';
import { HttpExceptionFilter } from '@aymme/api/project/utils';

import { ApiProjectFeatureController } from './api-project-feature.controller';

@Module({
  imports: [ApiProjectDataAccessModule],
  controllers: [ApiProjectFeatureController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
  exports: [],
})
export class ApiProjectFeatureModule {}
