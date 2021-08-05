import { Component } from '@angular/core';
import {
  ProjectsEntity,
  ProjectsFacade,
} from '@aymme/client/projects/data-access';

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

  constructor(private projectsFacade: ProjectsFacade) {
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
}
