import { EndpointPartialState, initialState } from './endpoint.reducer';
import * as EndpointSelectors from './endpoint.selectors';
import { EndpointEntity } from '@aymme/client/mock/model';

describe('Endpoint Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getEndpointId = (it: EndpointEntity) => it.id;
  const createEndpointEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
      activeStatusCode: 200,
      delay: 300,
      path: '',
      method: 'GET',
      forward: false,
      order: 1,
      emptyArray: false,
    } as EndpointEntity);

  let state: EndpointPartialState;

  beforeEach(() => {
    state = {
      endpoint: {
        ...initialState,
        selectedId: 'PRODUCT-BBB',
        error: ERROR_MSG,
        loaded: true,
      },
    };
  });

  describe('Endpoint Selectors', () => {
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
