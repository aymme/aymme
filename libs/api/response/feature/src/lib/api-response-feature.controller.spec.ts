import { Test } from '@nestjs/testing';
import { ApiResponseFeatureController } from './api-response-feature.controller';
import { ResponseService } from '@aymme/api/response/data-access';
import { PrismaService } from '@aymme/api/database/data-access';

describe('ApiResponseFeatureController', () => {
  let controller: ApiResponseFeatureController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ResponseService, { provide: PrismaService, useValue: jest.fn() }],
      controllers: [ApiResponseFeatureController],
    }).compile();

    controller = module.get(ApiResponseFeatureController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
