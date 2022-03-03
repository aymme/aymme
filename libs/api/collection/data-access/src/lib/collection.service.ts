import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CollectionRepository } from './collection.repository';
import { CreateProjectDto } from '@aymme/api/project/data-access';
import { Collection } from '@aymme/api/shared/data-access';
import { UpdateCollectionNameDto } from './dto/update-collection-name.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';

@Injectable()
export class CollectionService {
  private logger = new Logger(CollectionService.name);

  constructor(private categoryRepository: CollectionRepository) {}

  async getAllByProjectID(projectId: string): Promise<Collection[]> {
    return this.categoryRepository.find({
      where: { projectId },
      relations: ['endpoints'],
    });
  }

  async getById(id: string, projectId: string): Promise<Collection> {
    const found = await this.categoryRepository.findOne({ id, projectId });

    if (!found) {
      throw new NotFoundException();
    }

    return found;
  }

  async create(projectId: string, data: CreateProjectDto): Promise<Collection> {
    const { name } = data;
    const collection = this.categoryRepository.create();
    collection.projectId = projectId;
    collection.name = name;

    try {
      return await collection.save();
    } catch (e) {
      this.logger.error(`Failed to create the collection "${name}". DTO: ${JSON.stringify(data)}`);
      throw new InternalServerErrorException();
    }
  }

  async updateName(projectId: string, id: string, data: UpdateCollectionNameDto): Promise<Collection> {
    const { name } = data;
    const collection = await this.getById(id, projectId);

    collection.name = name;

    try {
      await collection.save();
    } catch (e) {
      this.logger.error(`Failed to update the collection "${name}". DTO: ${JSON.stringify(data)}`);
      throw new InternalServerErrorException();
    }

    return collection;
  }

  async update(projectId: string, data: UpdateCollectionDto[]): Promise<Collection[]> {
    return this.categoryRepository.save(data);
  }

  async delete(projectId: string, id: string): Promise<void> {
    const found = await this.categoryRepository.findOne({ id, projectId });

    if (!found) {
      throw new NotFoundException();
    }

    if (found.name === 'default') {
      const error = 'No allowed to delete default collection.';
      throw new BadRequestException(error);
    }

    await this.categoryRepository.delete({ projectId, id });
  }
}
