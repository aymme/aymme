import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EndpointRepository } from './endpoint.repository';
import { EndpointService } from './endpoint.service';

@Module({
  imports: [TypeOrmModule.forFeature([EndpointRepository])],
  controllers: [],
  providers: [EndpointService],
  exports: [EndpointService],
})
export class ApiEndpointDataAccessModule {}
