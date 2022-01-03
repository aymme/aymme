import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import * as EndpointActions from './endpoint.actions';
import * as EndpointSelectors from './endpoint.selectors';

@Injectable()
export class EndpointFacade {
  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(select(EndpointSelectors.getEndpointLoaded));

  constructor(private readonly store: Store) {}

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  loadEndpoint(endpointId: string) {
    this.store.dispatch(EndpointActions.loadEndpoint({ endpointId }));
  }
}
