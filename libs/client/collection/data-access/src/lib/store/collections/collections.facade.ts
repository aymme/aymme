import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import * as CollectionsActions from './collections.actions';
import * as CollectionsSelectors from './collections.selectors';
import { ICollection } from '@aymme/shared/model';
import { CollectionsEntity } from '.';

@Injectable()
export class CollectionsFacade {
  loaded$ = this.store.pipe(select(CollectionsSelectors.getCollectionsLoaded));

  allCollections$ = this.store.pipe(select(CollectionsSelectors.getAllCollections));

  selectedCollections$ = this.store.pipe(select(CollectionsSelectors.getSelected));

  constructor(private readonly store: Store) {}

  init(projectId: string) {
    this.store.dispatch(CollectionsActions.init({ projectId }));
  }

  refresh(projectId: string) {
    this.store.dispatch(CollectionsActions.refresh({ projectId }));
  }

  // TODO: type this data
  moveEndpointInCollection(data: any) {
    this.store.dispatch(CollectionsActions.moveEndpointInCollection({ data }));
  }

  // TODO: type this data
  moveEndpointToOtherCollection(data: any) {
    this.store.dispatch(CollectionsActions.moveEndpointToOtherCollection({ data }));
  }

  removeEndpointFromCollection(collectionId: string, endpointId: string) {
    this.store.dispatch(CollectionsActions.removeEndpointFromCollection({ collectionId, endpointId }));
  }

  createNewCollection(projectId: string, name: string) {
    this.store.dispatch(CollectionsActions.createNewCollection({ projectId, name }));
  }

  deleteCollection(collection: ICollection) {
    this.store.dispatch(CollectionsActions.deleteCollection({ collection }));
  }

  updateCollectionOrder(data: any) {
    this.store.dispatch(CollectionsActions.updateCollectionOrder({ data }));
  }

  toggleCompressed(collection: CollectionsEntity) {
    this.store.dispatch(CollectionsActions.toggleCompressed({ collection }));
  }

  updateCollection(data: any, collection: CollectionsEntity) {
    this.store.dispatch(CollectionsActions.updateCollection({ data, collection }));
  }
}
