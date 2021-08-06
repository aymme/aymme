import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import * as EndpointsActions from './endpoints.actions';
import * as EndpointsSelectors from './endpoints.selectors';

@Injectable()
export class EndpointsFacade {
  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(select(EndpointsSelectors.getEndpointsLoaded));
  allEndpoints$ = this.store.pipe(select(EndpointsSelectors.getAllEndpoints));
  selectedEndpoint$ = this.store.pipe(select(EndpointsSelectors.getSelected));

  constructor(private readonly store: Store) {}

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init(projectId: string) {
    this.store.dispatch(EndpointsActions.init({ projectId }));
  }
}
