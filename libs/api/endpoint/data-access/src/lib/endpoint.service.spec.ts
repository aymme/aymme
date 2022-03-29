import { Test, TestingModule } from '@nestjs/testing';
import { EndpointService } from './endpoint.service';
import { PrismaService } from '@aymme/api/database/data-access';
import { Endpoint } from '@prisma/client';
import { BadRequestException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { UpdateEndpointDto } from './dto/update-endpoint.dto';

const EXAMPLE_PROJECT_ID = 'ebbba84a-4073-4fd2-966a-3fccb0672a9d';
const EXAMPLE_ENDPOINT_ID = 'bdc95778-5d2f-40fb-8b7d-7166524c39da';
const EXAMPLE_ENDPOINT_PATH = '/api/payment-order-service/client-api/v2/payment-orders/customer-profile/details';

const EXAMPLE_ENDPOINT: Endpoint = {
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
};

const EXAMPLE_ENDPOINTS: Endpoint[] = [EXAMPLE_ENDPOINT];

const prismaEndpointFindManyMock = jest.fn(() => EXAMPLE_ENDPOINTS);
const prismaEndpointFindFirstMock = jest.fn(() => EXAMPLE_ENDPOINT);
const prismaEndpointUpdateMock = jest.fn(() => ({ ...EXAMPLE_ENDPOINT, activeStatusCode: 400, emptyArray: true }));
const prismaEndpointDeleteMock = jest.fn(() => EXAMPLE_ENDPOINT);

describe('EndpointService', () => {
  let service: EndpointService;

  beforeEach(async () => {
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

  describe('intercept()', () => {});

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

  describe('prepareHeadersData()', () => {});

  describe('prepareResponsesData()', () => {});
});
