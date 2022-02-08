import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProjectsListComponent } from './projects-list.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ProjectsListComponent],
  exports: [ProjectsListComponent],
})
export class ProjectsListModule {}
