import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsComponent } from './projects.component';

import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, RouterModule.forChild([
    {
      path: '',
      component: ProjectsComponent
    }
  ]),],
  declarations: [
    ProjectsComponent
  ],
  exports: [
    ProjectsComponent
  ],
})
export class ProjectsModule {}
