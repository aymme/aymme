import { Action } from '@ngrx/store';

import * as EndpointActions from './endpoint.actions';
import { initialState, reducer, State } from './endpoint.reducer';
import { EndpointEntity } from '@aymme/client/mock/model';

describe('Endpoint Reducer', () => {
  const createEndpointEntity = (id: string, path = ''): EndpointEntity => ({
    id,
    path: path || `name-${id}`,
    activeStatusCode: 500,
    emptyArray: false,
    method: 'GET',
    forward: false,
    delay: 0,
    order: 0,
  });

  describe('valid Endpoint actions', () => {
    it('loadEndpointSuccess should return the list of known Endpoint', () => {
      const endpoint = createEndpointEntity('PRODUCT-AAA');
      const action = EndpointActions.loadEndpointSuccess({ endpoint });

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
