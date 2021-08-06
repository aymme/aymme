import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { NxModule } from '@nrwl/angular';
import { readFirst } from '@nrwl/angular/testing';

import * as EndpointsActions from './endpoints.actions';
import { EndpointsEffects } from './endpoints.effects';
import { EndpointsFacade } from './endpoints.facade';
import { EndpointsEntity } from './endpoints.models';
import {
  ENDPOINTS_FEATURE_KEY,
  State,
  initialState,
  reducer,
} from './endpoints.reducer';
import * as EndpointsSelectors from './endpoints.selectors';

interface TestSchema {
  endpoints: State;
}

describe('EndpointsFacade', () => {
  let facade: EndpointsFacade;
  let store: Store<TestSchema>;
  const createEndpointsEntity = (id: string, name = ''): EndpointsEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(ENDPOINTS_FEATURE_KEY, reducer),
          EffectsModule.forFeature([EndpointsEffects]),
        ],
        providers: [EndpointsFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.inject(Store);
      facade = TestBed.inject(EndpointsFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async () => {
      let list = await readFirst(facade.allEndpoints$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      facade.init();

      list = await readFirst(facade.allEndpoints$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(true);
    });

    /**
     * Use `loadEndpointsSuccess` to manually update list
     */
    it('allEndpoints$ should return the loaded list; and loaded flag == true', async () => {
      let list = await readFirst(facade.allEndpoints$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      store.dispatch(
        EndpointsActions.loadEndpointsSuccess({
          endpoints: [
            createEndpointsEntity('AAA'),
            createEndpointsEntity('BBB'),
          ],
        })
      );

      list = await readFirst(facade.allEndpoints$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(2);
      expect(isLoaded).toBe(true);
    });
  });
});
