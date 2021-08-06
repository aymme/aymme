import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { NxModule } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';
import { Observable } from 'rxjs';

import * as EndpointsActions from './endpoints.actions';
import { EndpointsEffects } from './endpoints.effects';

describe('EndpointsEffects', () => {
  let actions: Observable<Action>;
  let effects: EndpointsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        EndpointsEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(EndpointsEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: EndpointsActions.init() });

      const expected = hot('-a-|', {
        a: EndpointsActions.loadEndpointsSuccess({ endpoints: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
