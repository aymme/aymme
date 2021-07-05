import { Test } from '@nestjs/testing';
import { ApiProjectFeatureController } from './api-project-feature.controller';

describe('ApiProjectFeatureController', () => {
  let controller: ApiProjectFeatureController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [],
      controllers: [ApiProjectFeatureController],
    }).compile();

    controller = module.get(ApiProjectFeatureController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
