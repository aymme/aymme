import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as ProjectsActions from './projects.actions';
import * as ProjectsFeature from './projects.reducer';

@Injectable()
export class ProjectsEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProjectsActions.init),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return ProjectsActions.loadProjectsSuccess({ projects: [] });
        },
        onError: (action, error) => {
          console.error('Error', error);
          return ProjectsActions.loadProjectsFailure({ error });
        },
      })
    )
  );

  constructor(private readonly actions$: Actions) {}
}
