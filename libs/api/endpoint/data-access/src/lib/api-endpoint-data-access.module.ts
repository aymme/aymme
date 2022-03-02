import { Module } from '@nestjs/common';
import { ApiDatabaseDataAccessModule } from '@aymme/api/database/data-access';
import { EndpointService } from './endpoint.service';

@Module({
  imports: [ApiDatabaseDataAccessModule],
  controllers: [],
  providers: [EndpointService],
  exports: [EndpointService],
})
export class ApiEndpointDataAccessModule {}
