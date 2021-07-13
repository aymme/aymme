import { createAction, props } from '@ngrx/store';
import { ProjectsEntity } from './projects.models';

export const init = createAction('[Projects Page] Init');

export const loadProjectsSuccess = createAction(
  '[Projects/API] Load Projects Success',
  props<{ projects: ProjectsEntity[] }>()
);

export const loadProjectsFailure = createAction(
  '[Projects/API] Load Projects Failure',
  props<{ error: any }>()
);
