import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import * as CollectionsActions from './collections.actions';
import * as CollectionsSelectors from './collections.selectors';

@Injectable()
export class CollectionsFacade {
  loaded$ = this.store.pipe(select(CollectionsSelectors.getCollectionsLoaded));

  allCollections$ = this.store.pipe(select(CollectionsSelectors.getAllCollections));

  selectedCollections$ = this.store.pipe(select(CollectionsSelectors.getSelected));

  constructor(private readonly store: Store) {}

  init(projectId: string) {
    this.store.dispatch(CollectionsActions.init({ projectId }));
  }
}
