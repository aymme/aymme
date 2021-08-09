import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ENDPOINTS_FEATURE_KEY, State } from './endpoints.reducer';

// Lookup the 'Endpoints' feature state managed by NgRx
export const getEndpointsState = createFeatureSelector<State>(
  ENDPOINTS_FEATURE_KEY
);

export const getEndpointsLoaded = createSelector(
  getEndpointsState,
  (state: State) => state.loaded
);

export const getEndpointsError = createSelector(
  getEndpointsState,
  (state: State) => state.error
);

export const getSelectedEndpoint = createSelector(
  getEndpointsState,
  (state: State) => state.endpoint
);
