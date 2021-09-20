import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EndpointLinkComponent } from './endpoint-link.component';
import { BadgeModule } from 'primeng/badge';

@NgModule({
  imports: [CommonModule, BadgeModule],
  declarations: [EndpointLinkComponent],
  exports: [EndpointLinkComponent],
})
export class EndpointLinkModule {}
