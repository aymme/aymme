import { createAction, props } from '@ngrx/store';

import { ProjectsEntity } from './projects.models';

export const init = createAction('[Projects Page] Init');

export const loadProjectsSuccess = createAction(
  '[Projects/API] Load Projects Success',
  props<{ projects: ProjectsEntity[] }>()
);

export const loadProjectsFailure = createAction('[Projects/API] Load Projects Failure', props<{ error: undefined }>());

export const createNewProject = createAction('[Projects/API] Create new Project', props<{ name: string }>());

export const createNewProjectSuccess = createAction(
  '[Projects/API] Create new Project Success',
  props<{ project: ProjectsEntity }>()
);

export const createNewProjectFailure = createAction(
  '[Projects/API] Create new Project Failure',
  props<{ error: Response | null | undefined }>()
);

export const deleteProject = createAction('[Projects/API] Delete Project', props<{ projectId: string }>());

export const deleteProjectSuccess = createAction('[Projects/API] Delete Project Success');

export const deleteProjectFailure = createAction('[Projects/API] Delete Project Failure', props<{ error: unknown }>());

export const selectProject = createAction('[Projects/API] Get Project', props<{ projectId: string }>());
export const getProject = createAction('[Projects/API] Get Project', props<{ projectId: string }>());

export const getProjectSuccess = createAction(
  '[Projects/API] Get Project Success',
  props<{ project: ProjectsEntity }>()
);

export const getProjectFailure = createAction('[Projects/API] Get Project Failure', props<{ error: unknown }>());
