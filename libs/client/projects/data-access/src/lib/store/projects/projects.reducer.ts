import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';

import * as ProjectsActions from './projects.actions';
import { ProjectsEntity } from './projects.models';
import { IProjectConfiguration } from '@aymme/shared/model';

export const PROJECTS_FEATURE_KEY = 'projects';

export interface State extends EntityState<ProjectsEntity> {
  selectedId?: string; // which Projects record has been selected
  loaded: boolean; // has the Projects list been loaded
  error?: Response | null; // last known error (if any)
  configuration?: IProjectConfiguration;
}

export interface ProjectsPartialState {
  readonly [PROJECTS_FEATURE_KEY]: State;
}

export const projectsAdapter: EntityAdapter<ProjectsEntity> = createEntityAdapter<ProjectsEntity>();

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
  on(ProjectsActions.selectProject, (state, { projectId }) => ({
    ...state,
    selectedId: projectId,
  })),
  on(ProjectsActions.loadProjectsSuccess, (state, { projects }) => {
    return projectsAdapter.setAll(projects, { ...state, loaded: true });
  }),
  on(ProjectsActions.loadProjectsFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(ProjectsActions.createNewProjectSuccess, (state, { project }) => ({
    ...state,
    project: project,
    loaded: false,
    error: undefined,
  })),
  on(ProjectsActions.createNewProjectFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(ProjectsActions.updateProjectConfigurationSuccess, (state, { configuration, projectId }) => {
    return projectsAdapter.updateOne({ id: projectId, changes: { configuration } }, state);
  }),
  on(ProjectsActions.removeIgnoreParamFromConfiguration, (state, { param }) => {
    const project = state.selectedId ? state.entities[state.selectedId] : null;

    if (project) {
      const updatedProject = {
        ...project,
        configuration: {
          ...project.configuration,
          ignoreParams: (project.configuration.ignoreParams as string)
            .split(',')
            .filter((p: string) => p !== param)
            .join(','),
        },
      };

      return projectsAdapter.upsertOne(updatedProject, state);
    } else {
      return state;
    }
  }),
  on(ProjectsActions.addIgnoreParamToConfiguration, (state, { newParam }) => {
    const project = state.selectedId ? state.entities[state.selectedId] : null;

    if (project) {
      let updatedProject;
      if (project.configuration.ignoreParams) {
        updatedProject = {
          ...project,
          configuration: {
            ...project.configuration,
            ignoreParams: `${project.configuration.ignoreParams},${newParam}`,
          },
        };
      } else {
        updatedProject = {
          ...project,
          configuration: {
            ...project.configuration,
            ignoreParams: newParam,
          },
        };
      }
      return projectsAdapter.upsertOne(updatedProject, state);
    } else {
      return state;
    }
  })
);
