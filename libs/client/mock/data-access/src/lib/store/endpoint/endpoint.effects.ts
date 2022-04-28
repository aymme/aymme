import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { fetch, pessimisticUpdate } from '@nrwl/angular';
import { Store } from '@ngrx/store';
import { delay, filter, map, tap, withLatestFrom } from 'rxjs';

import { getSelectedId as getSelectedProjectId } from '@aymme/client/projects/data-access';
import * as EndpointActions from './endpoint.actions';
import * as EndpointSelectors from './endpoint.selectors';
import { EndpointService } from '../../services/endpoint.service';
import { ToastrService } from 'ngx-toastr';
import { CollectionsActions } from '@aymme/client/collection/data-access';

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
            .pipe(
              delay(600),
              map((endpoint) => EndpointActions.loadEndpointSuccess({ endpoint }))
            );
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
              this.toastr.success(`Successfully updated the collection.`);
            })
          );
        },
        onError: (action, error) => {
          this.toastr.error(
            `Error saving collection. Please verify that there are no validation errors in the editor and try again.`
          );
          return EndpointActions.updateEndpointFailure({ error });
        },
      })
    )
  );

  removeEndpoint$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EndpointActions.removeEndpoint),
      concatLatestFrom(() => [this.store.select(getSelectedProjectId)]),
      pessimisticUpdate({
        run: ({ collectionId, endpointId }, projectId) => {
          return this.endpointService
            .removeEndpoint(endpointId || '', projectId || '')
            .pipe(map(() => CollectionsActions.removeEndpointSuccess({ collectionId, endpointId })));
        },
        onError: () => {
          return CollectionsActions.removeEndpointFailure();
        },
      })
    )
  );

  constructor(
    private readonly actions$: Actions,
    private store: Store,
    private endpointService: EndpointService,
    private toastr: ToastrService
  ) {}
}
