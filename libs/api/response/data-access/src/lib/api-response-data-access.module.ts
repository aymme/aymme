import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiDatabaseDataAccessModule } from '@aymme/api/database/data-access';
import { ResponseRepository } from './response.repository';
import { ResponseService } from './response.service';

@Module({
  imports: [TypeOrmModule.forFeature([ResponseRepository]), ApiDatabaseDataAccessModule],
  controllers: [],
  providers: [ResponseService],
  exports: [ResponseService],
})
export class ApiResponseDataAccessModule {}
