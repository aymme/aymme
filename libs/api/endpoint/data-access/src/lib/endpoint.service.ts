import { Injectable, NotFoundException } from '@nestjs/common';
import { EndpointRepository } from './endpoint.repository';
import { Endpoint, Project } from '@aymme/api/shared/data-access';

@Injectable()
export class EndpointService {
  constructor(private endpointRepository: EndpointRepository) {}

  async intercept(
    path: string,
    query: { [key: string]: string },
    body: string,
    method: string,
    project: Project
  ) {
    const found = await this.endpointRepository.findOne({
      path,
      project,
    });

    if (found) {
      return found;
    }

    return this.endpointRepository.createEndpoint(path, method, project);
  }

  async getAll(projectId: string): Promise<Endpoint[]> {
    return this.endpointRepository.find({ projectId });
  }

  async getById(projectId: string, id: string): Promise<Endpoint> {
    const found = await this.endpointRepository.findOne({
      projectId,
      id,
    });

    if (!found) {
      throw new NotFoundException(`Endpoint with ID: ${id} not found`);
    }

    return found;
  }

  async delete(projectId: string, id: string) {
    return this.endpointRepository.delete({ projectId, id });
  }
}
