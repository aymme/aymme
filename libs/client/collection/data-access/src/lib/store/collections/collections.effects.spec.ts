import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { NxModule } from '@nrwl/angular';
import { Observable } from 'rxjs';

import * as CollectionsActions from './collections.actions';
import { CollectionsEffects } from './collections.effects';
import { hot } from 'jasmine-marbles';

describe('CollectionsEffects', () => {
  let actions: Observable<Action>;
  let effects: CollectionsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [CollectionsEffects, provideMockActions(() => actions), provideMockStore()],
    });

    effects = TestBed.inject(CollectionsEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: CollectionsActions.init() });

      const expected = hot('-a-|', {
        a: CollectionsActions.loadCollectionsSuccess({ collections: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
