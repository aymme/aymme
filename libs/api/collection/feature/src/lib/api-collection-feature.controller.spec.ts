import { Test } from '@nestjs/testing';
import { ApiCollectionFeatureController } from './api-collection-feature.controller';
import { Collection } from '@prisma/client';
import { CollectionService } from '@aymme/api/collection/data-access';

const EXAMPLE_COLLECTION_ID = '02885d95-efb0-41a8-84b3-fcee3d809ed8';
const EXAMPLE_PROJECT_ID = '41f17c25-f599-49a2-ac24-efc34fa0ee81';
const EXAMPLE_COLLECTION_NEW_NAME = 'Account Management';

const EXAMPLE_COLLECTION: Collection = {
  id: EXAMPLE_COLLECTION_ID,
  name: 'Accounts',
  order: 0,
  projectId: EXAMPLE_PROJECT_ID,
};
const EXAMPLE_COLLECTIONS: Collection[] = [EXAMPLE_COLLECTION];

const collectionServiceGetAllCollectionsMock = jest.fn(() => EXAMPLE_COLLECTIONS);
const collectionServiceGetCollectionMock = jest.fn(() => EXAMPLE_COLLECTION);
const collectionServiceCreateCollectionMock = jest.fn(() => EXAMPLE_COLLECTION);
const collectionServiceUpdateCollectionMock = jest.fn(() => [
  {
    ...EXAMPLE_COLLECTION,
    name: EXAMPLE_COLLECTION_NEW_NAME,
  },
]);
const collectionServiceUpdateCollectionNameMock = jest.fn(() => ({
  ...EXAMPLE_COLLECTION,
  name: EXAMPLE_COLLECTION_NEW_NAME,
}));
const collectionServiceDeleteCollectionMock = jest.fn();

describe('ApiCategoryFeatureController', () => {
  let controller: ApiCollectionFeatureController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [ApiCollectionFeatureController],
      providers: [
        {
          provide: CollectionService,
          useClass: jest.fn(() => ({
            getAllByProjectID: collectionServiceGetAllCollectionsMock,
            create: collectionServiceCreateCollectionMock,
            update: collectionServiceUpdateCollectionMock,
            updateName: collectionServiceUpdateCollectionNameMock,
            delete: collectionServiceDeleteCollectionMock,
          })),
        },
      ],
    }).compile();

    controller = module.get(ApiCollectionFeatureController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });

  describe('getAll()', () => {
    it('should get all of the collections for a project', async () => {
      const data = await controller.getAll(EXAMPLE_PROJECT_ID);

      expect(data.length).toBeGreaterThan(0);
      expect(data[0].name).toEqual(EXAMPLE_COLLECTION.name);
      expect(collectionServiceGetAllCollectionsMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('create', () => {
    it('should create a new collection', async () => {
      const data = await controller.create(EXAMPLE_PROJECT_ID, { name: EXAMPLE_COLLECTION.name });

      expect(data.name).toEqual(EXAMPLE_COLLECTION.name);
      expect(collectionServiceCreateCollectionMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    it('should update an existing collection', async () => {
      const data = await controller.update(EXAMPLE_PROJECT_ID, [
        { ...EXAMPLE_COLLECTION, name: EXAMPLE_COLLECTION_NEW_NAME, endpoints: [] },
      ]);

      expect(data.length).toEqual(1);
      expect(data[0].name).toEqual(EXAMPLE_COLLECTION_NEW_NAME);
      expect(collectionServiceUpdateCollectionMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('updateName', () => {
    it('should update the name of existing collection', async () => {
      const data = await controller.updateName(EXAMPLE_PROJECT_ID, EXAMPLE_COLLECTION_ID, {
        name: EXAMPLE_COLLECTION_NEW_NAME,
      });

      expect(data.name).toEqual(EXAMPLE_COLLECTION_NEW_NAME);
      expect(collectionServiceUpdateCollectionNameMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('delete', () => {
    it('should delete a collection', async () => {
      await controller.delete(EXAMPLE_PROJECT_ID, EXAMPLE_COLLECTION_ID);

      expect(collectionServiceDeleteCollectionMock).toHaveBeenCalledTimes(1);
    });
  });
});
