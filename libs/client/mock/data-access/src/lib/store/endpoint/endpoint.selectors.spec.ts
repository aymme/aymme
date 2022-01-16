import { endpointAdapter, EndpointPartialState, initialState } from './endpoint.reducer';
import * as EndpointSelectors from './endpoint.selectors';
import { EndpointEntity } from '@aymme/client/mock/model';

describe('Endpoint Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getEndpointId = (it: EndpointEntity) => it.id;
  const createEndpointEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as EndpointEntity);

  let state: EndpointPartialState;

  beforeEach(() => {
    state = {
      endpoint: endpointAdapter.setAll(
        [createEndpointEntity('PRODUCT-AAA'), createEndpointEntity('PRODUCT-BBB'), createEndpointEntity('PRODUCT-CCC')],
        {
          ...initialState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Endpoint Selectors', () => {
    it('getAllEndpoint() should return the list of Endpoint', () => {
      const results = EndpointSelectors.getAllEndpoint(state);
      const selId = getEndpointId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = EndpointSelectors.getSelected(state) as EndpointEntity;
      const selId = getEndpointId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getEndpointLoaded() should return the current "loaded" status', () => {
      const result = EndpointSelectors.getEndpointLoaded(state);

      expect(result).toBe(true);
    });

    it('getEndpointError() should return the current "error" state', () => {
      const result = EndpointSelectors.getEndpointError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
