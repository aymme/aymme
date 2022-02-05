import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { EndpointEntity, ResponseEntity, UpdateEndpointDto } from '@aymme/client/mock/model';

import * as EndpointActions from './endpoint.actions';
import * as EndpointSelectors from './endpoint.selectors';

@Injectable()
export class EndpointFacade {
  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$: Observable<boolean> = this.store.pipe(select(EndpointSelectors.getEndpointLoaded));
  availableStatusCodes$: Observable<ResponseEntity[] | undefined> = this.store.pipe(
    select(EndpointSelectors.getAvailableStatusCodes)
  );
  activeStatusCode$: Observable<ResponseEntity | undefined> = this.store.pipe(
    select(EndpointSelectors.getActiveStatusCode)
  );
  endpoint$: Observable<EndpointEntity | undefined> = this.store.pipe(select(EndpointSelectors.getSelectedEndpoint));

  constructor(private readonly store: Store) {}

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  loadEndpoint(endpointId: string) {
    this.store.dispatch(EndpointActions.loadEndpoint({ endpointId }));
  }

  updateEndpoint(data: UpdateEndpointDto) {
    this.store.dispatch(EndpointActions.updateEndpoint({ data }));
  }
}
