import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResponseListComponent } from './response-list.component';
import { TabMenuModule } from 'primeng/tabmenu';
import { ListboxModule } from 'primeng/listbox';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, TabMenuModule, ListboxModule, OverlayPanelModule, ButtonModule, FormsModule],
  declarations: [ResponseListComponent],
  exports: [ResponseListComponent],
})
export class ResponseListModule {}
