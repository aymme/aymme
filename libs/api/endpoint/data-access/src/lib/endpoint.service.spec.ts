import { Test, TestingModule } from '@nestjs/testing';
import { EndpointService } from './endpoint.service';
import { PrismaService } from '@aymme/api/database/data-access';
import { Collection, Endpoint, Prisma, Project, ProjectConfiguration, Response } from '@prisma/client';
import { BadRequestException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { UpdateEndpointDto } from './dto/update-endpoint.dto';
import { HeaderDto } from './dto/header.dto';
import { ResponseDto } from './dto/response.dto';

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

const prismaEndpointFindManyMock = jest.fn(() => EXAMPLE_ENDPOINTS);
const prismaEndpointFindFirstMock = jest.fn(() => EXAMPLE_ENDPOINT);
const prismaEndpointUpdateMock = jest.fn(() => ({ ...EXAMPLE_ENDPOINT, activeStatusCode: 400, emptyArray: true }));
const prismaEndpointDeleteMock = jest.fn(() => EXAMPLE_ENDPOINT);
const prismaEndpointCreateMock = jest.fn(() => ({ ...EXAMPLE_ENDPOINT, order: 1 }));
const prismaCollectionFindFirstMock = jest.fn(() => EXAMPLE_COLLECTION);

describe('EndpointService', () => {
  let service: EndpointService;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EndpointService,
        {
          provide: PrismaService,
          useClass: jest.fn(() => ({
            endpoint: {
              findMany: prismaEndpointFindManyMock,
              findFirst: prismaEndpointFindFirstMock,
              update: prismaEndpointUpdateMock,
              delete: prismaEndpointDeleteMock,
              create: prismaEndpointCreateMock,
            },
            collection: {
              findFirst: prismaCollectionFindFirstMock,
            },
          })),
        },
      ],
    }).compile();

    service = module.get<EndpointService>(EndpointService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('intercept()', () => {
    it('should return an existing endpoint', async () => {
      const endpoint = await service.intercept(EXAMPLE_ENDPOINT_PATH, {}, {}, 'GET', EXAMPLE_PROJECT);

      expect(prismaCollectionFindFirstMock).toHaveBeenCalledTimes(0);
      expect(endpoint.id).toEqual(EXAMPLE_ENDPOINT_ID);
    });

    it('should create a new record if the endpoint has not been found', async () => {
      prismaEndpointFindFirstMock
        .mockImplementationOnce(() => null)
        .mockImplementationOnce(() => ({ ...EXAMPLE_ENDPOINT, order: 0 }));

      const endpoint = await service.intercept(EXAMPLE_ENDPOINT_PATH, {}, {}, 'GET', EXAMPLE_PROJECT);

      expect(prismaCollectionFindFirstMock).toHaveBeenCalledTimes(1);
      expect(prismaEndpointCreateMock).toHaveBeenCalledTimes(1);
      expect(prismaEndpointFindFirstMock).toHaveBeenCalledTimes(2);
      expect(endpoint.order).toEqual(1);
      expect(endpoint.responses.length).toEqual(1);
    });

    it('should include the query params in the path', async () => {
      const path = `${EXAMPLE_ENDPOINT_PATH}?size=50`;
      prismaEndpointFindFirstMock.mockImplementationOnce(() => null).mockImplementationOnce(() => EXAMPLE_ENDPOINT);

      prismaEndpointCreateMock.mockImplementationOnce(() => ({ ...EXAMPLE_ENDPOINT, path }));

      const endpoint = await service.intercept(EXAMPLE_ENDPOINT_PATH, { size: '50' }, {}, 'GET', EXAMPLE_PROJECT);

      expect(endpoint.path).toEqual(path);
    });

    it('should ignore the query params configured on a project level', async () => {
      const path = `${EXAMPLE_ENDPOINT_PATH}?size=50`;
      const withIgnoredParamPath = `${path}&refreshToken=token`;
      prismaEndpointFindFirstMock.mockImplementationOnce(() => null).mockImplementationOnce(() => EXAMPLE_ENDPOINT);

      prismaEndpointCreateMock.mockImplementationOnce(() => ({ ...EXAMPLE_ENDPOINT, path }));

      const endpoint = await service.intercept(
        withIgnoredParamPath,
        { size: '50', refreshToken: 'token' },
        {},
        'GET',
        EXAMPLE_PROJECT
      );

      expect(endpoint.path).toEqual(path);
    });

    it('should throw an InternalServerErrorException if creating an endpoint fails', async () => {
      prismaEndpointFindFirstMock.mockImplementationOnce(() => null).mockImplementationOnce(() => EXAMPLE_ENDPOINT);

      prismaEndpointCreateMock.mockImplementationOnce(() => {
        throw new InternalServerErrorException();
      });

      await expect(
        service.intercept(EXAMPLE_ENDPOINT_PATH, { size: '50' }, {}, 'GET', EXAMPLE_PROJECT)
      ).rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('getAll()', () => {
    it('should return all endpoints for a project', async () => {
      const endpoints = await service.getAll(EXAMPLE_ENDPOINT_ID);

      expect(prismaEndpointFindManyMock).toHaveBeenCalledTimes(1);
      expect(endpoints.length).toBeGreaterThan(0);
      expect(endpoints[0].path).toEqual(EXAMPLE_ENDPOINT_PATH);
    });
  });

  describe('getById()', () => {
    it('should return an endpoint by ID', async () => {
      const endpoint = await service.getById(EXAMPLE_PROJECT_ID, EXAMPLE_ENDPOINT_ID);

      expect(prismaEndpointFindFirstMock).toHaveBeenCalledTimes(1);
      expect(endpoint.path).toEqual(EXAMPLE_ENDPOINT_PATH);
      expect(endpoint.id).toEqual(EXAMPLE_ENDPOINT_ID);
    });

    it('should throw a NotFoundException if there are no records', async () => {
      prismaEndpointFindFirstMock.mockImplementationOnce(() => null);

      await expect(service.getById(EXAMPLE_PROJECT_ID, EXAMPLE_ENDPOINT_ID)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update()', () => {
    it('should update an existing endpoint', async () => {
      jest.spyOn(service, 'getById').mockResolvedValueOnce(EXAMPLE_ENDPOINT);

      const args: UpdateEndpointDto = {
        emptyArray: true,
        activeStatusCode: 400,
        headers: [],
        responses: [],
      };

      const endpoint = await service.update(EXAMPLE_PROJECT_ID, EXAMPLE_ENDPOINT_ID, args);

      expect(prismaEndpointUpdateMock).toHaveBeenCalledTimes(1);
      expect(endpoint.emptyArray).toBeTruthy();
      expect(endpoint.activeStatusCode).toEqual(400);
    });

    it('should throw a BadRequestException if nothing is provided in the DTO', async () => {
      await expect(service.update(EXAMPLE_PROJECT_ID, EXAMPLE_ENDPOINT_ID, {} as UpdateEndpointDto)).rejects.toThrow(
        BadRequestException
      );
    });

    it('should throw an InternalServerErrorException', async () => {
      jest.spyOn(service, 'getById').mockResolvedValueOnce(EXAMPLE_ENDPOINT);

      const args: UpdateEndpointDto = {
        emptyArray: true,
        activeStatusCode: 400,
        headers: [],
        responses: [],
      };

      prismaEndpointUpdateMock.mockImplementationOnce(() => {
        throw new InternalServerErrorException();
      });

      await expect(service.update(EXAMPLE_PROJECT_ID, EXAMPLE_ENDPOINT_ID, args)).rejects.toThrow(
        InternalServerErrorException
      );
    });
  });

  describe('delete()', () => {
    it('should call the delete function on Prisma', async () => {
      jest.spyOn(service, 'getById').mockResolvedValueOnce(EXAMPLE_ENDPOINT);

      await service.delete(EXAMPLE_PROJECT_ID, EXAMPLE_ENDPOINT_ID);

      expect(prismaEndpointDeleteMock).toHaveBeenCalledTimes(1);
    });

    it('should throw an InternalServerErrorException', async () => {
      jest.spyOn(service, 'getById').mockResolvedValueOnce(EXAMPLE_ENDPOINT);

      prismaEndpointDeleteMock.mockImplementationOnce(() => {
        throw new InternalServerErrorException();
      });

      await expect(service.delete(EXAMPLE_PROJECT_ID, EXAMPLE_ENDPOINT_ID)).rejects.toThrow(
        InternalServerErrorException
      );
    });
  });

  describe('prepareHeadersData()', () => {
    it('should return a Prisma.HeaderUpdateManyWithoutEndpointInput format', async () => {
      const serviceProto = Object.getPrototypeOf(service);
      const args: HeaderDto[] = [
        {
          id: 'c56fb32d-78cb-4d42-b475-3a1ca22850b2',
          name: 'www-total-count',
          value: '100',
        },
        {
          id: '600aa733-f6da-4077-a2d9-01685985f217',
          name: 'Authenticate',
          value: 'Bearer 430f25b7c0824955a4d277e66a235fe3',
        },
      ];

      const data = serviceProto.prepareHeadersData(
        args,
        EXAMPLE_ENDPOINT_ID
      ) as Prisma.HeaderUpdateManyWithoutEndpointInput;

      expect(data.deleteMany['endpointId']).toEqual(EXAMPLE_ENDPOINT_ID);
      expect(data.upsert[0].where.id).toEqual(args[0].id);
      expect(data.upsert[0].update.name).toEqual(args[0].name);
      expect(data.upsert[1].where.id).toEqual(args[1].id);
    });
  });

  describe('prepareResponsesData()', () => {
    it('should return a Prisma.ResponseUpdateManyWithoutEndpointInput format', async () => {
      const serviceProto = Object.getPrototypeOf(service);
      const args: ResponseDto[] = [
        {
          id: 'c56fb32d-78cb-4d42-b475-3a1ca22850b2',
          statusCode: 200,
          body: '200 OK',
        },
        {
          id: '600aa733-f6da-4077-a2d9-01685985f217',
          statusCode: 404,
          body: '404 Not Found',
        },
      ];

      const data = serviceProto.prepareResponsesData(
        args,
        EXAMPLE_ENDPOINT_ID
      ) as Prisma.ResponseUpdateManyWithoutEndpointInput;

      expect(data.deleteMany['endpointId']).toEqual(EXAMPLE_ENDPOINT_ID);
      expect(data.upsert[0].where.id).toEqual(args[0].id);
      expect(data.upsert[0].update.statusCode).toEqual(args[0].statusCode);
      expect(data.upsert[1].where.id).toEqual(args[1].id);
    });
  });
});
