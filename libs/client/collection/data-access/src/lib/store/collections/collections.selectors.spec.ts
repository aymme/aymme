import { CollectionsEntity } from './collections.models';
import {
  collectionsAdapter,
  CollectionsPartialState,
  initialState,
} from './collections.reducer';
import * as CollectionsSelectors from './collections.selectors';

describe('Collections Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getCollectionsId = (it: CollectionsEntity) => it.id;
  const createCollectionsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as CollectionsEntity);

  let state: CollectionsPartialState;

  beforeEach(() => {
    state = {
      collections: collectionsAdapter.setAll(
        [
          createCollectionsEntity('PRODUCT-AAA'),
          createCollectionsEntity('PRODUCT-BBB'),
          createCollectionsEntity('PRODUCT-CCC'),
        ],
        {
          ...initialState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Collections Selectors', () => {
    it('getAllCollections() should return the list of Collections', () => {
      const results = CollectionsSelectors.getAllCollections(state);
      const selId = getCollectionsId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = CollectionsSelectors.getSelected(
        state
      ) as CollectionsEntity;
      const selId = getCollectionsId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getCollectionsLoaded() should return the current "loaded" status', () => {
      const result = CollectionsSelectors.getCollectionsLoaded(state);

      expect(result).toBe(true);
    });

    it('getCollectionsError() should return the current "error" state', () => {
      const result = CollectionsSelectors.getCollectionsError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
