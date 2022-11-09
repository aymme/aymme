import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { readFirst } from '@nrwl/angular/testing';
import { EndpointEffects } from './endpoint.effects';
import { EndpointFacade } from './endpoint.facade';
import { ENDPOINT_FEATURE_KEY, reducer, State } from './endpoint.reducer';
import { EndpointEntity } from '@aymme/client/mock/model';
import { getAppConfigProvider } from '@aymme/client/shared/app-config';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrService } from 'ngx-toastr';
import { PROJECTS_FEATURE_KEY, projectsReducer } from '@aymme/client/projects/data-access';

interface TestSchema {
  endpoint: State;
}

describe('EndpointFacade', () => {
  let facade: EndpointFacade;
  let store: Store<TestSchema>;
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

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(PROJECTS_FEATURE_KEY, projectsReducer),
          EffectsModule.forFeature([EndpointEffects]),
          HttpClientTestingModule,
        ],
        providers: [
          EndpointFacade,
          getAppConfigProvider({ apiUrl: '', production: false }),
          {
            provide: ToastrService,
            useValue: jest.fn(),
          },
        ],
      })
      class CustomProjectFeatureModule {}

      @NgModule({
        imports: [
          StoreModule.forFeature(ENDPOINT_FEATURE_KEY, reducer),
          EffectsModule.forFeature([EndpointEffects]),
          HttpClientTestingModule,
        ],
        providers: [
          EndpointFacade,
          getAppConfigProvider({ apiUrl: '', production: false }),
          {
            provide: ToastrService,
            useValue: jest.fn(),
          },
        ],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [StoreModule.forRoot({}), EffectsModule.forRoot([]), CustomFeatureModule, CustomProjectFeatureModule],
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
      const isLoaded = await readFirst(facade.loaded$);

      expect(isLoaded).toBe(null);
    });

    // /**
    //  * Use `loadEndpointSuccess` to manually update list
    //  */
    // it('allEndpoint$ should return the loaded list; and loaded flag == true', async () => {
    //   let list = await readFirst(facade.endpoint$);
    //   let isLoaded = await readFirst(facade.loaded$);
    //
    //   expect(isLoaded).toBe(false);
    //
    //   store.dispatch(
    //     EndpointActions.loadEndpointSuccess({
    //       endpoint: createEndpointEntity('AAA'),
    //     })
    //   );
    //
    //   list = await readFirst(facade.endpoint$);
    //   isLoaded = await readFirst(facade.loaded$);
    //
    //   expect(isLoaded).toBe(true);
    // });
  });
});
