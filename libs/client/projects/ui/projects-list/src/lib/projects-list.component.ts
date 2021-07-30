import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IProject } from '@aymme/shared/data-access';

@Component({
  selector: 'ay-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectsListComponent {

  @Input() projects!: IProject[] | null;
  @Output() deleteProject = new EventEmitter<IProject>();

  onDeleteProject(project: IProject): void{
    this.deleteProject.emit(project);
  }

}
