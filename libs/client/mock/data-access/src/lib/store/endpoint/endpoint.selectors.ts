import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ENDPOINT_FEATURE_KEY, State } from './endpoint.reducer';

// Lookup the 'Endpoint' feature state managed by NgRx
export const getEndpointState = createFeatureSelector<State>(ENDPOINT_FEATURE_KEY);

export const getEndpointLoaded = createSelector(getEndpointState, (state: State) => state.loaded);

export const getEndpointError = createSelector(getEndpointState, (state: State) => state.error);

export const getSelectedId = createSelector(getEndpointState, (state: State) => state.selectedId);

export const getSelectedEndpoint = createSelector(getEndpointState, (state: State) => state.endpoint);

export const getAvailableStatusCodes = createSelector(getSelectedEndpoint, (endpoint) => endpoint?.responses);

export const getActiveStatusCode = createSelector(getEndpointState, (state: State) => state.activeStatusCode);
