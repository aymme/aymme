import { Component } from '@angular/core';
import {
  ProjectsEntity,
  ProjectsFacade,
} from '@aymme/client/projects/data-access';
import { Router } from '@angular/router';

@Component({
  selector: 'ay-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent {
  display = false;

  loaded$ = this.projectsFacade.loaded$;
  projects$ = this.projectsFacade.allProjects$;

  newProjectName = '';

  constructor(
    private projectsFacade: ProjectsFacade,
    private readonly router: Router
  ) {
    this.projectsFacade.init();
  }

  showDialog() {
    this.display = true;
  }

  deleteProject(project: ProjectsEntity) {
    this.projectsFacade.deleteProject(project.id);
  }

  createNewProject() {
    this.projectsFacade.createNewProject(this.newProjectName);
    this.newProjectName = '';
    this.display = false;
  }

  openProject({ id }: { id: string }) {
    this.router.navigate([`projects/${id}/endpoints`]);
  }
}
