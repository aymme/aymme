import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as CollectionsActions from './collections.actions';
import { CollectionService } from '../../services';
import { map } from 'rxjs/operators';

@Injectable()
export class CollectionsEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CollectionsActions.init),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return this.collectionService
            .getAll(action.projectId)
            .pipe(
              map((collections) =>
                CollectionsActions.loadCollectionsSuccess({ collections })
              )
            );
        },
        onError: (action, error) => {
          console.error('Error', error);
          return CollectionsActions.loadCollectionsFailure({ error });
        },
      })
    )
  );

  constructor(
    private readonly actions$: Actions,
    private collectionService: CollectionService
  ) {}
}
