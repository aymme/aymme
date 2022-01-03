import { Action, createReducer, on } from '@ngrx/store';

import * as EndpointActions from './endpoint.actions';
import { EndpointEntity } from '@aymme/client/mock/data-access';

export const ENDPOINT_FEATURE_KEY = 'endpoint';

export interface State {
  selectedId?: string | number; // which Endpoint record has been selected
  loaded: boolean; // has the Endpoint list been loaded
  error?: string | null; // last known error (if any)
  endpoint?: EndpointEntity | null;
}

export interface EndpointPartialState {
  readonly [ENDPOINT_FEATURE_KEY]: State;
}

export const initialState: State = {
  // set initial required properties
  loaded: false,
};

const endpointReducer = createReducer(
  initialState,
  on(EndpointActions.loadEndpoint, (state) => ({ ...state, loaded: false, error: null })),
  on(EndpointActions.loadEndpointSuccess, (state, { endpoint }) => ({ ...state, endpoint })),
  on(EndpointActions.loadEndpointFailure, (state, { error }) => ({ ...state, error }))
);

export function reducer(state: State | undefined, action: Action) {
  return endpointReducer(state, action);
}
