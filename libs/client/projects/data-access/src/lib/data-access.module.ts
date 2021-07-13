import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { ProjectsEffects } from './+state/projects/projects.effects';
import { ProjectsFacade } from './+state/projects/projects.facade';
import * as fromProjects from './+state/projects/projects.reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromProjects.PROJECTS_FEATURE_KEY,
      fromProjects.reducer
    ),
    EffectsModule.forFeature([ProjectsEffects]),
  ],
  providers: [ProjectsFacade],
})
export class DataAccessModule {}
