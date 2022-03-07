import { ChangeDetectionStrategy, Component } from '@angular/core';
import { delay, Observable } from 'rxjs';
import { ProjectsEntity, ProjectsFacade } from '@aymme/client/projects/data-access';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ay-shell-component',
  template: `<router-outlet *ngIf="selectedProject$ | async; else isLoading"></router-outlet>
    <ng-template #isLoading>
      <div class="align-items-center justify-content-center flex"></div>
    </ng-template> `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShellComponent {
  selectedProject$: Observable<ProjectsEntity | undefined> = this.projectsFacade.selectedProject$;

  constructor(private projectsFacade: ProjectsFacade, private route: ActivatedRoute) {
    if (this.route.snapshot.paramMap.get('projectId')) {
      this.projectsFacade.init();
      this.projectsFacade.selectProject(this.route.snapshot.paramMap.get('projectId') || '');
    }
  }
}
