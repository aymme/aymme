import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EndpointLinkComponent } from './endpoint-link.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [CommonModule, DragDropModule, FontAwesomeModule],
  declarations: [EndpointLinkComponent],
  exports: [EndpointLinkComponent],
})
export class EndpointLinkModule {}
