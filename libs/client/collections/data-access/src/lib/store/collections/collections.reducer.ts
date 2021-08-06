import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as CollectionsActions from './collections.actions';
import { CollectionsEntity } from './collections.models';

export const COLLECTIONS_FEATURE_KEY = 'collections';

export interface State extends EntityState<CollectionsEntity> {
  selectedId?: string | number; // which Collections record has been selected
  loaded: boolean; // has the Collections list been loaded
  error?: string | null; // last known error (if any)
}

export interface CollectionsPartialState {
  readonly [COLLECTIONS_FEATURE_KEY]: State;
}

export const collectionsAdapter: EntityAdapter<CollectionsEntity> =
  createEntityAdapter<CollectionsEntity>();

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
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return collectionsReducer(state, action);
}
