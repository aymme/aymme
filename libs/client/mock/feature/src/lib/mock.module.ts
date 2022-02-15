import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MockComponent } from './mock.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CollectionsEffects, CollectionsFacade, CollectionsFeature } from '@aymme/client/collection/data-access';
import { EndpointLinkModule } from '@aymme/client/endpoint/ui/endpoint-link';
import { CollectionPanelModule } from '@aymme/client/collection/ui/collection-panel';
import { ClientMockDataAccessModule } from '@aymme/client/mock/data-access';
import { EndpointOptionsModule } from '@aymme/client/endpoint/ui/endpoint-options';
import { EditorModule } from '@aymme/client/shared/ui/editor';
import { ResponseListModule } from '@aymme/client/mock/ui/response-list';
import { LoaderModule } from '@aymme/client/shell/ui/loader';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: MockComponent,
      },
    ]),
    StoreModule.forFeature(CollectionsFeature.COLLECTIONS_FEATURE_KEY, CollectionsFeature.reducer),
    EffectsModule.forFeature([CollectionsEffects]),
    EndpointLinkModule,
    CollectionPanelModule,
    ClientMockDataAccessModule,
    EndpointOptionsModule,
    EditorModule,
    ResponseListModule,
    LoaderModule,
  ],
  declarations: [MockComponent],
  providers: [CollectionsFacade],
})
export class MockModule {}
