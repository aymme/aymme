import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EndpointOptionsComponent } from './endpoint-options.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from '@aymme/client/shell/ui/dropdown';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, DropdownModule],
  declarations: [EndpointOptionsComponent],
  exports: [EndpointOptionsComponent],
})
export class EndpointOptionsModule {}
