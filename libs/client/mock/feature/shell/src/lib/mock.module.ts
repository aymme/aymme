import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MockComponent } from './mock.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CollectionsEffects, CollectionsFacade, CollectionsFeature } from '@aymme/client/collection/data-access';
import { ClientMockDataAccessModule } from '@aymme/client/mock/data-access';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: MockComponent,
        children: [
          {
            path: '',
            loadChildren: () =>
              import('@aymme/client/mock/feature/endpoint-list').then((module) => module.EndpointListModule),
          },
          {
            path: ':endpointId',
            loadChildren: () =>
              import('@aymme/client/mock/feature/endpoint-details').then((module) => module.EndpointDetailsModule),
            outlet: 'details',
          },
        ],
      },
    ]),
    StoreModule.forFeature(CollectionsFeature.COLLECTIONS_FEATURE_KEY, CollectionsFeature.reducer),
    EffectsModule.forFeature([CollectionsEffects]),
    ClientMockDataAccessModule,
    MatDialogModule,
  ],
  declarations: [MockComponent],
  providers: [CollectionsFacade],
})
export class MockModule {}
