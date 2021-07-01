import { Test } from '@nestjs/testing';
import { ApiResponseFeatureController } from './api-response-feature.controller';

describe('ApiResponseFeatureController', () => {
  let controller: ApiResponseFeatureController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [],
      controllers: [ApiResponseFeatureController],
    }).compile();

    controller = module.get(ApiResponseFeatureController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
