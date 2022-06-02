import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipComponent } from './tooltip/tooltip.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [CommonModule, FontAwesomeModule],
  declarations: [TooltipComponent],
  exports: [TooltipComponent],
})
export class TooltipModule {}
