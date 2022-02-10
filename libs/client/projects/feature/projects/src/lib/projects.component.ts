import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProjectsEntity, ProjectsFacade } from '@aymme/client/projects/data-access';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject, takeUntil, tap } from 'rxjs';

const PROJECT_ALREADY_EXITS = 'Project name already exists.';
const FILL_IN_PROJECT_NAME = 'Please specify a project name.';

@Component({
  selector: 'ay-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit, OnDestroy {
  unsubscribe$: Subject<void> = new Subject();

  loaded$ = this.projectsFacade.loaded$;
  projects$ = this.projectsFacade.allProjects$;
  error$ = this.projectsFacade.error$.pipe(
    takeUntil(this.unsubscribe$),
    tap((err) => {
      if (err?.status === 409) {
        this.displayError$.next(PROJECT_ALREADY_EXITS);
      }

      if (!err) {
        this.hideDialog();
        this.resetFormInput();
      }
    })
  );

  displayAddNewProject$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  displayError$: BehaviorSubject<boolean | string> = new BehaviorSubject<boolean | string>(false);

  newProjectName = '';

  constructor(private projectsFacade: ProjectsFacade, private readonly router: Router) {
    this.projectsFacade.init();
  }

  ngOnInit(): void {
    this.error$.subscribe();
  }

  showDialog() {
    this.displayAddNewProject$.next(true);
  }

  resetFormInput() {
    this.newProjectName = '';
  }

  hideDialog() {
    this.displayAddNewProject$.next(false);
    this.displayError$.next(false);
  }

  deleteProject(project: ProjectsEntity) {
    this.projectsFacade.deleteProject(project.id);
  }

  createNewProject() {
    if (!this.newProjectName.length) {
      this.displayError$.next(FILL_IN_PROJECT_NAME);
      return;
    }

    this.projectsFacade.createNewProject(this.newProjectName);
  }

  openProject({ id }: { id: string }) {
    this.router.navigate([`projects/${id}/mock`]);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
