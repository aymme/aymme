import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ProjectsComponent } from './projects.component';

@NgModule({
  imports: [CommonModule, FormsModule, ButtonModule, DividerModule, DialogModule, RouterModule.forChild([
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
export class ProjectsModule { }
