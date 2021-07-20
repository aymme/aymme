import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import * as ProjectsActions from './projects.actions';
import { ProjectsEntity } from './projects.models';

export const PROJECTS_FEATURE_KEY = 'projects';

export interface State extends EntityState<ProjectsEntity> {
  selectedId?: string | number; // which Projects record has been selected
  loaded: boolean; // has the Projects list been loaded
  error?: string | null; // last known error (if any)
}

export interface ProjectsPartialState {
  readonly [PROJECTS_FEATURE_KEY]: State;
}

export const projectsAdapter: EntityAdapter<ProjectsEntity> =
  createEntityAdapter<ProjectsEntity>();

export const initialState: State = projectsAdapter.getInitialState({
  loaded: false,
});

export const projectsReducer = createReducer(
  initialState,
  on(ProjectsActions.init, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(ProjectsActions.loadProjectsSuccess, (state, { projects }) =>
    projectsAdapter.setAll(projects, { ...state, loaded: true })
  ),
  on(ProjectsActions.loadProjectsFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);