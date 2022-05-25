import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResponseListComponent } from './response-list.component';
import { FormsModule } from '@angular/forms';
import { OverlayPanelModule } from '@aymme/client/shell/ui/overlay-panel';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [CommonModule, FormsModule, OverlayPanelModule, FontAwesomeModule],
  declarations: [ResponseListComponent],
  exports: [ResponseListComponent],
})
export class ResponseListModule {}
