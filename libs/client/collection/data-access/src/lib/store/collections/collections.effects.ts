import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { fetch, optimisticUpdate } from '@nrwl/angular';

import * as CollectionsActions from './collections.actions';
import { CollectionService } from '../../services';
import { map, tap, withLatestFrom } from 'rxjs/operators';
import { getAllCollections } from './collections.selectors';
import { Store } from '@ngrx/store';
import { CollectionsEntity } from './collections.models';

@Injectable()
export class CollectionsEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CollectionsActions.init),
      fetch({
        run: (action) => {
          return this.collectionService
            .getAll(action.projectId)
            .pipe(map((collections) => CollectionsActions.loadCollectionsSuccess({ collections })));
        },
        onError: (action, error) => {
          console.error('Error', error);
          return CollectionsActions.loadCollectionsFailure({ error });
        },
      })
    )
  );

  createNewProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CollectionsActions.createNewCollection),
      fetch({
        run: ({ name }) => {
          return this.collectionService
            .createNewCollection(name)
            .pipe(map((collection) => CollectionsActions.createNewCollectionSuccess({ collection })));
        },
        onError: (_, error) => {
          return CollectionsActions.createNewCollectionFailure({ error });
        },
      })
    )
  );

  deleteCollection$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CollectionsActions.deleteCollection),
      fetch({
        run: ({ collection }) => {
          return this.collectionService
            .deleteCollection(collection)
            .pipe(map(() => CollectionsActions.deleteCollectionSuccess({ collection })));
        },
        onError: (_, error) => {
          return CollectionsActions.deleteCollectionFailure({ error });
        },
      })
    )
  );

  updateCollection$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CollectionsActions.moveEndpointInCollection, CollectionsActions.moveEndpointToOtherCollection),
      withLatestFrom(this.store$.select(getAllCollections)),
      optimisticUpdate({
        run: (action, collections) => {
          return this.collectionService
            .updateCollections(collections)
            .pipe(map((result) => CollectionsActions.updateCollectionsSuccess({ result })));
        },
        undoAction: (action: any, error: any) => {
          console.log('TODO: Implement error handling or revert back?');
          return {
            type: 'UNDO_TODO_UPDATE',
            todo: action.todo,
          };
        },
      })
    )
  );

  constructor(
    private readonly actions$: Actions,
    private collectionService: CollectionService,
    private store$: Store<CollectionsEntity>
  ) {}
}
