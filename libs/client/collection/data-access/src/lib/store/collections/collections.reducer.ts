import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as CollectionsActions from './collections.actions';
import { CollectionsEntity } from './collections.models';

import { moveItemInArray, transferArrayItem } from './drag-utils';

export const COLLECTIONS_FEATURE_KEY = 'collections';

export interface State extends EntityState<CollectionsEntity> {
  selectedId?: string | number; // which Collections record has been selected
  loaded: boolean; // has the Collections list been loaded
  error?: string | null; // last known error (if any)
}

export interface CollectionsPartialState {
  readonly [COLLECTIONS_FEATURE_KEY]: State;
}

export const collectionsAdapter: EntityAdapter<CollectionsEntity> = createEntityAdapter<CollectionsEntity>();

export const initialState: State = collectionsAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const collectionsReducer = createReducer(
  initialState,
  on(CollectionsActions.init, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(CollectionsActions.loadCollectionsSuccess, (state, { collections }) =>
    collectionsAdapter.setAll(collections, { ...state, loaded: true })
  ),
  on(CollectionsActions.loadCollectionsFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(CollectionsActions.moveEndpointInCollection, (state, { data }) => {
    const collections: CollectionsEntity[] = Object.values(state.entities) as CollectionsEntity[];
    if (collections.length) {
      const collectionsUpdate: CollectionsEntity[] = collections.map((collection) => {
        if (collection?.id === data.containerId) {
          if (!collection?.endpoints?.length) {
            return collection;
          }
          return {
            ...collection,
            endpoints: moveItemInArray(collection.endpoints, data.previousIndex, data.currentIndex),
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

      if (previousCollection?.endpoints && currentCollection?.endpoints) {
        const { currentArray, targetArray } = transferArrayItem(
          previousCollection.endpoints,
          currentCollection.endpoints,
          data.previousIndex,
          data.currentIndex
        );

        const collectionsUpdate: CollectionsEntity[] = collections.map((collection: CollectionsEntity) => {
          if (collection.id === previousCollection.id) {
            return {
              ...collection,
              endpoints: currentArray,
            };
          }

          if (collection.id === currentCollection.id) {
            return {
              ...collection,
              endpoints: targetArray,
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
  })
);

export function reducer(state: State | undefined, action: Action) {
  return collectionsReducer(state, action);
}
