import { createFeatureSelector, createSelector } from '@ngrx/store';

import { PROJECTS_FEATURE_KEY, projectsAdapter, State } from './projects.reducer';

// Lookup the 'Projects' feature state managed by NgRx
export const getProjectsState = createFeatureSelector<State>(PROJECTS_FEATURE_KEY);

const { selectAll, selectEntities } = projectsAdapter.getSelectors();

export const getProjectsLoaded = createSelector(getProjectsState, (state: State) => state.loaded);

export const getProjectsError = createSelector(getProjectsState, (state: State) => state.error);

export const getAllProjects = createSelector(getProjectsState, (state: State) => selectAll(state));

export const getProjectsEntities = createSelector(getProjectsState, (state: State) => selectEntities(state));

export const getSelectedId = createSelector(getProjectsState, (state: State) => state.selectedId);

export const getSelected = createSelector(getProjectsEntities, getSelectedId, (entities, selectedId) =>
  selectedId ? entities[selectedId] : undefined
);

export const getSelectedProjectConfiguration = createSelector(getSelected, selected => selected?.configuration);
