import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';

import { EndpointLinkModule } from '@aymme/client/endpoints/ui/endpoint-link';

import { CollectionsListComponent } from './collections-list.component';

@NgModule({
  imports: [
    CommonModule,
    PanelModule,
    ButtonModule,
    MenuModule,
    EndpointLinkModule,
  ],
  declarations: [CollectionsListComponent],
  exports: [CollectionsListComponent],
})
export class CollectionsListModule {}
