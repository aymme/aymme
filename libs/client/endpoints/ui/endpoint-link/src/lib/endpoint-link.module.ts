import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BadgeModule } from 'primeng/badge';

import { EndpointLinkComponent } from './endpoint-link.component';

@NgModule({
  imports: [CommonModule, BadgeModule],
  declarations: [EndpointLinkComponent],
  exports: [EndpointLinkComponent],
})
export class EndpointLinkModule {}
