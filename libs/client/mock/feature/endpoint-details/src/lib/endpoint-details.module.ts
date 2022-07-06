import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EndpointDetailsComponent } from './endpoint-details.component';
import { ResponseListModule } from '@aymme/client/mock/ui/response-list';
import { EndpointOptionsModule } from '@aymme/client/mock/ui/endpoint-options';
import { EditorModule } from '@aymme/client/shared/ui/editor';
import { LoaderModule } from '@aymme/client/shell/ui/loader';

@NgModule({
  imports: [
    CommonModule,

    RouterModule.forChild([{ path: '', component: EndpointDetailsComponent, pathMatch: 'full' }]),
    ResponseListModule,
    EndpointOptionsModule,
    EditorModule,
    LoaderModule,
  ],
  declarations: [EndpointDetailsComponent],
})
export class EndpointDetailsModule {}
