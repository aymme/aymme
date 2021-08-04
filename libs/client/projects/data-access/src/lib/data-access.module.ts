import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {
  PROJECTS_FEATURE_KEY,
  ProjectsEffects,
  ProjectsFacade,
  projectsReducer,
} from './store';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(PROJECTS_FEATURE_KEY, projectsReducer),
    EffectsModule.forFeature([ProjectsEffects]),
  ],
  providers: [ProjectsFacade],
})
export class DataAccessModule {}
