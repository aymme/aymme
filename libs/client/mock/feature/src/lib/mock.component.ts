import { Component } from '@angular/core';
import { CollectionsEntity, CollectionsFacade } from '@aymme/client/collection/data-access';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { MessageService } from 'primeng/api';
import { ProjectsEntity, ProjectsFacade } from '@aymme/client/projects/data-access';
import { EndpointFacade } from '@aymme/client/mock/data-access';

@Component({
  selector: 'ay-mock',
  templateUrl: './mock.component.html',
  styleUrls: ['./mock.component.scss'],
  providers: [MessageService],
})
export class MockComponent {
  projectId: string = this.route.snapshot.parent?.parent?.params.projectId;

  loaded$: Observable<boolean> = this.collectionsFacade.loaded$;
  collections$: Observable<CollectionsEntity[]> = this.collectionsFacade.allCollections$;
  selectedProject$: Observable<ProjectsEntity | undefined> = this.projectsFacade.selectedProject$;

  constructor(
    private collectionsFacade: CollectionsFacade,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private projectsFacade: ProjectsFacade,
    private endpointFacade: EndpointFacade
  ) {
    this.collectionsFacade.init(this.projectId);
  }

  update() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Data Updated',
    });
  }

  delete() {
    this.messageService.add({
      severity: 'warn',
      summary: 'Delete',
      detail: 'Data Deleted',
    });
  }

  onEndpointSelect(id: string) {
    this.endpointFacade.loadEndpoint(id);
  }
}
