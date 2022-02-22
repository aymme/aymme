import { InternalServerErrorException, Logger } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Collection } from '@aymme/api/shared/data-access';

@EntityRepository(Collection)
export class CollectionRepository extends Repository<Collection> {
  logger = new Logger(CollectionRepository.name);

  async findOrCreate(name: string, projectId: string) {
    const found = await this.findOne({ name, projectId });

    if (found) {
      return found;
    }

    const collection = new Collection();
    collection.name = name;
    collection.projectId = projectId;

    try {
      return await collection.save();
    } catch (e) {
      this.logger.error(e.message, e.stack);
      throw new InternalServerErrorException();
    }
  }
}
