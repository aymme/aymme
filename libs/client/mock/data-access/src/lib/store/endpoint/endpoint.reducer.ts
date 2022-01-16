import { Action, createReducer, on } from '@ngrx/store';

import { EndpointEntity, IAvailableStatusCode } from '@aymme/client/mock/model';

import * as EndpointActions from './endpoint.actions';

export const ENDPOINT_FEATURE_KEY = 'endpoint';

export interface State {
  selectedId?: string;
  loaded: boolean;
  error?: string | null;
  endpoint?: EndpointEntity | undefined;
  availableStatuses: IAvailableStatusCode[];
  activeStatusCode?: IAvailableStatusCode;
}

export interface EndpointPartialState {
  readonly [ENDPOINT_FEATURE_KEY]: State;
}

export const initialState: State = {
  // set initial required properties
  loaded: false,
  availableStatuses: [],
};

const endpointReducer = createReducer(
  initialState,
  on(EndpointActions.loadEndpoint, (state) => ({ ...state, loaded: false, error: null })),
  on(EndpointActions.loadEndpointSuccess, (state, { endpoint }) => {
    const availableStatuses = endpoint.responses
      ? endpoint.responses.map((response) => ({ id: response.id, statusCode: response.statusCode }))
      : [];

    const activeStatusCode = endpoint.responses
      ? endpoint.responses.find((response) => response.statusCode === endpoint.activeStatusCode)
      : undefined;

    return {
      ...state,
      endpoint,
      selectedId: endpoint.id,
      availableStatuses,
      activeStatusCode: activeStatusCode
        ? { id: activeStatusCode.id, statusCode: activeStatusCode.statusCode }
        : undefined,
    };
  }),
  on(EndpointActions.loadEndpointFailure, (state, { error }) => ({ ...state, error }))
);

export function reducer(state: State | undefined, action: Action) {
  return endpointReducer(state, action);
}
