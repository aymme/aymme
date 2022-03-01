import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EndpointLinkComponent } from './endpoint-link.component';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  imports: [CommonModule, DragDropModule],
  declarations: [EndpointLinkComponent],
  exports: [EndpointLinkComponent],
})
export class EndpointLinkModule {}
