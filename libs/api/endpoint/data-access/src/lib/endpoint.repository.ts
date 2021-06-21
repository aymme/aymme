import { EntityRepository, Repository } from 'typeorm';
import { Endpoint } from './endpoint.entity';
import { InternalServerErrorException } from '@nestjs/common';

@EntityRepository(Endpoint)
export class EndpointRepository extends Repository<Endpoint> {
  async createEndpoint(path: string, method: string) {
    const newEndpoint = new Endpoint();
    newEndpoint.path = path;
    newEndpoint.method = method;

    try {
      await newEndpoint.save();
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }
}
