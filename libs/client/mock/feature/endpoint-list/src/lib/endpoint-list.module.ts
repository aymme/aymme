import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EndpointListComponent } from './endpoint-list.component';
import { TooltipModule } from '@aymme/client/shell/ui/tooltip';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { EndpointLinkModule } from '@aymme/client/mock/ui/endpoint-link';
import { CollectionPanelModule } from '@aymme/client/collection/ui/collection-panel';
import { LoaderModule } from '@aymme/client/shell/ui/loader';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: EndpointListComponent,
        pathMatch: 'full',
      },
    ]),
    TooltipModule,
    FontAwesomeModule,
    DragDropModule,
    EndpointLinkModule,
    CollectionPanelModule,
    LoaderModule,
  ],
  declarations: [EndpointListComponent],
})
export class EndpointListModule {}
