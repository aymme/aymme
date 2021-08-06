import { EndpointsEntity } from './endpoints.models';
import {
  endpointsAdapter,
  EndpointsPartialState,
  initialState,
} from './endpoints.reducer';
import * as EndpointsSelectors from './endpoints.selectors';

describe('Endpoints Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getEndpointsId = (it: EndpointsEntity) => it.id;
  const createEndpointsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as EndpointsEntity);

  let state: EndpointsPartialState;

  beforeEach(() => {
    state = {
      endpoints: endpointsAdapter.setAll(
        [
          createEndpointsEntity('PRODUCT-AAA'),
          createEndpointsEntity('PRODUCT-BBB'),
          createEndpointsEntity('PRODUCT-CCC'),
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

  describe('Endpoints Selectors', () => {
    it('getAllEndpoints() should return the list of Endpoints', () => {
      const results = EndpointsSelectors.getAllEndpoints(state);
      const selId = getEndpointsId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = EndpointsSelectors.getSelected(state) as EndpointsEntity;
      const selId = getEndpointsId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getEndpointsLoaded() should return the current "loaded" status', () => {
      const result = EndpointsSelectors.getEndpointsLoaded(state);

      expect(result).toBe(true);
    });

    it('getEndpointsError() should return the current "error" state', () => {
      const result = EndpointsSelectors.getEndpointsError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
