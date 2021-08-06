import { Action } from '@ngrx/store';

import * as EndpointsActions from './endpoints.actions';
import { EndpointsEntity } from './endpoints.models';
import { State, initialState, reducer } from './endpoints.reducer';

describe('Endpoints Reducer', () => {
  const createEndpointsEntity = (id: string, name = ''): EndpointsEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid Endpoints actions', () => {
    it('loadEndpointsSuccess should return the list of known Endpoints', () => {
      const endpoints = [
        createEndpointsEntity('PRODUCT-AAA'),
        createEndpointsEntity('PRODUCT-zzz'),
      ];
      const action = EndpointsActions.loadEndpointsSuccess({ endpoints });

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
