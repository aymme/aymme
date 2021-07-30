import { Component } from '@angular/core';
import { ProjectsFacade } from '@aymme/client/projects/data-access';

@Component({
  selector: 'ay-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent {
  display = false;

  loaded$ = this.projectsFacade.loaded$;
  projects$ = this.projectsFacade.allProjects$;

  constructor(private projectsFacade: ProjectsFacade) {
    this.projectsFacade.init();
  }

  showDialog() {
    this.display = true;
  }

  deleteProject() {
    console.warn('TODO: delete project');
  }
}
