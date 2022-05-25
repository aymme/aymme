import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProjectsListComponent } from './projects-list.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [CommonModule, FontAwesomeModule],
  declarations: [ProjectsListComponent],
  exports: [ProjectsListComponent],
})
export class ProjectsListModule {}
