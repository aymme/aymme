import { Action } from '@ngrx/store';

import * as CollectionsActions from './collections.actions';
import { CollectionsEntity } from './collections.models';
import { State, initialState, reducer } from './collections.reducer';

describe('Collections Reducer', () => {
  const createCollectionsEntity = (
    id: string,
    name = ''
  ): CollectionsEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid Collections actions', () => {
    it('loadCollectionsSuccess should return the list of known Collections', () => {
      const collections = [
        createCollectionsEntity('PRODUCT-AAA'),
        createCollectionsEntity('PRODUCT-zzz'),
      ];
      const action = CollectionsActions.loadCollectionsSuccess({ collections });

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
