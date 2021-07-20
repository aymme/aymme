import { Test } from '@nestjs/testing';
import { ApiCollectionFeatureController } from './api-collection-feature.controller';

describe('ApiCategoryFeatureController', () => {
  let controller: ApiCollectionFeatureController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [],
      controllers: [ApiCollectionFeatureController],
    }).compile();

    controller = module.get(ApiCollectionFeatureController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
