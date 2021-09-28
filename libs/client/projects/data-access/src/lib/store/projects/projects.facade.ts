import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import * as ProjectsActions from './projects.actions';
import * as ProjectsSelectors from './projects.selectors';

@Injectable()
export class ProjectsFacade {
  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(select(ProjectsSelectors.getProjectsLoaded));
  allProjects$ = this.store.pipe(select(ProjectsSelectors.getAllProjects));
  selectedProject$ = this.store.pipe(select(ProjectsSelectors.getSelected));

  constructor(private readonly store: Store) {}

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

  selectProject(projectId: string) {
    this.store.dispatch(ProjectsActions.selectProject({ projectId }));
  }
}
