import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromCollections from './store/collections/collections.reducer';
import { CollectionsEffects } from './store/collections/collections.effects';
import { CollectionsFacade } from './store/collections/collections.facade';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromCollections.COLLECTIONS_FEATURE_KEY,
      fromCollections.reducer
    ),
    EffectsModule.forFeature([CollectionsEffects]),
  ],
  providers: [CollectionsFacade],
})
export class DataAccessModule {}
