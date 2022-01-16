import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { DataPersistence, NxModule } from '@nrwl/angular';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as EndpointActions from './endpoint.actions';
import { EndpointEffects } from './endpoint.effects';

describe('EndpointEffects', () => {
  let actions: Observable<Action>;
  let effects: EndpointEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [EndpointEffects, DataPersistence, provideMockActions(() => actions), provideMockStore()],
    });

    effects = TestBed.inject(EndpointEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: EndpointActions.loadEndpoint({ endpointId: '123' }) });

      // const expected = hot('-a-|', { a: EndpointActions.loadEndpointSuccess({  }) });

      // expect(effects.init$).toBeObservable(expected);
    });
  });
});
