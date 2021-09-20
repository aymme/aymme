import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  COLLECTIONS_FEATURE_KEY,
  State,
  collectionsAdapter,
} from './collections.reducer';

// Lookup the 'Collections' feature state managed by NgRx
export const getCollectionsState = createFeatureSelector<State>(
  COLLECTIONS_FEATURE_KEY
);

const { selectAll, selectEntities } = collectionsAdapter.getSelectors();

export const getCollectionsLoaded = createSelector(
  getCollectionsState,
  (state: State) => state.loaded
);

export const getCollectionsError = createSelector(
  getCollectionsState,
  (state: State) => state.error
);

export const getAllCollections = createSelector(
  getCollectionsState,
  (state: State) => selectAll(state)
);

export const getCollectionsEntities = createSelector(
  getCollectionsState,
  (state: State) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getCollectionsState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getCollectionsEntities,
  getSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);
