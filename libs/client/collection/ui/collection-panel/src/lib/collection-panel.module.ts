import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollectionPanelComponent } from './collection-panel.component';

@NgModule({
  imports: [CommonModule],
  declarations: [CollectionPanelComponent],
  exports: [CollectionPanelComponent],
})
export class CollectionPanelModule {}
