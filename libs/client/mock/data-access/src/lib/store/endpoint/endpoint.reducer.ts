import { Action, createReducer, on } from '@ngrx/store';

import { EndpointEntity, ResponseEntity } from '@aymme/client/mock/model';

import * as EndpointActions from './endpoint.actions';
import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';

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

export function sortByOrder(e1: EndpointEntity, e2: EndpointEntity) {
  const compare = e1.order - e2.order;
  if (compare > 0) {
    return 1;
  } else if (compare < 0) {
    return -1;
  } else return 0;
}

export const collectionsAdapter: EntityAdapter<EndpointEntity> = createEntityAdapter<EndpointEntity>({
  sortComparer: sortByOrder,
});

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
  on(EndpointActions.loadEndpointFailure, (state, { error }) => ({ ...state, error }))
);

export function reducer(state: State | undefined, action: Action) {
  return endpointReducer(state, action);
}
