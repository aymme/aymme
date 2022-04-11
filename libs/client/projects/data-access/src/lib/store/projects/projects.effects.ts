import { delay, map, tap, withLatestFrom } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { fetch, optimisticUpdate } from '@nrwl/angular';

import { ProjectsService } from '../../services/projects.service';
import * as ProjectsActions from './projects.actions';
import { ToastrService } from 'ngx-toastr';
import { getSelectedId } from './projects.selectors';
import { ProjectsEntity } from '.';
import { Store } from '@ngrx/store';

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

  exportProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProjectsActions.exportProject),
      fetch({
        run: ({ projectId, fileName }) => {
          return this.projectsService.exportProject(projectId).pipe(
            tap((data) => {
              this.projectsService.saveToFile(data, fileName);
            }),
            map(() => ProjectsActions.exportProjectSuccess()),
            tap(() => {
              return this.toastr.success(
                `Created export file with name: <br /><strong class="text-xs">${fileName}</strong>`,
                '',
                {
                  enableHtml: true,
                }
              );
            })
          );
        },
        onError: (_, error) => {
          this.toastr.error(`Failed to create the export download.`);
          return ProjectsActions.createNewProjectFailure({ error });
        },
      })
    )
  );

  importProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProjectsActions.importProject),
      fetch({
        run: ({ projectId, file }) => {
          return this.projectsService.importProject(projectId, file).pipe(
            map(() => ProjectsActions.importProjectSuccess()),
            tap(() => {
              return this.toastr.success(`Import project successful.`);
            })
          );
        },
        onError: (_, error) => {
          this.toastr.error(`Failed to import the project, please try again..`);
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

  updateProjectConfiguration$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProjectsActions.updateSelectedProjectConfiguration),
      withLatestFrom(this.store$.select(getSelectedId)),
      optimisticUpdate({
        run: (action, selectedProjectId) => {
          return this.projectsService.updateProjectConfiguration(selectedProjectId as string, action.configuration).pipe(
            map((updatedConfiguration) => ProjectsActions.updateProjectConfigurationSuccess({ projectId: selectedProjectId as string, configuration: updatedConfiguration })),
            tap(() => action.onSuccess()),
            tap(() => {
              this.toastr.success(`Successfully updated the project.`);
            })
          );
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
