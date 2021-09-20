import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MockComponent } from './mock.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CollectionsEffects, CollectionsFacade, CollectionsFeature } from '@aymme/client/collection/data-access';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { MenuModule } from 'primeng/menu';
import { BadgeModule } from 'primeng/badge';
import { EndpointLinkModule } from '@aymme/client/endpoint/ui/endpoint-link';
import { CollectionPanelModule } from '@aymme/client/collection/ui/collection-panel';

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
    ButtonModule,
    PanelModule,
    MenuModule,
    BadgeModule,
    EndpointLinkModule,
    CollectionPanelModule,
  ],
  declarations: [MockComponent],
  providers: [CollectionsFacade],
})
export class MockModule {}
