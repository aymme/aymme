import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import * as ProjectsActions from './projects.actions';
import * as ProjectsSelectors from './projects.selectors';
import { IProjectConfiguration } from '@aymme/shared/model';

@Injectable()
export class ProjectsFacade {
  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(select(ProjectsSelectors.getProjectsLoaded));
  allProjects$ = this.store.pipe(select(ProjectsSelectors.getAllProjects));
  selectedProject$ = this.store.pipe(select(ProjectsSelectors.getSelected));
  selectedProjectConfiguration$ = this.store.pipe(select(ProjectsSelectors.getSelectedProjectConfiguration));
  error$ = this.store.pipe(select(ProjectsSelectors.getProjectsError));

  constructor(private readonly store: Store) {
  }

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init() {
    this.store.dispatch(ProjectsActions.init());
  }

  createNewProject(name: string) {
    this.store.dispatch(ProjectsActions.createNewProject({ name }));
  }

  deleteProject(projectId: string) {
    this.store.dispatch(ProjectsActions.deleteProject({ projectId }));
  }

  updateProjectConfiguration(configuration: IProjectConfiguration, onSuccess: () => void) {
    this.store.dispatch(ProjectsActions.updateSelectedProjectConfiguration({configuration, onSuccess}));
  }

  selectProject(projectId: string) {
    this.store.dispatch(ProjectsActions.selectProject({ projectId }));
  }

  addIgnoreParamToConfiguration(newParam: string) {
    this.store.dispatch(ProjectsActions.addIgnoreParamToConfiguration({ newParam }));
  }

  removeIgnoreParamFromConfiguration(param: string) {
    this.store.dispatch(ProjectsActions.removeIgnoreParamFromConfiguration({ param }));
  }

  exportProject(projectId: string, fileName: string) {
    this.store.dispatch(ProjectsActions.exportProject({ projectId, fileName }));
  }

  importProject(projectId: string, file: File): void {
    this.store.dispatch(ProjectsActions.importProject({ projectId, file }));
  }
}
