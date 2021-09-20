import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import * as CollectionsActions from './collections.actions';
import * as CollectionsSelectors from './collections.selectors';

@Injectable()
export class CollectionsFacade {
  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(select(CollectionsSelectors.getCollectionsLoaded));
  allCollections$ = this.store.pipe(
    select(CollectionsSelectors.getAllCollections)
  );
  selectedCollections$ = this.store.pipe(
    select(CollectionsSelectors.getSelected)
  );

  constructor(private readonly store: Store) {}

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init(projectId: string) {
    this.store.dispatch(CollectionsActions.init({ projectId }));
  }
}
