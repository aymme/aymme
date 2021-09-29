import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CollectionRepository } from './collection.repository';
import { CollectionService } from './collection.service';

@Module({
  imports: [TypeOrmModule.forFeature([CollectionRepository])],
  controllers: [],
  providers: [CollectionService],
  exports: [CollectionService],
})
export class ApiCollectionDataAccessModule {}
