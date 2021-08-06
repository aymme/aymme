import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import {
  CollectionsEntity,
  CollectionsFacade,
} from '@aymme/client/collections/data-access';

@Component({
  selector: 'ay-endpoints',
  templateUrl: './endpoints.component.html',
  styleUrls: ['./endpoints.component.scss'],
})
export class EndpointsComponent implements OnInit {
  loaded$: Observable<boolean> = this.collectionsFacade.loaded$;
  collections$: Observable<CollectionsEntity[] | undefined> =
    this.collectionsFacade.allCollections$;

  constructor(
    private collectionsFacade: CollectionsFacade,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.collectionsFacade.init(
      this.route.snapshot.paramMap.get('projectId') as string
    );
  }

  rename() {
    console.log('Rename');
  }

  delete() {
    console.log('Delete');
  }

  openEndpoint({ endpointId }: { endpointId: string }) {
    console.log({ endpointId });
  }
}
