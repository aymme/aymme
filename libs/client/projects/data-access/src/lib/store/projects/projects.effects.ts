import { delay, map } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import { ProjectsService } from '../../services/projects.service';
import * as ProjectsActions from './projects.actions';

@Injectable()
export class ProjectsEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProjectsActions.init),
      fetch({
        run: () => {
          return this.projectsService.getProjects()
            .pipe(
              delay(500),
              map(projects => ProjectsActions.loadProjectsSuccess({ projects }))
            );
        },

        onError: (action, error) => {
          console.error('Error', error);
          return ProjectsActions.loadProjectsFailure({ error });
        },
      })
    )
  );

  constructor(private readonly actions$: Actions, private projectsService: ProjectsService) {}
}
