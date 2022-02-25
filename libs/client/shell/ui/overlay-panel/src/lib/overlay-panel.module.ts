import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayPanelComponent } from './overlay-panel/overlay-panel.component';
import { ReactiveFormsModule } from '@angular/forms';

export type OverlayOption = {
  label: string;
  value: any;
};

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [OverlayPanelComponent],
  exports: [OverlayPanelComponent],
})
export class OverlayPanelModule {}
