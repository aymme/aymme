import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { NxModule } from '@nrwl/angular';
import { readFirst } from '@nrwl/angular/testing';

import * as CollectionsActions from './collections.actions';
import { CollectionsEffects } from './collections.effects';
import { CollectionsFacade } from './collections.facade';
import { CollectionsEntity } from './collections.models';
import { COLLECTIONS_FEATURE_KEY, reducer, State } from './collections.reducer';

interface TestSchema {
  collections: State;
}

describe('CollectionsFacade', () => {
  let facade: CollectionsFacade;
  let store: Store<TestSchema>;
  const createCollectionsEntity = (id: string, name = ''): CollectionsEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(COLLECTIONS_FEATURE_KEY, reducer),
          EffectsModule.forFeature([CollectionsEffects]),
        ],
        providers: [CollectionsFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [NxModule.forRoot(), StoreModule.forRoot({}), EffectsModule.forRoot([]), CustomFeatureModule],
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
      expect(isLoaded).toBe(true);
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
