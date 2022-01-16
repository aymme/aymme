import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { IProject } from '@aymme/shared/model';

@Component({
  selector: 'ay-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsListComponent {
  @Input() projects!: IProject[] | null;
  @Output() deleteProject = new EventEmitter<IProject>();
  @Output() openProject = new EventEmitter<{ id: string }>();

  onDeleteProject(project: IProject, event: Event): void {
    event.stopPropagation();
    this.deleteProject.emit(project);
  }

  onClick(project: IProject) {
    console.log({ project });
    this.openProject.emit({ id: project.id });
  }
}
