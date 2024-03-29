import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { readFirst } from '@nrwl/angular/testing';

import * as CollectionsActions from './collections.actions';
import { CollectionsEffects } from './collections.effects';
import { CollectionsFacade } from './collections.facade';
import { CollectionsEntity } from './collections.models';
import { COLLECTIONS_FEATURE_KEY, reducer, State } from './collections.reducer';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { getAppConfigProvider } from '@aymme/client/shared/app-config';
import { ToastrService } from 'ngx-toastr';

interface TestSchema {
  collections: State;
}

describe('CollectionsFacade', () => {
  let facade: CollectionsFacade;
  let store: Store<TestSchema>;
  const createCollectionsEntity = (id: string, name = ''): CollectionsEntity => ({
    id,
    name: name || `name-${id}`,
    order: 1,
  });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          HttpClientTestingModule,
          StoreModule.forFeature(COLLECTIONS_FEATURE_KEY, reducer),
          EffectsModule.forFeature([CollectionsEffects]),
        ],
        providers: [
          CollectionsFacade,
          getAppConfigProvider({ apiUrl: '', production: false }),
          {
            provide: ToastrService,
            useValue: jest.fn(),
          },
        ],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [StoreModule.forRoot({}), EffectsModule.forRoot([]), CustomFeatureModule],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.inject(Store);
      facade = TestBed.inject(CollectionsFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async () => {
      let list = await readFirst(facade.allCollections$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      facade.init('');

      list = await readFirst(facade.allCollections$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);
    });

    /**
     * Use `loadCollectionsSuccess` to manually update list
     */
    it('allCollections$ should return the loaded list; and loaded flag == true', async () => {
      let list = await readFirst(facade.allCollections$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      store.dispatch(
        CollectionsActions.loadCollectionsSuccess({
          collections: [createCollectionsEntity('AAA'), createCollectionsEntity('BBB')],
        })
      );

      list = await readFirst(facade.allCollections$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(2);
      expect(isLoaded).toBe(true);
    });
  });
});
