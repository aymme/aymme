import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayPanelComponent } from './overlay-panel/overlay-panel.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

export type OverlayOption = {
  label: string;
  value: any;
};

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule],
  declarations: [OverlayPanelComponent],
  exports: [OverlayPanelComponent],
})
export class OverlayPanelModule {}
