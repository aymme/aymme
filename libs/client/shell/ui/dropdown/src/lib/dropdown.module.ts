import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownComponent } from './dropdown/dropdown.component';
import { ClickawayModule } from '@aymme/client/shell/ui/clickaway';

@NgModule({
  imports: [CommonModule, ClickawayModule],
  declarations: [DropdownComponent],
  exports: [DropdownComponent],
})
export class DropdownModule {}
