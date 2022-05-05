import { Test } from '@nestjs/testing';
import { ApiEndpointFeatureController } from './api-endpoint-feature.controller';
import { EndpointService } from '@aymme/api/endpoint/data-access';
import { Collection, Endpoint, Project, ProjectConfiguration, Response } from '@prisma/client';

const EXAMPLE_PROJECT_ID = 'ebbba84a-4073-4fd2-966a-3fccb0672a9d';
const EXAMPLE_ENDPOINT_ID = 'bdc95778-5d2f-40fb-8b7d-7166524c39da';
const EXAMPLE_ENDPOINT_PATH = '/api/payment-order-service/client-api/v2/payment-orders/customer-profile/details';

const EXAMPLE_ENDPOINT: Endpoint & { responses: Response[] } = {
  id: EXAMPLE_ENDPOINT_ID,
  delay: 200,
  forward: false,
  emptyArray: false,
  method: 'GET',
  activeStatusCode: 500,
  order: 0,
  path: EXAMPLE_ENDPOINT_PATH,
  projectId: EXAMPLE_PROJECT_ID,
  collectionId: '30f6c14b-367e-491f-af8c-d4b645a7273a',
  responses: [
    {
      id: 'e97cb4c3-5fae-418e-8963-4dbe87adc839',
      body: '500 Internal Server Error',
      statusCode: 500,
      endpointId: EXAMPLE_ENDPOINT_ID,
    },
  ],
};

const EXAMPLE_COLLECTION: Collection = {
  id: '1ffdfaba-f65f-40b0-b2ec-d22a1f307e70',
  name: 'default',
  projectId: EXAMPLE_PROJECT_ID,
  order: 0,
};

const EXAMPLE_PROJECT: Project & { configuration: ProjectConfiguration } = {
  id: '54ee68b8-66e1-467a-8afc-040881ef49c6',
  name: 'Aymme',
  slug: 'aymme',
  configuration: {
    id: '0488661a-2b28-4a24-8c4e-6c2600b927e9',
    ignoreParams: 'refreshToken',
    projectId: '54ee68b8-66e1-467a-8afc-040881ef49c6',
  },
};

const EXAMPLE_ENDPOINTS: Endpoint[] = [EXAMPLE_ENDPOINT];
const EXAMPLE_ENDPOINT_NEW_DELAY = 500;

const endpointServiceGetAllEndpointsMock = jest.fn(() => EXAMPLE_ENDPOINTS);
const endpointServiceGetEndpointMock = jest.fn(() => EXAMPLE_ENDPOINT);
const endpointServiceUpdateEndpointMock = jest.fn(() => ({
  ...EXAMPLE_ENDPOINT,
  emptyArray: true,
  delay: EXAMPLE_ENDPOINT_NEW_DELAY,
}));
const endpointServiceDeleteEndpointMock = jest.fn();

describe('ApiEndpointFeatureController', () => {
  let controller: ApiEndpointFeatureController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [ApiEndpointFeatureController],
      providers: [
        {
          provide: EndpointService,
          useClass: jest.fn(() => ({
            getAll: endpointServiceGetAllEndpointsMock,
            getById: endpointServiceGetEndpointMock,
            update: endpointServiceUpdateEndpointMock,
            delete: endpointServiceDeleteEndpointMock,
          })),
        },
      ],
    }).compile();

    controller = module.get(ApiEndpointFeatureController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });

  describe('getAll()', () => {
    it('should return all endpoints for the requested project', async () => {
      const data = await controller.getAll(EXAMPLE_PROJECT_ID);

      expect(data.length).toBeGreaterThan(0);
      expect(data[0].id).toEqual(EXAMPLE_ENDPOINT.id);
      expect(endpointServiceGetAllEndpointsMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('getById()', () => {
    it('should return an endpoint', async () => {
      const data = await controller.getById(EXAMPLE_PROJECT_ID, EXAMPLE_ENDPOINT_ID);

      expect(data.id).toEqual(EXAMPLE_ENDPOINT_ID);
      expect(endpointServiceGetEndpointMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('update()', () => {
    it('should update an endpoint', async () => {
      const data = await controller.update(EXAMPLE_PROJECT_ID, EXAMPLE_ENDPOINT_ID, {
        delay: EXAMPLE_ENDPOINT_NEW_DELAY,
        emptyArray: true,
      });

      expect(data.delay).toEqual(EXAMPLE_ENDPOINT_NEW_DELAY);
      expect(data.emptyArray).toBeTruthy();
      expect(endpointServiceUpdateEndpointMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('delete()', () => {
    it('should delete an endpoint', async () => {
      await controller.delete(EXAMPLE_PROJECT_ID, EXAMPLE_ENDPOINT_ID);
    });
  });
});
