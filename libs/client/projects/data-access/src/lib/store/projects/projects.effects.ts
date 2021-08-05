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
      ofType(
        ProjectsActions.init,
        ProjectsActions.createNewProjectSuccess,
        ProjectsActions.deleteProjectSuccess
      ),
      fetch({
        run: () => {
          return this.projectsService.getProjects().pipe(
            delay(500),
            map((projects) => ProjectsActions.loadProjectsSuccess({ projects }))
          );
        },

        onError: (action, error) => {
          console.error('Error', error);
          return ProjectsActions.loadProjectsFailure({ error });
        },
      })
    )
  );

  createNewProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProjectsActions.createNewProject),
      fetch({
        run: ({ name }) => {
          return this.projectsService
            .createNewProject(name)
            .pipe(
              map((project) =>
                ProjectsActions.createNewProjectSuccess({ project })
              )
            );
        },
        onError: (_, error) => {
          return ProjectsActions.createNewProjectFailure({ error });
        },
      })
    )
  );

  deleteProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProjectsActions.deleteProject),
      fetch({
        run: ({ projectId }) =>
          this.projectsService
            .deleteProject(projectId)
            .pipe(map(() => ProjectsActions.deleteProjectSuccess())),
        onError: (_, error) => ProjectsActions.deleteProjectFailure(error),
      })
    )
  );

  constructor(
    private readonly actions$: Actions,
    private projectsService: ProjectsService
  ) {}
}
