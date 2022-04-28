import { EndpointEntity } from '@aymme/client/mock/model';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import * as CollectionsActions from './collections.actions';
import { CollectionsEntity } from './collections.models';

import { moveItemInArray, transferArrayItem } from './drag-utils';

export const COLLECTIONS_FEATURE_KEY = 'collections';

export interface State extends EntityState<CollectionsEntity> {
  selectedId?: string | number; // which Collections record has been selected
  loaded: boolean; // has the Collections list been loaded
  error?: Response | null; // last known error (if any)
}

export interface CollectionsPartialState {
  readonly [COLLECTIONS_FEATURE_KEY]: State;
}

export function sortByOrder(c1: CollectionsEntity, c2: CollectionsEntity) {
  const compare = c1.order - c2.order;
  if (compare > 0) {
    return 1;
  } else if (compare < 0) {
    return -1;
  } else return 0;
}

export const collectionsAdapter: EntityAdapter<CollectionsEntity> = createEntityAdapter<CollectionsEntity>({
  sortComparer: sortByOrder,
});

export const initialState: State = collectionsAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const mapToOrder = (array: any[]): any[] => {
  return array.map((endpoint: EndpointEntity, i: number) => {
    return {
      ...endpoint,
      order: i,
    };
  });
};

const collectionsReducer = createReducer(
  initialState,
  on(CollectionsActions.init, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(CollectionsActions.refresh, (state) => {
    return {
      ...state,
      loaded: false,
    };
  }),
  on(CollectionsActions.loadCollectionsSuccess, (state, { collections }) => {
    return collectionsAdapter.setAll(collections, { ...state, loaded: true });
  }),
  on(CollectionsActions.toggleCompressed, (state, { collection }) => {
    return collectionsAdapter.upsertOne(collection, { ...state });
  }),
  on(CollectionsActions.updateCollection, (state, { data, collection }) => {
    const updatedCollection: CollectionsEntity = {
      ...collection,
      name: data.newName,
    };
    return collectionsAdapter.upsertOne(updatedCollection, { ...state });
  }),
  on(CollectionsActions.loadCollectionsFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(CollectionsActions.updateCollectionOrder, (state, { data }) => {
    const collections: CollectionsEntity[] = Object.values(state.entities) as CollectionsEntity[];

    if (collections.length) {
      const collectionsUpdate: CollectionsEntity[] = moveItemInArray(
        collections,
        data.previousIndex,
        data.currentIndex
      ).map((collection: CollectionsEntity, i: number) => {
        return {
          ...collection,
          order: i,
        };
      });

      const update = collectionsAdapter.upsertMany(collectionsUpdate, state);

      return update;
    } else {
      return state;
    }
  }),
  on(CollectionsActions.moveEndpointInCollection, (state, { data }) => {
    const collections: CollectionsEntity[] = Object.values(state.entities) as CollectionsEntity[];
    if (collections.length) {
      const collectionsUpdate: CollectionsEntity[] = collections.map((collection) => {
        if (collection?.id === data.containerId) {
          if (!collection?.endpoints?.length) {
            return collection;
          }

          const endpoints = moveItemInArray(collection.endpoints, data.previousIndex, data.currentIndex);

          return {
            ...collection,
            endpoints: mapToOrder(endpoints),
          };
        }

        return collection;
      });

      return collectionsAdapter.upsertMany(collectionsUpdate, state);
    } else {
      return state;
    }
  }),
  on(CollectionsActions.moveEndpointToOtherCollection, (state, { data }) => {
    const collections: CollectionsEntity[] = Object.values(state.entities) as CollectionsEntity[];

    if (collections.length) {
      const previousCollection = collections.find((col) => col.id === data.previousContainerId);
      const currentCollection = collections.find((col) => col.id === data.containerId);

      if (previousCollection?.endpoints && currentCollection) {
        const { currentArray, targetArray } = transferArrayItem(
          previousCollection.endpoints,
          currentCollection.endpoints || [],
          data.previousIndex,
          data.currentIndex
        );

        const collectionsUpdate: CollectionsEntity[] = collections.map((collection: CollectionsEntity) => {
          if (collection.id === previousCollection.id) {
            return {
              ...collection,
              endpoints: mapToOrder(currentArray),
            };
          }

          if (collection.id === currentCollection.id) {
            return {
              ...collection,
              endpoints: mapToOrder(targetArray),
            };
          }

          return collection;
        });

        return collectionsAdapter.upsertMany(collectionsUpdate, state);
      } else {
        return state;
      }
    } else {
      return state;
    }
  }),

  on(CollectionsActions.removeEndpointFromCollection, (state, { collectionId, endpointId }) => {
    const collection = state.entities[collectionId];
    const endpoints = collection?.endpoints?.filter((e) => e.id !== endpointId);
    const changes = { ...collection, endpoints };
    return collectionsAdapter.updateOne({ id: collectionId, changes }, state);
  }),

  on(CollectionsActions.createNewCollectionSuccess, (state, { collection }) => {
    return collectionsAdapter.setOne(collection, state);
  }),
  on(CollectionsActions.createNewCollectionFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(CollectionsActions.deleteCollectionSuccess, (state, { collection }) => {
    return collectionsAdapter.removeOne(collection.id, state);
  })
);

export function reducer(state: State | undefined, action: Action) {
  return collectionsReducer(state, action);
}
