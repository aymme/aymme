import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';

import { ProjectsListComponent } from './projects-list.component';

@NgModule({
  imports: [CommonModule, ButtonModule, RippleModule],
  declarations: [ProjectsListComponent],
  exports: [ProjectsListComponent],
})
export class ProjectsListModule {}
