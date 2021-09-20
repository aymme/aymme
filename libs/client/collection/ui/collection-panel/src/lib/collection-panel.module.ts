import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollectionPanelComponent } from './collection-panel.component';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';

@NgModule({
  imports: [CommonModule, PanelModule, ButtonModule, MenuModule],
  declarations: [CollectionPanelComponent],
  exports: [CollectionPanelComponent],
})
export class CollectionPanelModule {}
