import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import * as EndpointsActions from './endpoints.actions';
import { EndpointsEntity } from './endpoints.models';

export const ENDPOINTS_FEATURE_KEY = 'endpoints';

export interface State extends EntityState<EndpointsEntity> {
  selectedId?: string | number; // which Endpoints record has been selected
  loaded: boolean; // has the Endpoints list been loaded
  error?: unknown; // last known error (if any)
}

export interface EndpointsPartialState {
  readonly [ENDPOINTS_FEATURE_KEY]: State;
}

export const endpointsAdapter: EntityAdapter<EndpointsEntity> =
  createEntityAdapter<EndpointsEntity>();

export const initialState: State = endpointsAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const endpointsReducer = createReducer(
  initialState,
  on(EndpointsActions.init, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(EndpointsActions.loadEndpointsSuccess, (state, { endpoints }) =>
    endpointsAdapter.setAll(endpoints, { ...state, loaded: true })
  ),
  on(EndpointsActions.loadEndpointsFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return endpointsReducer(state, action);
}
