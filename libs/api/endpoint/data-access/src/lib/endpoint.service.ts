import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { EndpointRepository } from './endpoint.repository';
import { Endpoint, Project } from '@aymme/api/shared/data-access';
import { UpdateEndpointDto } from './dto/update-endpoint.dto';
import { CollectionRepository } from '@aymme/api/collection/data-access';

@Injectable()
export class EndpointService {
  constructor(private endpointRepository: EndpointRepository, private collectionRepository: CollectionRepository) {}

  async intercept(uri: string, query: { [key: string]: string }, body: string, method: string, project: Project) {
    const path = uri.replace('/api/intercept/', '/');
    const found = await this.endpointRepository.findOne(
      {
        path,
        project,
        method,
      },
      {
        relations: ['responses'],
      }
    );

    if (found) {
      return found;
    }

    const defaultCategory = await this.collectionRepository.findOrCreate('default', project.id);

    return this.endpointRepository.createEndpoint(path, method, project, defaultCategory);
  }

  async getAll(projectId: string): Promise<Endpoint[]> {
    const [endpoints] = await this.endpointRepository.findAndCount({
      where: { projectId },
    });
    return endpoints;
  }

  async getById(projectId: string, id: string): Promise<Endpoint> {
    const found = await this.endpointRepository.findOne(
      {
        projectId,
        id,
      },
      { relations: ['responses'] }
    );

    if (!found) {
      throw new NotFoundException(`Endpoint with ID: ${id} not found`);
    }

    return found;
  }

  async update(projectId: string, id: string, updateEndpointDto: UpdateEndpointDto): Promise<Endpoint> {
    if (!Object.keys(updateEndpointDto).length) {
      throw new BadRequestException("It looks like your request doesn't contain a body");
    }

    return this.endpointRepository.updateEndpoint(id, projectId, updateEndpointDto);
  }

  async delete(projectId: string, id: string): Promise<void> {
    await this.endpointRepository.delete({ projectId, id });
  }
}
