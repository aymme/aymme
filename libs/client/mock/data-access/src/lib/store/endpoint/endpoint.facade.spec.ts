import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { NxModule } from '@nrwl/angular';
import { readFirst } from '@nrwl/angular/testing';

import * as EndpointActions from './endpoint.actions';
import { EndpointEffects } from './endpoint.effects';
import { EndpointFacade } from './endpoint.facade';
import { ENDPOINT_FEATURE_KEY, reducer, State } from './endpoint.reducer';
import { EndpointEntity } from '@aymme/client/mock/model';

interface TestSchema {
  endpoint: State;
}

describe('EndpointFacade', () => {
  let facade: EndpointFacade;
  let store: Store<TestSchema>;
  const createEndpointEntity = (id: string, name = ''): EndpointEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [StoreModule.forFeature(ENDPOINT_FEATURE_KEY, reducer), EffectsModule.forFeature([EndpointEffects])],
        providers: [EndpointFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [NxModule.forRoot(), StoreModule.forRoot({}), EffectsModule.forRoot([]), CustomFeatureModule],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.inject(Store);
      facade = TestBed.inject(EndpointFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async () => {
      let list = await readFirst(facade.allEndpoint$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      facade.init();

      list = await readFirst(facade.allEndpoint$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(true);
    });

    /**
     * Use `loadEndpointSuccess` to manually update list
     */
    it('allEndpoint$ should return the loaded list; and loaded flag == true', async () => {
      let list = await readFirst(facade.allEndpoint$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      store.dispatch(
        EndpointActions.loadEndpointSuccess({
          endpoint: [createEndpointEntity('AAA'), createEndpointEntity('BBB')],
        })
      );

      list = await readFirst(facade.allEndpoint$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(2);
      expect(isLoaded).toBe(true);
    });
  });
});
