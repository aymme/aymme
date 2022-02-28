import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { URLSearchParams } from 'url';
import { CollectionRepository } from '@aymme/api/collection/data-access';
import { Endpoint, Project } from '@aymme/api/shared/data-access';
import { EndpointRepository } from './endpoint.repository';
import { UpdateEndpointDto } from './dto/update-endpoint.dto';

@Injectable()
export class EndpointService {
  constructor(private endpointRepository: EndpointRepository, private collectionRepository: CollectionRepository) {}

  async intercept(path: string, query: { [key: string]: string }, body: string, method: string, project: Project) {
    const _path = path.replace('/api/intercept/', '/');
    const ignoreParams = project.configuration.ignoreParams as string;
    const ignoreParamsList = ignoreParams.split(',');
    const searchParams = new URLSearchParams();

    for (const param in query) {
      if (!ignoreParamsList.includes(param)) {
        searchParams.append(param, query[param]);
      }
    }

    const url = `${_path}${searchParams.toString().length ? `?${searchParams.toString()}` : ''}`;

    const found = await this.endpointRepository.findOne(
      {
        path: url,
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

    return this.endpointRepository.createEndpoint(url, method, project, defaultCategory);
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
