import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as EndpointsSelectors from './endpoints.selectors';
import { EndpointsActions } from '../../../index';

@Injectable()
export class EndpointsFacade {
  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(select(EndpointsSelectors.getEndpointsLoaded));
  selectedEndpoint$ = this.store.pipe(
    select(EndpointsSelectors.getSelectedEndpoint)
  );

  constructor(private readonly store: Store) {}

  openEndpoint(projectId: string, endpointId: string) {
    this.store.dispatch(
      EndpointsActions.openEndpoint({ projectId, endpointId })
    );
  }
}
