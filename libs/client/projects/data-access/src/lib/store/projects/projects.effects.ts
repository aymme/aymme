import { delay, map, tap, withLatestFrom } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { fetch, optimisticUpdate } from '@nrwl/angular';

import { ProjectsService } from '../../services/projects.service';
import * as ProjectsActions from './projects.actions';
import { ToastrService } from 'ngx-toastr';
import { getSelected } from './projects.selectors';
import { ProjectsEntity } from '.';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Injectable()
export class ProjectsEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProjectsActions.init, ProjectsActions.createNewProjectSuccess, ProjectsActions.deleteProjectSuccess),
      fetch({
        run: () => {
          return this.projectsService.getProjects().pipe(
            delay(500),
            map((projects) => ProjectsActions.loadProjectsSuccess({ projects }))
          );
        },

        onError: (action, error) => {
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
          return this.projectsService.createNewProject(name).pipe(
            map((project) => ProjectsActions.createNewProjectSuccess({ project })),
            tap(() => {
              this.toastr.success(`Successfully created the new project.`);
            })
          );
        },
        onError: (_, error) => {
          this.toastr.success(`Failed to create project, please try again.`);
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
          this.projectsService.deleteProject(projectId).pipe(map(() => ProjectsActions.deleteProjectSuccess())),
        onError: (_, error) => ProjectsActions.deleteProjectFailure(error),
      })
    )
  );

  updateProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProjectsActions.updateProjectConfiguration),
      withLatestFrom(this.store$.select(getSelected)),
      optimisticUpdate({
        run: ({ action }, project) => {
          if (project) {
            return this.projectsService.updateProject(project).pipe(
              map((project) => ProjectsActions.getProjectSuccess({ project })),
              tap(() => {
                this.toastr.success(`Successfully updated the project.`);
              })
            );
          }
          return new Observable();
        },
        undoAction: (action: any, error: any) => {
          this.toastr.error(`Not able to update the project, please try again.`);
          return {
            type: 'UNDO_TODO_UPDATE',
            todo: action.todo,
          };
        },
      })
    )
  );

  constructor(
    private readonly actions$: Actions,
    private projectsService: ProjectsService,
    private toastr: ToastrService,
    private store$: Store<ProjectsEntity>
  ) {}
}
