import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PROJECTS_FEATURE_KEY, ProjectsEffects, ProjectsFacade, projectsReducer } from '@aymme/client/projects/data-access';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: async () =>
          (await import('@aymme/client/projects/feature/projects')).ProjectsModule
      },
    ]),
    StoreModule.forFeature(PROJECTS_FEATURE_KEY, projectsReducer),
    EffectsModule.forFeature([ProjectsEffects]),
  ],
  providers: [ProjectsFacade]
})
export class ShellModule { }
