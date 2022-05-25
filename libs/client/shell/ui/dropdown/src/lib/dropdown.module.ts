import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownComponent } from './dropdown/dropdown.component';
import { ClickawayModule } from '@aymme/client/shell/ui/clickaway';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [CommonModule, ClickawayModule, FontAwesomeModule],
  declarations: [DropdownComponent],
  exports: [DropdownComponent],
})
export class DropdownModule {}
