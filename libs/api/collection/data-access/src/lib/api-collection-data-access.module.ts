import { Module } from '@nestjs/common';
import { ApiDatabaseDataAccessModule } from '@aymme/api/database/data-access';
import { CollectionService } from './collection.service';

@Module({
  imports: [ApiDatabaseDataAccessModule],
  controllers: [],
  providers: [CollectionService],
  exports: [CollectionService],
})
export class ApiCollectionDataAccessModule {}
