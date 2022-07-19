import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProjectsListModule } from '@aymme/client/projects/ui/projects-list';

import { ProjectsComponent } from './projects.component';
import { LoaderModule } from '@aymme/client/shell/ui/loader';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ButtonModule } from '@aymme/client/shared/ui/button';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: ProjectsComponent,
      },
    ]),
    ProjectsListModule,
    LoaderModule,
    FontAwesomeModule,
    ButtonModule,
  ],
  declarations: [ProjectsComponent],
  exports: [ProjectsComponent],
})
export class ProjectsModule {}
