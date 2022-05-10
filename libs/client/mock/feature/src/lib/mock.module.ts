import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MockComponent } from './mock.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CollectionsEffects, CollectionsFacade, CollectionsFeature } from '@aymme/client/collection/data-access';
import { EndpointLinkModule } from '@aymme/client/mock/ui/endpoint-link';
import { ClientMockDataAccessModule } from '@aymme/client/mock/data-access';
import { EndpointOptionsModule } from '@aymme/client/mock/ui/endpoint-options';
import { CollectionPanelModule } from '@aymme/client/collection/ui/collection-panel';
import { ResponseListModule } from '@aymme/client/mock/ui/response-list';
import { EditorModule } from '@aymme/client/shared/ui/editor';
import { LoaderModule } from '@aymme/client/shell/ui/loader';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TooltipModule } from '@aymme/client/shell/ui/tooltip';

import {
  ConfirmDeleteCollectionDialogComponent,
  CreateNewCollectionDialogComponent,
  ImportProjectDialogComponent,
  ProjectConfigurationDialogComponent,
  RenameCollectionDialogComponent,
} from './dialogs';

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
    DragDropModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule,
    TooltipModule,
  ],
  declarations: [
    MockComponent,
    CreateNewCollectionDialogComponent,
    ConfirmDeleteCollectionDialogComponent,
    RenameCollectionDialogComponent,
    ProjectConfigurationDialogComponent,
    ImportProjectDialogComponent,
  ],
  providers: [CollectionsFacade],
})
export class MockModule {}
