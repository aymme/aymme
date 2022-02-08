import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResponseListComponent } from './response-list.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [ResponseListComponent],
  exports: [ResponseListComponent],
})
export class ResponseListModule {}
