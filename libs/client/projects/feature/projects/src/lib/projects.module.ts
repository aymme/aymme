import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressBarModule } from 'primeng/progressbar';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProjectsListModule } from '@aymme/client/projects/ui/projects-list';

import { ProjectsComponent } from './projects.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    DividerModule,
    DialogModule,
    InputTextModule,
    ProgressBarModule,
    RouterModule.forChild([
      {
        path: '',
        component: ProjectsComponent,
      },
    ]),
    ProjectsListModule,
  ],
  declarations: [ProjectsComponent],
  exports: [ProjectsComponent],
})
export class ProjectsModule {}
