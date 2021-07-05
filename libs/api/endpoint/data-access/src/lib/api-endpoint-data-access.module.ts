import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EndpointRepository } from './endpoint.repository';
import { EndpointService } from './endpoint.service';
import { Header } from '@aymme/api/shared/data-access';

@Module({
  imports: [TypeOrmModule.forFeature([EndpointRepository, Header])],
  controllers: [],
  providers: [EndpointService],
  exports: [EndpointService],
})
export class ApiEndpointDataAccessModule {}
