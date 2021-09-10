import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EndpointsComponent } from './endpoints.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, RouterModule.forChild([])],
  declarations: [EndpointsComponent],
})
export class EndpointsModule {}
