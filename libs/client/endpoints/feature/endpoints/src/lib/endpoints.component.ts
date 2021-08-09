import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import {
  CollectionsEntity,
  CollectionsFacade,
} from '@aymme/client/collections/data-access';
import {
  EndpointsEntity,
  EndpointsFacade,
} from '@aymme/client/endpoints/data-access';

@Component({
  selector: 'ay-endpoints',
  templateUrl: './endpoints.component.html',
  styleUrls: ['./endpoints.component.scss'],
})
export class EndpointsComponent implements OnInit {
  loaded$: Observable<boolean> = this.collectionsFacade.loaded$;
  collections$: Observable<CollectionsEntity[] | undefined> =
    this.collectionsFacade.allCollections$;
  endpoints$: Observable<EndpointsEntity | undefined> =
    this.endpointsFacade.selectedEndpoint$;

  projectId = this.route.snapshot.paramMap.get('projectId') as string;

  constructor(
    private collectionsFacade: CollectionsFacade,
    private endpointsFacade: EndpointsFacade,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.collectionsFacade.init(this.projectId);

    this.endpoints$.subscribe((value) => console.log({ value }));
  }

  rename() {
    console.log('Rename');
  }

  delete() {
    console.log('Delete');
  }

  openEndpoint({ endpointId }: { endpointId: string }) {
    this.endpointsFacade.openEndpoint(this.projectId, endpointId);
  }
}
