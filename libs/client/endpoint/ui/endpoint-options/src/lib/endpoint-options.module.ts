import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EndpointOptionsComponent } from './endpoint-options.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [EndpointOptionsComponent],
  exports: [EndpointOptionsComponent],
})
export class EndpointOptionsModule {}
