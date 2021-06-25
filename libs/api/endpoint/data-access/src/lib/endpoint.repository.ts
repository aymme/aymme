import { EntityRepository, Repository } from 'typeorm';
import { InternalServerErrorException } from '@nestjs/common';
import { Endpoint, Project } from '@aymme/api/shared/data-access';

@EntityRepository(Endpoint)
export class EndpointRepository extends Repository<Endpoint> {
  async createEndpoint(path: string, method: string, project: Project) {
    const newEndpoint = new Endpoint();
    newEndpoint.path = path;
    newEndpoint.method = method;
    newEndpoint.project = project;

    try {
      return await newEndpoint.save();
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }
}
