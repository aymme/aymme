import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { EndpointEntity, ResponseEntity, UpdateEndpointDto } from '@aymme/client/mock/model';

import * as EndpointActions from './endpoint.actions';
import * as EndpointSelectors from './endpoint.selectors';

@Injectable()
export class EndpointFacade {
  loaded$: Observable<boolean | null> = this.store.pipe(select(EndpointSelectors.getEndpointLoaded));

  availableStatusCodes$: Observable<ResponseEntity[] | undefined> = this.store.pipe(
    select(EndpointSelectors.getAvailableStatusCodes)
  );

  activeStatusCode$: Observable<ResponseEntity | undefined> = this.store.pipe(
    select(EndpointSelectors.getActiveStatusCode)
  );

  endpoint$: Observable<EndpointEntity | undefined> = this.store.pipe(select(EndpointSelectors.getSelectedEndpoint));

  constructor(private readonly store: Store) {}

  loadEndpoint(endpointId: string) {
    this.store.dispatch(EndpointActions.loadEndpoint({ endpointId }));
  }

  updateEndpoint(data: UpdateEndpointDto) {
    this.store.dispatch(EndpointActions.updateEndpoint({ data }));
  }

  addNewResponse(response: number, body: string) {
    this.store.dispatch(EndpointActions.addNewResponse({ response, body }));
  }

  removeResponse(response: ResponseEntity) {
    this.store.dispatch(EndpointActions.removeResponse({ response }));
  }

  removeEndpoint(collectionId: string, endpointId: string) {
    this.store.dispatch(EndpointActions.removeEndpoint({ collectionId, endpointId }));
  }
}
