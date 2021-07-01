import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResponseRepository } from './response.repository';
import { ResponseService } from './response.service';

@Module({
  imports: [TypeOrmModule.forFeature([ResponseRepository])],
  controllers: [],
  providers: [ResponseService],
  exports: [ResponseService],
})
export class ApiResponseDataAccessModule {}
