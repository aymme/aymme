import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CollectionRepository } from '@aymme/api/collection/data-access';
import { ApiDatabaseDataAccessModule } from '@aymme/api/database/data-access';
import { Header } from '@aymme/api/shared/data-access';
import { EndpointRepository } from './endpoint.repository';
import { EndpointService } from './endpoint.service';

@Module({
  imports: [TypeOrmModule.forFeature([EndpointRepository, Header, CollectionRepository]), ApiDatabaseDataAccessModule],
  controllers: [],
  providers: [EndpointService],
  exports: [EndpointService],
})
export class ApiEndpointDataAccessModule {}
