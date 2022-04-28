import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { fetch, optimisticUpdate } from '@nrwl/angular';

import * as CollectionsActions from './collections.actions';
import { CollectionService } from '../../services';
import { delay, map, tap, withLatestFrom } from 'rxjs/operators';
import { getAllCollections } from './collections.selectors';
import { Store } from '@ngrx/store';
import { CollectionsEntity } from './collections.models';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class CollectionsEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CollectionsActions.init, CollectionsActions.refresh),
      fetch({
        run: (action) => {
          return this.collectionService.getAll(action.projectId).pipe(
            map((collections) => CollectionsActions.loadCollectionsSuccess({ collections })),
            delay(500),
            tap(() => {
              if (action.type === CollectionsActions.refresh.type) {
                this.toastr.success('Successfully refreshed project data.');
              }
            })
          );
        },
        onError: (action, error) => {
          this.toastr.error(`Unable to fetch the collections. Please reopen the project.`);
          return CollectionsActions.loadCollectionsFailure({ error });
        },
      })
    )
  );

  createNewCollection$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CollectionsActions.createNewCollection),
      fetch({
        run: ({ projectId, name }) => {
          return this.collectionService.createNewCollection(projectId, name).pipe(
            map((collection) => CollectionsActions.createNewCollectionSuccess({ collection })),
            tap(() => {
              this.toastr.success(`Successfully created '${name}' collection.`);
            })
          );
        },
        onError: (_, error) => {
          this.toastr.error(`Couldn't create the new collection. Please try again.`);
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
          return this.collectionService.deleteCollection(collection).pipe(
            map(() => CollectionsActions.deleteCollectionSuccess({ collection })),
            tap(() => {
              this.toastr.success(`Successfully deleted the '${collection.name}' collection.`);
            })
          );
        },
        onError: (_, error) => {
          this.toastr.error(`Not able to delete the collection, please try again.`);
          return CollectionsActions.deleteCollectionFailure({ error });
        },
      })
    )
  );

  updateCollection$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        CollectionsActions.moveEndpointInCollection,
        CollectionsActions.moveEndpointToOtherCollection,
        CollectionsActions.updateCollectionOrder,
        CollectionsActions.updateCollection
      ),
      withLatestFrom(this.store$.select(getAllCollections)),
      optimisticUpdate({
        run: ({ data }, collection) => {
          return this.collectionService.updateCollections(data.projectId, collection).pipe(
            map((result) => CollectionsActions.updateCollectionsSuccess({ result })),
            tap(() => {
              this.toastr.success(`Successfully updated the collections.`);
            })
          );
        },
        undoAction: (action: any, error: any) => {
          this.toastr.error(`Not able to update the collections, please try again.`);
          return {
            type: 'UNDO_TODO_UPDATE',
            todo: action.todo,
          };
        },
      })
    )
  );

  removeEndpointSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CollectionsActions.removeEndpointSuccess),
      map(({ collectionId, endpointId }) => {
        this.toastr.success(`Successfully removed endpoint from the collection.`);
        return CollectionsActions.removeEndpointFromCollection({ collectionId, endpointId });
      })
    )
  );

  removeEndpointFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CollectionsActions.removeEndpointFailure),
        map(() => {
          this.toastr.error(`Error removing endpoint.`);
          return null;
        })
      ),
    { dispatch: false }
  );

  constructor(
    private readonly actions$: Actions,
    private collectionService: CollectionService,
    private store$: Store<CollectionsEntity>,
    private toastr: ToastrService
  ) {}
}
