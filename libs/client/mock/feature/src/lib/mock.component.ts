import { Component } from '@angular/core';
import { CollectionsEntity, CollectionsFacade } from '@aymme/client/collection/data-access';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { MessageService } from 'primeng/api';
import { ProjectsEntity, ProjectsFacade } from '@aymme/client/projects/data-access';
import { EndpointFacade } from '@aymme/client/mock/data-access';
import { EndpointEntity, IAvailableStatusCode, UpdateEndpointDto } from '@aymme/client/mock/model';

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
  availableStatusCodes$: Observable<IAvailableStatusCode[]> = this.endpointFacade.availableStatusCodes$;
  activeStatusCode$: Observable<IAvailableStatusCode | undefined> = this.endpointFacade.activeStatusCode$;
  endpoint$: Observable<EndpointEntity | undefined> = this.endpointFacade.endpoint$;

  constructor(
    private route: ActivatedRoute,
    private collectionsFacade: CollectionsFacade,
    private messageService: MessageService,
    private projectsFacade: ProjectsFacade,
    private endpointFacade: EndpointFacade
  ) {
    this.collectionsFacade.init(this.projectId);
  }

  onUpdate(data: UpdateEndpointDto) {
    console.log({ data });
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Data Updated',
    });

    this.endpointFacade.updateEndpoint(data);
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
