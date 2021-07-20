import { Injectable } from '@angular/core';
import { Action, select, Store } from '@ngrx/store';

import * as ProjectsActions from './projects.actions';
import * as ProjectsFeature from './projects.reducer';
import * as ProjectsSelectors from './projects.selectors';

@Injectable()
export class ProjectsFacade {
  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(select(ProjectsSelectors.getProjectsLoaded));
  allProjects$ = this.store.pipe(select(ProjectsSelectors.getAllProjects));
  selectedProjects$ = this.store.pipe(select(ProjectsSelectors.getSelected));

  constructor(private readonly store: Store) {}

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init() {
    this.store.dispatch(ProjectsActions.init());
  }
}
