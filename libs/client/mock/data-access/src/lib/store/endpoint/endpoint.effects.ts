import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import { Store } from '@ngrx/store';
import { filter, map, withLatestFrom } from 'rxjs';

import { getSelectedId } from '@aymme/client/projects/data-access';
import * as EndpointActions from './endpoint.actions';
import { EndpointService } from '../../services/endpoint.service';

@Injectable()
export class EndpointEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EndpointActions.loadEndpoint),
      withLatestFrom(this.store.select(getSelectedId)),
      filter(([_, projectId]) => {
        return !!projectId;
      }),
      fetch({
        run: (action, projectId) => {
          return this.endpointService
            .getEndpointDetails(action.endpointId, projectId || '') // TODO: Fix the condition
            .pipe(map((endpoint) => EndpointActions.loadEndpointSuccess({ endpoint })));
        },
        onError: (action: ReturnType<typeof EndpointActions.loadEndpoint>, error) => {
          console.error('Error', error);
          return EndpointActions.loadEndpointFailure({ error });
        },
      })
    )
  );

  constructor(private readonly actions$: Actions, private store: Store, private endpointService: EndpointService) {}
}
