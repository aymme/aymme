import { Module } from '@nestjs/common';
import { ApiDatabaseDataAccessModule } from '@aymme/api/database/data-access';
import { ProjectService } from './project.service';

@Module({
  imports: [ApiDatabaseDataAccessModule],
  controllers: [],
  providers: [ProjectService],
  exports: [ProjectService],
})
export class ApiProjectDataAccessModule {}
