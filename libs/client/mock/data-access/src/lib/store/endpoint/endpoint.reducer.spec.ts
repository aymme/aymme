import { Action } from '@ngrx/store';

import * as EndpointActions from './endpoint.actions';
import { initialState, reducer, State } from './endpoint.reducer';
import { EndpointEntity } from '@aymme/client/mock/model';

describe('Endpoint Reducer', () => {
  const createEndpointEntity = (id: string, name = ''): EndpointEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid Endpoint actions', () => {
    it('loadEndpointSuccess should return the list of known Endpoint', () => {
      const endpoint = [createEndpointEntity('PRODUCT-AAA'), createEndpointEntity('PRODUCT-zzz')];
      const action = EndpointActions.loadEndpointSuccess({ endpoint });

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
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
