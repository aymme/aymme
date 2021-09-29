import { Test } from '@nestjs/testing';
import { ApiEndpointFeatureController } from './api-endpoint-feature.controller';

describe('ApiEndpointFeatureController', () => {
  let controller: ApiEndpointFeatureController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [],
      controllers: [ApiEndpointFeatureController],
    }).compile();

    controller = module.get(ApiEndpointFeatureController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
