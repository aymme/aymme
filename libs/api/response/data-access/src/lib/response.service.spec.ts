import { Test, TestingModule } from '@nestjs/testing';
import { Response } from '@prisma/client';
import { PrismaService } from '@aymme/api/database/data-access';
import { ResponseService } from './response.service';
import {
  BadRequestException,
  ConflictException,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateResponseDto } from './dto/create-response.dto';
import { UpdateResponseDto } from './dto/update-response.dto';

const EXAMPLE_RESPONSE_ID = '4d410a87-ca7a-454e-aec2-a670ada5367c';
const EXAMPLE_ENDPOINT_ID = 'c4bd5b8c-395e-4781-9f14-cfa6c835fe22';
const EXAMPLE_STATUS_CODE = HttpStatus.INTERNAL_SERVER_ERROR;
const EXAMPLE_UPDATED_BODY = '{"message": "I have been updated"}';

const EXAMPLE_RESPONSE: Response = {
  id: EXAMPLE_RESPONSE_ID,
  body: '{"message": "Please provide some mocks"}',
  statusCode: EXAMPLE_STATUS_CODE,
  endpointId: EXAMPLE_ENDPOINT_ID,
};

const EXAMPLE_RESPONSES: Response[] = [EXAMPLE_RESPONSE];

const prismaResponseFindManyMock = jest.fn(() => EXAMPLE_RESPONSES);
const prismaResponseFindFirstMock = jest.fn(() => EXAMPLE_RESPONSE);
const prismaResponseCreateMock = jest.fn(() => EXAMPLE_RESPONSE);
const prismaResponseUpdateMock = jest.fn(() => ({ ...EXAMPLE_RESPONSE, body: EXAMPLE_UPDATED_BODY }));
const prismaResponseDeleteMock = jest.fn(() => EXAMPLE_RESPONSE);

describe('ResponseService', () => {
  let service: ResponseService;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ResponseService,
        {
          provide: PrismaService,
          useClass: jest.fn(() => ({
            response: {
              findMany: prismaResponseFindManyMock,
              findFirst: prismaResponseFindFirstMock,
              create: prismaResponseCreateMock,
              update: prismaResponseUpdateMock,
              delete: prismaResponseDeleteMock,
            },
          })),
        },
      ],
    }).compile();

    service = module.get<ResponseService>(ResponseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll()', () => {
    it('should return all responses', async () => {
      const data = await service.getAll(EXAMPLE_ENDPOINT_ID);

      expect(data.length).toBeGreaterThan(0);
      expect(data[0].statusCode).toEqual(EXAMPLE_RESPONSE.statusCode);
      expect(prismaResponseFindManyMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('getById()', () => {
    it('should return a response by ID', async () => {
      const data = await service.getById(EXAMPLE_ENDPOINT_ID, EXAMPLE_RESPONSE_ID);

      expect(data.statusCode).toEqual(EXAMPLE_RESPONSE.statusCode);
      expect(data.id).toEqual(EXAMPLE_RESPONSE_ID);
      expect(prismaResponseFindFirstMock).toHaveBeenCalledTimes(1);
    });

    it('should throw a NotFoundException if there are no records with the provided ID', async () => {
      prismaResponseFindFirstMock.mockImplementationOnce(() => null);

      await expect(service.getById(EXAMPLE_ENDPOINT_ID, EXAMPLE_RESPONSE_ID)).rejects.toThrow(NotFoundException);
    });
  });

  describe('getByStatusCode()', () => {
    it('should return a response by StatusCode', async () => {
      const data = await service.getByStatusCode(EXAMPLE_ENDPOINT_ID, EXAMPLE_STATUS_CODE);

      expect(data.statusCode).toEqual(EXAMPLE_STATUS_CODE);
      expect(data.id).toEqual(EXAMPLE_RESPONSE_ID);
      expect(prismaResponseFindFirstMock).toHaveBeenCalledTimes(1);
    });

    it('should throw a NotFoundException if there are no records with the provided StatusCode and Endpoint ID', async () => {
      prismaResponseFindFirstMock.mockImplementationOnce(() => null);

      await expect(service.getByStatusCode(EXAMPLE_ENDPOINT_ID, EXAMPLE_STATUS_CODE)).rejects.toThrow(
        NotFoundException
      );
    });
  });

  describe('create()', () => {
    it('should create a response and return the entity', async () => {
      prismaResponseFindFirstMock.mockImplementationOnce(() => null);
      jest.spyOn(service, 'getByStatusCode').mockImplementationOnce(() => null);

      const args: CreateResponseDto = {
        body: EXAMPLE_RESPONSE.body,
        statusCode: EXAMPLE_STATUS_CODE,
      };

      const data = await service.create(EXAMPLE_ENDPOINT_ID, args);

      expect(data.statusCode).toEqual(EXAMPLE_STATUS_CODE);
      expect(data.body).toEqual(EXAMPLE_RESPONSE.body);
      expect(prismaResponseCreateMock).toHaveBeenCalledTimes(1);
    });

    it('should throw a ConflictException if the record already exists', async () => {
      jest.spyOn(service, 'getByStatusCode').mockImplementationOnce(() => Promise.resolve(EXAMPLE_RESPONSE));

      const args: CreateResponseDto = {
        body: EXAMPLE_RESPONSE.body,
        statusCode: EXAMPLE_STATUS_CODE,
      };

      await expect(service.create(EXAMPLE_ENDPOINT_ID, args)).rejects.toThrow(ConflictException);
    });
  });

  describe('update()', () => {
    it('should update an existing response', async () => {
      jest.spyOn(service, 'getById').mockImplementationOnce(() => Promise.resolve(EXAMPLE_RESPONSE));

      const args: UpdateResponseDto = {
        body: EXAMPLE_UPDATED_BODY,
      };

      const data = await service.update(EXAMPLE_ENDPOINT_ID, EXAMPLE_RESPONSE_ID, args);

      expect(prismaResponseUpdateMock).toHaveBeenCalledTimes(1);
      expect(data.body).toEqual(EXAMPLE_UPDATED_BODY);
    });

    it('should throw BadRequestException if nothing is provided in the DTO', async () => {
      await expect(service.update(EXAMPLE_ENDPOINT_ID, EXAMPLE_RESPONSE_ID, {} as UpdateResponseDto)).rejects.toThrow(
        BadRequestException
      );
    });
  });

  describe('delete()', () => {
    it('should call the delete function on Prisma', async () => {
      jest.spyOn(service, 'getById').mockResolvedValue(EXAMPLE_RESPONSE);

      await service.delete(EXAMPLE_ENDPOINT_ID, EXAMPLE_RESPONSE_ID);

      expect(prismaResponseDeleteMock).toHaveBeenCalledTimes(1);
    });

    it('should throw an InternalServerErrorException', async () => {
      jest.spyOn(service, 'getById').mockResolvedValue(EXAMPLE_RESPONSE);

      prismaResponseDeleteMock.mockImplementationOnce(() => {
        throw new InternalServerErrorException();
      });

      await expect(service.delete(EXAMPLE_ENDPOINT_ID, EXAMPLE_RESPONSE_ID)).rejects.toThrow(
        InternalServerErrorException
      );
    });
  });
});
