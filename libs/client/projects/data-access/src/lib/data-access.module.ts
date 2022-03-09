import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FileSaverModule } from 'ngx-filesaver';

@NgModule({
  imports: [CommonModule, FileSaverModule],
  providers: [],
})
export class DataAccessModule {}
