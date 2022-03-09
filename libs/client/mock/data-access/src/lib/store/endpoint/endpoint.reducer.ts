import { Action, createReducer, on } from '@ngrx/store';
import { EndpointEntity, ResponseEntity } from '@aymme/client/mock/model';
import * as EndpointActions from './endpoint.actions';

export const ENDPOINT_FEATURE_KEY = 'endpoint';

export interface State {
  selectedId?: string;
  loaded: boolean | null;
  error?: string | null;
  endpoint?: EndpointEntity | undefined;
  activeStatusCode?: ResponseEntity;
  selectedStatusCodeBody?: string;
}

export interface EndpointPartialState {
  readonly [ENDPOINT_FEATURE_KEY]: State;
}

export const initialState: State = {
  loaded: null,
  endpoint: undefined,
};

const endpointReducer = createReducer(
  initialState,
  on(EndpointActions.loadEndpoint, (state) => ({ ...state, loaded: false, error: null })),
  on(EndpointActions.loadEndpointSuccess, (state, { endpoint }) => {
    const activeStatusCode = endpoint.responses
      ? endpoint.responses.find((response) => response.statusCode === endpoint.activeStatusCode)
      : undefined;

    return {
      ...state,
      endpoint,
      selectedId: endpoint.id,
      activeStatusCode: activeStatusCode || undefined,
      selectedStatusCodeBody: activeStatusCode?.body,
      loaded: true,
    };
  }),
  on(EndpointActions.loadEndpointFailure, (state, { error }) => ({ ...state, error })),
  on(EndpointActions.removeResponse, (state, { response }) => {
    if (state.endpoint) {
      const updatedResponseArray = state.endpoint.responses?.filter((res) => res.id !== response.id);

      const updatedEnpoint = {
        ...state.endpoint,
        responses: updatedResponseArray,
      };

      return {
        ...state,
        endpoint: updatedEnpoint,
      };
    } else {
      return state;
    }
  }),
  on(EndpointActions.addNewResponse, (state, { response, body }) => {
    const newResponse: ResponseEntity = { statusCode: response, body: body };
    let updatedResponseArray: ResponseEntity[];

    if (state.endpoint) {
      if (state.endpoint.responses) {
        updatedResponseArray = [...state.endpoint.responses, newResponse];
      } else {
        updatedResponseArray = [newResponse];
      }
      const updatedEndpoint = {
        ...state.endpoint,
        responses: updatedResponseArray,
      };

      return {
        ...state,
        endpoint: updatedEndpoint,
      };
    } else {
      return state;
    }
  })
);

export function reducer(state: State | undefined, action: Action) {
  return endpointReducer(state, action);
}
