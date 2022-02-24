import { Factory } from '@jorgebodega/typeorm-seeding';
import { faker } from '@faker-js/faker';
import { Endpoint } from '@aymme/api/shared/data-access';

export class EndpointFactory extends Factory<Endpoint> {
  protected async definition(): Promise<Endpoint> {
    const endpoint = new Endpoint();

    endpoint.path = '/test-endpoint-path-' + faker.datatype.number(9999);
    endpoint.method = 'GET';

    return Promise.resolve(endpoint);
  }
}
