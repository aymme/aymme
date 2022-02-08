import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { fetch, pessimisticUpdate } from '@nrwl/angular';
import { Store } from '@ngrx/store';
import { filter, map, tap, withLatestFrom } from 'rxjs';

import { getSelectedId as getSelectedProjectId } from '@aymme/client/projects/data-access';
import * as EndpointActions from './endpoint.actions';
import * as EndpointSelectors from './endpoint.selectors';
import { EndpointService } from '../../services/endpoint.service';

@Injectable()
export class EndpointEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EndpointActions.loadEndpoint),
      withLatestFrom(this.store.select(getSelectedProjectId)),
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

  updateEndpoint$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EndpointActions.updateEndpoint),
      concatLatestFrom(() => [
        this.store.select(EndpointSelectors.getSelectedId),
        this.store.select(getSelectedProjectId),
      ]),
      pessimisticUpdate({
        run: (action, endpointId, projectId) => {
          return this.endpointService.updateEndpoint(endpointId || '', projectId || '', action.data).pipe(
            map(() => EndpointActions.updateEndpointSuccess()),
            tap(() => {
              console.log('TODO: message service?')
            })
          );
        },
        onError: (action, error) => {
          return EndpointActions.updateEndpointFailure({ error });
        },
      })
    )
  );

  constructor(
    private readonly actions$: Actions,
    private store: Store,
    private endpointService: EndpointService
  ) {}
}
