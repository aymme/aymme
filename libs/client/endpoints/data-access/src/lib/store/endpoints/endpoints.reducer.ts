import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { EndpointsEntity } from './endpoints.models';
import * as EndpointsActions from './endpoints.actions';

export const ENDPOINTS_FEATURE_KEY = 'endpoints';

export interface State {
  endpoint?: EndpointsEntity;
  loaded: boolean; // has the Endpoints list been loaded
  error?: unknown; // last known error (if any)
}

export interface EndpointsPartialState {
  readonly [ENDPOINTS_FEATURE_KEY]: State;
}

export const endpointsAdapter: EntityAdapter<EndpointsEntity> =
  createEntityAdapter<EndpointsEntity>();

export const initialState: State = {
  // set initial required properties
  loaded: false,
};

const endpointsReducer = createReducer(
  initialState,
  on(EndpointsActions.openEndpoint, (state) => ({
    ...state,
    loaded: false,
    endpoint: undefined,
  })),
  on(EndpointsActions.loadEndpointSuccess, (state, { endpoint }) => ({
    ...state,
    loaded: true,
    endpoint,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return endpointsReducer(state, action);
}
