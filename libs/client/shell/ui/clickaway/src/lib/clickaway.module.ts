import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClickawayDirective } from './clickaway.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [ClickawayDirective],
  exports: [ClickawayDirective],
})
export class ClickawayModule {}
