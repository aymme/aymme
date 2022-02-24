import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayPanelComponent } from './overlay-panel/overlay-panel.component';

export type OverlayOption = {
  label: string;
  value: any;
};

@NgModule({
  imports: [CommonModule],
  declarations: [OverlayPanelComponent],
  exports: [OverlayPanelComponent],
})
export class OverlayPanelModule {}
