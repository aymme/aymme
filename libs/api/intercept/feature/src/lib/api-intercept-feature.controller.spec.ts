import { Test } from '@nestjs/testing';
import { ApiInterceptFeatureController } from './api-intercept-feature.controller';
import { EndpointService } from '@aymme/api/endpoint/data-access';
import { Endpoint, Header, Project, ProjectConfiguration, Response } from '@prisma/client';
import { createRequest, createResponse } from 'node-mocks-http';
import { ProjectService } from '@aymme/api/project/data-access';
import { HttpStatus } from '@nestjs/common';

const EXAMPLE_PROJECT_ID = 'ebbba84a-4073-4fd2-966a-3fccb0672a9d';
const EXAMPLE_ENDPOINT_ID = 'bdc95778-5d2f-40fb-8b7d-7166524c39da';
const EXAMPLE_ENDPOINT_PATH = '/api/payment-order-service/client-api/v2/payment-orders/customer-profile/details';
const EXAMPLE_RESPONSE_BODY_200 = { name: 'John Doe' };
const EXAMPLE_RESPONSE_BODY_500 = { message: '500 Internal Server Error' };

const EXAMPLE_ENDPOINT: Endpoint & { responses: Response[] } & { headers: Header[] } = {
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
  headers: [],
  responses: [
    {
      id: 'e97cb4c3-5fae-418e-8963-4dbe87adc839',
      body: JSON.stringify(EXAMPLE_RESPONSE_BODY_500),
      statusCode: 500,
      endpointId: EXAMPLE_ENDPOINT_ID,
    },
    {
      id: 'e87719b9-597c-497a-8217-0515511f1217',
      body: JSON.stringify(EXAMPLE_RESPONSE_BODY_200),
      statusCode: 200,
      endpointId: EXAMPLE_ENDPOINT_ID,
    },
  ],
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

const endpointServiceInterceptMock = jest.fn(() => EXAMPLE_ENDPOINT);
const projectServiceGetProject = jest.fn(() => EXAMPLE_PROJECT);

describe('ApiInterceptFeatureController', () => {
  let controller: ApiInterceptFeatureController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [ApiInterceptFeatureController],
      providers: [
        {
          provide: EndpointService,
          useClass: jest.fn(() => ({
            intercept: endpointServiceInterceptMock,
          })),
        },
        {
          provide: ProjectService,
          useClass: jest.fn(() => ({
            getBySlug: projectServiceGetProject,
          })),
        },
      ],
    }).compile();

    controller = module.get(ApiInterceptFeatureController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });

  describe('intercept()', () => {
    it('should return the body of the response for status code 500', async () => {
      const mockedRequest = createRequest({
        method: 'GET',
        url: EXAMPLE_ENDPOINT_PATH,
      });
      const response = createResponse();

      await controller.intercept('', '', '', mockedRequest, response, EXAMPLE_PROJECT);

      expect(response.statusCode).toEqual(HttpStatus.INTERNAL_SERVER_ERROR);
      expect(response._getJSONData()).toEqual(EXAMPLE_RESPONSE_BODY_500);
    });

    it('should return the body of the response for status code 200', async () => {
      const mockedRequest = createRequest({
        method: 'GET',
        url: EXAMPLE_ENDPOINT_PATH,
      });
      const response = createResponse();
      endpointServiceInterceptMock.mockImplementationOnce(() => ({ ...EXAMPLE_ENDPOINT, activeStatusCode: 200 }));

      await controller.intercept('', '', '', mockedRequest, response, EXAMPLE_PROJECT);

      expect(response.statusCode).toEqual(200);
      expect(response._getJSONData()).toEqual(EXAMPLE_RESPONSE_BODY_200);
    });

    it('should return a status code 200 and an empty array in the response', async () => {
      const mockedRequest = createRequest({
        method: 'GET',
        url: EXAMPLE_ENDPOINT_PATH,
      });
      const response = createResponse();
      endpointServiceInterceptMock.mockImplementationOnce(() => ({
        ...EXAMPLE_ENDPOINT,
        activeStatusCode: 200,
        emptyArray: true,
      }));

      await controller.intercept('', '', '', mockedRequest, response, EXAMPLE_PROJECT);

      expect(response.statusCode).toEqual(200);
      expect(response._getJSONData()).toEqual([]);
    });

    it('should return a custom header', async () => {
      const mockedRequest = createRequest({
        method: 'GET',
        url: EXAMPLE_ENDPOINT_PATH,
      });
      const response = createResponse();
      endpointServiceInterceptMock.mockImplementationOnce(() => ({
        ...EXAMPLE_ENDPOINT,
        activeStatusCode: 200,
        headers: [
          {
            id: '74f97c76-0ce7-4271-9bf4-5c4fb3808f1d',
            name: 'total-count',
            value: '400',
            endpointId: EXAMPLE_ENDPOINT_ID,
          },
        ],
      }));

      await controller.intercept('', '', '', mockedRequest, response, EXAMPLE_PROJECT);

      expect(response.statusCode).toEqual(200);
      expect(response._getHeaders()['total-count']).toBeDefined();
      expect(response._getHeaders()['total-count']).toEqual('400');
    });
  });
});
