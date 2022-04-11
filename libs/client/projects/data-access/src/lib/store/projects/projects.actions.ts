import { createAction, props } from '@ngrx/store';

import { ProjectsEntity } from './projects.models';
import { IProjectConfiguration } from '@aymme/shared/model';

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

export const updateSelectedProjectConfiguration = createAction('[Projects/API] Update Selected Project Configuration', props<{configuration: IProjectConfiguration, onSuccess: () => void}>());
export const updateProjectConfigurationSuccess = createAction(
  '[Projects/API] Update Configuration Success',
  props<{ projectId: string; configuration: IProjectConfiguration }>()
);

export const deleteProjectFailure = createAction('[Projects/API] Delete Project Failure', props<{ error: unknown }>());

export const selectProject = createAction('[Projects/API] Get Project', props<{ projectId: string }>());
export const getProject = createAction('[Projects/API] Get Project', props<{ projectId: string }>());


export const addIgnoreParamToConfiguration = createAction(
  '[Projects/API] Add Param To Project Configuration',
  props<{ newParam: string }>()
);

export const removeIgnoreParamFromConfiguration = createAction(
  '[Projects/API] Remove Param To Project Configuration',
  props<{ param: string }>()
);

export const getProjectFailure = createAction('[Projects/API] Get Project Failure', props<{ error: unknown }>());

export const exportProject = createAction(
  '[Projects/API] Export Project',
  props<{ projectId: string; fileName: string }>()
);

export const exportProjectSuccess = createAction('[Projects/API] Export Project Success');

export const importProject = createAction('[Projects/API] Import Project', props<{ projectId: string; file: File }>());

export const importProjectSuccess = createAction('[Projects/API] Import Project Success');
