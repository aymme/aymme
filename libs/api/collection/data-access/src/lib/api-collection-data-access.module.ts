import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiDatabaseDataAccessModule } from '@aymme/api/database/data-access';
import { CollectionRepository } from './collection.repository';
import { CollectionService } from './collection.service';

@Module({
  imports: [TypeOrmModule.forFeature([CollectionRepository]), ApiDatabaseDataAccessModule],
  controllers: [],
  providers: [CollectionService],
  exports: [CollectionService],
})
export class ApiCollectionDataAccessModule {}
