import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as EndpointsActions from './endpoints.actions';
import { EndpointsService } from '../../endpoints.service';
import { map } from 'rxjs/operators';

@Injectable()
export class EndpointsEffects {
  getEndpointById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EndpointsActions.openEndpoint),
      fetch({
        run: ({ projectId, endpointId }) => {
          return this.endpointsService
            .getById(projectId, endpointId)
            .pipe(
              map((endpoint) =>
                EndpointsActions.loadEndpointSuccess({ endpoint })
              )
            );
        },
        onError: (_, error) => {
          console.error('Error', error);
          return EndpointsActions.loadEndpointFailure({ error });
        },
      })
    )
  );

  constructor(
    private readonly actions$: Actions,
    private endpointsService: EndpointsService
  ) {}
}
