import { Test } from '@nestjs/testing';
import { ApiInterceptFeatureController } from './api-intercept-feature.controller';

describe('ApiInterceptFeatureController', () => {
  let controller: ApiInterceptFeatureController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [],
      controllers: [ApiInterceptFeatureController],
    }).compile();

    controller = module.get(ApiInterceptFeatureController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
