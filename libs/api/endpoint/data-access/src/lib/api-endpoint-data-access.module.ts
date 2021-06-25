import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EndpointRepository } from './endpoint.repository';
import { EndpointService } from './endpoint.service';
import { ResponseRepository } from './response.repository';

@Module({
  imports: [TypeOrmModule.forFeature([EndpointRepository, ResponseRepository])],
  controllers: [],
  providers: [EndpointService],
  exports: [EndpointService],
})
export class ApiEndpointDataAccessModule {}
