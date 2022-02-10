import { Component } from '@angular/core';
import { ProjectsEntity, ProjectsFacade } from '@aymme/client/projects/data-access';
import { Router } from '@angular/router';
import { BehaviorSubject, skip, take, takeLast } from 'rxjs';

@Component({
  selector: 'ay-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent {
  loaded$ = this.projectsFacade.loaded$;
  projects$ = this.projectsFacade.allProjects$;
  error$ = this.projectsFacade.error$;
  createdNewProject$ = this.projectsFacade.createdNewProject$;

  displayAddNewProject$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  showError$: BehaviorSubject<boolean | string> = new BehaviorSubject<boolean | string>(false);

  newProjectName = '';

  constructor(private projectsFacade: ProjectsFacade, private readonly router: Router) {
    this.projectsFacade.init();
  }

  showDialog() {
    this.displayAddNewProject$.next(true);
  }

  hideDialog() {
    this.displayAddNewProject$.next(false);
    this.showError$.next(false);
  }

  deleteProject(project: ProjectsEntity) {
    this.projectsFacade.deleteProject(project.id);
  }

  createNewProject() {
    if (!this.newProjectName.length) {
      this.showError$.next('Please specify a project name.');
      return;
    }

    this.projectsFacade.createNewProject(this.newProjectName);
  }

  openProject({ id }: { id: string }) {
    this.router.navigate([`projects/${id}/mock`]);
  }
}
