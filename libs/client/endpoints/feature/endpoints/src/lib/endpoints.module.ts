import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EndpointsComponent } from './endpoints.component';
import { RouterModule } from '@angular/router';
import { DataAccessModule as CollectionDataAccessModule } from '@aymme/client/collections/data-access';
import { DataAccessModule as EndpointsDataAccessModule } from '@aymme/client/endpoints/data-access';

import { CollectionsListModule } from '@aymme/client/collections/ui/collections-list';

@NgModule({
  imports: [
    CommonModule,
    CollectionDataAccessModule,
    EndpointsDataAccessModule,
    RouterModule.forChild([{ path: '', component: EndpointsComponent }]),

    CollectionsListModule,
  ],
  declarations: [EndpointsComponent],
})
export class EndpointsModule {}
