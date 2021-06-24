import { Injectable } from '@nestjs/common';
import { EndpointRepository } from './endpoint.repository';
import { Project } from '@aymme/api/shared/data-access';

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
      return found.id;
    }

    return this.endpointRepository.createEndpoint(path, method, project);
  }
}
