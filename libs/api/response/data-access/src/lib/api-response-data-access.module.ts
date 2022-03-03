import { Module } from '@nestjs/common';
import { ApiDatabaseDataAccessModule } from '@aymme/api/database/data-access';
import { ResponseService } from './response.service';

@Module({
  imports: [ApiDatabaseDataAccessModule],
  controllers: [],
  providers: [ResponseService],
  exports: [ResponseService],
})
export class ApiResponseDataAccessModule {}
