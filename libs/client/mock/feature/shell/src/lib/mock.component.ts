import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CollectionsFacade } from '@aymme/client/collection/data-access';
import { ProjectsEntity, ProjectsFacade } from '@aymme/client/projects/data-access';

@Component({
  selector: 'ay-mock',
  templateUrl: './mock.component.html',
  styleUrls: ['./mock.component.scss'],
  providers: [],
})
export class MockComponent {
  projectId: string = this.route.snapshot.parent?.parent?.params.projectId;

  selectedProject$: Observable<ProjectsEntity | undefined> = this.projectsFacade.selectedProject$;

  constructor(
    private route: ActivatedRoute,
    private collectionsFacade: CollectionsFacade,
    private projectsFacade: ProjectsFacade
  ) {
    this.collectionsFacade.init(this.projectId);
  }
}
