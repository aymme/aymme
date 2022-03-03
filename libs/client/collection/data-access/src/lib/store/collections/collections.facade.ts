import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import * as CollectionsActions from './collections.actions';
import * as CollectionsSelectors from './collections.selectors';
import { ICollection } from '@aymme/shared/model';

@Injectable()
export class CollectionsFacade {
  loaded$ = this.store.pipe(select(CollectionsSelectors.getCollectionsLoaded));

  allCollections$ = this.store.pipe(select(CollectionsSelectors.getAllCollections));

  selectedCollections$ = this.store.pipe(select(CollectionsSelectors.getSelected));

  constructor(private readonly store: Store) {}

  init(projectId: string) {
    this.store.dispatch(CollectionsActions.init({ projectId }));
  }

  moveEndpointInCollection(data: any) {
    this.store.dispatch(CollectionsActions.moveEndpointInCollection({ data }));
  }

  moveEndpointToOtherCollection(data: any) {
    this.store.dispatch(CollectionsActions.moveEndpointToOtherCollection({ data }));
  }

  createNewCollection(name: string) {
    this.store.dispatch(CollectionsActions.createNewCollection({ name }));
  }

  deleteCollection(collection: ICollection) {
    this.store.dispatch(CollectionsActions.deleteCollection({ collection }));
  }

  updateCollectionOrder(data: any) {
    this.store.dispatch(CollectionsActions.updateCollectionOrder({ data }));
  }
}
