import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as EndpointsActions from './endpoints.actions';
import { EndpointsService } from '../../endpoints.service';
import { map } from 'rxjs/operators';

@Injectable()
export class EndpointsEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EndpointsActions.init),
      fetch({
        run: (action) => {
          return this.endpointsService
            .getAllEndpoints(action.projectId)
            .pipe(
              map((endpoints) =>
                EndpointsActions.loadEndpointsSuccess({ endpoints })
              )
            );
        },
        onError: (action, error) => {
          console.error('Error', error);
          return EndpointsActions.loadEndpointsFailure({ error });
        },
      })
    )
  );

  constructor(
    private readonly actions$: Actions,
    private endpointsService: EndpointsService
  ) {}
}
