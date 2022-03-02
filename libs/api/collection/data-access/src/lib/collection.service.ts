import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { Collection } from '@prisma/client';
import { CreateProjectDto } from '@aymme/api/project/data-access';
import { PrismaService } from '@aymme/api/database/data-access';
import { UpdateCollectionNameDto } from './dto/update-collection-name.dto';
import { CollectionRepository } from './collection.repository';

@Injectable()
export class CollectionService {
  private logger = new Logger(CollectionService.name);

  constructor(private categoryRepository: CollectionRepository, private prisma: PrismaService) {}

  async getAllByProjectID(projectId: string): Promise<Collection[]> {
    return this.prisma.collection.findMany({
      where: {
        projectId,
      },
    });
  }

  async getById(id: string, projectId: string): Promise<Collection> {
    const found = await this.prisma.collection.findFirst({
      where: { id, projectId },
    });

    if (!found) {
      throw new NotFoundException();
    }

    return found;
  }

  async create(projectId: string, data: CreateProjectDto): Promise<Collection> {
    const { name } = data;

    try {
      return await this.prisma.collection.create({
        data: {
          name,
          project: {
            connect: {
              id: projectId,
            },
          },
        },
      });
    } catch (e) {
      this.logger.error(`Failed to create the collection "${name}". DTO: ${JSON.stringify(data)}`);
      throw new InternalServerErrorException();
    }
  }

  async updateName(projectId: string, id: string, data: UpdateCollectionNameDto): Promise<Collection> {
    const { name } = data;
    await this.getById(id, projectId);

    try {
      return await this.prisma.collection.update({
        where: {
          id,
        },
        data: {
          name,
        },
      });
    } catch (e) {
      this.logger.error(`Failed to update the collection "${name}". DTO: ${JSON.stringify(data)}`);
      this.logger.error(e.message);
      throw new InternalServerErrorException();
    }
  }

  async delete(projectId: string, id: string): Promise<void> {
    await this.getById(id, projectId);

    try {
      await this.prisma.collection.delete({
        where: { id },
      });
    } catch (e) {
      this.logger.error(`Failed to delete the collection with ID: ${id}`);
      this.logger.error(e.message);
      throw new InternalServerErrorException();
    }
  }
}
